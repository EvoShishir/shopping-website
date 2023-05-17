import React, { useEffect } from "react";
import "./Categories.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

const Categories = () => {
  const { categories } = useSelector((state) => state.category);
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

  return (
    <div>
      <div className="main">
        <h1>ALL PRODUCT CATEGORIES</h1>
      </div>
      <div className="categories">
        {categories?.map((category, key) => (
          <div key={key}>
            <Link to={`/products?category=${category}`}>
              <button className="btn">{category}</button>
            </Link>
          </div>
        ))}
        <br />
      </div>
    </div>
  );
};

export default Categories;
