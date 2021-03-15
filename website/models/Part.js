const fs = require('fs');
const User = require("./User");

const Part = {
    fileName: "./json/parts.json",
    getData: function () {
        return JSON.parse(fs.readFileSync(this.fileName, "utf-8"));    
    },
    writeData: function (partArray) {
        fs.writeFileSync(this.fileName, JSON.stringify(partArray, null, 4));
    },
    findAll: function () {
		return this.getData();
	},
	findPartByPk: function (id) {
		let parts = this.findAll();
		let partFound = parts.find(part => part.adID === id);
        //console.log(partFound);
        return partFound;
	},
	findPartByField: function (field, fieldValue) {
		let parts = this.findAll();
        let partFound = parts.find(part => part[field] === fieldValue);
        return partFound;
	},
	filterPartsByField: function (field, fieldValue) {
		let parts = this.findAll();
        let partsFound = parts.filter(part => part[field] == fieldValue);
        return partsFound;
    },
    seller: function (id) {
        let part = this.findPartByPk(parseInt(id));
        let user = User.findUserByPk(part.userID);
        return user;
    },
	create: function (partData) {
        let parts = this.findAll();
        let newpart = {
            partID: this.generateId(),
            ...partData
        }
		parts.push(newpart);
        this.writeData(parts);
        return newpart;
    },
    generateID: function () {
        let newId = parts.length > 0 ? parts[parts.length - 1].partID + 1 : 1;
        return newId;
    },
    delete: function (id) {
        let parts = this.findAll();
        let finalparts = parts.filter(part => { part.partID != id; });
        this.writeData(finalparts);
        //add in delete image.
    },
}

module.exports = Part