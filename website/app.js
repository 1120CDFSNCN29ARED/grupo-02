const { static } = require("express");
const express = require("express");
const path = require("path");

const mainRoutes = require("./routes/mainRoutes");

const app = express();
const MYPORT = 3000;

//Middleware
const staticFolder = path.resolve(__dirname, "./public");
app.use(express.static(staticFolder));


//View Engine

app.set("view engine", "ejs");

//Router
app.listen(process.env.PORT || MYPORT, () => {
	console.log(`The server is running on ${MYPORT}`);
});

/* app.get("/", (req, res) => {
	res.render(path.resolve(__dirname, "./views/index"));
}); */
/*
app.get("/vehicle/item", (req, res) => {
	res.sendFile(path.resolve(__dirname, "./views/productVehicle.html"));
});
app.get("/product/item", (req, res) => {
	res.sendFile(path.resolve(__dirname, "./views/productPart.html"));
});
*/

app.use("/", mainRoutes);

app.get("/vehicle/add", (req, res) => {
	res.sendFile(path.resolve(__dirname, "./views/addVehicle.html"));
});
app.get("/product/add", (req, res) => {
	res.sendFile(path.resolve(__dirname, "./views/addProduct.html"));
});
app.get("/cart", (req, res) => {
	res.sendFile(path.resolve(__dirname, "./views/cart.html"));
});
/* app.get("/login", (req, res) => {
	res.render(path.resolve(__dirname, "./views/login"));
}); */
/* app.get("/register", (req, res) => {
	res.render(path.resolve(__dirname, "./views/register"));
}); */
/* app.get("/search", (req, res) => {
	res.sendFile(path.resolve(__dirname, "./views/search.html"));
}); */
