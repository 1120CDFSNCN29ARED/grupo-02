
//4. Editar la información de un Usuario
//5. Eliminar a un usuario de la DB

//CRUD
const fs = require('fs');

const User = {
	fileName: "./json/users.json",
	getData: function () {
		return JSON.parse(fs.readFileSync(this.fileName, "utf-8"));
	},
	writeData: function (userArray) {
		fs.writeFileSync(this.fileName, JSON.stringify(userArray, null, "  "));
	},
	findAll: function () {
		return this.getData();
	},
	findUserByPk: function (id) {
		let users = this.findAll();
		let userFound = users.find(user => user.userID == id);
    console.log(userFound);
    return userFound;
	},
	findUserByField: function (field, fieldValue) {
		let users = this.findAll();
    let userFound = users.find(user => user[field] == fieldValue);
    return userFound;
	},
	create: function (userData) {
    let users = this.findAll();
    let newUser = {
      userID: this.generateId(),
      ...userData
    }
		users.push(newUser);
    this.writeData(users);
    return newUser;
  },
  generateId: function () {
    let users = this.findAll();    
    let newId = users.length > 0 ? users[users.length - 1].userID + 1 : 1;
    return newId;
  },
  delete: function (id) {
    let users = this.findAll();
    let finalUsers = users.filter(user => { user.userID != id; });
    this.writeData(finalUsers);
    //add in deelte image.
  },
};

module.exports = User;