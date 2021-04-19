const usersService = require('../services/usersService')

const controller = {
	login: (req, res) => {
		res.render("login", {});
	},
	loginProcess: (req, res) => {
		let userID = req.session.userID;
		if(req.session.userType==='admin'){
			return res.redirect('/admin/');
		}
		console.log(`Returning the ${userID}`)
		return res.redirect(`/users/profile/${userID}`);		
	},
	index: async (req, res, next) => {
		const users = await usersService.findAll().catch(error=>error);
		res.render("users", { users });
	},
	profile: async (req, res, next) => {
		if (req.params.userID) {
			const userID = req.params.userID;
			console.log(`<--------USERSID: ${userID}`);
			const user = await usersService.findByPk(userID);
			console.log(`Returning the ${user}`);
			return res.render("userProfile", { user, action: "view" });
		}
		const user = req.session.assertUserLogged;
		res.render("userProfile", { user, action: "view" });
	},
	details: async (req, res, next) => {
		let userID = req.params.userID;
		const user = await usersService.findByPk(userID);
		res.render("userProfile", { user, action: "view" });
	},
	create: (req, res, next) => {
		res.render("register", {});
	},
	edit: async (req, res, next) => {
		let userID = req.params.userID;
		let userToEdit = await usersService.findByPk(userID);
		res.render("userProfile", { user: userToEdit, action: 'edit' });
	},
	update: (req, res, next) => {
		///no tengo la pantalla de Edicion armada
		res.send(`Edit USERS Not Implemented Yet.`);
	},
	destroy: async (req, res, next) => {
		//No tengo la pantalla de usuarios ni admin armado
		const users = await usersService.findAll();
		const userID = req.params.userID;
		const user = await usersService.findByPk(userID);
		const userToDelete = users.findIndex((user) => {
			user.userID = userID;
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