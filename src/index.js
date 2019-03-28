import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./screens/App";
import { createStore, compose, applyMiddleware } from "redux";
import AppReducer from "./reducers/index.js";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
require('./assets/favicon.ico');
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    AppReducer,
    composeEnhancer(applyMiddleware(thunk)),
);

ReactDOM.render(
  <Provider store = {store}>
    <App />
  </Provider>,
  document.getElementById("root")
);  