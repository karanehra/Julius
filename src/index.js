import ReactDOM from "react-dom";
import React from "react";
import Julius from "./components/app";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <Router>
    <Julius />
  </Router>,
  document.getElementById("root")
);
