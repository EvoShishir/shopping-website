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
        {user.avatar ? (
          <img
            style={{ height: 150, width: 150 }}
            src={user.avatar}
            alt={user.name}
            draggable="false"
          />
        ) : (
          <img
            style={{ height: 150, width: 150 }}
            src={avatar}
            alt={user?.name}
            draggable="false"
          />
        )}
        <div className="info">
          <h1>{user?.name}</h1>
          <h3>Email: {user?.email}</h3>
        </div>
      </div>
      <div>
        <div>
          <div className="order-summary">
            <div className="summary-container">
              <h3>Order ID</h3>
              <h3>Products</h3>
              <h3>Status</h3>
              <h3>Total Price</h3>
            </div>
            <div>
              {userOrder.map((item, key) => (
                <div className="order-items" key={key}>
                  <p>{item._id}</p>
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
                  <p>{item.status}</p>
                  <p>${item.totalAmount}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
