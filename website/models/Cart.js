const fs = require('fs');
const parts = require("../json/parts.json");
const vehicles = require("../json/vehicles.json");

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
		cart.items.forEach((item) => {
			let product = parts.find((part) => part.adID === item.adID);
			items.push({ product, quantity: item.quantity });
		});
		return items;
	},
	addToCart: function (cartId, itemId, quantity=1,price = 100) {
		let carts = this.findAll();
		let cartID = cartId;
		console.log("this is the CartID: " + cartID);
		let cart = this.findCartByPk(cartID);
		if (!this.itemInCart( itemId, cart )) {
			cart.items.push({
				adID: parseInt(itemId, 10),
				quantity: parseInt(quantity, 10),
				price: parseInt(price, 10)
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
		//Me parece bastante debil esta solución. => adapt to the same way you solved the addproduct..
		/* if (cartToUpdateID == -1) {
      console.log("CartToUpdateID does not exist");
      return;
    } */
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
	create: function (cartData) {
		let carts = this.findAll();
		let newCart = {
			...cartData,
		};
		carts.push(newCart);
		this.writeData(carts);
		return newCart;
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
};

module.exports = Cart;