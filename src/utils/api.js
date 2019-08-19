import axios from "axios";
import {DASHBOARD_URL} from "Constants/index";

const backendAPI = "https://backend-land.coinget.io/v3/public/api/price/rate";
const CoinGetBaseLink = "http://api.coinget.io";
const CoinGetAuthLink = "http://api.coinget.io/api/v1/auth";
const proxy = "https://cors-anywhere.herokuapp.com/";

export const getCourse = (currentExchange, currentCurrency, currentDate) => {
  return axios.get(proxy + backendAPI, {
    // headers: {
    //   'access-control-allow-origin': 'backend.coinget.io',
    //   'access-control-allow-methods': 'GET',
    //   'access-control-allow-headers': 'access-control-allow-origin',
    //   'access-control-expose-headers':
    //     'access-control-allow-origin,access-control-allow-methods,access-control-allow-headers'
    // },
    params: {
      marketCurrency: "USD",
      exchangeId: currentExchange,
      tradeCurrency: currentCurrency,
      date: currentDate
    }
  });
};

export const getMyUser = (token) => {
  console.log('Bearer ' + token);
  return axios.post(CoinGetBaseLink + "/api/v1/me", {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });
};

export const authRequest = (data, apiPath) => {
  console.log(`API Request ${CoinGetAuthLink + apiPath}`, data);
  return axios.post(CoinGetAuthLink + apiPath, data);
};

export const dashboardRedirect = (token) => {
  localStorage.setItem('access_token', token);
  window.location.href = DASHBOARD_URL;
};
