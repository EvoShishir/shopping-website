import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BsCart2 } from "react-icons/bs";
import logo from "../../Images/Vector.png";
import "./Navbar.css";
import { ToastContainer, toast } from "react-toastify";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch({ type: "LOGOUT_USER" });
    toast.success("Logged out successfully!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  return (
    <nav className="nav">
      <div className="logo">
        <a href="/">
          <img src={logo} alt="" />
        </a>
        <a href="/">FASHION</a>
      </div>
      <ToastContainer />
      <div className="navLinks">
        <div className="navItems">
          <a href="/products">Catalogue</a>
          <a href="/profile">Profile</a>
          <a href="/cart" style={{ display: "flex", alignItems: "center" }}>
            <BsCart2 />{" "}
            <small
              style={{
                color: "black",
                backgroundColor: "darkorange",
                borderRadius: "50%",
                fontSize: "13px",
                padding: "0px 5px",
              }}
            >
              {cart.length}
            </small>
          </a>
        </div>
        {user ? (
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
