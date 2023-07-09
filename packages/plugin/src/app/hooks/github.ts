import { useState, useEffect } from "react";

const useGithub = () => {
  const [token, setToken] = useState<any>(undefined);
  useEffect(() => {
    parent.postMessage({ pluginMessage: { type: "get-github-token" } }, "*");
  }, []);
  useEffect(() => {
    window.onmessage = (event: any) => {
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
        console.log(error);
      }
    };
  }, []);
  return { token, setToken };
};

export { useGithub };
