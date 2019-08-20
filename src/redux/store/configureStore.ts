import {createStore} from 'redux';
import RootReducer   from 'Redux/reducers/index';

export default function configureStore(initialState?: any) {
    return createStore(RootReducer, {rootReducer: initialState});
}
