import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import BuildIcon from "@material-ui/icons/Build";
import { Avatar, Divider } from "@material-ui/core";

const useStyles = makeStyles({
	avatar: {
		marginBottom: 5,
	},
	content: {
		marginTop: 5,
	},
});

export default function InformationCard(props) {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<CardActionArea>
				<CardContent>
					<Avatar className={classes.avatar} variant="rounded">
						{props.image === "car" ? (
							<DriveEtaIcon />
						) : props.image === "part" ? (
							<BuildIcon />
						) : (
							""
						)}
					</Avatar>
					<Divider />
					<Typography
						className={classes.content}
						gutterBottom
						variant="h5"
						component="h2"
					>
						{props.category}
					</Typography>
					<Typography variant="body2" color="secondary" component="p">
						Cantidad: {props.count}
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p">
						Publicados: {props.active}
					</Typography>
					<Typography
						variant="body2"
						color="textSecondary"
						component="p"
					>
						Inactivas: 
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				{/* <Button size="small" color="default">
					Ver
				</Button> */}
			</CardActions>
		</Card>
	);
}
