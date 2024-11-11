import sqlite3

def get_db_connection():
    """Create a connection to the SQLite database."""
    conn = sqlite3.connect('bookshop.db')
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("DROP TABLE IF EXISTS books")
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        price REAL NOT NULL,
        cover_image TEXT
    )
    ''')

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

    cursor.execute("SELECT COUNT(*) FROM books")
    if cursor.fetchone()[0] == 0:
        books_data = [
            (1, 'The Great Gatsby', 'F. Scott Fitzgerald', 10.99, 'https://images-eu.bookshop.org/images/9781645173519.jpg?height=500&v=v4-cd82a8eaaf1647ae03db6cd27fee8e26'),
            (2, 'To Kill a Mockingbird', 'Harper Lee', 8.99, 'https://images-eu.bookshop.org/images/9781784752637.jpg?height=500&v=v4-50f59c0b0c2a8a148f167c1485f65761'),
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

    conn.commit()
    conn.close()

init_db()
