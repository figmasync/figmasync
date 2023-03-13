import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/header.css";

const Header = () => {
  const navigate = useNavigate();

  const backButton = () => {
    return navigate(-1);
  };
  return (
    <div className="container">
      <button
        className="back-button"
        onClick={() => {
          backButton();
        }}
      >
        Back
      </button>
      <button className="logout-button">Logout</button>
    </div>
  );
};

export default Header;
