import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Images/Vector.png";
import "./Navbar.css";

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch({ type: "LOGOUT_USER" });
    return navigate("/");
  };
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
          <button onClick={handleLogout} className="sign-up">
            LOGOUT
          </button>
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
