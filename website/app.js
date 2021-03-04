const { static } = require("express");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const mainRoutes = require("./routes/mainRoutes");
const methodOverride = require("method-override");
const session = require('express-session');
const cookies = require('cookie-parser');
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');
const app = express();
const MYPORT = 3000;

//Middleware
const staticFolder = path.resolve(__dirname, "./public");
app.use(express.static(staticFolder));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));
app.use(session({
	secret: 'classified',
	resave: false,
	saveUninitialized: false
}));
app.use(cookies());
app.use(userLoggedMiddleware);

//View Engine
app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(express.json());


//Routers
app.listen(process.env.PORT || MYPORT, () => {
	console.log(`The server is running on ${MYPORT}`);
});

app.use("/", mainRoutes);

//Catch 404
app.use((req, res, next) => {
	res.status(404).send("Page Not Found");
})


