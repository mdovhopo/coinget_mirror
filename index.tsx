import React          from 'react';
import ReactDOM       from 'react-dom';
import {Provider}     from "react-redux";
import App            from "Components/App"
import 'bootstrap/dist/css/bootstrap.min.css';
import "Style/style";
import configureStore from "Redux/store/configureStore";

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('app-root')
);
