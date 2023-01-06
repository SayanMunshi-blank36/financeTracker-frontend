import axios from "axios";

const API_URL = "/api/financeDetails";

const createFinance = async (financeData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  let reqData = financeData.financeData;

  const response = await axios.post(API_URL, reqData, config);

  return response.data;
};

const getFinances = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

const financeService = {
  createFinance,
  getFinances,
};

export default financeService;
