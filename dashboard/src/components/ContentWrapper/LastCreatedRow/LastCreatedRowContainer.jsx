import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LastCreatedCard from './LastCreatedCard';
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
			Last Created Container
			<Grid container spacing={3}>
				<Grid item xs={12} md={6} spacing={1}>
					<LastCreatedCard/>
				</Grid>
				<Grid item xs={12} md={6} spacing={1}>
					<LastCreatedCard/>
				</Grid>
			</Grid>
		</div>
	);
}
