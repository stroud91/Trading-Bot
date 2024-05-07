from flask import Blueprint, jsonify, request
from app.models import db, News, MarketData
from datetime import datetime
import requests

news_bp = Blueprint('news_bp', __name__)

def fetch_news_from_api(symbol):
    """Fetch news for a given symbol from an external news API."""
    api_key = 'your_news_api_key'
    url = f"https://example-news-api.com/api/news?symbol={symbol}&apikey={api_key}"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()['articles']
    else:
        return []

@news_bp.route('/market_data/<int:market_data_id>/news', methods=['GET', 'POST'])
def fetch_news(market_data_id):
    market_data = MarketData.query.get(market_data_id)
    if not market_data:
        return jsonify({'error': 'Market data not found'}), 404

    news_items = fetch_news_from_api(market_data.symbol)
    for item in news_items:
        news = News(
            title=item['title'],
            publication_date=datetime.strptime(item['publishedAt'], '%Y-%m-%dT%H:%M:%SZ'),
            description=item['description'],
            url=item['url'],
            market_data_id=market_data.id
        )
        db.session.add(news)
    db.session.commit()

    return jsonify({'message': 'News fetched and stored successfully'}), 200


@news_bp.route('/market_data/<int:data_id>/all_news', methods=['GET'])
def get_all_news(data_id):
    news_list = News.query.filter_by(market_data_id=data_id).all()
    return jsonify([news.to_dict() for news in news_list]), 200
