import React from "react";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import Layout from "../../components/Layout/Layout";
import CustomStepper from "../../components/CustomStepper/CustomStepper";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import "./Checkout.css";

const Checkout = () => {
  return (
    <Layout>
      <div>
        <CustomStepper step={1} />
        <div className="checkout-container">
          <OrderSummary />
          <CheckoutForm />
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
