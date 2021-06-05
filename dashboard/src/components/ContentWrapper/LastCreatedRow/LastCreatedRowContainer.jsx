import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LastUserCreatedCard from './LastUserCreatedCard';
import LastPostCreatedCard from "./LastPostCreatedCard";
import InformationCard from "./InformationCard";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		marginBottom: 10,
		justify:"centre"
	},
	cardItem: {
		marginBottom:10
	}
}));


export default function LastCreatedRowContainer() {
	const classes = useStyles();
	
	return (
		<div className={classes.root}>
			<Grid container xs={12} md={12} spacing={2}>
				<Grid item xs={12} md={8} spacing={3}>
					<Grid item className={classes.cardItem} xs={12} spacing={3}>
						<LastUserCreatedCard />
					</Grid>
					<Grid item xs={12} spacing={3}>
						<LastPostCreatedCard />
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
