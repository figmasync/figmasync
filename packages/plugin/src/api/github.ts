import axios from "axios";
const github = {
  getAllIssues: async (accessToken, tokenType) => {
    const response = await axios.get(`https://api.github.com/issues`, {
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    });
    return response.data;
  },
};

export default github;
