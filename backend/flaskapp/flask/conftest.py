import os

import pytest
import app



# The client fixture calls app.test_client() with the application lear
#object created by the app fixture.
# Tests will use the client to make requests to the application without running the server.

from app import create_app

@pytest.fixture
def app():
    app = create_app()
    return app
# can also call the cliock commands


@pytest.fixture
def runner(app):
    return app.test_cli_runner()