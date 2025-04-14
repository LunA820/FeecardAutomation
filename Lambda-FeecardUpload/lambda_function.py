import json

def lambda_handler(event, context):
    print("EVENT:", json.dumps(event)) 
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda! From Github action from Luna')
    }
   