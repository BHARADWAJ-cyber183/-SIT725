# test_beautifulsoup.py
from bs4 import BeautifulSoup # type: ignore

# Sample HTML content to parse
html_doc = "<html><head><title>Test Page</title></head><body><h1>Hello World!</h1></body></html>"

# Create BeautifulSoup object with 'html.parser'
soup = BeautifulSoup(html_doc, 'html.parser')

# Extract title and h1 from the parsed HTML
print(f"Title: {soup.title.string}")  # Output: Test Page
print(f"H1: {soup.h1.string}")  # Output: Hello World!
