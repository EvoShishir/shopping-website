import React, { useEffect, useState } from "react";
import AdminSidebar from "../../../components/AdminSidebar/AdminSidebar";
import "./Dashboard.css";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { BsSave2 } from "react-icons/bs";
import { TbBrandCashapp } from "react-icons/tb";
import { FiShoppingCart } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import client from "../../../client/client";

const Dashboard = () => {
  const { user } = useSelector((state) => state.user);
  const [admin, setAdmin] = useState(false);
  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [salesCount, setSalesCount] = useState(0);

  useEffect(() => {
    if (user.role === "admin") {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  }, [user.role]);

  useEffect(() => {
    totalUser();
    totalProducts();
    totalOrders();
  }, []);

  const totalUser = async () => {
    const { data } = await client.get("users/get-users");
    const total = data.users;
    setUserCount(total.length);
  };

  const totalProducts = async () => {
    const { data } = await client.get("products/all");
    const total = data.products;
    setProductCount(total.length);
  };

  const totalOrders = async () => {
    const { data } = await client.get("orders/all");
    const total = data.orders;
    setOrderCount(total.length);
    console.log(total);
    let amount = 0;
    total.forEach((order) => {
      console.log(order);
      const salesAmount = order.totalAmount;
      amount = amount + salesAmount;
    });
    setSalesCount(amount.toFixed(2));
  };

  return (
    <>
      {admin ? (
        <div className="dashboard">
          <AdminSidebar />
          <div>
            <div className="dashboard-items">
              <div className="dashboard-containers dashboard-container1">
                <h3 className="dashboard-number">
                  <MdOutlinePeopleAlt />
                  {userCount}
                </h3>
                <h3>Total Users</h3>
              </div>
              <div className="dashboard-containers dashboard-container2">
                <h3 className="dashboard-number">
                  <BsSave2 />
                  {productCount}
                </h3>
                <h3>Total Products</h3>
              </div>
              <div className="dashboard-containers dashboard-container3">
                <h3 className="dashboard-number">
                  <FiShoppingCart />
                  {orderCount}
                </h3>
                <h3>Total Orders</h3>
              </div>
              <div className="dashboard-containers dashboard-container4">
                <h3 className="dashboard-number">
                  <TbBrandCashapp />
                  {salesCount}
                </h3>
                <h3>Total Sales</h3>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <h1>You do not have permission to view this page</h1>
          <Link to={"/"}>Go back</Link>
        </div>
      )}
    </>
  );
};

export default Dashboard;
