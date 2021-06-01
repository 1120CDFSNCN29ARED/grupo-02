import './App.css';
import React from "react";
import Main from './components/Main/Main';
import LineGraph from "./components/AreaGraph/AreaGraph";
import SmallCard from "./components/SmallCard/SmallCard";
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';


function App() {
  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });
  const chart = {
    width: 250,
    height: 150,
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <Main />
      <SmallCard
        backgroundColor="red"
        title="Usuarios"
        total="123"
        chart={chart}
      />
      <LineGraph />
    </ThemeProvider>
  );
}
export default App;
