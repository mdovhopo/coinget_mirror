import { ADD_EXCHANGE} from 'Redux/actions/actionTypes';

const INIT_STATE = {
  exchanges: {},
};

const rootReducer = (state = INIT_STATE, action: ReduxAction) => {
  switch (action.type) {
    case ADD_EXCHANGE: {
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
