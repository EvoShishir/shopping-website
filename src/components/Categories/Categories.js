import React from "react";
import "./Categories.css";
import hoodie from "../../Images/Rectangle 20.png";
import jacket from "../../Images/Rectangle 21.png";
import tee from "../../Images/Rectangle 22.png";

const Categories = () => {
  return (
    <div>
      <div className="main">
        <h1>NEW ARRIVALS!</h1>
      </div>
      <div className="grid">
        <div>
          <img src={hoodie} alt="" />
          <div className="text">
            <h5>Hoodies & Sweatshirt</h5>
            <p>Explore Now!</p>
          </div>
        </div>
        <div>
          <img src={jacket} alt="" />
          <div className="text">
            <h5>Coats & Parkas</h5>
            <p>Explore Now!</p>
          </div>
        </div>
        <div>
          <img src={tee} alt="" />
          <div className="text">
            <h5>Tees & T-Shirt</h5>
            <p>Explore Now!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
