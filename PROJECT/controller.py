# controller.py
from flask import Flask, render_template, request # type: ignore
from model import ScannerModel

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def home():
    vulnerabilities = []
    if request.method == "POST":
        url = request.form["url"]
        scanner = ScannerModel(url)
        scanner.scan()
        vulnerabilities = scanner.get_vulnerabilities()
    return render_template("index.html", vulnerabilities=vulnerabilities)

if __name__ == "__main__":
    app.run(debug=True)
