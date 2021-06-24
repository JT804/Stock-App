from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import yfinance as yf
import requests
import json



 
def searchv2(name):
 url = "https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete"
 
 headers = {
 'x-rapidapi-key': "9d08f6b330msh51cab31f58e4823p1886e8jsn75d64a6c92bd",
 'x-rapidapi-host': "apidojo-yahoo-finance-v1.p.rapidapi.com"
 }
 querystring = {"q": name, "region": "US"}
 response = requests.request("GET", url, headers=headers, params=querystring)
 return (jsonify(response.json()['quotes']))
 
def details(stocklist):
 url = "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes"
 
 headers = {
 'x-rapidapi-key': "9d08f6b330msh51cab31f58e4823p1886e8jsn75d64a6c92bd",
 'x-rapidapi-host': "apidojo-yahoo-finance-v1.p.rapidapi.com"
 }
 querystring = {"region":"US","symbols":stocklist}
 response = requests.request("GET", url, headers=headers, params=querystring)
 return(jsonify((response.json()['quoteResponse']['result'])))


 
app = Flask(__name__)
 
CORS(app)
 
@app.route('/')
def home():
 return "HELLO this is homepage"
 
# URL/<ANY TICKER> will give you the info for any onw stock you want 
 
@app.route('/<name>')
def detail(name):
 return(details(name))
 
# URL/search/<TICKER> will give all stocks similar to your input search 
@app.route('/search/<filter>')
def search(filter):
 return(searchv2(filter))
 
if __name__ == "__main__":
 app.run(host="0.0.0.0")
 app.run(debug=True)
