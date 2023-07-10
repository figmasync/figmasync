import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GITHUB_LOGIN_URL } from "../../config";
import { useGithub } from "../hooks/github";
import "../css/login.css";
import { getServerKeys, getPollStatus } from "../../api/server";

// const Login = () => {
//   const [token, setToken] = useState("");
//   const navigate = useNavigate();
//   const { token: githubToken } = useGithub();
//   const loginWithGithub = () => {
//     window?.open(GITHUB_LOGIN_URL);
//   };
//   const saveToken = () => {
//     parent.postMessage(
//       { pluginMessage: { type: "save-github-token", token } },
//       "*"
//     );
//   };
//   useEffect(() => {
//     window.onmessage = (event: any) => {
//       const { type } = event.data.pluginMessage;
//       if (type === "save-github-token-success") {
//         navigate("/issues");
//       } else {
//         parent.postMessage(
//           {
//             pluginMessage: {
//               type: "show-notification",
//               message: "Something went wrong !",
//             },
//           },
//           "*"
//         );
//       }
//     };
//   }, []);
//   useEffect(() => {
//     if (githubToken) {
//       navigate("/issues");
//     }
//   }, [githubToken]);

//   return (
//     <div className="github-login">
//       <button
//         onClick={() => {
//           loginWithGithub();
//         }}
//         className="github-login-button"
//       >
//         Sign in with GitHub
//       </button>
//       <div className="github-access-token">
//         <label htmlFor="access-token">Access Token:</label>
//         <input
//           id="access-token"
//           type="text"
//           value={token}
//           onChange={(event: any) => {
//             setToken(event.target.value);
//           }}
//         />
//         <button
//           onClick={() => {
//             saveToken();
//           }}
//         >
//           Save
//         </button>
//       </div>
//     </div>
//   );
// };

const GitHubLoginButton = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [keys, setKeys] = useState<any>({});
  const [, setPollStatus] = useState("pending");
  const { token: githubToken } = useGithub();

  const saveToken = (token: string) => {
    parent.postMessage(
      { pluginMessage: { type: "save-github-token", token } },
      "*"
    );
  };

  const generateCodeChallenge = async () => {
    try {
      setLoading(true);
      const keys = await getServerKeys();
      setKeys(keys?.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    window.onmessage = (event: any) => {
      const { type } = event.data.pluginMessage;
      if (type === "save-github-token-success") {
        navigate("/issues");
      }
    };
  }, []);

  useEffect(() => {
    if (githubToken) {
      // call api for user for verifying token
      navigate("/issues");
    } else {
      generateCodeChallenge();
    }
  }, [githubToken]);
  const checkPoll = async () => {
    try {
      const pollStatusResponse = await getPollStatus(keys?.code_verifier);
      if (pollStatusResponse?.data?.access_token) {
        setPollStatus("completed");
        saveToken(pollStatusResponse?.data);
      } else {
        setTimeout(checkPoll, 2000);
      }
    } catch (error) {
      console.log(error);
      setPollStatus("error");
    }
  };
  useEffect(() => {
    if (keys?.code_verifier) {
      checkPoll();
    }
  }, [keys]);
  if (isLoading) {
    return <div>Loading...........</div>;
  }
  return (
    <div className="centered-container">
      <button
        className="github-login-button"
        onClick={() => {
          window?.open(`${GITHUB_LOGIN_URL}?code=${keys?.code_challenge}`);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
        <span>Login with GitHub</span>
      </button>
    </div>
  );
};

export default GitHubLoginButton;

// export default Login;
