import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import SmallCard from "../../SmallCard/SmallCard";
import LineGraph from "../../AreaGraph/AreaGraph";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		marginBottom: 25,
	},
}));

const chart = {
	width: 220,
	height: 100,
};

export default function TotalsRowContainer() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Grid container spacing={1}>
				<Grid item xs={12} md={4} lg={3} spacing={1}>
					<SmallCard
						backgroundColor="red"
						title="Usuarios"
						total="123"
						chart={chart}
					/>
					<LineGraph />
				</Grid>
				<Grid item xs={12} md={4} lg={3} spacing={1}>
					<SmallCard
						backgroundColor="green"
						title="posts"
						total="5"
						chart={chart}
					/>
					<LineGraph />
				</Grid>
				<Grid item xs={12} md={4} lg={3} spacing={1}>
					<SmallCard
						backgroundColor="blue"
						title="Vehicles"
						total="123"
						chart={chart}
					/>
					<LineGraph />
				</Grid>
				<Grid item xs={12} md={4} lg={3} spacing={1}>
					<SmallCard
						backgroundColor="orange"
						title="Parts"
						total="123"
						chart={chart}
					/>
					<LineGraph />
				</Grid>
			</Grid>
		</div>
	);
}
