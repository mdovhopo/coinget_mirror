import * as actionTypes from '../actions/actionTypes';

const _state = {
  exchanges: {},
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
    default:
      return state;
  }
};

export default rootReducer;
