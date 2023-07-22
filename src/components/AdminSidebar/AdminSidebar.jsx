import React from "react";
import "./AdminSidebar.css";
import { Link } from "react-router-dom";
import logo from "../../Images/Vector.png";
import { MdOutlinePeopleAlt, MdOutlineSpaceDashboard } from "react-icons/md";
import { BsSave2 } from "react-icons/bs";
import { BiCategoryAlt } from "react-icons/bi";
import { FiShoppingCart } from "react-icons/fi";

const AdminSidebar = () => {
  return (
    <div>
      <ul className="sidebar">
        <div className="logo sidebar-logo">
          <Link className="link-item" to="/">
            <img src={logo} alt="" />
          </Link>
          <Link className="link-item" to="/">
            FASHION
          </Link>
        </div>
        <Link to={"/admin"} className="link-item">
          <li className="sidebar-item">
            <MdOutlineSpaceDashboard />
            Dashboard
          </li>
        </Link>
        <Link to={"/admin/users"} className="link-item">
          <li className="sidebar-item">
            <MdOutlinePeopleAlt />
            Users
          </li>
        </Link>
        <Link to={"/admin/products"} className="link-item">
          <li className="sidebar-item">
            <BsSave2 />
            Products
          </li>
        </Link>
        <Link to={"/admin/categories"} className="link-item">
          <li className="sidebar-item">
            <BiCategoryAlt />
            Categories
          </li>
        </Link>
        <Link to={"/admin/orders"} className="link-item">
          <li className="sidebar-item">
            <FiShoppingCart />
            Orders
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default AdminSidebar;
