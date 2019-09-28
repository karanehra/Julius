import ReactDOM from "react-dom";
import React from "react";
import Julius from "./julius";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./constants/theme";

const MUI_THEME = createMuiTheme(theme);

console.log(process.env)

store.subscribe(() => {
  localStorage.setItem("juliusStore", JSON.stringify(store.getState()));
});

ReactDOM.render(
  <ThemeProvider theme={MUI_THEME}>
    <Provider store={store}>
      <Router>
        <Julius />
      </Router>
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);
