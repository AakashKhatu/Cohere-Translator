from flask import Flask, render_template, request, jsonify
import cohere

co = cohere.Client(api_key=open(".api_key").readline())
app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/translate", methods=["POST"])
def translate():
    data = request.get_json()
    english_text = data.get("text", "")
    response = co.chat(
        preamble="You are Alex an English to French translator, given a sentence in English you have to translate it to French making sure you remove any profanities in the output. Just reply with the French output without being conversational.",
        message=english_text.lower(),
        connectors=[{"id": "web-search"}],
    )
    return jsonify({"translation": response.text})


if __name__ == "__main__":
    app.run(debug=True)
