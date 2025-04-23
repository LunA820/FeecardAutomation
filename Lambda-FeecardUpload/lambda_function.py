import json
from parseCsv import parse_csv_matrix
import boto3

s3 = boto3.client('s3')

BUCKET_NAME = 'feecards'
INDEX_KEY = 'index.json'
header = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST,OPTIONS"
}

def lambda_handler(event, context):

    if event.get("requestContext", {}).get("http", {}).get("method") == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": header,
            "body": ""
        }

    print("EVENT:", json.dumps(event))

    # Parse csv to json
    raw_csv = event["body"]
    raw_csv = event.get("body")
    if raw_csv is None:
        return {
            "statusCode": 400,
            "headers": header,
            "body": json.dumps({"error": "Missing CSV body in request"})
        }
    feecard_json = json.dumps(parse_csv_matrix(raw_csv))

    # Get the greatest index
    try:
        obj = s3.get_object(Bucket=BUCKET_NAME, Key=INDEX_KEY)
        index_list = json.loads(obj['Body'].read().decode('utf-8'))
        last_id = index_list[0] if index_list else 0
    except s3.exceptions.NoSuchKey:
        index_list = []
        last_id = 0

    new_id = last_id + 1
    feecard_key = f"{new_id}.json"

    # Upload new feecard JSON
    s3.put_object(
        Bucket=BUCKET_NAME,
        Key=feecard_key,
        Body=feecard_json,
        ContentType='application/json'
    )

    # Update index.json
    index_list.insert(0, new_id)
    s3.put_object(
        Bucket=BUCKET_NAME,
        Key=INDEX_KEY,
        Body=json.dumps(index_list),
        ContentType='application/json'
    )

    return {
        'statusCode': 200,
        "headers": header,
        'body': json.dumps({'feecardId': new_id, 'message': 'Feecard uploaded successfully'})
    }