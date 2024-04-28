import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useSelector } from "react-redux";
import avatar from "../../Images/blank-profile.png";
import "./Profile.css";
import client from "../../client/client";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [userOrder, setUserOrder] = useState([]);

  useEffect(() => {
    getUserOrders();
    console.log(userOrder);
  }, []);

  const getUserOrders = async () => {
    try {
      const { data } = await client.get("/orders/my");
      setUserOrder(data.orders);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="profile">
        <h1>{user?.name}</h1>
        <h3>Email: {user?.email}</h3>
      </div>
      <br />
      <div className="order-summary">
        <div>
          <h1 style={{ textAlign: "center" }}>Orders:</h1>
          <br />
          {userOrder.map((item, key) => (
            <div className="order-items" key={key}>
              <p>
                <b>Order ID: </b>
                {item._id}
              </p>
              <ul className="product-list">
                {item.products.map((product) => (
                  <li key={product.product?._id} className="product-item">
                    <h4 className="product-name">
                      Product Name: {product.product?.name}
                    </h4>
                    <h5>
                      Price: ${product.product?.price}, Quantity:{" "}
                      {product?.quantity}
                    </h5>
                  </li>
                ))}
              </ul>
              <p>
                <b>Status: </b>
                {item.status}
              </p>
              <p>
                <b>Total: </b>${item.totalAmount}
              </p>
              <br />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
