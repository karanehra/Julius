import ReactDOM from "react-dom";
import React from "react";
import Julius from "./components/app";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Julius />
    </Router>
  </Provider>,
  document.getElementById("root")
);
