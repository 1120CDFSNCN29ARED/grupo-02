import "./App.css";
import React from "react";
import Main from "./components/Main/Main";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import Bars from "./components/Bars/Bars";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import PostsContainer from "./components/Posts/PostsContainer";

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
        <Router>
          <Bars />
          <Switch>
            <Route path="/users">
              <UsersContainer />
            </Route>
            <Route path="/posts">
              <PostsContainer />
            </Route>
            <Route path="/" exact>
              <Main />
            </Route>
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
}
export default App;
