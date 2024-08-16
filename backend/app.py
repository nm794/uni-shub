from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from bson import ObjectId
import re
from datetime import timedelta

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000", "supports_credentials": True}})

app.config["MONGO_URI"] = "mongodb://localhost:27017/studentfooddb"
mongo = PyMongo(app)
app.config['JWT_SECRET_KEY'] = 'your-secret-key'  
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)
jwt = JWTManager(app)

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    mobile_number = data.get('mobileNumber')

    if not name or not email or not password or not mobile_number:
        return jsonify({"error": "Missing required fields"}), 400

    if not re.match(r'^\d{10}$', mobile_number):
        return jsonify({"error": "Mobile number must be exactly 10 digits"}), 400

    existing_user = mongo.db.users.find_one({
        "$or": [
            {"name": name},
            {"email": email},
            {"mobile_number": mobile_number}
        ]
    })
    if existing_user:
        return jsonify({"error": "Name, email, or mobile number already exists"}), 400

    hashed_password = generate_password_hash(password)

    user_id = mongo.db.users.insert_one({
        "name": name,
        "email": email,
        "password": hashed_password,
        "mobile_number": mobile_number
    }).inserted_id

    return jsonify({"message": "User created successfully", "user_id": str(user_id)}), 201

@app.route('/api/signin', methods=['POST'])
def signin():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    user = mongo.db.users.find_one({"email": email})

    if user and check_password_hash(user['password'], password):
        token = create_access_token(identity=str(user['_id']))
        return jsonify({
            "access_token": token,
            "user_id": str(user['_id']),
            "email": user['email'],
            "name": user.get('name'),
            "mobile_number": user.get('mobile_number')
        }), 200
    else:
        return jsonify({"error": "Invalid email or password"}), 401

@app.route('/api/user', methods=['GET'])
@jwt_required()
def get_user_info():
    try:
        current_user_id = get_jwt_identity()
        user = mongo.db.users.find_one({"_id": ObjectId(current_user_id)})
        
        if user:
            return jsonify({
                "name": user['name'],
                "email": user['email'],
                "mobile_number": user['mobile_number']
            }), 200
        else:
            return jsonify({"error": "User not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/user/<string:user_id>', methods=['PATCH'])
@jwt_required()
def update_user_info(user_id):
    try:
        current_user_id = get_jwt_identity()
        if current_user_id != user_id:
            return jsonify({"error": "Unauthorized access"}), 401

        user = mongo.db.users.find_one({"_id": ObjectId(user_id)})
        if not user:
            return jsonify({"error": "User not found"}), 404

        data = request.json
        print("Received update data:", data)

        update_fields = {}
        for key in ['name', 'email', 'mobile_number']:
            if key in data:
                update_fields[key] = data[key]

        print("Fields to update:", update_fields)

        if update_fields:
            result = mongo.db.users.update_one({"_id": ObjectId(user_id)}, {"$set": update_fields})
            print("Update result:", result.modified_count)

            updated_user = mongo.db.users.find_one({"_id": ObjectId(user_id)})
            print("Updated user:", updated_user)

            return jsonify({
                "message": "User information updated successfully",
                "user": {
                    "name": updated_user['name'],
                    "email": updated_user['email'],
                    "mobile_number": updated_user['mobile_number']
                }
            }), 200
        else:
            return jsonify({"message": "No fields to update"}), 200
    except Exception as e:
        print(f"Error in update_user_info: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)