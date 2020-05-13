from flask import Flask

from flask_restful import Api
from .API.routes import initialize_routes






##App factory
def create_app(test_config=None):
    #Create app and configure the app
    app = Flask(__name__, instance_relative_config=True)

      ##START PAGES
    # #Blueprint registre
    from . import startBluePrint
    app.register_blueprint(startBluePrint.bp)
    app.add_url_rule('/', endpoint='index')


    ####APIS
    api = Api(app)
    initialize_routes(api)


    return app

