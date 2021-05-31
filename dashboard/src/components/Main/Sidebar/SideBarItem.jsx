import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import Icon from '@material-ui/core/Icon';
import React from 'react'

function SideBarItem(props) {
  const ItemIcon = props.listItemIcon;
  return (
		<ListItem button>
      <ListItemIcon>{ItemIcon}</ListItemIcon>
			<ListItemText primary={props.itemText} />
		</ListItem>
	);
}

export default SideBarItem

/* {
	I Have NOT WORKED OUT HOW TO DYNAMICALLY RENDER THE ICON DEPENDING ON THE ITEM NAME.
}
{
	["Users", "Posts", "Sales", "Carts", "Favourites"].map((text, index) => (
		<SideBarItem itemText={text} icon="MailIcon" />
	));
} */