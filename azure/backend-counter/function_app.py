import os, json, time, logging
import azure.functions as func
from azure.cosmos import CosmosClient, exceptions

app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)

# ---- Config ----
COSMOS_ENDPOINT = os.getenv("COSMOS_ENDPOINT")
COSMOS_KEY = os.getenv("COSMOS_KEY")
COSMOS_DB = os.getenv("COSMOS_DB_NAME", "viewCounterDb")
COSMOS_CONTAINER = os.getenv("COSMOS_CONTAINER", "counter")
COUNTER_ID = os.getenv("COUNTER_PK", "global")
MAX_RETRIES = int(os.getenv("INCR_RETRIES", "5"))

# CORS: set your allowed origin(s)
# If you use same-origin (/api/counter), you can even set "*" and skip credentials.
ALLOWED_ORIGINS = os.getenv(
    "CORS_ALLOWED_ORIGINS",
    "https://www.davidtausendresume.net,https://davidtausendresume.net"
).split(",")

def _cors_headers(origin: str | None):
    origin = (origin or "").strip()

    # If origin is missing (curl/server-to-server), don't add ACAO to avoid odd caching
    if not origin:
        return {
            "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Max-Age": "86400",
        }

    if origin in [o.strip() for o in ALLOWED_ORIGINS]:
        allow_origin = origin
    else:
        # You can change this to "*" if you want public access from anywhere
        allow_origin = "null"

    return {
        "Access-Control-Allow-Origin": allow_origin,
        "Vary": "Origin",
        "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": "86400",
    }

def _container():
    if not COSMOS_ENDPOINT or not COSMOS_KEY:
        raise RuntimeError("Set COSMOS_ENDPOINT and COSMOS_KEY.")
    client = CosmosClient(COSMOS_ENDPOINT, COSMOS_KEY)
    db = client.get_database_client(COSMOS_DB)
    return db.get_container_client(COSMOS_CONTAINER)

def _ensure_item(c):
    try:
        return c.read_item(item=COUNTER_ID, partition_key=COUNTER_ID)
    except exceptions.CosmosResourceNotFoundError:
        try:
            c.create_item({"id": COUNTER_ID, "count": 0})
        except exceptions.CosmosHttpResponseError:
            pass
        return c.read_item(item=COUNTER_ID, partition_key=COUNTER_ID)

def _json(status: int, body: dict, origin: str | None):
    headers = _cors_headers(origin)
    headers["Content-Type"] = "application/json; charset=utf-8"
    return func.HttpResponse(json.dumps(body), status_code=status, headers=headers)

def get_count_logic(origin: str | None):
    cont = _container()
    item = _ensure_item(cont)
    return _json(200, {"count": int(item.get("count", 0) or 0)}, origin)

def increment_logic(origin: str | None):
    cont = _container()
    for attempt in range(MAX_RETRIES):
        item = _ensure_item(cont)
        etag = item.get("_etag")
        new_val = int(item.get("count", 0) or 0) + 1
        item["count"] = new_val
        try:
            cont.replace_item(item=item, body=item, if_match=etag)
            return _json(200, {"count": new_val}, origin)
        except exceptions.CosmosHttpResponseError as e:
            if getattr(e, "status_code", None) == 412 and attempt < MAX_RETRIES - 1:
                time.sleep(0.05 * (2 ** attempt))
                continue
            logging.warning("Increment conflict or error: %s", e)
            latest = _ensure_item(cont)
            return _json(200, {"count": int(latest.get("count", 0) or 0)}, origin)

    latest = _ensure_item(cont)
    return _json(200, {"count": int(latest.get("count", 0) or 0)}, origin)

# IMPORTANT: route should be "counter" so host.json routePrefix "api" gives /api/counter
@app.route(route="counter", auth_level=func.AuthLevel.ANONYMOUS, methods=["GET", "POST", "OPTIONS"])
def counter(req: func.HttpRequest) -> func.HttpResponse:
    origin = req.headers.get("origin")

    # Handle CORS preflight
    if req.method == "OPTIONS":
        return func.HttpResponse("", status_code=204, headers=_cors_headers(origin))

    try:
        if req.method == "GET":
            return get_count_logic(origin)
        if req.method == "POST":
            return increment_logic(origin)
        return _json(405, {"error": "Method Not Allowed"}, origin)
    except Exception as e:
        logging.exception("Unhandled error")
        return _json(500, {"error": "Internal Server Error", "detail": str(e)}, origin)