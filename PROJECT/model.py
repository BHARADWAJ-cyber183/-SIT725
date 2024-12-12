# model.py
import requests # type: ignore
from bs4 import BeautifulSoup # type: ignore

class ScannerModel:
    def __init__(self, url):
        self.url = url
        self.vulnerabilities = []

    def scan(self):
        try:
            response = requests.get(self.url)
            if response.status_code == 200:
                self.check_vulnerabilities(response.text)
            else:
                self.vulnerabilities.append('Error: Unable to connect to the URL')
        except Exception as e:
            self.vulnerabilities.append(f'Error: {str(e)}')

    def check_vulnerabilities(self, html_content):
        # Example vulnerability checks
        if 'password' in html_content:
            self.vulnerabilities.append('Possible sensitive data exposure (password found)')
        if 'csrf' not in html_content:
            self.vulnerabilities.append('Potential CSRF vulnerability (missing CSRF token)')

    def get_vulnerabilities(self):
        return self.vulnerabilities
