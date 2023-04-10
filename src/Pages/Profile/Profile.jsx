import React from "react";
import Layout from "../../components/Layout/Layout";
import { useSelector } from "react-redux";
import avatar from "../../Images/blank-profile.png";
import "./Profile.css";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <Layout>
      <div className="profile">
        {user.avatar ? (
          <img
            style={{ height: 150, width: 150 }}
            src={user.avatar}
            alt={user.name}
          />
        ) : (
          <img
            style={{ height: 150, width: 150 }}
            src={avatar}
            alt={user?.name}
          />
        )}
        <div className="info">
          <h1>{user?.name}</h1>
          <h3>Email: {user?.email}</h3>
        </div>
      </div>
      <div>
        <div>
          <table className="table">
            <tr>
              <th>Order No.</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Date ordered</th>
            </tr>
            <tr>
              <th>1</th>
              <td>iPhone 9</td>
              <td>$549</td>
              <td>4 April, 2023</td>
            </tr>
            <tr>
              <th>2</th>
              <td>iPhone X</td>
              <td>$899</td>
              <td>4 April, 2023</td>
            </tr>
            <tr>
              <th>3</th>
              <td>Samsung Universe 9</td>
              <td>$1249</td>
              <td>4 April, 2023</td>
            </tr>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
