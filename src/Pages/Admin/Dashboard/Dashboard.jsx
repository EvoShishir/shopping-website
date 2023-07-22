import React, { useEffect, useState } from "react";
import AdminSidebar from "../../../components/AdminSidebar/AdminSidebar";
import "./Dashboard.css";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { BsSave2 } from "react-icons/bs";
import { TbBrandCashapp } from "react-icons/tb";
import { FiShoppingCart } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useSelector((state) => state.user);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    if (user.role === "admin") {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  }, [user.role]);

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
                  69420
                </h3>
                <h3>Total Users</h3>
              </div>
              <div className="dashboard-containers dashboard-container2">
                <h3 className="dashboard-number">
                  <BsSave2 />
                  69420
                </h3>
                <h3>Total Products</h3>
              </div>
              <div className="dashboard-containers dashboard-container3">
                <h3 className="dashboard-number">
                  <FiShoppingCart />
                  69420
                </h3>
                <h3>Total Orders</h3>
              </div>
              <div className="dashboard-containers dashboard-container4">
                <h3 className="dashboard-number">
                  <TbBrandCashapp />
                  69420
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
