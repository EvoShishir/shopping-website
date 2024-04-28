import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Layout from "../../components/Layout/Layout";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import CustomStepper from "../../components/CustomStepper/CustomStepper";
import Stripe from "../../components/Stripe/Stripe";
import { baseURL } from "../../client/client";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51LwOEQCKpIOinnAaACupAigKskx2WuPMRtWjwhNiZVPwCY7LhAKdere2MgzZdsRWdp3zegxGUbSa1tczTMEJ2nS300YutUOgN0"
);

const Payment = () => {
  const [cartTotal, setCartTotal] = useState(0);
  const [shipping, setShipping] = useState(40);
  const [clientSecret, setClientSecret] = useState(null);
  const { cart } = useSelector((state) => state.cart);
  const url = baseURL;

  useEffect(() => {
    countCartAmount();
  }, []);

  useEffect(() => {
    if (cartTotal > 0) {
      fetchClientSecret();
    }
  }, [cartTotal]);

  const countCartAmount = () => {
    let amount = 0;
    cart.forEach((item) => {
      const itemAmount = item.quantity * item.price;
      amount = amount + itemAmount;
    });
    setCartTotal(amount + shipping + Math.round(amount * 0.1));
  };

  const fetchClientSecret = async () => {
    const { data } = await axios.post(`${url}/payment`, {
      amount: cartTotal,
    });
    setClientSecret(data.client_secret);
  };

  const options = {
    // passing the client secret obtained from the server
    clientSecret,
  };

  return (
    <Layout>
      {!clientSecret ? (
        <h2 style={{ textAlign: "center" }}>
          Communicating with stripe. Please wait...
        </h2>
      ) : (
        <Elements stripe={stripePromise} options={options}>
          <CustomStepper step={2} />
          <Stripe />
        </Elements>
      )}
      <br />
    </Layout>
  );
};

export default Payment;
