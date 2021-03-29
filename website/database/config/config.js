require('dotenv').config();
module.exports = {
/* 	development: {
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		dialect: "mysql",
		dialectOptions: {
			multipleStatements: true,
		},
	}, */
	development: {
		username: process.env.DB_USER_LOCAL,
		password: process.env.DB_PASSWORD_LOCAL,
		database: process.env.DB_NAME_LOCAL,
		host: process.env.DB_HOST_LOCAL,
		dialect: "mysql",
		dialectOptions: {
			multipleStatements: true,
		},
	},
	test: {
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		dialect: "mysql",
	},
	production: {
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		dialect: "mysql",
	},
};
