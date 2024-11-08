-- backend/schema.sql

-- Create books table if not exists
CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    price REAL CHECK (price >= 0)  -- Ensure price is non-negative
);

-- Insert some initial data into the books table
INSERT INTO books (title, author, price)
SELECT 'The Great Gatsby', 'F. Scott Fitzgerald', 10.99
WHERE NOT EXISTS (SELECT 1 FROM books WHERE title = 'The Great Gatsby');

INSERT INTO books (title, author, price)
SELECT '1984', 'George Orwell', 8.99
WHERE NOT EXISTS (SELECT 1 FROM books WHERE title = '1984');

INSERT INTO books (title, author, price)
SELECT 'To Kill a Mockingbird', 'Harper Lee', 7.99
WHERE NOT EXISTS (SELECT 1 FROM books WHERE title = 'To Kill a Mockingbird');
-- backend/schema.sql

-- Create books table if not exists
CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    price REAL
);

-- Insert some initial books data
INSERT INTO books (title, author, price) VALUES 
('The Great Gatsby', 'F. Scott Fitzgerald', 10.99),
('1984', 'George Orwell', 8.99),
('To Kill a Mockingbird', 'Harper Lee', 7.99);
