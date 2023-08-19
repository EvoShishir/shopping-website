import React, { useEffect } from "react";
import "./Categories.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import client from "../../client/client";

const Categories = () => {
  const { categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllCategories();
  }, []);

  const getAllCategories = async () => {
    const { data } = await client.get("/categories/all");
    dispatch({ type: "STORE_CATEGORY", payload: data.categories });
  };

  return (
    <div>
      <div className="main">
        <h1>ALL PRODUCT CATEGORIES</h1>
      </div>
      <div className="categories">
        {categories?.map((category) => (
          <div key={category._id}>
            <Link to={`/products?category=${category.name}`}>
              <button className="btn">{category.name}</button>
            </Link>
          </div>
        ))}
        <br />
      </div>
    </div>
  );
};

export default Categories;
