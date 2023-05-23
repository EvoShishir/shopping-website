import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./OrderSummary.css";

const OrderSummary = () => {
  const { cart } = useSelector((state) => state.cart);
  const [grandTotal, setGrandTotal] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [shipping, setShipping] = useState(40);

  useEffect(() => {
    countCartAmount();
  }, []);

  const countCartAmount = () => {
    let amount = 0;
    cart.forEach((item) => {
      const itemAmount = item.quantity * item.price;
      amount = amount + itemAmount;
    });
    setCartTotal(amount);
    const tax = parseFloat((amount * 0.1).toFixed(2));
    // setGrandTotal(amount + shipping + Math.ceil(amount * 0.1));
    setGrandTotal(amount + shipping + tax);
  };

  return (
    <div className="order-summary">
      <h2>Order Summary:</h2>
      <div className="summary-container">
        <h3>Product</h3>
        <h3>Quantity</h3>
        <h3>Unit Price</h3>
        <h3>Total</h3>
      </div>
      <div>
        {cart.map((item, key) => (
          <div className="order-items" key={key}>
            <p>{item.title}</p>
            <p>{item.quantity}</p>
            <p>${item.price}</p>
            <p>${item.price * item.quantity}</p>
          </div>
        ))}
      </div>
      <section className="prices2">
        <div className="prices1">
          <div>
            <p>Subtotal:</p>
            <b>${cartTotal}</b>
          </div>
          <div>
            <p>Tax(10%):</p>
            <b>${(cartTotal * 0.1).toFixed(2)}</b>
          </div>
          <div>
            <p>Shipping:</p>
            <b>${shipping}</b>
          </div>
        </div>
        <div className="prices1">
          <div>
            <p>Grand Total:</p>
            <b>${grandTotal}</b>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrderSummary;
