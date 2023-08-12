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
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

const SingleProductPage = () => {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState({});

  const [value, setValue] = React.useState(0);

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProductData();
    window.scrollTo(0, 0);
  }, []);

  const fetchProductData = async () => {
    try {
      const { data } = await axios.get(`http://localhost:4000/products/${id}`);
      setProduct(data.product);
      setActiveImage(data.product.image);
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
    try {
      const productWithQuantity = { ...product, quantity };
      console.log(productWithQuantity);
      dispatch({ type: ADD_TO_CART, payload: productWithQuantity });
      toast.success("Item added to cart!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <ToastContainer />
      <div>
        <div className="single-product">
          <div className="product-image">
            <img
              src={`http://localhost:4000/images/${activeImage}`}
              alt=""
              draggable="false"
              className="image"
            />
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
            <p className="product-name-single">{product.name}</p>
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
        <h1
          style={{
            marginLeft: "100px",
          }}
        >
          Like your purchase? Leave a review!
        </h1>
        <div className="review-form">
          <div className="review-rating">
            <h3 style={{ marginBottom: "10px" }}>Rate the product:</h3>
            <Box
              sx={{
                "& > legend": { mt: 2 },
              }}
            >
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
            </Box>
          </div>
          <div>
            <h3>Say something about the product:</h3>
            <textarea />
          </div>
          <Button title="Post Review" />
        </div>
        <h1
          style={{
            marginLeft: "100px",
          }}
        >
          Reviews(4)
        </h1>

        <div className="review-container">
          <div className="review">
            <h3>Shishir</h3>
            <Box
              sx={{
                "& > legend": { mt: 2 },
              }}
            >
              <Rating name="read-only" value={5} readOnly />
            </Box>
            <p>Absolutely Loved the product!</p>
          </div>
          <div className="review">
            <h3>Shishir</h3>
            <Box
              sx={{
                "& > legend": { mt: 2 },
              }}
            >
              <Rating name="read-only" value={5} readOnly />
            </Box>
            <p>Absolutely Loved the product!</p>
          </div>
          <div className="review">
            <h3>Shishir</h3>
            <Box
              sx={{
                "& > legend": { mt: 2 },
              }}
            >
              <Rating name="read-only" value={5} readOnly />
            </Box>
            <p>Absolutely Loved the product!</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SingleProductPage;
