import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Checkout.scss";

export const Checkout: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    postcode: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const location = useLocation();
  const totalPrice = location.state?.totalPrice || 0; // Fallback to 0 if no data

  // Handle form data change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle the 'Save and Continue' form submission (without sending the order)
  const handleSaveAndContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    console.log("Shipping Details Saved:", formData);
    // Display a thank-you message after the form is submitted
  };

  // Handle the 'Order' button click (send POST request with shipping details)
  const handleOrder = async () => {
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Order submitted successfully:", result);
        alert("Order submitted successfully!");
      } else {
        console.error("Failed to submit order:", response.statusText);
        alert("There was an issue submitting your order.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting your order.");
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-page__title">Checkout</div>
      <div className="checkout-page__wrapper">
        <div className="checkout-page__wrapper__shipping">
          <form onSubmit={handleSaveAndContinue}>
            <div className="checkout-page__wrapper__shipping__title">
              Shipping
            </div>
            <div className="checkout-page__wrapper__shipping__line"></div>
            <div className="x">
              <input
                className="checkout-page__wrapper__shipping__input"
                type="text"
                placeholder="First name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                placeholder="Last name"
                className="checkout-page__wrapper__shipping__input"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <input
              type="text"
              placeholder="Delivery address"
              className="checkout-page__wrapper__shipping__input"
              name="address1"
              value={formData.address1}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Delivery address (cont'd)"
              className="checkout-page__wrapper__shipping__input"
              name="address2"
              value={formData.address2}
              onChange={handleChange}
            />
            <div className="x">
              <input
                type="text"
                placeholder="City"
                className="checkout-page__wrapper__shipping__input"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                placeholder="Postcode"
                className="checkout-page__wrapper__shipping__input"
                name="postcode"
                value={formData.postcode}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="button">
              Save and Continue
            </button>
          </form>
          {isSubmitted && (
            <div className="thank-you-message">Thanks for your details!</div>
          )}
        </div>
        <div className="checkout-page__wrapper__info">
          <div className="checkout-page__wrapper__info__title">
            Order Summary
          </div>
          <div className="checkout-page__wrapper__info__line"></div>
          <div className="checkout-page__wrapper__info__y">
            <div>Item Total</div>
            <div>${totalPrice.toFixed(2)}</div>
          </div>
          <div className="checkout-page__wrapper__info__y">
            <div>Delivery Total</div>
            <div>0$</div>
          </div>
          <div className="checkout-page__wrapper__info__line"></div>
          <div className="checkout-page__wrapper__info__y">
            <div>Total</div>
            <div>${totalPrice.toFixed(2)}</div>
          </div>
          <div className="yellow">
            <div className="text1">
              You’ll raise $6.40 for local <br />
              bookshops!
            </div>
            <div className="line"></div>
            <div className="">
              Our website offset carbon <br /> emissions from every delivery.
            </div>
          </div>
          <div className="text2">
            Please ensure all your information is correct.
          </div>
          <button onClick={handleOrder} className="button-s">
            Order
          </button>
        </div>
      </div>
    </div>
  );
};
