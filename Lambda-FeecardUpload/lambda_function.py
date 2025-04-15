import json
from parseCsv import parse_csv_matrix
import boto3

s3 = boto3.client('s3')

BUCKET_NAME = 'feecards'
INDEX_KEY = 'index.json'

def lambda_handler(event, context):
    # Parse csv to json
    raw_csv = event["body"]
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
        'body': json.dumps({'feecardId': new_id, 'message': 'Feecard uploaded successfully'})
    }