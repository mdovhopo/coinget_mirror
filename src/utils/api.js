import axios from "axios";

const backendAPI = "https://backend-land.coinget.io/v3/public/api/price/rate";
const loginAPI = "https://coinget.io/api";

export const getCourse = (currentExchange, currentCurrency, currentDate) => {
  return axios.get(backendAPI, {
    params:  {
          marketCurrency: "USD",
          exchangeId: currentExchange,
          tradeCurrency: currentCurrency,
          date: currentDate
    }
  });
};

export const getProfile = (token) => {
  return axios.get(loginAPI + "/profile", {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
};

export const authRequest = (data, apiPath, ) => {
  return axios.post(loginAPI + apiPath, data)
};

export const profileRedirect = (token) => {
  axios.get(loginAPI + "/profile", {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
    .then(() => {
      localStorage.setItem('token', token);
      window.location.href = "https://coinget.io/home";
    })
    .catch();
};


