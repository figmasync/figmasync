const GITHUB_SCOPE = "repo";
const GITHUB_LOGIN_URL = `https://github.com/login/oauth/authorize?scope=${GITHUB_SCOPE}`;
const GITHUB_ACCESS_TOKEN_URL = "https://github.com/login/oauth/access_token";
const GITHUB_USER_API = "https://api.github.com/user";
export {
  GITHUB_LOGIN_URL,
  GITHUB_SCOPE,
  GITHUB_ACCESS_TOKEN_URL,
  GITHUB_USER_API,
};
