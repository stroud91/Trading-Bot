from flask import Blueprint, jsonify, request
from alpha_vantage.timeseries import TimeSeries
import requests
import os


market_data_bp = Blueprint('market_data_bp', __name__)

alpha_vantage_api_key = os.getenv('ALPHA_VANTAGE_API_KEY')
finnhub_api_key = os.getenv('FINNHUB_API_KEY')
finnhub_secret = os.getenv('FINNHUB_SECRET')
if not alpha_vantage_api_key:
    raise ValueError("Missing Alpha Vantage API Key")
if not finnhub_api_key:
    raise ValueError("Missing Finnhub API Key")
if not finnhub_secret:
    raise ValueError("Missing Finnhub Secret")

ts = TimeSeries(key=alpha_vantage_api_key, output_format='pandas')


# Function to make requests to Finnhub API
def get_finnhub_data(endpoint, params):
    url = f"https://finnhub.io/api/v1/{endpoint}"
    headers = {
        'X-Finnhub-Token': finnhub_api_key,
        'X-Finnhub-Secret': finnhub_secret
    }
    response = requests.get(url, headers=headers, params=params)
    return response.json()

@market_data_bp.route('/market_data/real_time/<string:symbol>', methods=['GET'])
def get_real_time_data(symbol):
    endpoint = "quote"
    params = {"symbol": symbol}
    data = get_finnhub_data(endpoint, params)
    if "error" in data:
        return jsonify(data), 400
    return jsonify(data), 200

@market_data_bp.route('/market_data/historical/<string:symbol>', methods=['GET'])
def get_historical_data(symbol):
    endpoint = "stock/candle"
    params = {
        "symbol": symbol,
        "resolution": "D",
        "from": int((datetime.now() - timedelta(days=365)).timestamp()),
        "to": int(datetime.now().timestamp())
    }
    data = get_finnhub_data(endpoint, params)
    if "error" in data:
        return jsonify(data), 400
    return jsonify(data), 200

@market_data_bp.route('/market_data/overview/<string:symbol>', methods=['GET'])
def get_stock_overview(symbol):
    endpoint = "stock/profile2"
    params = {"symbol": symbol}
    data = get_finnhub_data(endpoint, params)
    if "error" in data:
        return jsonify(data), 400
    return jsonify(data), 200

@market_data_bp.route('/stocks/top', methods=['GET'])
def get_top_stocks():
    symbols = ['AAPL', 'MSFT', 'GOOGL', 'FB', 'AMZN', 'NFLX', 'INTC']
    top_stocks = []

    for symbol in symbols:
        endpoint = "quote"
        params = {"symbol": symbol}
        data = get_finnhub_data(endpoint, params)
        if "error" in data:
            continue
        data['symbol'] = symbol
        top_stocks.append(data)

    if not top_stocks:
        return jsonify({"error": "No valid stock data retrieved"}), 400

    return jsonify(top_stocks[:50]), 200

@market_data_bp.route('/graph/historical/<string:symbol>', methods=['GET'])
def get_historical_graph_data(symbol):
    try:
        time_frame = request.args.get('timeFrame', '1m')
        function = 'TIME_SERIES_DAILY'
        if time_frame == '1d':
            function = 'TIME_SERIES_INTRADAY&interval=1min'
        elif time_frame == '1w':
            function = 'TIME_SERIES_INTRADAY&interval=60min'
        elif time_frame == '1m':
            function = 'TIME_SERIES_DAILY'
        elif time_frame == '1y':
            function = 'TIME_SERIES_MONTHLY'

        url = f"https://www.alphavantage.co/query?function={function}&symbol={symbol}&apikey={api_key}"

        response = requests.get(url)
        data = response.json()

        if "Error Message" in data:
            return jsonify({'error': data["Error Message"]}), 400
        if "Note" in data:
            return jsonify({'error': data["Note"]}), 400

        if "Time Series (Daily)" in data:
            time_series = data["Time Series (Daily)"]
        elif "Time Series (60min)" in data:
            time_series = data["Time Series (60min)"]
        elif "Time Series (1min)" in data:
            time_series = data["Time Series (1min)"]
        elif "Monthly Time Series" in data:
            time_series = data["Monthly Time Series"]
        else:
            return jsonify({'error': 'No time series data found'}), 400

        graph_data = [
            {
                'Date': date,
                'Close Price': float(values['4. close']),
                'High Price': float(values['2. high']),
                'Low Price': float(values['3. low'])
            }
            for date, values in time_series.items()
        ]

        graph_data.sort(key=lambda x: x['Date'])

        return jsonify(graph_data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
