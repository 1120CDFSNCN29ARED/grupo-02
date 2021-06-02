import * as React from "react";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";

import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import { Avatar, Divider } from "@material-ui/core";

export default function MediaControlCard() {
	const theme = useTheme();

	return (
		<Card sx={{ display: "flex" }} variant="outlined">
			<Box sx={{ display: "flex", flexDirection: "column" }}>
				<CardContent sx={{ flex: "1 0 auto" }}>
          <Avatar variant="rounded">
						<PersonOutlineIcon />
					</Avatar>
					<Typography component="div" variant="h5">
						Usuarios
					</Typography>
					<Typography
						variant="subtitle1"
						color="text.secondary"
						component="div"
					>
						Mac Miller
					</Typography>
					<Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
						Number of Items
					</Box>
				</CardContent>
			</Box>
		</Card>
	);
}
