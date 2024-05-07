from flask import Blueprint, jsonify, request
from alpha_vantage.timeseries import TimeSeries
from alpha_vantage.fundamentaldata import FundamentalData
import os
import requests

stock_api = Blueprint('stock_api', __name__)


api_key = os.getenv('ALPHA_VANTAGE_API_KEY')
fd = FundamentalData(key=api_key, output_format='pandas')

def get_stock_overview(symbol):
    ts = TimeSeries(key=api_key, output_format='pandas')
    overview, _ = fd.get_company_overview(symbol=symbol)
    daily_data, _ = ts.get_daily(symbol=symbol, outputsize='compact')

    last_close = daily_data['4. close'].iloc[-1]
    daily_range = f"{daily_data['2. high'].iloc[-1]} - {daily_data['3. low'].iloc[-1]}"
    year_high = daily_data['2. high'].max()
    year_low = daily_data['3. low'].min()

    overview_data = {
        'name': overview['Name'].iloc[0],
        'previous_close': last_close,
        'day_range': daily_range,
        'year_range': f"{year_low} - {year_high}",
        'market_cap': overview['MarketCapitalization'].iloc[0],
        'avg_volume': daily_data['5. volume'].mean(),
        'pe_ratio': overview['PERatio'].iloc[0],
        'dividend_yield': overview['DividendYield'].iloc[0],
        'primary_exchange': overview['Exchange'].iloc[0]
    }

    return overview_data



@stock_api.route('/overview/<string:symbol>')
def stock_overview(symbol):
    try:
        data = get_stock_overview(symbol)
        return jsonify(data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
