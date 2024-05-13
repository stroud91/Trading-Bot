import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    ALPHA_VANTAGE_API_KEY = os.environ.get('ALPHA_VANTAGE_API_KEY')
    NEWS_API_KEY = os.environ.get('NEWS_API_KEY')

    SQLALCHEMY_TRACK_MODIFICATIONS = False
    database_url = os.environ.get('DATABASE_URL')

    if not database_url:
        raise ValueError("No DATABASE_URL set for Flask application")

    SQLALCHEMY_DATABASE_URI = database_url.replace('postgres://', 'postgresql://')
    SQLALCHEMY_ECHO = True
