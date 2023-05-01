import React from "react";
import { Link } from "react-router-dom";
import "./Banner.css";
import bannerImage from "../../Images/incendiary-fantastically-beautiful-girl-coat-eco-fur-moves-fun-picture-lovely-lady-pink-clothes-removebg-preview 1.png";

const Banner = () => {
  return (
    <div className="main-banner">
      <div className="banner-items">
        <h1>LET’S</h1>
        <h1>EXPLORE</h1>
        <h1 className="yellow">UNIQUE</h1>
        <h1>CLOTHES</h1>
        <p>Live for Influential and Innovative fashion!</p>
        <Link to={"/products"}>
          <button className="shopbtn">Shop Now</button>
        </Link>
      </div>
      <img src={bannerImage} alt="" />
    </div>
  );
};

export default Banner;
