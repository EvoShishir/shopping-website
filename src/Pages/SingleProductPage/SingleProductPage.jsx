import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import "./SingleProductPage.css";
import Button from "../../components/core/Button/Button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ADD_TO_CART } from "../../Redux/typings/reducerTypings";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SingleProductPage = () => {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const notify = () => {
  //   toast.success("Item added to cart!", {
  //     position: toast.POSITION.BOTTOM_RIGHT,
  //   });
  // };

  useEffect(() => {
    fetchProductData();
  }, [id]);
  const fetchProductData = async () => {
    try {
      const { data } = await axios.get(`https://dummyjson.com/products/${id}`);
      setProduct(data);
      setActiveImage(data.images[0]);
    } catch (error) {
      navigate("/products");
      alert(error.response.data?.message);
    }
  };

  const handleQuantity = (type) => {
    if (type === "-" && quantity !== 1) {
      setQuantity((quantity) => quantity - 1);
    } else if (type === "+" && product.stock !== quantity) {
      setQuantity((quantity) => quantity + 1);
    }
  };

  const handleAddToCart = (product) => {
    const productWithQuantity = { ...product, quantity };
    dispatch({ type: ADD_TO_CART, payload: productWithQuantity });
    toast.success("Item added to cart!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  return (
    <Layout>
      <ToastContainer />
      <div className="single-product">
        <div className="product-image">
          <img src={activeImage} alt="" draggable="false" className="image" />
          <div className="additional-images">
            {product.images?.map((image, key) => (
              <img
                src={image}
                alt=""
                key={key}
                draggable="false"
                onClick={() => setActiveImage(image)}
              />
            ))}
          </div>
        </div>
        <div className="product-info">
          <p className="product-name">{product.title}</p>
          <p className="product-price">${product.price}</p>
          <div className="quantity">
            <button
              className="selector-btn"
              onClick={() => handleQuantity("-")}
            >
              -
            </button>
            <p className="product-quantity">{quantity}</p>
            <button
              className="selector-btn"
              onClick={() => handleQuantity("+")}
            >
              +
            </button>
          </div>
          <Button
            title="Add to Cart"
            onClick={() => handleAddToCart(product)}
          />

          <div className="product-description">
            <p className="description">{product.description}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SingleProductPage;
