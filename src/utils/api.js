import axios from "axios";
import {DASHBOARD_URL} from "Constants/index";
import URLRedirect from "Utils/URLRedirect";
import {setCookie} from "Utils/cookie";

const backendAPI = "https://backend-land.coinget.io/v3/public/api/price/rate";
const CoinGetBaseLink = "http://api.coinget.io";
const CoinGetAuthLink = "http://api.coinget.io/api/v1/auth";
const proxy = "https://cors-anywhere.herokuapp.com/";

export const getCourse = (currentExchange, currentCurrency, currentDate) => {
  return axios.get(proxy + backendAPI, {
    params: {
      marketCurrency: "USD",
      exchangeId: currentExchange,
      tradeCurrency: currentCurrency,
      date: currentDate
    }
  });
};

export const getMyUser = (token) => {
  return axios.post(CoinGetBaseLink + "/api/v1/me", {}, {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });
};

export const authRequest = (data, apiPath) => {
  return axios.post(CoinGetAuthLink + apiPath, data);
};

export const dashboardRedirect = (token) => {
  localStorage.setItem('access_token', token);
  setCookie("access_token", token, 30);
  setCookie("domain", ".coinget.io", 30);
  setCookie("path", "/", 30);
  URLRedirect(DASHBOARD_URL);
};
