const { static } = require("express");
const express = require("express");
const path = require("path")
const app = express();

app.listen(3000);

const staticFolder = path.resolve(__dirname, "./public");
app.use(express.static(staticFolder));

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/index.html"));
});
app.get("/vehicle/item", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/productVehicle.html"));
});
app.get("/product/item", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/productPart.html"));
});
app.get("/vehicle/add", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/addVehicle.html"));
});
app.get("/product/add", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/addProduct.html"));
});
app.get("/cart", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/cart.html"));
});
app.get("/login", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/login.html"));
});
app.get("/register", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/register.html"));
});
app.get("/search", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/search.html"));
});