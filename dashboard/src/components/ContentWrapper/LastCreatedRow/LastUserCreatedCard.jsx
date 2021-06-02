import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from 'axios';
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import { Avatar, Divider } from "@material-ui/core";

const useStyles = makeStyles({
	avatar: {
		marginBottom: 5,
	},
	content: {
		marginTop: 5,
	},
});

const baseUrl = "http://localhost:3000/api/";
const usersUrl = "users";



export default function LastCreatedCard(props) {
	const classes = useStyles();

	const [lastUser, setLastUser] = useState([]);

async function getUsers() {
	let response;

	try {
		response = await axios.get(`${baseUrl}${usersUrl}`);
		const result = response.data.data.users;

		if (result.length > 0) {
			console.log(result[result.length - 1]);;
			setLastUser(result[result.length - 1]);
		}
	} catch (error) {
		console.log(error.msg);
	}
}

useEffect(() => {
	getUsers();
	return () => {
		//
	};
}, []);
	
	return (
		<Card className={classes.root}>
			<CardActionArea>
				<CardContent>
					<Avatar
						className={classes.avatar}
						variant="rounded"
					>
						<PersonOutlineIcon />
					</Avatar>
					<Divider />
					<Typography
						className={classes.content}
						gutterBottom
						variant="h5"
						component="h2"
					>
						Último usuario creado
					</Typography>
					<Typography variant="body2" color="secondary" component="p">
						{lastUser.userName}: {lastUser.firstName} {lastUser.lastName}
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p">
						Creado: {lastUser.createdAt}
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p">
						id: {lastUser.userID}
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Button size="small" color="default">
					Ver
				</Button>
				<Button size="small" color="default">
					Editar
				</Button>
			</CardActions>
		</Card>
	);
}
