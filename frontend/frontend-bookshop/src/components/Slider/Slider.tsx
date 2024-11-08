import React, { useEffect, useState } from "react";
import "./Slider.scss";

// Sample book data type
type Book = {
  id: number;
  title: string;
  author: string;
  cover_image: string; // URL to the book's cover image (mock data for now)
};

// Props for BookSlider
type BookSliderProps = {
  books: Book[];
};

export const Slider: React.FC<BookSliderProps> = ({ books }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [fetchedBooks, setFetchedBooks] = useState<Book[]>([]); // State for fetched books
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // Fetch books from API
  useEffect(() => {
    fetch("/api/books") // Replace with your API endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }
        return response.json();
      })
      .then((data: Book[]) => {
        // Update the books data with the API response
        const booksWithMockCover = data.map((book) => ({
          ...book,
          coverImage: "path/to/mock-image.jpg", // Use a mock cover image
        }));
        setFetchedBooks(booksWithMockCover); // Set books with mock cover
        setLoading(false); // Stop loading after data is fetched
      })
      .catch((err) => {
        setError(err.message); // Handle errors
        setLoading(false); // Stop loading on error
      });
  }, []); // Empty dependency array to run once when the component mounts

  // Handle loading and error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Each slide contains 4 books
  const booksPerSlide = 4;
  const totalSlides = Math.ceil(fetchedBooks.length / booksPerSlide);

  // Function to switch to a specific slide
  const goToSlide = (index: number) => {
    setActiveSlide(index);
  };

  // Slice books array to get books for the current slide
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

      {/* Slider Buttons */}
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

