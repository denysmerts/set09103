from flask import Flask, jsonify, request
import sqlite3

app = Flask(__name__)

# Initialize the SQLite database and schema
def init_db():
    conn = sqlite3.connect('bookshop.db')  # Connect to SQLite database
    cursor = conn.cursor()

    # Drop the 'books' table if it exists (for debugging purposes, to clear schema issues)
    cursor.execute("DROP TABLE IF EXISTS books")

    # Create the 'books' table with the 'cover_image' column
    cursor.execute(''' 
    CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        price REAL NOT NULL,
        cover_image TEXT
    )
    ''')

    # Create a 'shipping' table to store shipping data
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS shipping (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        address1 TEXT NOT NULL,
        address2 TEXT,
        city TEXT NOT NULL,
        postcode TEXT NOT NULL
    )
    ''')

    # Insert sample book data if the books table is empty
    cursor.execute("SELECT COUNT(*) FROM books")
    if cursor.fetchone()[0] == 0:
        books_data = [
            (1,'The Great Gatsby', 'F. Scott Fitzgerald', 10.99, 'https://images-eu.bookshop.org/images/9781645173519.jpg?height=500&v=v4-cd82a8eaaf1647ae03db6cd27fee8e26'),
            (2,'To Kill a Mockingbird', 'Harper Lee', 8.99, 'https://images-eu.bookshop.org/images/9781784752637.jpg?height=500&v=v4-50f59c0b0c2a8a148f167c1485f65761'),
            (3,'1984', 'George Orwell', 6.99, 'https://images-eu.bookshop.org/images/9780008460983.jpg?height=500&v=v4-8a629cc8c11387b9f16a6c4e69d45bf4'),
	    (4,'Brave New World', 'Aldous Huxley', 9.99, 'https://images-eu.bookshop.org/images/9780099518471.jpg?height=500&v=v4-153dd13d3637b7c18c00668dc0ed5b69'),
	    (5,'Dune Messiah', 'Frank Herbert', 9.40, 'https://images-eu.bookshop.org/images/9781473655324.jpg?height=500&v=v4-73c14a92860388664ad0e044d71a6305'),
	    (6,'Twenty Thousand Leagues Under the Sea', 'Jules Verne', 23.90, 'https://images-eu.bookshop.org/images/9781435162150.jpg?height=500&v=v4'),
	    (7,'Moby Dick', 'Herman Melville', 8.54, 'https://images-eu.bookshop.org/images/9781785996337.jpg?height=500&v=v4-f865ffa32c7192910f052a2a59ece001'),
	    (8,'Don Quixote', 'Miguel de Cervantes', 10.44, 'https://images-eu.bookshop.org/images/9781911238270.jpg?height=500&v=v4-ab4af775db31ca2c73ad95da18193b72'),
	    (9,'The Odyssey', 'Homer', 7.78, 'https://images-eu.bookshop.org/images/9780099511687.jpg?height=500&v=v4-cea9b601677554db3a43e93a785947d8'),
	    (10,'Fairy Tale', 'Stephen King', 10.33, 'https://images-eu.bookshop.org/images/9781399705455.jpg?height=500&v=v4-eccd7cb8191c54d8099acab5e8361ccf'),
	    (11,'Yellowface', 'Rebecca F Kuang', 9.67, 'https://images-eu.bookshop.org/images/9780008532819.jpg?height=500&v=v4-4193e087d0b36a1306585ae6a327e103'),
	    (12,'Intermezzo', 'Sally Rooney' , 19.00, 'https://images-eu.bookshop.org/images/9780571365463.jpg?height=500&v=v4-3a88abc6022eb5728c1590dd00000000')

        ]
        cursor.executemany('INSERT INTO books (id, title, author, price, cover_image) VALUES (?, ?, ?, ?, ?)', books_data)

    # Commit changes and close the connection
    conn.commit()
    conn.close()

# Initialize the database when the app starts
init_db()

# Route to fetch all books from the database
@app.route('/api/books', methods=['GET'])
def get_books():
    conn = sqlite3.connect('bookshop.db')  # Connect to SQLite database
    cursor = conn.cursor()

    # Fetch all books from the database
    cursor.execute('SELECT id, title, author, price, cover_image FROM books')
    books = cursor.fetchall()

    # Close the connection
    conn.close()

    # Return the data as JSON
    return jsonify([{
	'id': book[0],
        'title': book[1],
        'author': book[2],
        'price': book[3],
        'cover_image': book[4]
    } for book in books])

# Route to handle shipping details (POST request)
@app.route('/api/orders', methods=['POST'])
def save_shipping_details():
    # Get the shipping data from the request body
    shipping_data = request.get_json()

    # Extract shipping details from the request
    first_name = shipping_data.get('firstName')
    last_name = shipping_data.get('lastName')
    address1 = shipping_data.get('address1')
    address2 = shipping_data.get('address2')
    city = shipping_data.get('city')
    postcode = shipping_data.get('postcode')

    # Validate shipping data
    if not all([first_name, last_name, address1, city, postcode]):
        return jsonify({'error': 'Missing required shipping details'}), 400

    # Insert shipping data into the 'shipping' table
    conn = sqlite3.connect('bookshop.db')  # Connect to SQLite database
    cursor = conn.cursor()

    cursor.execute(''' 
    INSERT INTO shipping (first_name, last_name, address1, address2, city, postcode)
    VALUES (?, ?, ?, ?, ?, ?)
    ''', (first_name, last_name, address1, address2, city, postcode))

    # Commit the changes and close the connection
    conn.commit()
    conn.close()

    # Return a success message as JSON
    return jsonify({'message': 'Shipping details saved successfully'}), 201

if __name__ == '__main__':
    app.run(debug=True)
