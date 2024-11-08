from flask import Flask, jsonify
import sqlite3
import os

app = Flask(__name__)
DATABASE = 'bookshop.db'

# SQL schema as a string
SCHEMA = """
CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    price REAL CHECK (price >= 0)
);

-- Insert some initial data if not already present
INSERT INTO books (title, author, price)
SELECT 'The Great Gatsby', 'F. Scott Fitzgerald', 10.99
WHERE NOT EXISTS (SELECT 1 FROM books WHERE title = 'The Great Gatsby');

INSERT INTO books (title, author, price)
SELECT '1984', 'George Orwell', 8.99
WHERE NOT EXISTS (SELECT 1 FROM books WHERE title = '1984');

INSERT INTO books (title, author, price)
SELECT 'To Kill a Mockingbird', 'Harper Lee', 7.99
WHERE NOT EXISTS (SELECT 1 FROM books WHERE title = 'To Kill a Mockingbird');
"""

def initialize_database():
    if not os.path.exists(DATABASE):
        connection = sqlite3.connect(DATABASE)
        cursor = connection.cursor()
        cursor.executescript(SCHEMA)
        connection.commit()
        connection.close()
        print("Database initialized successfully.")
    else:
        print("Database already exists. Skipping initialization.")

@app.route('/api/books', methods=['GET'])
def get_books():
    connection = sqlite3.connect(DATABASE)
    connection.row_factory = sqlite3.Row
    cursor = connection.cursor()

    books = cursor.execute('SELECT * FROM books').fetchall()
    connection.close()

    books_list = [dict(book) for book in books]
    return jsonify(books_list)

@app.route('/')
def index():
    return "Welcome to the Book API!"

if __name__ == "__main__":
    initialize_database()  # Initialize the database on app start
    app.run(host='0.0.0.0', port=8080)
from flask import Flask, jsonify
import sqlite3

app = Flask(__name__)

def get_db_connection():
    conn = sqlite3.connect('bookshop.db')  # Replace 'your_database.db' with your actual database name
    conn.row_factory = sqlite3.Row  # Allows fetching rows as dictionaries
    return conn

@app.route('/api/books', methods=['GET'])
def get_books():
    conn = get_db_connection()
    books = conn.execute('SELECT * FROM books').fetchall()
    conn.close()

    # Convert rows to a list of dictionaries
    books_list = [dict(book) for book in books]

    return jsonify(books_list)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)  # Ensure it runs on port 8080
