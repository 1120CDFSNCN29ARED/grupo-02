import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";

import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: "100%",
		height: "100%",
		marginTop: 5,
	},
	inputFields: {
		"& .MuiTextField-root": {
			margin: theme.spacing(1),
			width: "40ch",
		},
	},
	avatar: {
		backgroundColor: red[500],
	},
}));

export default function UserDataCard(props) {
	const classes = useStyles();
  const [user,setUser]=useState()
	return (
		<Card className={classes.root}>
			<CardContent>
				<form className={classes.inputFields} noValidate autoComplete="off">
					<div>
						<TextField
            InputProps={{
            readOnly: true,
          }}
							id="userName"
							label="Usuario"
							defaultValue="props.user.userName"
							variant="outlined"
						/>
						<TextField
            InputProps={{
            readOnly: true,
          }}
							id="email"
							label="Email"
							type="email"
							defaultValue="props.user.userEmail"
							variant="outlined"
						/>
					</div>
					<div>
						<TextField
            InputProps={{
            readOnly: true,
          }}
							id="firstName"
							label="Nombre"
							defaultValue="props.user.firstName"
							variant="outlined"
						/>
						<TextField
            InputProps={{
            readOnly: true,
          }}
							id="lastName"
							label="Apellido"
							defaultValue="props.user.lastName"
							variant="outlined"
						/>
					</div>
					<div>
						<TextField
            InputProps={{
            readOnly: true,
          }} id="dni" label="DNI" type="number" defaultValue="props.user.dni" variant="outlined" />
						<TextField
            InputProps={{
            readOnly: true,
          }}
							id="telephone"
							label="Teléfono"
							defaultValue="props.user.telephone"
							variant="outlined"
						/>
					</div>
					<div>
						<TextField
            InputProps={{
            readOnly: true,
          }}
							id="province"
							label="Provincia"
							select
							defaultValue="props.user.province"
							variant="outlined"
						/>
						<TextField
            InputProps={{
            readOnly: true,
          }}
							id="city"
							label="Cíudad"
							select
							defaultValue="props.user.city"
							variant="outlined"
						/>
					</div>
					<div>
						<TextField
            InputProps={{
            readOnly: true,
          }}
							id="postalCode"
							label="Código Postal"
							type="number"
							variant="outlined"
						/>
						<TextField
            InputProps={{
            readOnly: true,
          }}
							id="address"
							label="Dirección"
							defaultValue="props.user.address"
							variant="outlined"
						/>
					</div>
				</form>
			</CardContent>
		</Card>
	);
}
