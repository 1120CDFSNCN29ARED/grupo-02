const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const { reset } = require('nodemon');

//FILEPATH CONNECTORS - no longer necesary with the implementation of models
const usersFilePath = path.join(__dirname, '../json/users.json');

const controller = {
	login: (req, res) => {
		res.render("login", {});
	},
	loginProcess: (req, res) => {
		console.log(req.session.userType);
		if(req.session.userType==='admin'){
			return res.redirect('/admin/');
		}
		return res.redirect("/users/profile");		
	},
	index: (req, res, next) => {
		const users = User.findAll();
		res.render("users", { users });
	},
	profile: (req, res, next) => {
		let user = req.session.assertUserLogged;
		res.render("userProfile", { user });
	},
	details: (req, res, next) => {
		let userID = req.params.userId;
		const user = User.findUserByPk(userID);
		res.render("userProfile", { user });
	},
	create: (req, res, next) => {
		res.render("register", {});
	},
	processRegistration: (req, res, next) => {		
		let userToCreate = {
			...req.body,
			password: bcryptjs.hashSync(req.body.password, 10),
			category: "user",
			image: req.file ? req.file.filename : "",
		};
		User.create(userToCreate);
		res.redirect("/users");
	},
	edit: (req, res, next) => {
		let userId = req.params.userId;
		let userToEdit = User.findUserByPk(userId);
		res.render("editUser", { user: userToEdit });
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