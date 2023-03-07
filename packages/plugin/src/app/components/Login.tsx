import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GITHUB_LOGIN_URL } from "../../config";
import "./login.css";

const Login = () => {
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const loginWithGithub = () => {
    window?.open(GITHUB_LOGIN_URL);
  };
  const saveToken = () => {
    parent.postMessage(
      { pluginMessage: { type: "save-github-token", token } },
      "*"
    );
  };
  useEffect(() => {
    window.onmessage = (event: any) => {
      const { type } = event.data.pluginMessage;
      if (type === "save-github-token-success") {
        navigate("/issues");
      } else {
        parent.postMessage(
          {
            pluginMessage: {
              type: "show-notification",
              message: "Something went wrong !",
            },
          },
          "*"
        );
      }
    };
  }, []);
  return (
    <div className="github-login">
      <button
        onClick={() => {
          loginWithGithub();
        }}
        className="github-login-button"
      >
        Sign in with GitHub
      </button>
      <div className="github-access-token">
        <label htmlFor="access-token">Access Token:</label>
        <input
          id="access-token"
          type="text"
          value={token}
          onChange={(event: any) => {
            setToken(event.target.value);
          }}
        />
        <button
          onClick={() => {
            saveToken();
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Login;