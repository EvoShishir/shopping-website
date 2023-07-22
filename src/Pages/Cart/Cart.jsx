import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { BsTrash } from "react-icons/bs";
import "./Cart.css";
import CustomStepper from "../../components/CustomStepper/CustomStepper";
import { ADD_TO_CART, REMOVE_ITEM } from "../../Redux/typings/reducerTypings";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Cart = () => {
  const [cartTotal, setCartTotal] = useState(0);
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  useEffect(() => {
    calculateCart();
  }, [cart]);

  const quantityChanger = (cartItem, operator) => {
    switch (operator) {
      case "minus":
        if (cartItem.quantity === 1) return;
        return dispatch({
          type: ADD_TO_CART,
          payload: { ...cartItem, quantity: cartItem.quantity - 1 },
        });

      case "plus":
        if (cartItem.stock === cartItem.quantity) return;
        return dispatch({
          type: ADD_TO_CART,
          payload: { ...cartItem, quantity: cartItem.quantity + 1 },
        });

      default:
        break;
    }
  };

  const handleProductClick = (id) => navigate(`/products/${id}`);

  const handleRemoveItem = (itemId) => {
    dispatch({ type: REMOVE_ITEM, payload: itemId });
    toast.success("Item removed from cart!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const calculateCart = () => {
    let amount = 0;
    cart.forEach((item) => {
      const itemAmount = item.quantity * item.price;
      amount = amount + itemAmount;
    });
    setCartTotal(amount);
  };

  const gotoCheckout = () => {
    if (cartTotal > 0) {
      return navigate("/checkout");
    } else {
      toast.warning("Your cart is empty!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <Layout>
      <ToastContainer />
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
            <div
              className="item"
              onClick={() => handleProductClick(cartItem.id)}
            >
              <img
                src={`http://localhost:4000/images/${cartItem.image}`}
                alt=""
              />
              <h4>{cartItem.title}</h4>
            </div>
            <div className="item-quantity">
              <button
                className="selector-btn"
                onClick={() => quantityChanger(cartItem, "minus")}
              >
                -
              </button>
              <h4>{cartItem.quantity}</h4>
              <button
                className="selector-btn"
                onClick={() => quantityChanger(cartItem, "plus")}
              >
                +
              </button>
            </div>
            <h4>${cartItem.price}</h4>
            <h4>${cartItem.price * cartItem.quantity}</h4>
            <div>
              <button
                className="remove-btn"
                onClick={() => handleRemoveItem(cartItem.id)}
              >
                <BsTrash />
              </button>
            </div>
          </div>
        ))}
        <div className="total-price">
          <div>
            <p className="titles">Subtotal</p>
            <p className="grand-price">${cartTotal}</p>
          </div>
        </div>
        <div className="cart-buttons">
          <Link to={"/products"}>
            <button className="go-back-btn">Continue Shopping</button>
          </Link>
          <button onClick={gotoCheckout} className="checkout-btn">
            Checkout
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
