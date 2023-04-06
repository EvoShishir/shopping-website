import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout/Layout";
import "./Products.css";
import { ClimbingBoxLoader } from "react-spinners";
import { useLocation } from "react-router-dom";

const Products = () => {
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  console.log(location, "loc");
  const queryParams = new URLSearchParams(location.search);
  const categoryName = queryParams.get("category");
  const dispatch = useDispatch();

  useEffect(() => {
    if (categoryName) {
      getCategoryProducts();
    } else {
      getAllProducts();
    }
  }, [categoryName]);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("https://dummyjson.com/products");
      dispatch({ type: "STORE_PRODUCT", payload: data.products });
      setVisibleProducts(data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  const getCategoryProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://dummyjson.com/products/category/${categoryName}`
      );
      setVisibleProducts(data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  return (
    <Layout>
      {loading ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "600px",
          }}
        >
          <ClimbingBoxLoader color="red" />
        </div>
      ) : (
        <div className="products-container">
          {visibleProducts?.map((product, key) => (
            <div className="product" key={key}>
              <img src={product.thumbnail} alt={product.title} />
              <h4>{product.title}</h4>
              <p>{product.description.slice(0, 40)}...</p>
              <div className="price-and-btn">
                <h4>${product.price}</h4>
                <button className="cart-btn">Add To Cart</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Products;
