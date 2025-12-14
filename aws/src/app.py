import json
import os
import boto3
from botocore.exceptions import ClientError

dynamodb = boto3.resource("dynamodb")
TABLE_NAME = os.environ["TABLE_NAME"]
COUNTER_ID = os.environ.get("COUNTER_ID", "global")

table = dynamodb.Table(TABLE_NAME)


def _resp(status: int, body: dict):
    return {
        "statusCode": status,
        "headers": {"content-type": "application/json"},
        "body": json.dumps(body),
    }


def get_count(counter_id: str):
    r = table.get_item(Key={"pk": counter_id})
    item = r.get("Item")
    value = int(item.get("value", 0)) if item else 0
    return value


def increment(counter_id: str, delta: int = 1):
    # Atomic increment (creates item if missing)
    r = table.update_item(
        Key={"pk": counter_id},
        UpdateExpression="ADD #v :d",
        ExpressionAttributeNames={"#v": "value"},
        ExpressionAttributeValues={":d": int(delta)},
        ReturnValues="UPDATED_NEW",
    )
    return int(r["Attributes"]["value"])


def lambda_handler(event, context):
    try:
        method = (event.get("requestContext", {}).get("http", {}).get("method") or "").upper()
        path = event.get("rawPath") or event.get("requestContext", {}).get("http", {}).get("path", "")

        counter_id = COUNTER_ID
        # Optional: allow /count?counter_id=x
        qs = event.get("queryStringParameters") or {}
        if qs.get("counter_id"):
            counter_id = qs["counter_id"]

        if method == "GET" and path == "/count":
            value = get_count(counter_id)
            return _resp(200, {"counter_id": counter_id, "value": value})

        if method == "POST" and path == "/count/increment":
            # Optional: body {"delta": 5}
            delta = 1
            if event.get("body"):
                body = json.loads(event["body"])
                if isinstance(body, dict) and "delta" in body:
                    delta = int(body["delta"])
            value = increment(counter_id, delta)
            return _resp(200, {"counter_id": counter_id, "value": value, "delta": delta})

        return _resp(404, {"message": "Not Found", "path": path, "method": method})

    except (ValueError, json.JSONDecodeError):
        return _resp(400, {"message": "Invalid request body"})
    except ClientError as e:
        return _resp(500, {"message": "DynamoDB error", "error": str(e)})
    except Exception as e:
        return _resp(500, {"message": "Server error", "error": str(e)})