import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { HashLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import "./CrudProducts.css";
import AdminSidebar from "../../../components/AdminSidebar/AdminSidebar";
import { BsTrash } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import client from "../../../client/client";

const CrudProducts = () => {
  const { products } = useSelector((state) => state.product);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    if (user.role === "admin") {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  }, [user.role]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("http://localhost:4000/products/all");
      dispatch({ type: "STORE_PRODUCT", payload: data.products });
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      });
    }
  };

  const createProduct = () => {
    return navigate("/admin/products/create");
  };

  const handleProductEdit = () => {
    return;
  };

  const handleRemoveProduct = async (id) => {
    try {
      await client.delete(`/products/delete/${id}`);
      dispatch({ type: "REMOVE_PRODUCT", payload: id });
      window.location.reload(); // Reload the page after removing.
    } catch (error) {
      console.error("Error removing category:", error);
    }
  };

  return (
    <>
      {admin ? (
        <div className="dashboard">
          <AdminSidebar />
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
            <div>
              <button onClick={createProduct} className="admin-btn">
                Add New Product
              </button>
              <div className="admin-products-container">
                <div className="admin-items-container">
                  <h3>Image</h3>
                  <h3>Title</h3>
                  <h3>Description</h3>
                  <h3>Price</h3>
                  <h3>Category</h3>
                  <h3>Stock</h3>
                </div>
                {products?.map((product) => (
                  <div className="admin-item" key={product._id}>
                    <div className="item">
                      <img
                        src={`http://localhost:4000/images/${product.image}`}
                        alt=""
                      />
                    </div>
                    <h4>{product?.name}</h4>
                    <h4>{product.description.slice(0, 20)}</h4>
                    <h4>${product.price}</h4>
                    <h4>{product.category?.name}</h4>
                    <h4>{product.stock}</h4>
                    <div className="admin-buttons">
                      <button
                        className="remove-btn"
                        onClick={() => handleProductEdit(product._id)}
                      >
                        <AiOutlineEdit />
                      </button>
                      <button
                        className="remove-btn"
                        onClick={() => handleRemoveProduct(product._id)}
                      >
                        <BsTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <h1>You do not have permission to view this page</h1>
          <Link to={"/"}>Go back</Link>
        </div>
      )}
    </>
  );
};

export default CrudProducts;
