import ReactDOM from "react-dom";
import React from "react";
import Julius from "./components/julius";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#f27573",
      main: "#ef5350",
      dark: "#a73a38"
    },
    secondary: {
      light: "#8561c5",
      main: "#673ab7",
      light: "#482880"
    }
  },
  
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <Router>
        <Julius />
      </Router>
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);
