const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const { reset } = require('nodemon');

const db = require("../database/models");

//FILEPATH CONNECTORS - no longer necesary with the implementation of models
const usersFilePath = path.join(__dirname, '../json/users.json');

const controller = {
	login: (req, res) => {
		res.render("login", {});
	},
	loginProcess: (req, res) => {
		let userId = req.session.userId;
		if(req.session.userType==='admin'){
			return res.redirect('/admin/');
		}
		return res.redirect(`/users/profile/${userId}`);		
	},
	index: (req, res, next) => {
		const users = User.findAll();
		res.render("users", { users });
	},
	profile: (req, res, next) => {
		if (req.params.userID) {
			let userID = req.params.userId;
			const user = User.findUserByPk(userID);
			return res.render("userProfile", { user, action: "view" });
		}
		const user = req.session.assertUserLogged;
		res.render("userProfile", { user, action: "view" });
	},
	details: (req, res, next) => {
		let userID = req.params.userId;
		const user = User.findUserByPk(userID);
		res.render("userProfile", { user, action: "view" });
	},
	create: (req, res, next) => {
		res.render("register", {});
	},
	processRegistration: (req, res, next) => {
		db.Role.findOne({where: {role_name: "user"}})
		.then((role) => {
			let userToCreate = {
				first_name: req.body.first_name,
				last_name: req.body.last_name,
				userName: req.body.userName,
				email: req.body.email,
				telephone: req.body.telephone,
				dni: req.body.id_number,
				locationID: 1,
				image: req.file ? req.file.filename : "no-image-found.jpeg",
			};
			db.User.create(userToCreate)
			.then((user) => {
				console.log(user);
				let userAccess = {
					userName: user.userName,
					email: user.email,
					password: bcryptjs.hashSync(req.body.password, 10),
					roleID: role.roleID,
				}
				db.UserAccess.create(userAccess)
			})
			.then(() => res.redirect("/users"))
		}).catch((error) => res.send("error, try again bitch!",error))		
	},
	edit: (req, res, next) => {
		let userId = req.params.userId;
		let userToEdit = User.findUserByPk(userId);
		res.render("userProfile", { user: userToEdit, action: 'edit' });
	},
	update: (req, res, next) => {
		///no tengo la pantalla de Edicion armada
		res.send(`Edit USERS Not Implemented Yet.`);
	},
	destroy: (req, res, next) => {
		//No tengo la pantalla de usuarios ni admin armado
		const users = User.findAll();
		let userId = req.params.userId;
		//let user = findUser(users, userId);
		let user = Users.findUserByPk(userId);
		const userToDelete = users.findIndex((user) => {
			user.userID = userId;
		});
		users.pop(userToDelete, 1);
		saveUsers(users);
		//need to add in the deleting of the picture if we implement it!
		res.render("/users", { users });
	},
	logout: (req, res, next) => {
		res.clearCookie("userEmail");
		req.session.destroy();
		return res.redirect("/");
	},
};

module.exports = controller;