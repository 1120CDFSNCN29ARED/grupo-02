import './App.css';
import React from "react";
import Main from './components/Main/Main';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';


function App() {
	const darkTheme = createMuiTheme({
		palette: {
			type: "dark",
		},
	});
  return (
		<ThemeProvider theme={darkTheme}>
			<Main />
		</ThemeProvider>
	);
}

export default App;
