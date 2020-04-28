from .db import db



class Movie(db.Document):
    name = db.StringField(required=True, unique=True)