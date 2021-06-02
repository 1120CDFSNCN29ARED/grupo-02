import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LastUserCreatedCard from './LastUserCreatedCard';
import LastPostCreatedCard from "./LastPostCreatedCard";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: "center",
		color: theme.palette.text.secondary,
	},
}));


export default function LastCreatedRowContainer() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Grid container spacing={3}>
				<Grid item xs={12} md={6}>
					<LastUserCreatedCard/>
				</Grid>
				<Grid item xs={12} md={6}>									
						<LastPostCreatedCard/>					
				</Grid>
			</Grid>
		</div>
	);
}
