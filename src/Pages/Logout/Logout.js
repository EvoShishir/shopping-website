import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { firebaseApp } from "../../firebaseconfig";
import { Navbar } from "react-bootstrap";

const Logout = () => {
  const auth = getAuth(firebaseApp);
  signOut(auth)
    .then(() => {
      console.log("Sign-out successful");
    })
    .catch((error) => {
      console.log(error);
    });
  return (
    <div>
      <Navbar></Navbar>
      Logged Out Successfully
    </div>
  );
};

export default Logout;
