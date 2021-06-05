import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import LastCreatedCard from './LastCreatedCard';
import InformationCard from "./InformationCard";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

const baseUrl = "http://localhost:3000/api/";
const postsUrl = "posts";
const usersUrl = "users";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		marginBottom: 10,
		justify: "centre",
	},
	cardItem: {
		marginBottom: 10,
	},
}));

export default function LastAndCategoryInformationContainer() {
	const classes = useStyles();
	const [lastPost, setLastPost] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [parts, setParts] = useState([]);
  const [lastUser, setLastUser] = useState ([]);

	
  async function getPosts() {
		let response;

		try {
			response = await axios.get(`${baseUrl}${postsUrl}`);
			const result = response.data.data;

			if (result.length > 0) {
        setLastPost(result[result.length - 1].post);
			}
		} catch (error) {
			console.log(error);
		}
  }
  
  async function getUsers() {
		let response;

		try {
			response = await axios.get(`${baseUrl}${usersUrl}`);
			const result = response.data.data.users;

			if (result.length > 0) {
				setLastUser(result[result.length - 1]);
			}
		} catch (error) {
			console.log(error.msg);
		}
  }
  
	useEffect(() => {
    getUsers();
    getPosts();
		return () => {
			//
		};
	}, []);
	return (
		<div className={classes.root}>
			<Grid container xs={12} md={12} spacing={2}>
				<Grid item xs={12} md={8} spacing={3}>
					<Grid item className={classes.cardItem} xs={12} spacing={3}>
            <LastCreatedCard
              category="users"
              title="Último usuario creado"
              subtitle={lastUser.firstName + " " + lastUser.lastName + " (" + lastUser.userName + ")"}
              createdAt={lastUser.createdAt}
							_id={lastUser.userID}
						/>
					</Grid>
					<Grid item xs={12} spacing={3}>
						<LastCreatedCard
							category="posts"
              title="Último posteo generado"
              subtitle={lastPost.title}
							createdAt={lastPost.publishedDate}
							_id={lastPost.postID}
						/>
					</Grid>
				</Grid>
				<Grid item xs={12} md={4} spacing={3}>
					<Grid item className={classes.cardItem} xs={12} spacing={3}>
						<InformationCard
							category="Véhiculos"
							count={10}
							image="car"
							value="$100.000"
						/>
					</Grid>
					<Grid item xs={12} spacing={3}>
						<InformationCard
							image="part"
							category="Repuestos"
							count={5}
							value="$150.000"
						/>
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
}
