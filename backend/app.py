from flask import Flask
from flask_cors import CORS
from database.db import get_connection
from routes.ticket_routes import ticket_bp

app = Flask(__name__)
CORS(app)

# Register Routes
app.register_blueprint(ticket_bp)

@app.route("/")
def home():
    return "Enterprise Email Classification System API Running 🚀"

@app.route("/test-db")
def test_db():
    try:
        conn = get_connection()
        conn.close()
        return "✅ Database Connected Successfully!"
    except Exception as e:
        return f"❌ Database Connection Failed: {str(e)}"

if __name__ == "__main__":
    app.run(debug=True)