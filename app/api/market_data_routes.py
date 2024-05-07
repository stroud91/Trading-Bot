from flask import Blueprint, jsonify, request
from alpha_vantage.timeseries import TimeSeries
from alpha_vantage.fundamentaldata import FundamentalData
import os

market_data_bp = Blueprint('market_data_bp', __name__)

api_key = os.getenv('ALPHA_VANTAGE_API_KEY')
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
