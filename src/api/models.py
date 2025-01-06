from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import json

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(180), nullable=False)
    selected_numbers = db.Column(db.String(50), nullable=True) 

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def set_numbers(self, numbers):
        if len(numbers) != 14 or any(n < 1 or n > 25 for n in numbers):
            raise ValueError("You must select exactly 14 numbers between 1 and 25.")
        self.selected_numbers = json.dumps(numbers)

    def get_numbers(self):
        return json.loads(self.selected_numbers) if self.selected_numbers else []
