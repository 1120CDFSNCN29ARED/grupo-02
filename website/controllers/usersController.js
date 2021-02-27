const fs = require('fs');
const path = require('path');
//require validator to check the input of the registration form

//FILEPATH CONNECTORS
const usersFilePath = path.join(__dirname, '../json/users.json');

const controller = {
  index: (req, res, next) => { 
    const users = getUsers();
    res.render('users', {users});
  },
  detail: (req, res, next) => {
		res.send(`Detail USERS Not Implemented Yet.`);
	},
	create: (req, res, next) => {
    res.render('register', {});
	},
	store: (req, res, next) => {
    //Need to implement validation with express-validator
    let users = getUsers();
    let newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
    let newUser = {
      id:newId,
      ...req.body,
      category: 'user',
      image: `user_${newId}.jpg`
    };
    users.push(newUser);
    saveUsers(users);
    res.redirect('/');
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
    const userToDelete = users.findIndex((user) => { user.id = userId });
    users.pop(userToDelete, 1);
    saveUsers(users);
    //need to add in the deleting of the picture if we implement it!
    res.render('/users', { users });
	},
};

//Helper Function
function findUser(users, userId) {
	return users.find((user) => {
		return user.id == userId;
	});
}

function getUsers() {
	return JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
}

function saveUsers(users) {
	fs.writeFileSync(usersFilePath, JSON.stringify(users));
}

module.exports = controller;