# -*- coding: utf-8 -*-
from flask import Flask
from flask import jsonify
from flask import render_template
from flask import request

from src.errors_handling.msg_exception import msg_exception

# Flask app instantiation
app = Flask(__name__)
urlCompare2Word = "/api/compare2word/<wordA>-<wordB>"


# --------------------------------- Error Handling --------------------------------------------
# It will
@app.errorhandler(404)
def handle_not_found(e):
    url = request.url
    urlRedirec = urlCompare2Word
    urlRedirec = urlRedirec.replace("<", "")
    urlRedirec = urlRedirec.replace(">", "")
    error404 = {"Error 404": f"{msg_exception(handle_not_found,e)}"}, 404
    print(error404)
    return render_template(
        "error_handling/not_found.html", url=url, urlRedirec=urlRedirec
    )


# ---------------------------------------------------------------------------------------------


# --------------------------------- Interface Handler -----------------------------------------
"""
@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")
"""


@app.route(urlCompare2Word, methods=["GET", "POST"])
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


@app.route("/favicon.ico")
def favicon():
    return app.send_static_file("favicon.ico")


# ---------------------------------------------------------------------------------------------


# --------------------------------- Test Area -------------------------------------------------
"""
@app.route("/test", methods=["GET"])
def test():
    print("test ok python!")
    return "test ok!"

"""

# ---------------------------------------------------------------------------------------------

if __name__ == "__main__":
    # Allows external connection in development
    app.run(host="0.0.0.0")
