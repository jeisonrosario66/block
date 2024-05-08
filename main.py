# -*- coding: utf-8 -*-
from flask import Flask
from flask import jsonify
from flask import render_template
from flask import request

# Flask app instantiation
app = Flask(__name__)
# --------------------------------- Error Handling --------------------------------------------
# It will
# ---------------------------------------------------------------------------------------------


# --------------------------------- Interface Handler -----------------------------------------
@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")


@app.route("/api/compare2word/<wordA>-<wordB>", methods=["GET", "POST"])
def compare2word(wordA, wordB):
    if request.method == "GET":
        wordA = wordA.strip().lower()
        wordB = wordB.strip().lower()

        return render_template("api_expose/compare2word.html", wordA=wordA, wordB=wordB)
    elif request.method == "POST":
        response_got = request.get_json()
        response_got = response_got["dataRhyme"]

        response_got2 = {
            "Rhyme": response_got[0],
            "Word1": response_got[1],
            "Word2": response_got[2],
            "Syllables": response_got[3],
        }
        return jsonify({"Response": response_got2})


# ---------------------------------------------------------------------------------------------


# --------------------------------- Test Area -------------------------------------------------
@app.route("/test", methods=["GET"])
def test():
    print("test ok python!")
    return "test ok!"


# ---------------------------------------------------------------------------------------------

if __name__ == "__main__":
    # Allows external connection in development
    app.run(host="0.0.0.0")
