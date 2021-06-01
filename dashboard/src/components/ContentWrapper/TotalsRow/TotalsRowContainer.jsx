import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
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

export default function TotalsRowContainer() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			TotalsRow Container
				<Grid container spacing={3}>
					<Grid item xs={12} md={6} lg={3} spacing={1}>
						<Paper className={classes.paper}> Users Total</Paper>
					</Grid>
					<Grid item xs={12} md={6} lg={3} spacing={1}>
						<Paper className={classes.paper}> Posts Total</Paper>
					</Grid>
					<Grid item xs={12} md={6} lg={3} spacing={1}>
						<Paper className={classes.paper}> Card3</Paper>
					</Grid>
					<Grid item xs={12} md={6} lg={3} spacing={1}>
						<Paper className={classes.paper}> Card4</Paper>
					</Grid>
				</Grid>
		</div>
	);
}
