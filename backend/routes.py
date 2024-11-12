from flask import Blueprint, jsonify, request
from database import get_db_connection

book_routes = Blueprint('book_routes', __name__)
order_routes = Blueprint('order_routes', __name__)

@book_routes.route('/')
def say_hi():
    return 'Welcome to Bookshop API!'

@book_routes.route('/books', methods=['GET'])
def get_books():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT id, title, author, price, cover_image FROM books')
    books = cursor.fetchall()
    conn.close()

    return jsonify([{
        'id': book['id'],
        'title': book['title'],
        'author': book['author'],
        'price': book['price'],
        'cover_image': book['cover_image']
    } for book in books])

@order_routes.route('/orders', methods=['POST'])
def save_shipping_details():
    shipping_data = request.get_json()
    first_name = shipping_data.get('firstName')
    last_name = shipping_data.get('lastName')
    address1 = shipping_data.get('address1')
    address2 = shipping_data.get('address2')
    city = shipping_data.get('city')
    postcode = shipping_data.get('postcode')

    if not all([first_name, last_name, address1, city, postcode]):
        return jsonify({'error': 'Missing required shipping details'}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
    INSERT INTO shipping (first_name, last_name, address1, address2, city, postcode)
    VALUES (?, ?, ?, ?, ?, ?)
    ''', (first_name, last_name, address1, address2, city, postcode))

    conn.commit()
    conn.close()

    return jsonify({'message': 'Shipping details saved successfully'}), 201
