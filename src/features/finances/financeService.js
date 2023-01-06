import axios from "axios";

// const API_URL = "/api/financeDetails";
const API_URL_PRODUCTION = "/api/financeDetails";
// const API_URL_PRODUCTION = `${process.env.REACT_APP_BASE_URL}/api/financeDetails`;

const createFinance = async (financeData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  let reqData = financeData.financeData;

  const response = await axios.post(API_URL_PRODUCTION, reqData, config);

  return response.data;
};

const getFinances = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL_PRODUCTION, config);

  return response.data;
};

const financeService = {
  createFinance,
  getFinances,
};

export default financeService;
