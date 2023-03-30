import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../Images/Vector.png";
import "./Navbar.css";

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.user);
  return (
    <nav className="nav">
      <div className="logo">
        <a href="/">
          <img src={logo} alt="" />
        </a>
        <a href="/">FASHION</a>
      </div>
      <div className="navLinks">
        <div className="navItems">
          <a href="/products">Catalogue</a>
          <a href="/">Fashion</a>
          <a href="/">Favourite</a>
          <a href="/">Lifestyle</a>
        </div>
        {userInfo ? (
          <Link to={"/logout"}>
            <button className="sign-up">LOGOUT</button>
          </Link>
        ) : (
          <Link to={"/login"}>
            <button className="sign-up">LOGIN</button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
