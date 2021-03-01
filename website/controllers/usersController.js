const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

//FILEPATH CONNECTORS
const usersFilePath = path.join(__dirname, '../json/users.json');

const controller = {
	login: (req, res) => {
		res.render("login", {});
	},
	index: (req, res, next) => {
		const users = getUsers();
		res.render("users", { users });
	},
	detail: (req, res, next) => {
		let userID = req.params.userID;
		const users = getUsers();
		const user = findUser(users, userID);
		res.render("userDetails", { user });
	},
	create: (req, res, next) => {
		res.render("register", {});
	},
	store: (req, res, next) => {
		const regValidation = validationResult(req);
		if (regValidation.errors.length > 0) {
			return res.render('register', { errors: regValidation.mapped(), old:req.body });
		} else {
			let users = getUsers();
			let newId = users.length > 0 ? users[users.length - 1].userID + 1 : 1;
			let newUser = {
				userID: newId,
				...req.body,
				category: "user",
				image: req.file ? req.file.filename : "",
			};
			users.push(newUser);
			saveUsers(users);
			res.redirect("/");
		}		
	},
	edit: (req, res, next) => {
		//no tengo esta pantalla levantada
		res.send(`Edit USERS Not Implemented Yet.`);
	},
	update: (req, res, next) => {
		///no tengo la pantalla de Edicion armada
		res.send(`Edit USERS Not Implemented Yet.`);
	},
	destroy: (req, res, next) => {
		//No tengo la pantalla de usuarios ni admin armado
		const users = getUsers();
		let userId = req.params.id;
		let user = findUser(users, userId);
		const userToDelete = users.findIndex((user) => {
			user.id = userId;
		});
		users.pop(userToDelete, 1);
		saveUsers(users);
		//need to add in the deleting of the picture if we implement it!
		res.render("/users", { users });
	},
};

//Helper Function
function findUser(users, userId) {
	return users.find((user) => {
		return user.userID == userId;
	});
}

function getUsers() {
	return JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
}

function saveUsers(users) {
	fs.writeFileSync(usersFilePath, JSON.stringify(users));
}

module.exports = controller;