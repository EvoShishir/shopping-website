import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import client from "../../client/client";

const ProtectedRoute = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  const checkIfLoggedIn = async () => {
    try {
      const response = await client.get("/users/me");
      if (response.status === 200) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 401 || error.response.status === 400) {
        setIsLoggedIn(false);
        dispatch({ type: "LOGOUT_USER" });
      }
    }
  };

  console.log(isLoggedIn);

  if (!user) return <Navigate to={"/login"} />;
  return children;
};

export default ProtectedRoute;
