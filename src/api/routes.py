from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Game, GameResult, Winner, Ticket
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from datetime import datetime, timedelta
import json

api = Blueprint('api', __name__)
CORS(api)

# Error handler
def handle_error(error_message, status_code):
    return jsonify({"error": error_message}), status_code

# Authentication routes
@api.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        email = data.get('email', '').lower().strip()
        password = data.get('password', '')

        if not email or not password:
            return handle_error("Email and password are required", 400)

        if User.query.filter_by(email=email).first():
            return handle_error("Email already exists", 400)

        new_user = User(email=email)
        new_user.set_password(password)

        db.session.add(new_user)
        db.session.commit()

        access_token = create_access_token(
            identity=str(new_user.id),
            expires_delta=timedelta(hours=24)
        )

        return jsonify({
            "message": "User created successfully",
            "access_token": access_token,
            "user": new_user.to_dict()
        }), 201

    except Exception as e:
        db.session.rollback()
        return handle_error(str(e), 500)

@api.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email', '').lower().strip()
        password = data.get('password', '')

        if not email or not password:
            return handle_error("Email and password are required", 400)

        user = User.query.filter_by(email=email).first()
        if not user or not user.check_password(password):
            return handle_error("Invalid email or password", 401)

        user.last_login = datetime.utcnow()
        db.session.commit()

        access_token = create_access_token(
            identity=str(user.id),
            expires_delta=timedelta(hours=24)
        )

        return jsonify({
            "message": "Login successful",
            "access_token": access_token,
            "user": user.to_dict()
        }), 200

    except Exception as e:
        return handle_error(str(e), 500)

@api.route('/user/profile', methods=['GET'])
@jwt_required()
def get_user_profile():
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user:
            return handle_error("User not found", 404)

        return jsonify(user.to_dict()), 200

    except Exception as e:
        return handle_error(str(e), 500)

@api.route('/games', methods=['GET'])
def get_games():
    try:
        games = Game.query.all()
        return jsonify({
            "games": [game.to_dict() for game in games],
            "total_games": len(games)
        }), 200

    except Exception as e:
        return handle_error(str(e), 500)

@api.route('/select_numbers', methods=['POST'])
@jwt_required()
def select_numbers():
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        
        if not data:
            return handle_error("No data provided", 400)
            
        game_type = data.get('game_type')
        numbers = data.get('numbers', [])
        total = data.get('total', 0)
        preference = data.get('preference', '')
        
        if not game_type:
            return handle_error("Game type is required", 400)
            
        # Get the corresponding game
        game = Game.query.filter_by(name=game_type).first()
        if not game:
            return handle_error("Invalid game type", 400)
            
        # Validate numbers
        if len(numbers) != 14:
            return handle_error("You must select exactly 14 numbers", 400)
            
        if any(not isinstance(n, int) for n in numbers):
            return handle_error("All numbers must be integers", 400)
            
        if any(n < 1 or n > 25 for n in numbers):
            return handle_error("Numbers must be between 1 and 25", 400)
            
        if len(set(numbers)) != len(numbers):
            return handle_error("Numbers must be unique", 400)
            
        # Create new ticket
        new_ticket = Ticket(
            user_id=user_id,
            game_id=game.id,
            total=total,
            status='pending'
        )
        
        # Set the selected numbers
        new_ticket.set_numbers(sorted(numbers))
        
        db.session.add(new_ticket)
        db.session.commit()
        
        return jsonify({
            "message": "Numbers selected successfully",
            "ticket": new_ticket.to_dict(),
            "ticket_id": new_ticket.id
        }), 201
        
    except ValueError as ve:
        return handle_error(str(ve), 400)
    except Exception as e:
        db.session.rollback()
        return handle_error(str(e), 500)

@api.route('/tickets/latest', methods=['GET'])
@jwt_required()
def get_latest_ticket():
    try:
        user_id = get_jwt_identity()
        
        # Get the most recent pending ticket
        ticket = Ticket.query.filter_by(
            user_id=user_id,
            status='pending'
        ).order_by(Ticket.created_at.desc()).first()
        
        if not ticket:
            return jsonify({
                "message": "No pending tickets found"
            }), 404
            
        return jsonify(ticket.to_dict()), 200
        
    except Exception as e:
        return handle_error(str(e), 500)

@api.route('/tickets/payment', methods=['POST'])
@jwt_required()
def process_ticket_payment():
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        
        if not data:
            return handle_error("No data provided", 400)
            
        ticket_id = data.get('ticket_id')
        payment_method = data.get('payment_method', 'credit_card')
        
        if not ticket_id:
            return handle_error("Ticket ID is required", 400)
            
        # Get the ticket and verify ownership
        ticket = Ticket.query.filter_by(
            id=ticket_id,
            user_id=user_id,
            status='pending'
        ).first()
        
        if not ticket:
            return handle_error("Ticket not found or already processed", 404)
            
        # Here you would integrate with your payment processor
        try:
            # Simulate payment processing
            payment_successful = True
            reference_id = f"PAY-{datetime.utcnow().strftime('%Y%m%d%H%M%S')}-{ticket_id}"
            
            if payment_successful:
                # Update ticket status and payment information
                ticket.status = 'paid'
                ticket.payment_method = payment_method
                ticket.reference_id = reference_id
                
                # Update game current players count
                game = Game.query.get(ticket.game_id)
                if game and game.current_players < game.max_players:
                    game.current_players += 1
                
                db.session.commit()
                
                return jsonify({
                    "message": "Payment processed successfully",
                    "ticket": ticket.to_dict(),
                    "reference_id": reference_id
                }), 200
            else:
                return handle_error("Payment processing failed", 400)
                
        except Exception as e:
            db.session.rollback()
            return handle_error(f"Payment processing error: {str(e)}", 500)
            
    except Exception as e:
        return handle_error(str(e), 500)

@api.route('/game_results/<int:game_id>', methods=['GET'])
def get_game_results(game_id):
    try:
        game = Game.query.get(game_id)
        if not game:
            return handle_error("Game not found", 404)

        results = GameResult.query.filter_by(game_id=game_id).order_by(GameResult.draw_date.desc()).first()
        if not results:
            return jsonify({"message": "No results available yet"}), 404

        return jsonify(results.to_dict()), 200

    except Exception as e:
        return handle_error(str(e), 500)

@api.route('/winners/<int:game_id>', methods=['GET'])
def get_winners(game_id):
    try:
        game = Game.query.get(game_id)
        if not game:
            return handle_error("Game not found", 404)

        winners = Winner.query.filter_by(game_id=game_id).all()
        return jsonify({
            "game": game.to_dict(),
            "winners": [winner.to_dict() for winner in winners],
            "total_winners": len(winners)
        }), 200

    except Exception as e:
        return handle_error(str(e), 500)

@api.route('/user/games', methods=['GET'])
@jwt_required()
def get_user_games():
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user:
            return handle_error("User not found", 404)

        wins = Winner.query.filter_by(user_id=user_id).all()
        return jsonify({
            "user": user.to_dict(),
            "wins": [win.to_dict() for win in wins],
            "total_wins": len(wins)
        }), 200

    except Exception as e:
        return handle_error(str(e), 500)

@api.route('/delete_user/<int:id>', methods=['DELETE'])
def delete_user(id):
    try:
        user = User.query.get(id)
        if not user:
            return handle_error("User not found", 404)

        if user.game_id:
            game = Game.query.get(user.game_id)
            if game and game.current_players > 0:
                game.current_players -= 1

        db.session.delete(user)
        db.session.commit()

        return jsonify({
            "message": f"User with email {user.email} deleted successfully"
        }), 200

    except Exception as e:
        db.session.rollback()
        return handle_error(str(e), 500)

@api.route('/')
def home():
    try:
        users = User.query.all()
        games = Game.query.all()
        
        return jsonify({
            "message": "server running",
            "users": [user.to_dict() for user in users],
            "games": [game.to_dict() for game in games],
            "total_users": len(users),
            "total_games": len(games)
        })

    except Exception as e:
        return handle_error(str(e), 500)