import React, { useEffect, useState } from "react";
import "./Slider.scss";

type Book = {
  id: number;
  title: string;
  author: string;
  cover_image: string;
};

type BookSliderProps = {
  books: Book[];
};

export const Slider: React.FC<BookSliderProps> = ({ books }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [fetchedBooks, setFetchedBooks] = useState<Book[]>([]);
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
        const booksWithMockCover = data.map((book) => ({
          ...book,
          coverImage: "path/to/mock-image.jpg",
        }));
        setFetchedBooks(booksWithMockCover);
        setLoading(false); 
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []); 

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const booksPerSlide = 4;
  const totalSlides = Math.ceil(fetchedBooks.length / booksPerSlide);

  const goToSlide = (index: number) => {
    setActiveSlide(index);
  };

  
  const currentBooks = fetchedBooks.slice(
    activeSlide * booksPerSlide,
    activeSlide * booksPerSlide + booksPerSlide
  );

  return (
    <div className="book-slider">
      <div className="book-slider__content">
        {currentBooks.map((book) => (
          <div key={book.id} className="book-slider__book">
            <img
              src={book.cover_image}
              alt={book.title}
              className="book-slider__cover"
            />
            <h3>{book.title}</h3>
            <p>{book.author}</p>
          </div>
        ))}
      </div>

      
      <div className="book-slider__buttons">
        {Array.from({ length: totalSlides }, (_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`book-slider__button ${activeSlide === index ? "active" : ""}`}
          >
            
          </button>
        ))}
      </div>
    </div>
  );
};

