const fs = require('fs');
const parts = require("../json/parts.json");
const vehicles = require("../json/vehicles.json");
const { v4: uuidv4 } = require("uuid");

const Cart = {
	fileName: "./json/carts.json",
	getData: function () {
		return JSON.parse(fs.readFileSync(this.fileName, "utf-8"));
	},
	writeData: function (cartArray) {
		fs.writeFileSync(this.fileName, JSON.stringify(cartArray, null, 2));
	},
	findAll: function () {
		return this.getData();
	},
	findCartByPk: function (id) {
		let carts = this.findAll();
		let cartFound = carts.find((cart) => cart.cartID == id);
		return cartFound;
	},
	findCartByField: function (field, fieldValue) {
		let carts = this.findAll();
		let cartFound = carts.find((cart) => cart[field] == fieldValue);
		return cartFound;
	},
	getCartItems: function (cart) {
		let items = [];
		if (cart.items.length > 0) {
		cart.items.forEach((item) => {
			let product = parts.find((part) => part.adID === item.adID);
			items.push({ product, quantity: item.quantity });
		});	
		}
		return items;
	},
	addToCart: function (cartId, itemId, quantity=1) {
		let carts = this.findAll();
		let cartID = cartId;
		let adID = parseInt(itemId, 10);
		let item = this.getItemDetails(adID);
		let cart = this.findCartByPk(cartID);
		if (!this.itemInCart( itemId, cart )) {
			cart.items.push({
				adID: adID,
				quantity: parseInt(quantity, 10),
				price: parseInt(item.price, 10)
			});
		}
		const cartToUpdate = (cart) => cart.cartID == cartID;
		carts.splice(carts.findIndex(cartToUpdate), 1);
		carts.push(cart);
		this.writeData(carts);
	},
	removeFromCart: function (cartId, itemID) {
		//This needs to be tested.
		let carts = this.findAll();
		const cartToUpdate = (cart) => cart.cartID == cartId;
		let cartToUpdateID = carts.findIndex(cartToUpdate);
		let cart = carts.splice(carts.findIndex(cartToUpdate), 1);
		if (!cart[0]) {
			console.log("Cart[0] does not exist");
			return;
		}
		let items = cart[0].items;
		const itemIdToRemove = (item) => item.adID == itemID;
		items.splice(items.findIndex(itemIdToRemove), 1);
		cart[0].items = items;
		carts.push(cart[0]);
		this.writeData(carts);
	},
	updateItemQuantity: function (cartId, itemId, quantity) {
		//This whole function needs to be connected and tested.
		let carts = this.findAll();
		let cart = this.findCartByPk(cartId);
		//find itemID and modify quantity
		const itemToUpdateQuantity = (item) => item.adID == itemId;
		itemToUpdate = cart.items.findIndex(itemToUpdateQuantity);
		cart.items[itemToUpdate].quantity = parseInt(quantity, 10);
		const cartToUpdate = (cart) => cart.cartID == cartId;
		carts.splice(carts.findIndex(cartToUpdate), 1);
		carts.push(cart);
		this.writeData(carts);
	},
	itemInCart: function (itemId, cart) {
		let foundInCart = false;
		cart.items.forEach((item) => {
			if (item.adID == itemId) {				
				foundInCart = true;
			}
		});
		return foundInCart;
	},
	create: function (userId) {
		let carts = this.findAll();
		console.log(userId);
		let newCart = {
			cartID: this.generateId(),
			userID: userId,
			status: "pending",
			items:[]
		};
		carts.push(newCart);
		this.writeData(carts);
		return newCart;
	},
  generateId: function () {    
    return uuidv4();
  },
	//Totals is not yet implemented
	calculateTotals: function (cart) {
		cart.totals = 0.00
		cart.items.forEach(item => {
			let price = item.price;
			let quantity = item.quantity;
			let amount = price * quantity;

			cart.totals += amount;
		})
	},
	clearCart: function () {
		
	},
	getItemDetails: function (itemID) {
		let item = parts.find((part) => part.adID === itemID);
		console.log(item);
		return item;
	}
};

module.exports = Cart;