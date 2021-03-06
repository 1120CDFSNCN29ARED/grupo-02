
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const User = {
	fileName: "./json/users.json",
  getData: function () {
    return JSON.parse(fs.readFileSync(this.fileName, "utf-8"));    
	},
	writeData: function (userArray) {
		fs.writeFileSync(this.fileName, JSON.stringify(userArray, null, 2));
	},
	findAll: function () {
		return this.getData();
	},
	findUserByPk: function (id) {
		let users = this.findAll();
		let userFound = users.find(user => user.userID == id);
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
    return uuidv4();
  },
  delete: function (id) {
    let users = this.findAll();
    let finalUsers = users.filter(user => { user.userID != id; });
    this.writeData(finalUsers);
    //add in delete image.
  },
};

module.exports = User;