import { useState, useEffect } from "react";

const useGithub = () => {
  const [token, setToken] = useState<any>({});
  useEffect(() => {
    parent.postMessage({ pluginMessage: { type: "get-github-token" } }, "*");
    window.onmessage = (event) => {
      try {
        setToken(JSON.parse(event?.data?.pluginMessage?.token));
      } catch (error) {
        console.error(error);
      }
    }
  }, []);
  return { token, setToken };
};

export { useGithub };
