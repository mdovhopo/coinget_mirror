import * as actionTypes from "Redux/actions/actionTypes";

export const addExchangeWrap = (payload) => ({
  type: actionTypes.ADD_EXCHANGE,
  payload: payload
});

export const cacheCoinDataWrap = (payload, id) => ({
  type: actionTypes.CACHE_COIN_DATA,
  payload: payload,
  id: id
});

export const addTokenToWatchWrap = (token, id) => ({
  type: actionTypes.ADD_TOKEN_TO_WATCH,
  token: token,
  id: id
});

export const updateTokenDataWrap = (token, payload) => ({
  type: actionTypes.UPDATE_TOKEN_DATA,
  token: token,
  payload: payload
});

export const saveWebSocketWrap = (ws) => ({
  type: actionTypes.SAVE_WEBSOCKET_REF,
  payload: ws
});