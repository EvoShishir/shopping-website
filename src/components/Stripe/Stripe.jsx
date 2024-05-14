import React from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import "./Stripe.css";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { DELETE_CART } from "../../Redux/typings/reducerTypings";

const Stripe = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const hostname = window.location.hostname;
  const port = window.location.port;
  const baseUrl = port ? `http://${hostname}:${port}` : `http://${hostname}`;

  const handlePaymentSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    dispatch({ type: DELETE_CART });

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: `${baseUrl}/order-placed`,
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      toast.error(result.error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };
  return (
    <div className="payment-info">
      <ToastContainer />
      <PaymentElement />
      <div className="cart-buttons">
        <button className="proceed-btn" onClick={handlePaymentSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Stripe;
