import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./screens/App";
import { createStore, compose, applyMiddleware } from "redux";
import AppReducer from "./reducers/index.js";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { sessionService } from "redux-react-session";
require("./assets/favicon.ico");
import { validateSession } from "./actions/SessionActions.js";
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(AppReducer, composeEnhancer(applyMiddleware(thunk)));

const options = {
  refreshOnCheckAuth: true,
  redirectPath: "/",
  driver: "LOCALSTORAGE",
  validateSession
};

sessionService
  .initSessionService(store, options)
  .then(() => {
    validateSession();
    //App will be rendered after session init
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById("root")
    );
  })
  .catch(err => {
    console.log(err);
  });
