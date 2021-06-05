import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import HelpIcon from "@material-ui/icons/Help";

const useStyles = makeStyles((theme) => ({
	root: {
    maxWidth: "100%",
    height:"100%",
		marginTop: 5,
	},
	avatar: {
		backgroundColor: red[500],
	},
}));

export default function UserDataCard(props) {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<CardContent>
				<Typography variant="body2" color="textSecondary" component="p">
					Historial
				</Typography>
			</CardContent>
			<CardContent>
				<Typography paragraph>
					<ShoppingCartIcon /> Carts
				</Typography>
				<Typography paragraph>
					<FavoriteIcon />
					Favourites
				</Typography>
				<Typography paragraph>
					<HelpIcon />
					Questions
				</Typography>
			</CardContent>
		</Card>
	);
}
