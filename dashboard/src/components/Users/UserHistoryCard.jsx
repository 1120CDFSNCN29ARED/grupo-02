import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import HelpIcon from "@material-ui/icons/Help";
import { IconButton } from "@material-ui/core";
import axios from 'axios';

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
	const baseUrl = " http://localhost:3000/api/";
	const [user, setUser] = useState(props.user);
	const [favourites, setFavourites] = useState([]);
	const [numFaves, setNumFaves] = useState(0);
	const [questions, setQuestions] = useState([]);
	const [numQuestions, setNumQuestions] = useState(0);
	console.log("UserID: ", props.user.userID);
	async function getFavourites() {
		let response;
		
		
		try {
			
			response = await axios.get(`${baseUrl}/users/${props.user.userID}/favourites`);
			let result = await response.data.data.favourites;
		
			if (result.length >= 0) {
				
				setFavourites(result);
				setNumFaves(result.length);
			}

		} catch (error) {
			console.log("Error getting favourites:", error.msg);
		}
	}

	async function getQuestions(){
		let response;

		try {
			console.log("UserID: ", props.user.userID);
			response = await axios.get(`${baseUrl}/questions/user/${props.user.userID}`);
			let result = await response.data.data.questions;

			if (result.length >= 0) {
				
				setQuestions(result);
				setNumQuestions(result.length);
				console.log("Questions: ",result)
			}
		}catch(error){
			console.log("error getting questions: ", error.msg);
		}
	};

/* 	useEffect(() => {
		async function loadFavourites() {
			await getFavourites();
		}

		async function loadQuestions() {
			await getQuestions();
		}
		
		setUser(props.user);
		loadFavourites();
		loadQuestions();
		
	}, []) */

	useEffect(() => {
		async function loadFavourites() {
			await getFavourites();
		}

		async function loadQuestions() {
			await getQuestions();
		}

		setUser(props.user);
		loadFavourites();
		loadQuestions();
	}, [props.user]);
	

	return (
		<Card className={classes.root}>
			<CardContent>
				<Typography variant="body2" color="textSecondary" component="p">
					Historial
				</Typography>
			</CardContent>
			<CardContent>
				<Typography paragraph>
					<IconButton aria-label="View cart">
						<ShoppingCartIcon />
					</IconButton>
					Carts
				</Typography>
				<Typography paragraph>
					<IconButton aria-label="View favorites">
						<FavoriteIcon />
					</IconButton>
					Favoritos: {numFaves}
				</Typography>
				<Typography paragraph>
					<IconButton aria-label="View cart">
						<HelpIcon />
					</IconButton>
					Consultas: {numQuestions}
				</Typography>
			</CardContent>
		</Card>
	);
}
