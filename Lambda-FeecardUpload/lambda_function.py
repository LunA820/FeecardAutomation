import json
from parseCsv import parse_csv_matrix

def lambda_handler(event, context):
    print("EVENT:", json.dumps(event))

    raw_csv = event["body"]
    result = parse_csv_matrix(raw_csv)

    return {
        'statusCode': 200,
        'body': json.dumps(result)
    }
   