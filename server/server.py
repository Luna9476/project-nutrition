'''
Main Entrance to respond to client side.
'''
import os

from flask import Flask, request, jsonify, make_response, send_file
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
import jwt
import secrets
from datetime import datetime, timedelta
from db.user import *
from db.allergies import *
from db.food import *

app = Flask(__name__)
CORS(app)
secret_key = secrets.token_hex(16)

app.config['SECRET_KEY'] = '000d88cd9d90036ebdd237eb6b0db000'
app.config['AVATAR_PATH']='images/avatars'


def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):

        token = None
        if 'x-access-tokens' in request.headers:
            token = request.headers['x-access-tokens']

        if not token:
            return jsonify({'message': 'a valid token is missing'})
        
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = find_user(data['email'])
        except:
            return jsonify({'message': 'token is invalid'})

        return f(current_user, *args, **kwargs)
    return decorator

# sign up
@app.route('/api/auth/register', methods=['POST'])
def signup_user(): 
    data = request.get_json() 
    hashed_password = generate_password_hash(data['password'], method='sha256')
    add_new_user(username = data['username'], email=data['email'], password=hashed_password)
    return jsonify({'message': 'registered successfully'})



# log in
@app.route('/api/auth/login', methods=['POST']) 
def login_user():
   data = request.get_json()
   print(data['password'])
   if not data or not data['email'] or not data['password']: 
       return make_response('could not verify', 401, {'Authentication': 'login required"'})   
 
   # find user from db
   user = find_user(email=data['email'])
   if check_password_hash(user['password'], data['password']):
       token = jwt.encode({'email' : user['email'], 'exp' : datetime.utcnow() + timedelta(minutes=45)}, app.config['SECRET_KEY'], "HS256")
       print(token)
       return jsonify({'token' : token})
 
   return make_response('could not verify',  401, {'Authentication': '"login required"'})


# get user's avatar
@app.route('/api/avatar', methods = ['GET'])
@token_required
def get_user_avatar(current_user):
    user_id = current_user['id']
    path =  find_user_avatar(user_id)
    print(path)
    return send_file(path)


# update user's avatar
@app.route('/api/avatar', methods = ['POST'])
@token_required
def update_user_avatar(current_user):
    avatar = request.files['file']
    user_id = current_user['id']
    path = os.path.join(app.config["AVATAR_PATH"], str(user_id) + "_" + avatar.filename)
    avatar.save(path)
    
    update_avatar(user_id, path)
    return jsonify({'message': 'update successfully'})
   

# get user's profile
@app.route('/api/profile', methods=['GET'])
@token_required
def get_user_profile(current_user):
    user_id = current_user['id']
    user_profile = find_user_by_id(user_id)
    return user_profile

# update user's profile
@app.route('/api/profile', methods=['POST'])
@token_required
def update_user_profile(current_user):
    user_id = current_user['id']
    request_data = request.get_json()
    print(request_data)
    user_name = request_data['userName']
    gender = request_data['gender']
    is_vegi = request_data['isVegi']
    birthdate = request_data['birthdate']
    allergens = request_data['allergens']

    print(is_vegi)
    update_res = update_user(user_id, user_name, gender, is_vegi, birthdate, allergens)
    print(update_res)

# get user's body record
@app.route('/api/record', methods=['GET'])
@token_required
def get_user_body_record(current_user):
    user_id = current_user['id']
    user_body_record = find_latest_body_record(user_id)
    if user_body_record:
        print(user_body_record)
        return user_body_record
    return make_response('no records found', 200, {'message': 'no records found'})

# get all body records of a user
@app.route('/api/records', methods=['GET'])
@token_required
def get_user_body_records(current_user):
    user_id = current_user['id']
    user_body_records = find_user_body_records(user_id)
    return {'records': user_body_records}

# insert new body record
@app.route('/api/record', methods=['POST'])
@token_required
def add_user_body_record(current_user):
    user_id = current_user['id']
    request_data = request.get_json()
    weight = request_data['weight']
    height = request_data['height']
    updated_body_record = add_body_record(user_id, height=height, weight=weight)
    return updated_body_record

# handle the image request
@app.route('/api/image', methods=['GET'])
def get_image():
    url = request.args.get('url')
    if url:
        try:
            print(url)

            return send_file(url)
        except Exception as e:
            return make_response('no image found with url', 500)
    return make_response('no url', 400)

# get all allergen options
@app.route('/api/allergies', methods=['GET'])
def get_allergies():
    return get_all_allergies()

# generate food based on calories and allergens
@app.route('/api/foods', methods=['GET'])
@token_required
def get_foods(current_user):
    calories = float(request.args.get('calories'))
    food_type = request.args.get('type')
    is_vegi = request.args.get('isVegi') == 'true'
    user_id = current_user['id']
    
    print('is_vegi:', is_vegi)
    return get_food_by_calories(calories, food_type, user_id, is_vegi)


if __name__ == '__main__':
    app.run(debug=True, port=8080)
