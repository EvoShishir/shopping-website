import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout/Layout";
import "./Products.css";
import { useLocation, useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { ADD_TO_CART } from "../../Redux/typings/reducerTypings";

const Products = () => {
  const { products, categoryProducts } = useSelector((state) => state.product);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryName = queryParams.get("category");
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      dispatch({ type: "ADD_CATEGORY_PRODUCT", payload: data.products });
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
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
            ? categoryProducts?.map((categoryProduct, key) => (
                <div className="product" key={key}>
                  <img
                    src={categoryProduct.thumbnail}
                    alt={categoryProduct.title}
                  />
                  <h4>{categoryProduct.title}</h4>
                  <p>{categoryProduct.description.slice(0, 40)}...</p>
                  <div className="price-and-btn">
                    <h4>${categoryProduct.price}</h4>
                    <button
                      className="cart-btn"
                      onClick={() => handleProductClick(categoryProduct.id)}
                    >
                      SHOW MORE INFO
                    </button>
                  </div>
                </div>
              ))
            : products?.map((product, key) => (
                <div className="product" key={key}>
                  <img src={product.thumbnail} alt={product.title} />

                  <h4>{product.title}</h4>
                  <p>{product.description.slice(0, 40)}...</p>
                  <div className="price-and-btn">
                    <h4>${product.price}</h4>
                    <button
                      className="cart-btn"
                      onClick={() => handleProductClick(product.id)}
                    >
                      SHOW MORE INFO
                    </button>
                  </div>
                </div>
              ))}
        </div>
      )}
    </Layout>
  );
};

export default Products;
