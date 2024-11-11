import { useEffect, useState } from "react";
import "./Basket.scss";
import { ReactComponent as Bin } from "../../assets/svgs/bin.svg";
import { useNavigate } from "react-router-dom";

type Book = {
  id: number;
  title: string;
  author: string;
  cover_image: string;
  price: number;
};

export const Basket = () => {
  const navigate = useNavigate();
  const handleShoppingMore = () => {
    navigate("/shop");
  };

  const handleCheckout = () => {
    const totalPrice = calculateTotalPrice();
    navigate("/checkout", { state: { totalPrice } });
  };

  const [basket, setBasket] = useState<Book[]>([]);

  useEffect(() => {
    const savedBasket = JSON.parse(localStorage.getItem("basket") || "[]");
    setBasket(savedBasket);
  }, []);

  const handleRemoveFromBasket = (bookId: number) => {
    const updatedBasket = basket.filter((book) => book.id !== bookId);
    localStorage.setItem("basket", JSON.stringify(updatedBasket));
    setBasket(updatedBasket);
  };

  const handleClearBasket = () => {
    localStorage.removeItem("basket");
    setBasket([]);
  };

  const calculateTotalPrice = (): number => {
    return basket.reduce((total, book) => total + book.price, 0);
  };

  return (
    <div className="basket-page">
      <div className="basket-page__title">Shopping Basket</div>
      {basket.length === 0 ? (
        <div className="basket-page__notification">Your basket is empty.</div>
      ) : (
        <div>
          {basket.map((book) => (
            <div className="basket-page__book-item" key={book.id}>
              <div className="basket-page__book-item__wrapper">
                <img src={book.cover_image} alt={book.title} width={200} />
                <div className="basket-page__book-item__wrapper__text">
                  <div className="basket-page__book-item__wrapper__title">
                    {book.title}
                  </div>
                  <div className="basket-page__book-item__wrapper__author">
                    {book.author}
                  </div>
                </div>
              </div>

              <div className="basket-page__book-item__wrapper__price">
                Price: ${book.price}
              </div>
              <Bin
                className="bin"
                onClick={() => handleRemoveFromBasket(book.id)}
              ></Bin>
            </div>
          ))}
        </div>
      )}

      <div className="basket-page__button-container">
        <div className="basket-page__button-container__united">
          {basket.length > 0 && (
            <button
              className="basket-page__button-container__united__clear-basket-button"
              onClick={handleClearBasket}
            >
              Clear Basket
            </button>
          )}
          <button
            className="basket-page__button-container__united__button"
            onClick={handleShoppingMore}
          >
            Continue Shopping
          </button>
        </div>

        {basket.length > 0 && (
          <div className="basket-page__button-container__united__x">
            <div className="basket-page__button-container__united__x__text">
              Total: ${calculateTotalPrice().toFixed(2)}
            </div>
            <button
              className="basket-page__button-container__united__x__checkout-button"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
