import * as actionTypes from '../actions/actionTypes';

const _state = {
  exchanges: {},
  cachedRequestedCoinData: {},
  coinData: {},
  webSocket: null,
  openLoginForm: false
};

const rootReducer = (state = _state, action) => {
  switch (action.type) {
    case actionTypes.ADD_EXCHANGE: {
      let key = Object.keys(action.payload)[0];
      return {
        ...state,
        exchanges: {
          ...state.exchanges,
          [key]: action.payload[key]
        }
      };
    }
    case actionTypes.CACHE_COIN_DATA:
      return {
        ...state,
        cachedRequestedCoinData: {
          ...state.cachedRequestedCoinData,
          [action.id]: action.payload
        }
      };
    case actionTypes.ADD_TOKEN_TO_WATCH: {
      const newState = {
        ...state,
        coinData: {
          ...state.coinData,
          [action.token]: state.cachedRequestedCoinData[action.id]
        }
      };
      delete newState.cachedRequestedCoinData[action.id];
      return newState;
    }
    case actionTypes.UPDATE_TOKEN_DATA: {
      const {token} = action;
      const {price} = action.payload;
      // set prePrice and price to the same value if this is the first update
      const prevPrice = state.coinData[token].prevPrice === 0 ? price : state.coinData[token].price;
      return {
        ...state,
        coinData: {
          ...state.coinData,
          [action.token]: {
            ...state.coinData[action.token],
            price: price,
            prevPrice: prevPrice
          }
        }
      };
    }
    case actionTypes.SAVE_WEBSOCKET_REF: {
      return {
        ...state,
        webSocket: action.payload
      }
    }
    default:
      return state;
  }
};

export default rootReducer;
