import { useState, useEffect } from "react";
import "./Shop.scss";
import { Book } from "../../components/Book/Book";
import { books } from "../../mockData/books";

type BookType = {
  id: number;
  title: string;
  author: string;
  cover_image: string;
  price: number;
};

export const Shop = () => {
 
  const [basket, setBasket] = useState<BookType[]>([]);

  useEffect(() => {
    const savedBasket = JSON.parse(localStorage.getItem("basket") || "[]");
    setBasket(savedBasket);
  }, []);

  const handleAddToBasket = (book: BookType) => {
    const updatedBasket = [...basket, book];
    setBasket(updatedBasket); // Update the state immediately
    localStorage.setItem("basket", JSON.stringify(updatedBasket)); // Update localStorage
  };

  const isBookInBasket = (bookId: number): boolean => {
    return basket.some((book) => book.id === bookId);
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
