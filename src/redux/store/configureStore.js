import { createStore }  from 'redux';
import RootReducer      from '../reducers';

export default function configureStore(initialState) {
  return createStore(RootReducer,  {rootReducer: initialState});
}
