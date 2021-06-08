import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
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
	const [user, setUser] = useState(props.user)

		useEffect(() => {
			setUser(props.user);
		}, [user, props.user]);
	
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
							value={props.user.userName}
							variant="outlined"
						/>
						<TextField
							InputProps={{
								readOnly: true,
							}}
							id="email"
							label="Email"
							value={props.user.email}
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
							value={props.user.firstName}
							variant="outlined"
						/>
						<TextField
							InputProps={{
								readOnly: true,
							}}
							id="lastName"
							label="Apellido"
							value={props.user.lastName}
							variant="outlined"
						/>
					</div>
					<div>
						<TextField
							InputProps={{
								readOnly: true,
							}}
							id="dni"
							label="DNI"
							type="number"
							value={props.user.dni}
							variant="outlined"
						/>
						<TextField
							InputProps={{
								readOnly: true,
							}}
							id="telephone"
							label="Teléfono"
							value={props.user.telephone}
							variant="outlined"
						/>
					</div>
					{/* <div>
						<TextField
							InputProps={{
								readOnly: true,
							}}
							id="province"
							label="Provincia"
							select
							value={props.user.province}
							variant="outlined"
						/>
						<TextField
							InputProps={{
								readOnly: true,
							}}
							id="city"
							label="Cíudad"
							select
							value={props.user.city}
							variant="outlined"
						/>
					</div> */}
					<div>
						<TextField
							InputProps={{
								readOnly: true,
							}}
							id="postalCode"
							label="Código Postal"
							type="number"
							value={props.user.postalCode}
							variant="outlined"
						/>
						<TextField
							InputProps={{
								readOnly: true,
							}}
							id="address"
							label="Dirección"
							value={props.user.address}
							variant="outlined"
						/>
					</div>
				</form>
			</CardContent>
		</Card>
	);
}
