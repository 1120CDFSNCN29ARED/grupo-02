import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import EditIcon from "@material-ui/icons/Edit";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: "100%",
		height: "100%",
    alignSelf: "center"
	},
	avatar: {
		backgroundColor: red[500],
	},
}));

export default function UserInformationCard(props) {
	const classes = useStyles();
	const [user, setUser] = useState(props.user);
	
	useEffect(() => {
		setUser(props.user);
	}, [user])

	return (
		<Card className={classes.root}>
			<CardHeader
				avatar={
					<Avatar aria-label="recipe" className={classes.avatar}>
						Avatar
					</Avatar>
				}
				action={
					<IconButton aria-label="edit user">
						<EditIcon />
					</IconButton>
				}
				title={props.user.firstName+" "+ props.user.lastName+" @ "+ props.user.userName}
				subheader={props.user.userID}
			/>
			<CardActions disableSpacing>
				<IconButton aria-label="View favorites">
					<FavoriteIcon />
				</IconButton>
				<IconButton aria-label="View cart">
					<ShoppingCartIcon />
				</IconButton>
			</CardActions>			
		</Card>
	);
}
