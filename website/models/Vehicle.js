const fs = require('fs');
const User = require("./User");

const Vehicle = {
    fileName: "./json/vehicles.json",
    getData: function () {
        return JSON.parse(fs.readFileSync(this.fileName, "utf-8"));    
    },
    writeData: function (vehicleArray) {
        fs.writeFileSync(this.fileName, JSON.stringify(vehicleArray, null, 4));
    },
    findAll: function () {
		return this.getData();
	},
	findVehicleByPk: function (id) {
		let vehicles = this.findAll();
		let vehicleFound = vehicles.find(vehicle => vehicle.adID === id);
        //console.log(vehicleFound);
        return vehicleFound;
	},
	findVehicleByField: function (field, fieldValue) {
		let vehicles = this.findAll();
        let vehicleFound = vehicles.find(vehicle => vehicle[field] === fieldValue);
        return vehicleFound;
	},
	filterVehiclesByField: function (field, fieldValue) {
		let vehicles = this.findAll();
        let vehiclesFound = vehicles.filter(vehicle => vehicle[field] == fieldValue);
        return vehiclesFound;
    },
    seller: function (id) {
        let vehicle = this.findVehicleByPk(parseInt(id));
        let user = User.findUserByPk(vehicle.userID);
        return user;
    },
	create: function (vehicleData) {
        let vehicles = this.findAll();
        let newvehicle = {
            vehicleID: this.generateId(),
            ...vehicleData
        }
		vehicles.push(newvehicle);
        this.writeData(vehicles);
        return newvehicle;
    },
    generateID: function () {
        let newId = vehicles.length > 0 ? vehicles[vehicles.length - 1].vehicleID + 1 : 1;
        return newId;
    },
    delete: function (id) {
        let vehicles = this.findAll();
        let finalvehicles = vehicles.filter(vehicle => { vehicle.vehicleID != id; });
        this.writeData(finalvehicles);
        //add in delete image.
    },
}

module.exports = Vehicle