const { static } = require("express");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const mainRoutes = require("./routes/mainRoutes");
const methodOverride = require("method-override");
const session = require('express-session');
const cookies = require('cookie-parser');
const { v4: uuidv4 } = require("uuid");
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');
const cors = require('cors');

const app = express();
const MYPORT = 3000;
app.use(cors());

//Middleware
const staticFolder = path.resolve(__dirname, "./public");
app.use(static(staticFolder));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));
//I am using UUID to create the secret key for my session - is this good practice or not?
app.use(session({
	secret: uuidv4(),
	resave: false,
	saveUninitialized: false
}));
app.use(cookies());
app.use(userLoggedMiddleware);//This implements userLogged on all calls in the website

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


