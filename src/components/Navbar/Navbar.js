import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsCart2 } from "react-icons/bs";
import logo from "../../Images/Vector.png";
import "./Navbar.css";
import { ToastContainer, toast } from "react-toastify";
import client from "../../client/client";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  const checkIfLoggedIn = async () => {
    try {
      const response = await client.get("/users/me");
      if (response.status === 200) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 400) {
        setIsLoggedIn(false);
        dispatch({ type: "LOGOUT_USER" });
      }
    }
  };

  const handleLogout = async () => {
    try {
      // Dispatch your action to update the state (assuming you're using Redux)
      dispatch({ type: "LOGOUT_USER" });

      // Make the POST request to the server route /users/logout
      const response = await client.post("/users/logout");

      if (response.status === 200) {
        // Logout was successful
        setIsLoggedIn(false);
        localStorage.removeItem("accessToken");
        toast.success("Logged out successfully!", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        // Handle logout error
        toast.error("Logout failed. Please try again later.", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      // Handle any network errors or other issues
      console.error("Error occurred during logout:", error);
      toast.error("An error occurred during logout. Please try again later.", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
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
