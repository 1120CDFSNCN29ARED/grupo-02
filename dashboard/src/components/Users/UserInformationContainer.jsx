import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import UserDataCard from "./UserDataCard";
import UserHistoryCard from "./UserHistoryCard";
import UserInformationCard from "./UserInformationCard";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		marginBottom: 25,
		//marginTop: 90,
		padding: theme.spacing(0, 3),
	},
}));

function UserInformationContainer(props) {
	const userID = props.match.params.userID;
	console.log("PARAMS: ",props.match.params.userID);
	const classes = useStyles();
	const [users, setUsers] = useState(props.users);
	const userToDisplay = props.users.find((e) => e.userID === userID);
	const [user, setUser] = useState(userToDisplay);
	console.log("UserToDisplay: ", userToDisplay);
	
	useEffect(() => {
		setUser(userToDisplay);
		console.log("User Mounted: ", user, "color: yellow");
	}, []);

	useEffect(() => {
		setUser(userToDisplay);
		console.log("User Updated: ", user, "color: greeen");
	}, [user]);

	return (
		<div className={classes.root}>
			{
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<UserInformationCard user={userToDisplay} />
					</Grid>
					<Grid item xs={12} md={8}>
						<UserDataCard user={userToDisplay} />
					</Grid>
					<Grid item xs={12} md={4}>
						<UserHistoryCard user={userToDisplay} />
					</Grid>
				</Grid>
			}
		</div>
	);
}

export default UserInformationContainer;
