import React, { useEffect, useState } from "react";
import "./CheckoutForm.css";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import client from "../../client/client";

const CheckoutForm = () => {
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
    setGrandTotal(amount + shipping + tax);
  };
  const navigate = useNavigate();

  const orderSchema = yup
    .object({
      name: yup.string().required(),
      phone: yup.string().min(11).required(),
      address: yup.string().required(),
      city: yup.string().required(),
      zip: yup.string().required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(orderSchema),
  });

  const checkoutFields = [
    {
      name: "name",
      placeholder: "Your full name",
      type: "text",
      label: "Full Name",
      required: true,
    },
    {
      name: "phone",
      placeholder: "Phone Number",
      type: "string",
      label: "Phone Number",
      required: true,
    },
    {
      name: "address",
      placeholder: "Address including house number",
      type: "text",
      label: "Address",
      required: true,
    },
    {
      name: "city",
      placeholder: "Enter your City",
      type: "text",
      label: "City",
      required: true,
    },
    {
      name: "zip",
      placeholder: "Zip/Postal Code",
      type: "string",
      label: "Zip/Postal Code",
      required: true,
    },
  ];

  const handleClick = async (inputData) => {
    const checkoutData = {
      products: cart.map((item) => ({
        product: item._id,
        quantity: item.quantity,
      })),
      totalAmount: grandTotal,
      shipping: {
        fullName: inputData.name,
        phoneNumber: inputData.phone,
        address: inputData.address,
        city: inputData.city,
        zipCode: inputData.zip,
      },
    };
    if (cartTotal > 0) {
      try {
        console.log(checkoutData);
        const data = await client.post("/orders/create", checkoutData);
        console.log(data);
        navigate("/payment-info");
      } catch (error) {
        console.error("Error creating order:", error);
      }
    } else {
      toast.warning("Your cart is empty!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div className="form-container">
      <br />
      <ToastContainer />
      <form>
        {checkoutFields.map((field, key) => {
          return (
            <div>
              <h3>
                {field.label}{" "}
                {field.required ? <span style={{ color: "red" }}>*</span> : ""}
              </h3>
              <input
                {...register(field.name)}
                key={key}
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
              />
              <br />
              <small className="error">{errors[field.name]?.message}</small>
            </div>
          );
        })}
        <div className="cart-buttons">
          <Link to={"/products"}>
            <button className="go-back-btn">Go Back</button>
          </Link>
          <button className="proceed-btn" onClick={handleSubmit(handleClick)}>
            Proceed to Payment
          </button>
        </div>
      </form>
      <br />
    </div>
  );
};

export default CheckoutForm;
