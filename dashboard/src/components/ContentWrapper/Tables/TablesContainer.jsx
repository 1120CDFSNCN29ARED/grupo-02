import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import UserTable from './UserTable';
import PostsTable from './PostsTable';
import { Divider } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		marginBottom: 10
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: "center",
		color: theme.palette.text.secondary,
	},
}));

export default function TablesContainer(props) {
	const classes = useStyles();
	const category = props.category;
	const baseUrl = "http://localhost:3000/api/";
	const [users, setUsers] = useState([]);
	const [posts, setPosts] = useState([]);
	
	async function getUsers() {
		let response;
		try {
			
			response = await axios.get(`${baseUrl}${category}`);
			const result = response.data.data.users;
			
			if (result.length > 0) {
				setUsers(result);
			}
				
		} catch (error) {
			
			console.log("Error: ", error.msg);
		}
	}

	async function getPosts() {
		let response;
		try {
			response = await axios.get(`${baseUrl}${category}`);
			const result = response.data.data;

			if (result.length > 0) {
				setPosts(result);
				return;
			}
		} catch (error) {
			console.log("Error: ", error.msg);
		}
	}

	useEffect(() => {
		category === "users" ? getUsers() : getPosts();
	}, [])
	
	return (
		<div className={classes.root}>
			<Grid container spacing={3}>
				<Grid item xs={12}>					
					{category === "users" ? (
						<UserTable categoryData={users} />
					) : category === "posts" ? (
						<PostsTable categoryData={posts} />
					) : (
						""
					)}
				</Grid>
			</Grid>
		</div>
	);
}
