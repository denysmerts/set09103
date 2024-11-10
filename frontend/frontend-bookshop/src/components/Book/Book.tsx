import React, { useEffect, useState } from "react";
import "./Book.scss";

// Define the Book type
type Book = {
  id: number;
  title: string;
  author: string;
  cover_image: string; // URL to the book's cover image
  price: number;
};

type BookShopProps = {
  onAddToBasket: (book: Book) => void; // Function to handle adding books to the basket
  isBookInBasket: (bookId: number) => boolean;
};

export const Book = ({ onAddToBasket, isBookInBasket }: BookShopProps) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch books from the API
  useEffect(() => {
    fetch("/api/books") // Replace with your actual API endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }
        return response.json();
      })
      .then((data: Book[]) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="book_list">
      {books.map((book) => (
        <div key={book.id} className="book-item">
          <img src={book.cover_image} alt={book.title} />
          <div className="book-item__title">{book.title}</div>
          <div className="book-item__author">{book.author}</div>
          <div className="book-item__price">${book.price.toFixed(2)}</div>
          <button
            onClick={() => onAddToBasket(book)}
            className={`book-item__button ${
              isBookInBasket(book.id) ? "book-item__button--disabled" : ""
            }`}
            disabled={isBookInBasket(book.id)} // Disable if the book is already in the basket
          >
            {isBookInBasket(book.id)
              ? "Already in the basket"
              : "Add to Basket"}
          </button>
        </div>
      ))}
    </div>
  );
};
