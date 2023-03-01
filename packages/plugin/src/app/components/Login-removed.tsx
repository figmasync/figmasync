import React, { useEffect, useState } from "react";
import { GITHUB_LOGIN_URL } from "../../config";
import ListIssue from "./ListIssue";
import { useGithub } from "../hooks/github";
import {useRoutes} from '../hooks/routes';

const Login = () => {
  const [open, setOpen] = useState(true);
  const [showIssue, setShowIssue] = useState(false);
  const [, setRoutes] = useRoutes();
  const [token, setToken] = useState<string | undefined>("");
  const { token: githubToken, setToken: setGithubToken } = useGithub();
  // redirect to login
  const loginWithGithub = () => {
    setOpen(true);
    window?.open(GITHUB_LOGIN_URL);
  };
  // save github token to local storage
  const saveToken = () => {
    parent.postMessage(
      { pluginMessage: { type: "save-github-token", token } },
      "*"
    );
  };
  const logout = () => {
    parent.postMessage({ pluginMessage: { type: "remove-github-token" } }, "*");
  };
  // listen to messages from plugin controller
  useEffect(() => {
    try {
      window.onmessage = (event: any) => {
        const { type } = event.data.pluginMessage;
        if (type === "save-github-token-success") {
          setShowIssue(true);
        }
        if (type === "save-github-token-error") {
          setOpen(false);
        }
        if (type === "get-github-token-success") {
          try {
            setGithubToken(JSON.parse(event?.data?.pluginMessage?.token));
          } catch (error) {
            console.error(error);
          }
        }
        if (type === "remove-github-token-success") {
          setOpen(false);
          setShowIssue(false)
          setRoutes('/')
        }
      };
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    if (githubToken?.access_token) {
      setShowIssue(true);
    }
  }, [githubToken]);
  if (showIssue) {
    return (
      <>
        <button
          onClick={() => {
            logout();
          }}
        >
          logout
        </button>
        <ListIssue />
      </>
    );
  }
  return (
    <div>
      {open && (
        <>
          <input
            type="text"
            value={token}
            placeholder="Enter your github access token"
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
        </>
      )}
      {!open && (
        <button
          onClick={() => {
            loginWithGithub();
          }}
        >
          Login with github
        </button>
      )}
    </div>
  );
};

export default Login;
