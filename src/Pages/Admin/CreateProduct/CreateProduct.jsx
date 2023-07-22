import React, { useState, useEffect } from "react";
import client from "../../../client/client";
import { useNavigate } from "react-router-dom";
import "./CreateProduct.css";
import AdminSidebar from "../../../components/AdminSidebar/AdminSidebar";

const CreateProduct = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [stock, setStock] = useState(0);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch categories from /categories/all
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await client.get("/categories/all");
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("stock", stock);
    formData.append("category", selectedCategory);
    formData.append("image", imageFile);

    try {
      await client.post("/products/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Product created successfully, navigate to the product list page or show a success message
      navigate("/admin/products");
    } catch (error) {
      // Handle errors, show an error message, etc.
      console.error("Error creating product:", error);
    }
  };

  return (
    <div className="create-product">
      <AdminSidebar />
      <div className="create-product-container">
        <h2>Create New Product</h2>
        <form className="create-product-form" onSubmit={handleSubmit}>
          <div>
            <label>Product Name:</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Price:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Stock:</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Image:</label>
            <input type="file" onChange={handleImageChange} required />
          </div>
          <button
            className="create-product-btn"
            onClick={handleSubmit}
            type="submit"
          >
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
