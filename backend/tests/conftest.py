from app import create_app
from config import Config
import pytest

@pytest.fixture(scope = 'module')
def test_client():
    flask_app = create_app(Config)
    # Create a test client using the Flask application configured for testing
    with flask_app.test_client() as testing_client:
        # Establish an application context
        with flask_app.app_context():
            yield testing_client 