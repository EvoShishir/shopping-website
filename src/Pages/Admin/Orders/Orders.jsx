import React, { useState, useEffect } from "react";
import client from "../../../client/client";
import "./Orders.css"; // Import the CSS file
import AdminSidebar from "../../../components/AdminSidebar/AdminSidebar";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await client.get("/orders/all");
      setOrders(data.orders);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Error fetching orders");
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      await client.put(`/orders/update/${orderId}`, { status: newStatus });
    } catch (error) {
      console.error("Error updating order status:", error);
      setError("Error updating order status");
    }
  };

  return (
    <div className="admin-orders">
      <AdminSidebar />
      <div className="container">
        <h1>Order List</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <ul>
            <div className="order-list">
              {orders.map((order) => (
                <li key={order._id} className="order-item">
                  <h2>Order ID: {order._id}</h2>
                  <h3>Order status: {order.status}</h3>
                  <div className="status-dropdown">
                    <p>Update status:</p>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </div>
                  <p>Total Amount: ${order.totalAmount}</p>
                  <p>Full Name: {order.shipping.fullName}</p>
                  <p>Phone Number: {order.shipping.phoneNumber}</p>
                  <p>Address: {order.shipping.address}</p>
                  <p>City: {order.shipping.city}</p>
                  <p>Zip Code: {order.shipping.zipCode}</p>
                  <ul className="product-list">
                    {order.products.map((product) => (
                      <li key={product.product?._id} className="product-item">
                        <h3 className="product-name">
                          Product Name: {product.product?.name}
                        </h3>
                        <h4 className="product-details">
                          Price: ${product.product?.price}, Quantity:{" "}
                          {product?.quantity}
                        </h4>
                      </li>
                    ))}
                  </ul>
                  <p>Created At:</p>
                  <p>{order.createdAt}</p>
                </li>
              ))}
            </div>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Orders;
