import { useState, useEffect } from "react";
import "./Shop.scss";
import { Book } from "../../components/Book/Book";
import { books } from "../../mockData/books";

// Type for the book
type BookType = {
  id: number;
  title: string;
  author: string;
  coverImage: string;
  price: number;
};

export const Shop = () => {
  // State to track the basket
  const [basket, setBasket] = useState<BookType[]>([]);

  // Load basket from localStorage when the component mounts
  useEffect(() => {
    const savedBasket = JSON.parse(localStorage.getItem("basket") || "[]");
    setBasket(savedBasket);
  }, []);

  // Function to handle adding a book to the basket
  const handleAddToBasket = (book: BookType) => {
    const updatedBasket = [...basket, book];
    setBasket(updatedBasket); // Update the state immediately
    localStorage.setItem("basket", JSON.stringify(updatedBasket)); // Update localStorage
  };

  // Function to check if a book is already in the basket
  const isBookInBasket = (bookId: number): boolean => {
    return basket.some((book) => book.id === bookId); // Check against the state
  };

  return (
    <div>
      <div className="shop-section">
        <div className="shop-section__title">Explore All Books Here</div>
        {/* Pass handleAddToBasket and isBookInBasket to the Book component */}
        <Book
          books={books}
          onAddToBasket={handleAddToBasket}
          isBookInBasket={isBookInBasket}
        />
      </div>
    </div>
  );
};
