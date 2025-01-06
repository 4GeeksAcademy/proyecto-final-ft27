"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)
CORS(api)

@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    user = User.query.filter_by(email=email).first()

    if not user or not user.check_password(password):
        return jsonify({"error": "Invalid email or password"}), 401

    access_token = create_access_token(identity=str(user.id))

    return jsonify({
        "message": "Login successful",
        "access_token": access_token
    }), 200

@api.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already exists"}), 400

    new_user = User(email=email)
    new_user.set_password(password)

    db.session.add(new_user)
    db.session.commit()

    access_token = create_access_token(identity=str(new_user.id))

    return jsonify({
        "message": "User created successfully",
        "access_token": access_token
    }), 201

@api.route('/select_numbers', methods=['POST'])
@jwt_required()
def select_numbers():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    if user.selected_numbers:
        return jsonify({"error": "Numbers have already been selected."}), 400

    data = request.get_json()
    numbers = data.get('numbers', [])

    if len(numbers) != 14 or any(n < 1 or n > 25 for n in numbers):
        return jsonify({"error": "You must select exactly 14 numbers between 1 and 25."}), 400

    user.set_numbers(numbers)
    db.session.commit()

    return jsonify({
        "message": "Numbers selected successfully",
        "numbers": user.get_numbers()
    }), 200

@api.route('/')
def home():
    users = User.query.all()
    users_data = [{"id": user.id, "email": user.email, "numbers": user.get_numbers()} for user in users]
    return jsonify({
        "message": "server running",
        "users": users_data
    })

@api.route('/delete_user/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get(id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    db.session.delete(user)
    db.session.commit()
    return jsonify({
        "message": f"User with email {user.email} deleted successfully"
    }), 200



