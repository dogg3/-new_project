from flask import Flask



##App factory
def create_app(test_config=None):
    #Create app and configure the app
    app = Flask(__name__, instance_relative_config=True)

    app.debug = True
    # app.config.form.mapping(
    #     SECRET_KEY='dev',
    #     DATABASE=os.path.join(app.instance_path, 'flask')
    # )

    #register with the application


    #Blueprint registre
    from . import startBluePrint
    app.register_blueprint(startBluePrint.bp)
    app.add_url_rule('/', endpoint='index')




    return app

