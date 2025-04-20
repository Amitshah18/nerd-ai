from fastapi.testclient import TestClient
from app.main import app  # Import your FastAPI app

client = TestClient(app)

# Test case for email format validation
def test_email_format_validation():
    # Ensure the email format is validated
    response = client.post("/login", json={"email": "invalidemail", "password": "validPass123"})
    assert response.status_code == 400
    assert "Invalid email format" in response.json()["detail"]

# Test case for password length validation
def test_password_length_validation():
    # Ensure the password is at least 6 characters long
    response = client.post("/login", json={"email": "valid@email.com", "password": "short"})
    assert response.status_code == 400
    assert "Password should be at least 6 characters" in response.json()["detail"]

# Test case for successful login redirect
def test_successful_login_redirect():
    # Test successful login redirects to dashboard
    response = client.post("/login", json={"email": "valid@email.com", "password": "validPass123"})
    assert response.status_code == 302  # Redirect status code
    assert response.headers["Location"] == "/dashboard"

# Test case for error message display
def test_login_error_message():
    # Test case where invalid login shows an error message
    response = client.post("/login", json={"email": "invalid@email.com", "password": "wrongPassword"})
    assert response.status_code == 401  # Unauthorized
    assert "Invalid login credentials" in response.json()["detail"]

# Test case for responsive design on mobile
def test_responsive_design():
    # Test that the login form is responsive on mobile devices
    response = client.get("/login", headers={"User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)"})
    assert response.status_code == 200
    assert "login form" in response.text  # Check if login form is displayed correctly
