import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import LastCreatedCard from './LastCreatedCard';
import InformationCard from "./InformationCard";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

const baseUrl = "http://localhost:3000/api/";
const postsUrl = "posts";
const usersUrl = "users";
const vehiclesUrl = "vehicles";
const partsUrl = "parts";

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
	const [activeVehicles, setActiveVehicles] = useState(0);
	const [inactiveVehicles, setInactiveVehicles] = useState(0);
	const [parts, setParts] = useState([]);
	const [activeParts, setActiveParts] = useState(0);
	const [inactiveParts, setInactiveParts] = useState(0);
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
	
	async function getVehicles() {
		let response;

		try {
			response = await axios.get(`${baseUrl}${vehiclesUrl}`);				
			const result = response.data.data.vehicles;
			console.log("Vehicles: ", result);

			if (result.length > 0) {
				setVehicles(result);
				setVehiclesStatus(result);
			}
		} catch (error) {
			console.log(error.msg);
		}
	}
	
	async function getParts() {
		let response;

		try {
			response = await axios.get(`${baseUrl}${partsUrl}`);
			const result = response.data.data.parts;
			console.log("Parts: ", result);

			if (result.length > 0) {
				setParts(result);
				setPartsStatus(result);
			}
		} catch (error) {
			console.log(error.msg);
		}
	}

	async function setVehiclesStatus(vehicles) {
		let active = 0;
		if (vehicles.length > 0) {
			active = vehicles.reduce((acc, cur) => {
				return acc + (cur.active ? 1 : 0);
			}, 0);
			setActiveVehicles(active);
			console.log("Active Vehicles: ", active);
			setInactiveVehicles(vehicles.length - active);
		}
	}

	async function setPartsStatus(parts) {
		let active = 0;
		if (parts.length > 0) {
			active = parts.reduce((acc, cur) => {
				return (acc + (cur.active ? 1 : 0));
			}, 0);
			setActiveParts(active);
			console.log("Active Parts: ",active)
			setInactiveParts(parts.length - active);
		}
	}

	useEffect(() => {
    getUsers();
    getPosts();
		getVehicles();
		getParts();
		return () => {
			//
		};
	}, []);
	return (
		<div className={classes.root}>
			<Grid container spacing={2}>
				<Grid item xs={12} md={8}>
					<Grid item className={classes.cardItem} xs={12}>
						<LastCreatedCard
							category="users"
							title="Último usuario creado"
							subtitle={
								lastUser.firstName +
								" " +
								lastUser.lastName +
								" (" +
								lastUser.userName +
								")"
							}
							createdAt={lastUser.createdAt}
							_id={lastUser.userID}
						/>
					</Grid>
					<Grid item xs={12}>
						<LastCreatedCard
							category="posts"
							title="Último posteo generado"
							subtitle={lastPost.title}
							createdAt={lastPost.publishedDate}
							_id={lastPost.postID}
						/>
					</Grid>
				</Grid>
				<Grid item xs={12} md={4}>
					<Grid item className={classes.cardItem} xs={12}>
						<InformationCard
							category="Véhiculos"
							count={vehicles.length}
							image="car"
							active={activeVehicles}
							inactive={inactiveVehicles}
						/>
					</Grid>
					<Grid item xs={12}>
						<InformationCard
							image="part"
							category="Repuestos"
							count={parts.length}
							active={activeParts}
							inactive={inactiveParts}
						/>
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
}
