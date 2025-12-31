import os
import json

def hello_http(request):
    name = request.args.get("name") if request.args else None
    if not name:
        try:
            body = request.get_json(silent=True) or {}
            name = body.get("name")
        except Exception:
            name = None

    name = name or "world"
    greeting = os.getenv("GREETING", "Hello")

    return (
        json.dumps({"message": f"{greeting}, {name}!"}),
        200,
        {"Content-Type": "application/json"},
    )