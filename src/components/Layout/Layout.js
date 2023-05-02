import React from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import "./Layout.css";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="body">{children}</div>
      <Footer></Footer>
    </div>
  );
};

export default Layout;
