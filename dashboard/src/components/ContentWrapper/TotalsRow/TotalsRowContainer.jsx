import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import SmallCard from "../../SmallCard/SmallCard";
import LineGraph from "../../AreaGraph/AreaGraph";
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		marginBottom: 25,
	},
}));

const chart = {
	width: 250,
	height: 100,
};

const baseUrl = "http://localhost:3000/api/";
const usersUrl = "users";
const postsUrl = "posts";

export default function TotalsRowContainer() {
	const classes = useStyles();

	const [users, setUsers] = useState([]);
	const [posts, setPosts] = useState([]);
	const [valuePublished, setValuePublished] = useState(0);
	async function getUsers() {
		let response;
		
		try {
		
			response = await axios.get(`${baseUrl}${usersUrl}`);
			const result = await response.data.data.users;

			if (result.length > 0) {
			
				await setUsers(result);
			}
		} catch (error) {
			
			console.log(error.msg)
		}
	}

	async function getPosts() {
		let response;
		
		try {
		
			response = await axios.get(`${baseUrl}${postsUrl}`);
			const result = await response.data.data;
		
			if (result.length > 0) {
				setPosts(result);
				setPublishedValue(result);
			}
		} catch (error){
			
			console.log(error);
		}
	}

	async function setPublishedValue(posts) {
		let publishedValue;
		if (posts.length > 0) {
			publishedValue = posts.reduce((acc, cur) => {
				return (acc + (cur.post.stock * cur.post.price));
			},0)			
			setValuePublished(publishedValue);			
		}
		
	}

	useEffect(() => {
		async function loadUsers() {
			await getUsers();
		}
		async function loadPosts() {
			await getPosts();
			
		}
		loadUsers();
		loadPosts();
	}, [])
	

	return (

		<div className={classes.root}>
			<Grid container spacing={1}>
				<Grid item xs={12} md={6} lg={3}>
					<SmallCard
						backgroundColor="default"
						title="Usuarios"
						total={users.length}
						chart={chart}
					/>
					<LineGraph />
				</Grid>
				<Grid item xs={12} md={6} lg={3}>
					<SmallCard
						backgroundColor="default"
						title="Posts"
						total={posts.length}
						chart={chart}
					/>
					<LineGraph />
				</Grid>
				<Grid item xs={12} md={6} lg={3}>
					<SmallCard
						backgroundColor="default"
						title="Valor Publicado"
						total={"$ " +  valuePublished }
						chart={chart}
					/>
					<LineGraph />
				</Grid>
				<Grid item xs={12} md={6} lg={3}>
					<SmallCard
						backgroundColor="default"
						title="Consultas"
						total="123"
						chart={chart}
					/>
					<LineGraph />
				</Grid>
			</Grid>
		</div>
	);
}
