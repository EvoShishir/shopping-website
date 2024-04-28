import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import "./SingleProductPage.css";
import Button from "../../components/core/Button/Button";
import { useNavigate, useParams } from "react-router-dom";
import { ADD_TO_CART } from "../../Redux/typings/reducerTypings";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import client, { baseURL } from "../../client/client";

const SingleProductPage = () => {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState({});
  const [reviews, setReviews] = useState([]);
  const [productOrdered, setProductOrdered] = useState(null);

  const [value, setValue] = React.useState(0);
  const [reviewDescription, setReviewDescription] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProductData();
    fetchProductReviews();
    checkProductOrder();
    window.scrollTo(0, 0);
  }, []);

  const fetchProductData = async () => {
    try {
      const { data } = await client.get(`/products/${id}`);
      setProduct(data.product);
      setActiveImage(data.product.image);
    } catch (error) {
      navigate("/products");
      alert(error.response.data?.message);
    }
  };

  const fetchProductReviews = async () => {
    try {
      const { data } = await client.get(`/reviews/${id}`);
      const reviews = data.reviews;
      setReviews(reviews);
    } catch (error) {
      alert(error.response.data?.message);
    }
  };

  const handleFieldChange = (e) => {
    setReviewDescription({
      ...reviewDescription,
      [e.target.name]: e.target.value,
    });
    console.log(reviewDescription, "reviewDescription");
  };

  const placeProductReview = async (e) => {
    e.preventDefault();
    try {
      if (value === 0) {
        return toast.error("You must provide a rating", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      await client.post(`/reviews/create/${id}`, {
        rating: value,
        ...reviewDescription,
      });
      window.location.reload();
    } catch (error) {
      toast.error(error.response.data?.error, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const checkProductOrder = async () => {
    try {
      const { data } = await client.get(`/orders/check-order/${id}`);
      if (data.ordered === true) {
        setProductOrdered(true);
      } else if (data.ordered === false) {
        setProductOrdered(false);
      }
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 400) {
        setProductOrdered(false);
      }
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
              src={`${baseURL}/images/${activeImage}`}
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
        {productOrdered ? (
          <section className="reviewContainer">
            <br />
            <h1>Like your purchase? Leave a review!</h1>
            <br />
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
                <textarea
                  name="description"
                  onChange={(e) => handleFieldChange(e)}
                />
              </div>
              <Button title="Post Review" onClick={placeProductReview} />
            </div>
            <br />
          </section>
        ) : (
          <></>
        )}
        <br />
        <h1
          style={{
            marginLeft: "100px",
          }}
        >
          Reviews({reviews.length})
        </h1>
        <div className="review-container">
          {reviews?.map((review) => (
            <div className="review" key={review._id}>
              <h3>{review.user.name}</h3>
              <Box
                sx={{
                  "& > legend": { mt: 2 },
                }}
              >
                <Rating name="read-only" value={review.rating} readOnly />
              </Box>
              <p>{review.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default SingleProductPage;
