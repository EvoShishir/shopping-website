import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsCart2, BsListUl } from "react-icons/bs";
import logo from "../../Images/Vector.png";
import "./Navbar.css";
import { ToastContainer, toast } from "react-toastify";
import client from "../../client/client";

import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space } from "antd";

const Navbar = () => {
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
      }
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 400) {
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
        localStorage.removeItem("accessToken");
        toast.success("Logged out successfully!", {
          position: toast.POSITION.TOP_CENTER,
        });
        window.location.reload();
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

  const items = [
    {
      label: <a href="/products">Catalogue</a>,
      key: "0",
    },
    {
      label: <a href="/profile">Profile</a>,
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: user ? (
        <a href="/" onClick={handleLogout}>
          Logout
        </a>
      ) : (
        <a href="/login">Login</a>
      ),
      key: "3",
      danger: true,
    },
  ];

  return (
    <>
      <ToastContainer />
      <nav className="nav">
        <div className="logo">
          <a href="/">
            <img src={logo} alt="" />
          </a>
          <a href="/">ShopVibe.</a>
        </div>
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
        <div className="hamBurg">
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
          <Dropdown
            menu={{
              items,
            }}
            trigger={["click"]}
          >
            <Button>
              <BsListUl />
            </Button>
          </Dropdown>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
