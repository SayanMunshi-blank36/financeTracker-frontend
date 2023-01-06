import axios from "axios";

// const API_URL = "/api/users/";
const API_URL_PRODUCTION = "/api/users/";
// const API_URL_PRODUCTION = `${process.env.REACT_APP_BASE_URL}/api/users/`;

const register = async (userData) => {
  const response = await axios.post(API_URL_PRODUCTION, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(API_URL_PRODUCTION + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
