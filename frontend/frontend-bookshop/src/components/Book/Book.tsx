import { useEffect, useState } from "react";
import "./Book.scss";

type Book = {
  id: number;
  title: string;
  author: string;
  cover_image: string; 
  price: number;
};

type BookShopProps = {
   books: Book[];	
  onAddToBasket: (book: Book) => void;
  isBookInBasket: (bookId: number) => boolean;
};

export const Book = ({ onAddToBasket, isBookInBasket }: BookShopProps) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/books")
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
            disabled={isBookInBasket(book.id)}
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
