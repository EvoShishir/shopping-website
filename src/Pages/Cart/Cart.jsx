import React from "react";
import Layout from "../../components/Layout/Layout";
import { useSelector } from "react-redux";
import "./Cart.css";
import Button from "../../components/core/Button/Button";
import CustomStepper from "../../components/CustomStepper/CustomStepper";

const Cart = () => {
  const { cart } = useSelector((state) => state.cart);
  console.log(cart);

  return (
    <Layout>
      <div className="cart-container">
        <CustomStepper step={0} />
        <div className="items-container">
          <h3>Product</h3>
          <h3>Quantity</h3>
          <h3>Unit Price</h3>
          <h3>Total</h3>
        </div>
        {cart?.map((cartItem, key) => (
          <div className="cartItem" key={key}>
            <div className="item">
              <img src={cartItem.thumbnail} alt="" />
              <h4>{cartItem.title}</h4>
            </div>
            <h4>{cartItem.quantity}</h4>
            <h4>${cartItem.price}</h4>
            <h4>${cartItem.price * cartItem.quantity}</h4>
          </div>
        ))}
        <div className="price-breakdown">
          <div>
            <p className="titles">Subtotal</p>
            <p className="prices">$1600</p>
          </div>
          <div>
            <p className="titles">Shipping</p>
            <p className="prices">$40</p>
          </div>
          <div>
            <p className="titles">Total</p>
            <p className="grand-price">$1640</p>
          </div>
        </div>
        <div className="cart-buttons">
          <button className="go-back-btn">Continue Shopping</button>
          <Button title="Checkout" />
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
