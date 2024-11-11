from flask import Flask
from routes import book_routes, order_routes

app = Flask(__name__)

# Register the blueprints for better modular routing
app.register_blueprint(book_routes)
app.register_blueprint(order_routes)

if __name__ == '__main__':
    app.run(debug=True)
