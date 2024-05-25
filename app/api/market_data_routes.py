from flask import Blueprint, jsonify, request
from alpha_vantage.timeseries import TimeSeries
from alpha_vantage.fundamentaldata import FundamentalData
import requests
import os


market_data_bp = Blueprint('market_data_bp', __name__)

api_key = os.getenv('ALPHA_VANTAGE_API_KEY')
if not api_key:
    raise ValueError("Missing Alpha Vantage API Key")
ts = TimeSeries(key=api_key, output_format='pandas')


@market_data_bp.route('/market_data/real_time/<string:symbol>', methods=['GET'])
def get_real_time_data(symbol):
    data, meta_data = ts.get_intraday(symbol=symbol, interval='1min', outputsize='compact')
    return jsonify(data.to_dict('records')), 200


@market_data_bp.route('/market_data/historical/<string:symbol>', methods=['GET'])
def get_historical_data(symbol):
    data, meta_data = ts.get_daily(symbol=symbol, outputsize='full')
    return jsonify(data.to_dict('records')), 200


@market_data_bp.route('/market_data/overview/<string:symbol>', methods=['GET'])
def get_stock_overview(symbol):
    fd = FundamentalData(key=api_key, output_format='pandas')
    overview, _ = fd.get_company_overview(symbol=symbol)
    return jsonify(overview.to_dict('records')[0]), 200



@market_data_bp.route('/stocks/top', methods=['GET'])
def get_top_stocks():
    symbols = ['AAPL', 'MSFT', 'GOOGL', 'FB', 'AMZN', 'NFLX', 'INTC',
               'AMD', 'NVDA', 'ORCL', 'JPM', 'BAC', 'WFC', 'C', 'GS', 'JNJ',
               'PFE', 'MRK', 'GILD', 'AMGN', 'PG', 'KO', 'PEP', 'NKE', 'TSLA',
               'XOM', 'CVX', 'BP', 'COP', 'SLB', 'GE', 'MMM', 'BA', 'HON', 'CAT',
               'T', 'VZ', 'TMUS', 'NOK', 'ERIC', 'DUK', 'NEE', 'D', 'SO', 'EXC',
               'AMT', 'PLD', 'SPG', 'WY', 'VTR']

    top_stocks = []
    for symbol in symbols:
        try:
            data, meta_data = ts.get_intraday(symbol=symbol, interval='1min', outputsize='compact')
            if data.empty:
                continue
            last_entry = data.iloc[-1].to_dict()
            last_entry['symbol'] = symbol
            top_stocks.append(last_entry)
        except ValueError as e:
            print(f"Error retrieving data for {symbol}: {e}")
            continue

    if not top_stocks:
        return jsonify({"error": "No valid stock data retrieved"}), 400

    return jsonify(top_stocks[:50]), 200


@market_data_bp.route('/graph/historical/<string:symbol>', methods=['GET'])
def get_historical_graph_data(symbol):
    try:

        url = f"https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol={symbol}&outputsize=full&apikey={api_key}"

        response = requests.get(url)
        data = response.json()

        if "Error Message" in data:
            return jsonify({'error': data["Error Message"]}), 400
        if "Note" in data:
            return jsonify({'error': data["Note"]}), 400


        time_series = data.get("Time Series (Daily)")
        if not time_series:
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
