import "./App.css";
import React from "react";
import Main from "./components/Main/Main";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import Bars from "./components/Bars/Bars";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
    },
  }));
  const classes = useStyles();
  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.root}>
        <Bars />
        <Router>
          <Switch>
            <Route path="/">
              <Main />
            </Route>
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
}
export default App;
