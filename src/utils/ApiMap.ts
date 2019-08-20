import axios                 from "axios";
import {DASHBOARD_URL}       from "Constants/constants";
import {URLRedirect}         from "Utils/Utils";
import {setCookie}           from "Utils/cookie";
import {addExchangeDispatch} from "Redux/actions/actionWrappers";

const backendAPI = "https://backend-land.coinget.io/v3/public/api";
const CoinGetBaseLink = "http://api.coinget.io";
const CoinGetAuthLink = "http://api.coinget.io/api/v1/auth";
const proxy = "https://cors-anywhere.herokuapp.com/";

export const getCourse = (currentExchange: string, currentCurrency: string, currentDate: string) => {
    return axios.get(proxy + backendAPI + "/price/rate", {
        params: {
            marketCurrency: "USD",
            exchangeId: currentExchange,
            tradeCurrency: currentCurrency,
            date: currentDate
        }
    });
};

export const getMyUser = (token: string) => {
    return axios.post(CoinGetBaseLink + "/api/v1/me", {}, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });
};

export const authRequest = (data: FormData, apiPath: string) => {
    return axios.post(CoinGetAuthLink + apiPath, data);
};

export const dashboardRedirect = (token: string) => {
    localStorage.setItem('access_token', token);
    setCookie("access_token", token, 30);
    setCookie("domain", ".coinget.io", 30);
    setCookie("path", "/", 30);
    URLRedirect(DASHBOARD_URL);
};

export const getExchanges = (dispatch: Function) => {
    axios.get(proxy + backendAPI + "/info/exchanges", {})
        .then(response => {
            if (response.status === 200) {
                console.log("Exchanges:", response.data);
                // TODO make one more request for markets via this API link
                // https://backend.coinget.io/v3/public/api/info/markets?exchangeId=<Exchange>
                const exchanges = response.data;
                for (const exchange in exchanges) {
                    if (exchanges.hasOwnProperty(exchange)) {
                        // axios.get(api + "/markets", {
                        //   params: {
                        //     exchangeId: exchange
                        //   }
                        // })
                        //   .then(res => console.log(exchange + ": ", res.data))
                        //   .catch(err => console.log(err));
                        // currency request emulation, TODO: change setTimeout to API request when backend will be ready
                        setTimeout(() => {
                            const currencies = ["ETH", "BTC"];
                            dispatch(addExchangeDispatch({[exchange]: currencies}));
                        }, Math.random() * 500);
                    }
                }
            }


        })
        .catch(err => console.log("ERROR", err))
};
