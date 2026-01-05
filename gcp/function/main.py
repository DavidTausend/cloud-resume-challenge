import json
import os
from google.cloud import firestore
from flask import Request, make_response

COLLECTION_NAME = os.getenv("COLLECTION_NAME", "counter")
COUNTER_PK = os.getenv("COUNTER_PK", "global")

CORS_ALLOWED_ORIGINS = os.getenv("CORS_ALLOWED_ORIGINS", "*").strip()
CORS_ALLOW_HEADERS = os.getenv("CORS_ALLOW_HEADERS", "Content-Type,Authorization")
CORS_ALLOW_METHODS = os.getenv("CORS_ALLOW_METHODS", "GET,POST,OPTIONS")
CORS_MAX_AGE = os.getenv("CORS_MAX_AGE", "3600")

db = firestore.Client()

def allowed_origin(origin):
    if CORS_ALLOWED_ORIGINS == "*":
        return "*"
    allowed = [o.strip() for o in CORS_ALLOWED_ORIGINS.split(",") if o.strip()]
    return origin if origin in allowed else None

def cors_headers(request: Request):
    origin = request.headers.get("Origin")
    ao = allowed_origin(origin)

    headers = {
        "Access-Control-Allow-Methods": CORS_ALLOW_METHODS,
        "Access-Control-Allow-Headers": CORS_ALLOW_HEADERS,
        "Access-Control-Max-Age": CORS_MAX_AGE,
    }

    if ao:
        headers["Access-Control-Allow-Origin"] = ao
        if ao != "*":
            headers["Vary"] = "Origin"

    return headers

def json_response(request, status, payload):
    resp = make_response(json.dumps(payload), status)
    resp.headers["Content-Type"] = "application/json"
    for k, v in cors_headers(request).items():
        resp.headers[k] = v
    return resp

def no_content_response(request):
    resp = make_response("", 204)
    for k, v in cors_headers(request).items():
        resp.headers[k] = v
    return resp

def doc_ref():
    return db.collection(COLLECTION_NAME).document(COUNTER_PK)

def get_count(request):
    snap = doc_ref().get()
    count = int(snap.get("count") or 0) if snap.exists else 0
    return json_response(request, 200, {"count": count})

def increment(request):
    new_value = 0

    @firestore.transactional
    def txn(transaction):
        nonlocal new_value
        ref = doc_ref()
        snap = ref.get(transaction=transaction)

        if snap.exists:
            current = int(snap.get("count") or 0)
            transaction.update(ref, {
                "count": firestore.Increment(1)
            })
            new_value = current + 1
        else:
            transaction.set(ref, {"count": 1})
            new_value = 1

    txn(db.transaction())
    return json_response(request, 200, {"count": new_value})

def hello_http(request: Request):
    if request.method == "OPTIONS":
        return no_content_response(request)

    if request.method == "GET":
        return get_count(request)
    if request.method == "POST":
        return increment(request)

    return json_response(request, 405, {"error": "Method Not Allowed"})