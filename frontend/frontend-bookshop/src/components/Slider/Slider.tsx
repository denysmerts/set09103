import React, { useState } from 'react';
import './Slider.scss';

// Sample book data type
type Book = {
  id: number;
  title: string;
  author: string;
  coverImage: string; // URL to the book's cover image
};

// Props for BookSlider
type BookSliderProps = {
  books: Book[];
};

export const Slider: React.FC<BookSliderProps> = ({ books }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  // Each slide contains 3 books
  const booksPerSlide = 4;
  const totalSlides = Math.ceil(books.length / booksPerSlide);

  // Function to switch to a specific slide
  const goToSlide = (index: number) => {
    setActiveSlide(index);
  };

  // Slice books array to get books for the current slide
  const currentBooks = books.slice(
    activeSlide * booksPerSlide,
    activeSlide * booksPerSlide + booksPerSlide
  );

  return (
    <div className="book-slider">
      <div className="book-slider__content">
        {currentBooks.map((book) => (
          <div key={book.id} className="book-slider__book">
            <img src={book.coverImage} alt={book.title} className="book-slider__cover" />
            <h3>{book.title}</h3>
            <p>{book.author}</p>
          </div>
        ))}
      </div>

      {/* Slider Buttons */}
      <div className="book-slider__buttons">
        {Array.from({ length: totalSlides }, (_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`book-slider__button ${activeSlide === index ? 'active' : ''}`}
          >
            
          </button>
        ))}
      </div>
    </div>
  );
};


