from flask import Blueprint, jsonify, request
from app.models import db, News, MarketData
from datetime import datetime
import requests
import os

news_bp = Blueprint('news_bp', __name__)
api_key = os.getenv('NEWS_API_KEY')

def fetch_news_from_api(symbol):
    url = f"https://newsapi.org/v2/everything?q={symbol}&language=en&apiKey={api_key}"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json().get('articles', [])
    return []

@news_bp.route('/news/<string:symbol>', methods=['GET'])
def get_news(symbol):
    news_items = fetch_news_from_api(symbol)
    if not news_items:
        return jsonify({'error': 'No news found for the given symbol'}), 404

    news_list = []
    for item in news_items[:50]:
        news = {
            'title': item['title'],
            'publication_date': datetime.strptime(item['publishedAt'], '%Y-%m-%dT%H:%M:%SZ'),
            'description': item['description'],
            'url': item['url']
        }
        news_list.append(news)

    return jsonify(news_list), 200

@news_bp.route('/news/<string:symbol>/all', methods=['GET'])
def get_all_news(symbol):
    news_list = News.query.filter(News.description.like(f"%{symbol}%")).all()
    if not news_list:
        return jsonify({'error': 'No news found for the given symbol'}), 404

    return jsonify([news.to_dict() for news in news_list]), 200
