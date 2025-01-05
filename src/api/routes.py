"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# Ruta para comprobar si el servidor está funcionando y mostrar los usuarios
@api.route('/')
def home():
    users = User.query.all()  # Obtener todos los usuarios de la base de datos
    users_data = [{"id": user.id, "email": user.email} for user in users]  # Excluir password_hash
    return jsonify({
        "message": "server running",
        "users": users_data
    })

# Ruta para crear un nuevo usuario
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

    return jsonify({"message": "User created successfully"}), 201

# Ruta para iniciar sesion
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

    return jsonify({"message": "Login successful"}), 200

# Ruta para eliminar un usuario
@api.route('/delete_user/<int:id>', methods=['DELETE'])
def delete_user(id):
    # Buscar el usuario por su ID
    user = User.query.get(id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    # Eliminar el usuario de la base de datos
    db.session.delete(user)
    db.session.commit()

    return jsonify({"message": f"User with email {user.email} deleted successfully"}), 200







