import * as actionTypes from "Redux/actions/actionTypes";

export const addExchangeWrap = (payload) => ({
  type: actionTypes.ADD_EXCHANGE,
  payload: payload
});
