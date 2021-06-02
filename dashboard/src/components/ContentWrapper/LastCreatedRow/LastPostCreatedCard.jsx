import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import PostAddIcon from "@material-ui/icons/PostAdd";
import Typography from "@material-ui/core/Typography";
import axios from 'axios';
import { useState } from "react";
import { Avatar, Divider } from "@material-ui/core";

const useStyles = makeStyles({
	avatar: {
		marginBottom:5
	},
	content: {
		marginTop:5
	}

});

const baseUrl = "http://localhost:3000/api/";
const postsUrl = "posts";

export default function LastCreatedCard(props) {
	const classes = useStyles();

	const [lastPost, setLastPost] = useState([]);

	async function getPosts() {
		let response;

		try {
			response = await axios.get(`${baseUrl}${postsUrl}`);
			const result = response.data.data;

			if (result.length > 0) {
				console.log(result[result.length - 1].post);
				setLastPost(result[result.length - 1].post);
			}
		} catch (error) {
			console.log(error);
		}
	}
	useEffect(() => {
		getPosts();
		return () => {
			//
		};
	}, []);

	return (
		<Card className={classes.root}>
			<CardActionArea>
				<CardContent>
					<Avatar className={classes.avatar} variant="rounded">
						<PostAddIcon />
					</Avatar>
					<Divider />
					<Typography className={classes.content} gutterBottom variant="h5" component="h2">
						Último post creado
					</Typography>
					<Typography variant="body2" color="secondary" component="p">
						{lastPost.title}
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p">
						Creado: {lastPost.publishedDate}
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p">
						Stock: {lastPost.stock}
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