import axios from "axios";
import {DASHBOARD_URL} from "Constants/index";

const backendAPI = "https://backend-land.coinget.io/v3/public/api/price/rate";
const loginAPI = "https://coinget.io/api";
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

export const getProfile = (token) => {
  console.log("About to get profile", token);
  return axios.get(loginAPI + "/profile", {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
};

export const authRequest = (data, apiPath,) => {
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
      window.location.href = DASHBOARD_URL;
    })
    .catch();
};



