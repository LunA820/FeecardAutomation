import json
import boto3

s3 = boto3.client('s3')

BUCKET_NAME = 'feecards'
INDEX_KEY = 'index.json'
header = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET,OPTIONS"
}

def lambda_handler(event, context):
    if event.get("requestContext", {}).get("http", {}).get("method") == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": header,
            "body": ""
        }

    try:
        obj = s3.get_object(Bucket=BUCKET_NAME, Key=INDEX_KEY)
        index_list = json.loads(obj['Body'].read().decode('utf-8'))
        last_id = index_list[0] if index_list else 0
    except s3.exceptions.NoSuchKey:
        last_id = 0

    try:
        latestFeecard = s3.get_object(
            Bucket=BUCKET_NAME,
            Key=f"{last_id}.json"
        )
        latest_content = latestFeecard['Body'].read().decode('utf-8')
    except s3.exceptions.NoSuchKey:
        return {
            'statusCode': 500,
            'headers': header,
            'body': json.dumps({'errorMessage': 'Latest feecard not found'})
        }

    return {
        'statusCode': 200,
        'Content-Type': 'application/json',
        'headers': header,
        'body': latest_content
    }
