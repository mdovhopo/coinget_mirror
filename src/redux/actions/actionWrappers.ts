import {ADD_EXCHANGE} from "Redux/actions/actionTypes";

export const addExchangeDispatch = (payload: string) => ({
    type: ADD_EXCHANGE,
    payload: payload
});
