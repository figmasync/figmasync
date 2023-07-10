import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/header.css";

const Header = () => {
  const navigate = useNavigate();

  const backButton = () => {
    return navigate(-1);
  };
  const logout = () => {
    parent.postMessage({ pluginMessage: { type: "remove-github-token" } }, "*");
    parent.postMessage(
      {
        pluginMessage: {
          type: "show-notification",
          message: "Logout successful",
        },
      },
      "*"
    );
    parent.postMessage(
      {
        pluginMessage: {
          type: "close-plugin",
        },
      },
      "*"
    );
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
      <button onClick={logout} className="logout-button">
        Logout
      </button>
    </div>
  );
};

export default Header;
