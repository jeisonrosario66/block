# -*- coding: utf-8 -*-
from flask import Flask
from flask import render_template

# Flask app instantiation
app = Flask(__name__)
# --------------------------------- Error Handling --------------------------------------------
# It will
# ---------------------------------------------------------------------------------------------


# --------------------------------- Interface Handler -----------------------------------------
@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")


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
