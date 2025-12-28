import os
import json
from functions_framework import http


@http
def hello_http(request):
    # Get query parameter ?name=
    name = request.args.get("name", "world")

    # Get greeting from environment variable
    greeting = os.environ.get("GREETING", "Hello")

    response_body = {
        "message": f"{greeting}, {name}!"
    }

    return (
        json.dumps(response_body),
        200,
        {"Content-Type": "application/json"},
    )