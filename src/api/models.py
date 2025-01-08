from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import json
from datetime import datetime

db = SQLAlchemy()

class Game(db.Model):
    __tablename__ = "games"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    draw_date = db.Column(db.DateTime, nullable=False)
    prize_amount = db.Column(db.Float, nullable=False)
    max_players = db.Column(db.Integer, nullable=False)
    current_players = db.Column(db.Integer, default=0)

    def __repr__(self):
        return f'<Game {self.name}>'

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'draw_date': self.draw_date.isoformat(),
            'prize_amount': self.prize_amount,
            'max_players': self.max_players,
            'current_players': self.current_players
        }

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(180), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    last_login = db.Column(db.DateTime, nullable=True)

    def __repr__(self):
        return f'<User {self.email}>'

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    
    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'last_login': self.last_login.isoformat() if self.last_login else None
        }

class GameResult(db.Model):
    __tablename__ = "game_results"
    id = db.Column(db.Integer, primary_key=True)
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'), nullable=False)
    winning_numbers = db.Column(db.String(50), nullable=False)
    draw_date = db.Column(db.DateTime, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def set_winning_numbers(self, numbers):
        """Set the winning numbers for the game"""
        if not isinstance(numbers, list):
            raise ValueError("Numbers must be provided as a list")
        
        if len(numbers) != 14:
            raise ValueError("There must be exactly 14 winning numbers")
            
        if any(not isinstance(n, int) for n in numbers):
            raise ValueError("All numbers must be integers")
            
        if any(n < 1 or n > 25 for n in numbers):
            raise ValueError("All numbers must be between 1 and 25")
            
        if len(set(numbers)) != len(numbers):
            raise ValueError("Numbers must be unique")
            
        self.winning_numbers = json.dumps(sorted(numbers))

    def get_winning_numbers(self):
        """Get the winning numbers"""
        return json.loads(self.winning_numbers) if self.winning_numbers else []

    def to_dict(self):
        return {
            'id': self.id,
            'game_id': self.game_id,
            'winning_numbers': self.get_winning_numbers(),
            'draw_date': self.draw_date.isoformat(),
            'created_at': self.created_at.isoformat()
        }

class Winner(db.Model):
    __tablename__ = "winners"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'), nullable=False)
    prize_amount = db.Column(db.Float, nullable=False)
    matched_numbers = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)

    # Relationships
    user = db.relationship('User', backref='wins', lazy=True)
    game = db.relationship('Game', backref='winners', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'game_id': self.game_id,
            'prize_amount': self.prize_amount,
            'matched_numbers': self.matched_numbers,
            'created_at': self.created_at.isoformat(),
            'user_email': self.user.email,
            'game_name': self.game.name
        }
    
class Ticket(db.Model):
    __tablename__="tickets"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'), nullable=False)
    selected_numbers = db.Column(db.String(250), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.now)
    preference = db.Column(db.String(120), default="")
    reference_id = db.Column(db.String(120), default="")
    payment_method = db.Column(db.String(120), default="")
    total = db.Column(db.Float(), default=0)
    status = db.Column(db.String(100), default="pending")
    

     # Relationships
    user = db.relationship('User', backref='ticket', lazy=True)
    game = db.relationship('Game', backref='ticket', lazy=True)

    def set_numbers(self, numbers):
        """Set the selected numbers for the user"""
        if not isinstance(numbers, list):
            raise ValueError("Numbers must be provided as a list")
        
        if len(numbers) != 14:
            raise ValueError("You must select exactly 14 numbers")
        
        if any(not isinstance(n, int) for n in numbers):
            raise ValueError("All numbers must be integers")
            
        if any(n < 1 or n > 25 for n in numbers):
            raise ValueError("All numbers must be between 1 and 25")
            
        if len(set(numbers)) != len(numbers):
            raise ValueError("Numbers must be unique")
            
        self.selected_numbers = json.dumps(sorted(numbers))

    def get_numbers(self):
        """Get the user's selected numbers"""
        return json.loads(self.selected_numbers) if self.selected_numbers else []

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'game_id': self.game_id,
            'selected_numbers': self.get_numbers(),
            'created_at': self.created_at.isoformat(),
            'user_email': self.user.email,
            'game_name': self.game.name
        }
