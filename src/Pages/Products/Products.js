import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout/Layout";
import "./Products.css";

const Products = () => {
  const { products } = useSelector((state) => state.product);
  console.log(products);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    const { data } = await axios.get("https://dummyjson.com/products");
    dispatch({ type: "STORE_PRODUCT", payload: data.products });
  };

  return (
    <Layout>
      <div className="products-container">
        {products?.map((product, key) => (
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
    </Layout>
  );
};

export default Products;
