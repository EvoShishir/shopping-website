import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./CrudCategories.css";
import AdminSidebar from "../../../components/AdminSidebar/AdminSidebar";
import { BsTrash } from "react-icons/bs";
import client from "../../../client/client";
import { Link } from "react-router-dom";

const CrudCategories = () => {
  const { categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [admin, setAdmin] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categoryNames, setCategoryNames] = useState({});

  useEffect(() => {
    if (user.role === "admin") {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  }, [user.role]);

  useEffect(() => {
    getAllCategories();
  }, []);

  const getAllCategories = async () => {
    try {
      const response = await client.get("/categories/all");
      dispatch({ type: "STORE_CATEGORY", payload: response.data.categories });
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await client.post("/categories/create", {
        name: newCategoryName,
      });

      const newCategory = await response.data;
      dispatch({ type: "ADD_CATEGORY", payload: newCategory });

      // Clear the input field after adding.
      setNewCategoryName("");
      window.location.reload(); // Reload the page after adding.
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleUpdateCategory = async (e, categoryId) => {
    e.preventDefault();
    try {
      const response = await client.put(`/categories/update/${categoryId}`, {
        name: categoryNames[categoryId],
      });

      const updatedCategory = response.data;
      dispatch({ type: "UPDATE_CATEGORY", payload: updatedCategory });

      // Clear the input field after updating.
      setCategoryNames((prevNames) => ({
        ...prevNames,
        [categoryId]: "",
      }));
      window.location.reload(); // Reload the page after updating.
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleRemoveCategory = async (categoryId) => {
    try {
      await client.delete(`/categories/delete/${categoryId}`);
      dispatch({ type: "REMOVE_CATEGORY", payload: categoryId });
      window.location.reload(); // Reload the page after removing.
    } catch (error) {
      console.error("Error removing category:", error);
    }
  };

  const handleChangeCategoryName = (categoryId, value) => {
    setCategoryNames((prevNames) => ({
      ...prevNames,
      [categoryId]: value,
    }));
  };

  return (
    <>
      {admin ? (
        <div className="admin-category-container">
          <AdminSidebar />
          <div className="admin-category-page">
            <div className="admin-categories">
              <form className="create-category" onSubmit={handleAddCategory}>
                <h3>New Category:</h3>
                <input
                  type="text"
                  placeholder="Electronics"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
                <button type="submit">Add</button>
              </form>
              {categories?.map((category) => (
                <div key={category._id}>
                  <div className="category-item">
                    <h2>{category.name}</h2>
                    <form
                      className="update-category"
                      onSubmit={(e) => handleUpdateCategory(e, category._id)}
                    >
                      <input
                        type="text"
                        placeholder="Electronics"
                        value={categoryNames[category._id] || ""}
                        onChange={(e) =>
                          handleChangeCategoryName(category._id, e.target.value)
                        }
                      />
                      <button type="submit">Update</button>
                    </form>
                    <button
                      className="remove-btn"
                      onClick={() => handleRemoveCategory(category._id)}
                    >
                      <BsTrash />
                    </button>
                  </div>
                </div>
              ))}
              <br />
            </div>
          </div>
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

export default CrudCategories;
