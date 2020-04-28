from app import app

from flask import render_template

from pymongo import MongoClient






# players = db.collection(u'players').stream()
#
# for doc in players:
#     print(u'{} => {}'.format(doc.id, doc.to_dict()))


@app.route("/")
def index():
    # app.logger.info()

    # Use os.getenv("key") to get environment variables
    return  render_template('start.html')

@app.route("/webCrawling")
def webCrawling():
    return render_template('dashboard.html')




@app.route("/AI")
def MachineLeaning():
    return "web crawling"

    # Use os.getenv("key") to get environment variables
    return  "aasdasd"



