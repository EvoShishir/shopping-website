import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout/Layout";
import "./Products.css";
import { useLocation, useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import client, { baseURL } from "../../client/client";

const Products = () => {
  const { products, categoryProducts } = useSelector((state) => state.product);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryName = queryParams.get("category");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (categoryName) {
      getCategoryProducts();
    } else {
      getAllProducts();
    }
  }, []);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await client.get("/products/all");
      dispatch({ type: "STORE_PRODUCT", payload: data.products });
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      });
    }
  };

  const getCategoryProducts = async () => {
    try {
      setLoading(true);
      const { data } = await client.get(`/products/category/${categoryName}`);
      dispatch({ type: "ADD_CATEGORY_PRODUCT", payload: data.products });
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 0);
    }
  };

  const handleProductClick = (id) => navigate(`/products/${id}`);

  return (
    <Layout>
      {loading ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "320px",
          }}
        >
          <HashLoader color="orange" />
        </div>
      ) : (
        <div className="products-container">
          {categoryName
            ? categoryProducts?.map((categoryProduct) => (
                <div
                  className="product"
                  key={categoryProduct._id}
                  onClick={() => handleProductClick(categoryProduct._id)}
                >
                  <img
                    src={`${baseURL}/images/${categoryProduct.image}`}
                    alt={categoryProduct.name}
                    draggable="false"
                  />
                  <h4>{categoryProduct.name}</h4>
                  <p>{categoryProduct.description.slice(0, 40)}...</p>
                  <div className="price-and-btn">
                    <h4>${categoryProduct.price}</h4>
                  </div>
                </div>
              ))
            : products?.map((product) => (
                <div
                  className="product"
                  key={product._id}
                  onClick={() => handleProductClick(product._id)}
                >
                  <img
                    src={`${baseURL}/images/${product.image}`}
                    alt={product.name}
                    draggable="false"
                  />

                  <h4>{product.name}</h4>
                  <p>{product.description.slice(0, 40)}...</p>
                  <div className="price-and-btn">
                    <h4>${product.price}</h4>
                  </div>
                </div>
              ))}
        </div>
      )}
    </Layout>
  );
};

export default Products;
