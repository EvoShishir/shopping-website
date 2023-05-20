import React from "react";
import "./Brands.css";
import brand1 from "../../Images/Rectangle 36.png";
import brand2 from "../../Images/Rectangle 38.png";
import brand3 from "../../Images/Rectangle 41.png";
import brand4 from "../../Images/Rectangle 43.png";
import brand5 from "../../Images/Rectangle 44.png";
import brand6 from "../../Images/Rectangle 45.png";

const Brands = () => {
  const brandImages = [brand1, brand2, brand3, brand4, brand5, brand6];

  return (
    <div className="brands">
      {brandImages.map((image, key) => {
        return <img src={image} alt="" draggable="false" key={key} />;
      })}
    </div>
  );
};

export default Brands;
