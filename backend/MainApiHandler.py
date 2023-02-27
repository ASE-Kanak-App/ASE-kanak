from flask_restful import Api, Resource, reqparse

class MainApiHandler(Resource):
    
    def get(self):
        return {
            'resultStatus': 'SUCCESS',
            'message': 'This is the main page'
        }


    def post(self):
        print(self)
        parser = reqparse.RequestParser()
        parser.add_argument('type', type = str)
        parser.add_argument('message', type=str)

        args = parser.parse_args()

        print(args)

        request_type = args['type']
        request_json = args['message']

        ret_status = request_type
        ret_message = request_json

        if ret_message:
            message = f"Your requested message is {ret_message}"

        else:
            message = "No message found"


        final_ret = {"status":"Success", "message":message}

        return final_ret