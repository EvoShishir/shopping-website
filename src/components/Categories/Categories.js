import React, { useEffect } from "react";
import "./Categories.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const { categories } = useSelector((state) => state.category);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getAllCategories();
  }, []);

  const getAllCategories = async () => {
    const { data } = await axios.get(
      "https://dummyjson.com/products/categories"
    );
    dispatch({ type: "STORE_CATEGORY", payload: data });
  };

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category}`);
  };

  return (
    <div>
      <div className="main">
        <h1>ALL PRODUCT CATEGORIES</h1>
      </div>
      <div className="categories">
        {categories?.map((category, key) => (
          <div key={key}>
            <button
              className="btn"
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          </div>
        ))}
        <br />
      </div>
    </div>
  );
};

export default Categories;
