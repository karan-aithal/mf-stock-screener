from math import e
from os import PathLike
from queue import Empty
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from matplotlib.pylab import flag
from mftool import Mftool 
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
from datetime import datetime
from typing import Union, Any
#import yfinance as yf

# app = Flask(__name__)
app = Flask(__name__, static_folder='/frontend/public/index.html', static_url_path='')

CORS(app)
#mf = Mftool()

# Replace with your actual Kite API key and secret
# API_KEY = 'your_api_key'
# API_SECRET = 'your_api_secret'
# ACCESS_TOKEN = 'your_access_token'

# Function to fetch mutual fund data
# def fetch_mutual_fund_data(fund_code):
#     headers = {
#         'Authorization': f'token {ACCESS_TOKEN}',
#     }
#     url = f'https://api.kite.trade/mutual_funds/{fund_code}'
#     response = requests.get(url, headers=headers)
#     return response.json()


# Calculate 3Y Avg Annual Rolling Return
# def calculate_3y_rolling_avg_return(data):
#     df = pd.DataFrame(data)
#     df['date'] = pd.to_datetime(df['date'])
#     df.set_index('date', inplace=True)
#     df.sort_index(inplace=True)
    
#     # Calculate rolling returns
#     df['rolling_return'] = df['price'].pct_change(periods=365*3) # Approx. 3 years
    
#     # Calculate average annual return
#     avg_rolling_return = df['rolling_return'].mean() * 100 # in percentage
#     return avg_rolling_return

def get_historical_nav(fund_code: str) :#-> pd.DataFrame or pd.DataFrame.empty:
    mf = Mftool()
    
    history: Union[str, pd.DataFrame, dict[Any, Any], None] = mf.get_scheme_historical_nav(fund_code)
    # if not history or 'data' not in history:
    #     return pd.DataFrame()
    
    # # Handle different return types
    if isinstance(history, dict) and 'data' in history and history['data']:
        data = history['data']
        nav_data = [{'Date': datetime.strptime(record['date'], '%d-%m-%Y'), 'Close': float(record['nav'])} for record in data]
        return pd.DataFrame(nav_data)
    else:
        # Return an empty DataFrame for consistency
        return pd.DataFrame()

def calculate_3y_rolling_avg_return(nav_data) -> float:
    df = pd.DataFrame(nav_data)
    # Ensure DataFrame is sorted by date
    if 'Date' in df.columns:
        df['Date'] = pd.to_datetime(df['Date'], errors='coerce')  # Convert to datetime
        df = df.sort_values(by='Date')  # Sort by date index
        df.set_index('Date', inplace=True)  # Set 'Date' as index
    
    if 'Close' in df.columns:
        df['Close'] = pd.to_numeric(df['Close'], errors='coerce')  # Convert to numeric

    df = df.dropna()

    # Calculate 3-year rolling returns (assuming daily data, 750 trading days)
    # rolling_window_days = 750

   # Calculate rolling returns
    df['rolling_return'] = df['Close'].pct_change(periods=365*3).dropna() # Approx. 3 years
    
    # Calculate average annual return
    avg_rolling_return = df['rolling_return'].mean() * 100 # in percentage
    return avg_rolling_return

    # df['rolling_return'] = df['Close'].pct_change(rolling_window_days).dropna()
    
    # df['rolling_return'] = []
    # for i in range(len(df) - 3 * 365):
    #     past_3_years = prices.iloc[i:i + 3 * 365]
    #     if len(past_3_years) == 3 * 365:
    #         start_price = past_3_years.iloc[0]['close']
    #         end_price = past_3_years.iloc[-1]['close']
    #         annual_return = ((end_price / start_price) ** (1 / 3)) - 1
    #         rolling_returns.append(annual_return)
    # # Calculate the average of the rolling returns
    # avg_rolling_return = df['rolling_return'].mean()
    
    # return avg_rolling_return * 100  # Return as percentage


# # Calculate daily returns
#     df['Return'] = df['Price'].pct_change()

# # Calculate the cumulative returns
#     df['Cumulative_Return'] = (1 + df['Return']).cumprod()


# # Define the rolling window in days (approximately 3 years)
#     rolling_window_days = 3 * 365

# # Calculate rolling cumulative return
#     df['Rolling_Cumulative_Return'] = df['Cumulative_Return'].rolling(window=rolling_window_days).apply(lambda x: x[-1])

# # Calculate the annualized return
#     df['Rolling_Annualized_Return'] = df['Rolling_Cumulative_Return'].apply(lambda x: annualized_return(x, 3))

# # Calculate the 3-year average annual rolling return
#     average_annual_rolling_return = df['Rolling_Annualized_Return'].mean()

#     return average_annual_rolling_return * 100  # Return as percentage


# Create a function to compute annualized return

@app.route('/')
def serve():
    if app.static_folder is None:
     return jsonify({'error': 'Invalid request'}), 400
    else:
     return send_from_directory(app.static_folder, 'index.html')



@app.route('/calculate', methods=['POST'])
def calculate():
    try: 
        mf = Mftool()
        
        data = request.get_json()
        app.logger.info(f"Received request data: {data}")
        if not data or 'fund_code' not in data:
            return jsonify({'error': 'Invalid request'}), 400

        fund_code = data['fund_code']

        scheme_info = mf.get_scheme_details(fund_code)
        if not isinstance(scheme_info, dict):
            return jsonify({'error': 'Invalid fund code'}), 404

        fund_name = scheme_info.get('scheme_name')

        #Get historical data
        nav_data = get_historical_nav(fund_code)
        if nav_data.empty:
            return jsonify({'error': 'No historical data found for this fund code'}), 404

        #app.logger.info(f"Historical NAV data: {nav_data}")
        avg_rolling_return = calculate_3y_rolling_avg_return(nav_data)
        app.logger.info(f"Calculated 3Y Rolling Avg Return: {avg_rolling_return}")
        return jsonify({'fund_name': fund_name, 'avg_rolling_return': avg_rolling_return})
    
    except Exception as e:
        app.logger.error(f"Error occurred: {str(e)}")
        return jsonify({'error': str(e)}), 500



# @app.route('/<path:path>')
# def serve_static(path):
#     return send_from_directory(app.static_folder, path)

# @app.route('/calculate', methods=['POST'])
# def calculate():
#     fund_code = request.json['fund_code']
#     nav_data = get_historical_nav(fund_code)
#     avg_rolling_return = calculate_3y_rolling_avg_return(nav_data)
#     return jsonify({'avg_rolling_return': avg_rolling_return})


# def calculate():
#     try:
#         data = request.get_json()
#         app.logger.info(f"Received request data: {data}")
#         if not data or 'fund_code' not in data:
#             return jsonify({'error': 'Invalid request'}), 400

#         fund_code = data['fund_code']
#         nav_data = get_historical_nav(fund_code)
#         app.logger.info(f"Historical NAV data: {nav_data}")
#         avg_rolling_return = calculate_3y_rolling_avg_return(nav_data)
#         app.logger.info(f"Calculated 3Y Rolling Avg Return: {avg_rolling_return}")
#         return jsonify({'avg_rolling_return': avg_rolling_return})
#     except Exception as e:
#         app.logger.error(f"Error occurred: {str(e)}")
#         return jsonify({'error': str(e)}), 500




# @app.route('/api/rolling-return', methods=['GET'])
# def rolling_return():
#     fund_code = request.args.get('fund_code')
#     data = get_historical_nav(fund_code)
#     annual_return = calculate_rolling_return(data['prices'])
#     return jsonify({'average_annual_return': annual_return})



if __name__ == '__main__':
    app.run(debug=True)
