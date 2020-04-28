from flask_mongoengine import MongoEngine

db = MongoEngine()


def initlize_db(app):
    db.init_app(app)