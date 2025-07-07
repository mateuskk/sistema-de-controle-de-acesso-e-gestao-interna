import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'wayne-secret')
    SQLALCHEMY_DATABASE_URI = 'sqlite:///wayne.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'wayne-jwt-secret')