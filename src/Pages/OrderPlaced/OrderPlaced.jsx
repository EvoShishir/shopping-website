import React from "react";
import Layout from "../../components/Layout/Layout";
import CustomStepper from "../../components/CustomStepper/CustomStepper";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import "./OrderPlaced.css";

const OrderPlaced = () => {
  return (
    <Layout>
      <CustomStepper step={3} />
      <div className="confirm-page">
        <div className="confirm-check">
          <IoCheckmarkDoneCircleSharp />
        </div>
        <div>
          <h3>
            Your payment has been recieved and your product will arrive within
            2-5 working days. Thank you for being with us.
          </h3>
        </div>
      </div>
    </Layout>
  );
};

export default OrderPlaced;
