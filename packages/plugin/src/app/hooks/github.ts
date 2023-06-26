import { useState, useEffect } from "react";

const useGithub = () => {
  const [token, setToken] = useState<any>(undefined);
  useEffect(() => {
    parent.postMessage({ pluginMessage: { type: "get-github-token" } }, "*");
    window.onmessage = (event) => {
      try {
        if (
          event?.data?.pluginMessage?.token &&
          event?.data?.pluginMessage?.token?.length > 0
        ) {
          setToken(JSON.parse(event?.data?.pluginMessage?.token));
        } else {
          setToken(undefined);
        }
      } catch (error) {
        console.error(error);
      }
    };
  }, []);
  return { token, setToken };
};

export { useGithub };
