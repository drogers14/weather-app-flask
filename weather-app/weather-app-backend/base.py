from flask import Flask
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv
import urllib.request, json

load_dotenv()

api = Flask(__name__)
CORS(api)
@api.route('/profile')
def my_profile():
    response_body = {
        "name": "Destiny",
        "about" :"Hello! I'm a full stack developer that loves python and javascript",
        "key": os.environ.get("API_KEY"),
    }

    return response_body

@api.route('/weather/<string:name>')# , methods=['GET']
def get_weather_data(name: str):
    url = 'http://api.weatherapi.com/v1/forecast.json?key={key}&q={name}&days=4&aqi=no&alerts=no'.format(key=os.environ.get("WEATHER_API_KEY"), name=name)
    url = url.replace(" ", "%20")
    response = urllib.request.urlopen(url)
    data = response.read()
    dict = json.loads(data)
    # print(dict)
    return dict
    # response_body = {
    #     "key": os.environ.get("API_KEY")
    # }
    