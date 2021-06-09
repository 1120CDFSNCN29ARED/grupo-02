import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import PostAddIcon from "@material-ui/icons/PostAdd";

import { Avatar, Divider } from "@material-ui/core";

const useStyles = makeStyles({
	avatar: {
		marginBottom: 5,
	},
	content: {
		marginTop: 5,
	},
});

export default function LastCreatedCard(props) {
	const classes = useStyles();
		
	return (
		<Card className={classes.root}>
			<CardActionArea>
				<CardContent>
					<Avatar
						className={classes.avatar}
						variant="rounded"
					>
						{props.category ==="users"?<PersonOutlineIcon />:props.category==="posts"?<PostAddIcon/>:""}
					</Avatar>
					<Divider />
					<Typography
						className={classes.content}
						gutterBottom
						variant="h5"
						component="h2"
					>
						{props.title}
					</Typography>
					<Typography variant="body2" color="secondary" component="p">
						{props.subtitle}
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p">
						Creado: {props.createdAt}
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p">
						id: {props._id}
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				{/* <Button size="small" color="default">
					Ver
				</Button>
				<Button size="small" color="default">
					Editar
				</Button> */}
			</CardActions>
		</Card>
	);
}
