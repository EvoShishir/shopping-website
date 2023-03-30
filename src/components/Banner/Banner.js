import React from "react";
import { Link } from "react-router-dom";
import "./Banner.css";

const Banner = () => {
  return (
    <div className="main-banner">
      <div className="banner-items">
        <h1>
          <span className="white-bg">LET’S</span>
          <br />
          EXPLORE
          <br />
          <span className="yellow-bg">UNIQUE</span>
          <br />
          CLOTHES.
        </h1>
        <p>Live for Influential and Innovative fashion!</p>
        <Link to={"/nigga"}>
          <button className="shopbtn">Shop Now</button>
        </Link>
      </div>
      <div className="image">
        <img
          src={require(`../../Images/incendiary-fantastically-beautiful-girl-coat-eco-fur-moves-fun-picture-lovely-lady-pink-clothes-removebg-preview 1.png`)}
          alt=""
        />
      </div>
    </div>
  );
};

export default Banner;
