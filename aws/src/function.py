import json
import os
import boto3
from botocore.exceptions import ClientError

# DynamoDB client (same lifecycle as Ruby memoization)
_dynamo = None


def dynamo():
    global _dynamo
    if _dynamo is None:
        _dynamo = boto3.client("dynamodb")
    return _dynamo


def table_name():
    return os.environ["TABLE_NAME"]


def pk_value():
    return os.environ.get("COUNTER_PK", "global")


def response(status, body):
    return {
        "statusCode": status,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps(body),
    }


def get_count():
    res = dynamo().get_item(
        TableName=table_name(),
        Key={"pk": {"S": pk_value()}},
        ConsistentRead=True,
    )

    if "Item" in res and "count" in res["Item"]:
        count = int(res["Item"]["count"]["N"])
    else:
        count = 0

    return response(200, {"count": count})


def increment():
    res = dynamo().update_item(
        TableName=table_name(),
        Key={"pk": {"S": pk_value()}},
        UpdateExpression="SET #c = if_not_exists(#c, :zero) + :incr",
        ExpressionAttributeNames={"#c": "count"},
        ExpressionAttributeValues={
            ":incr": {"N": "1"},
            ":zero": {"N": "0"},
        },
        ReturnValues="UPDATED_NEW",
    )

    count = int(res["Attributes"]["count"]["N"])
    return response(200, {"count": count})


def lambda_handler(event, context):
    # Works for both HTTP API and REST API
    method = (
        event.get("requestContext", {})
        .get("http", {})
        .get("method")
        or event.get("httpMethod")
    )

    if method == "GET":
        return get_count()
    elif method == "POST":
        return increment()
    else:
        return response(405, {"error": "Method Not Allowed"})