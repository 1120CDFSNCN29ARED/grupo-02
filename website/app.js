const { static } = require("express");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const mainRoutes = require("./routes/mainRoutes");
const methodOverride = require("method-override");

const app = express();
const MYPORT = 3000;

//Middleware
const staticFolder = path.resolve(__dirname, "./public");
app.use(express.static(staticFolder));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));
//View Engine
app.set("view engine", "ejs");

//Router
app.listen(process.env.PORT || MYPORT, () => {
	console.log(`The server is running on ${MYPORT}`);
});
app.use("/", mainRoutes);
app.use(logger("dev"));
