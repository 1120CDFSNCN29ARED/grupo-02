import React from 'react';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import PrimarySearchAppBar from '../AppBar/AppBar'
import SideBar from '../SideBar/SideBar';

function MainLayout() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  
  const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};
  return (
    <div>
      <PrimarySearchAppBar />
      <SideBar/>  
    </div>
  )
}

export default MainLayout
