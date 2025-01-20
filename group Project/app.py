from flask import Flask, request, jsonify
import requests
from bs4 import BeautifulSoup
import re

app = Flask(__name__)

def scan_xss(url):
    payload = "<script>alert('XSS')</script>"
    try:
        response = requests.get(url + payload)
        if payload in response.text:
            return True
        return False
    except requests.RequestException:
        return False

def scan_sql_injection(url):
    payload = "' OR '1'='1"
    try:
        response = requests.get(url, params={'input': payload})
        if re.search(r"sql|syntax|database", response.text, re.IGNORECASE):
            return True
        return False
    except requests.RequestException:
        return False

@app.route('/scan', methods=['POST'])
def scan_website():
    data = request.json
    url = data.get('url')
    if not url:
        return jsonify({'error': 'URL is required'}), 400

    results = {
        'xss': scan_xss(url),
        'sql_injection': scan_sql_injection(url),
    }
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)