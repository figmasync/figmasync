import { SERVER_V1_URL } from "../config";
import axios from "axios";

const getServerKeys = () => {
  return axios.post(
    `${SERVER_V1_URL}/poll`,
    {},
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
};

const getPollStatus = (codeVerifier) => {
  return axios.get(`${SERVER_V1_URL}/poll?code_verifier=${codeVerifier}`, {
    headers: {
      "content-type": "application/json",
    },
  });
};
export { getServerKeys, getPollStatus };
