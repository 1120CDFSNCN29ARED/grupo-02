import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(1),
		textAlign: "center",
		color: theme.palette.text.secondary,
	},
}));

export default function GridItems(props) {
	const classes = useStyles();

	function FormRow() {
		const itemWidth = (12 / props.itemsPerRow);
		console.log(props.itemsPerRow)
		console.log(itemWidth);
		return (
			<React.Fragment>
				<Grid item xs={itemWidth}>
					<Paper className={classes.paper}>item</Paper>
				</Grid>
				<Grid item xs={itemWidth}>
					<Paper className={classes.paper}>item</Paper>
				</Grid>
				<Grid item xs={itemWidth}>
					<Paper className={classes.paper}>item</Paper>
				</Grid>
			</React.Fragment>
		);
	}

	return (
		<div className={classes.root}>
			<Grid container spacing={1}>
				<Grid container item xs={12} spacing={3}>
					<FormRow />
				</Grid>
				<Grid container item xs={12} spacing={3}>
					<FormRow />
				</Grid>
				<Grid container item xs={12} spacing={3}>
					<FormRow />
				</Grid>
			</Grid>
		</div>
	);
}

GridItems.propTypes = {
	itemsPerRow:PropTypes.number
}