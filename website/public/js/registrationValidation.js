window.addEventListener("load", function () {
	let MYPORT = 3000;
	const baseUrl = `http://localhost:${MYPORT}/api`;
	
	const divGenerator = (msg) => {
		const div = document.createElement("div");
		div.classList.add("invalid-feedback");
		div.innerText = msg;
		return div;
	};

	const divChecker = (element, condition, msg) => {
		if (condition) {
			element.classList.add("is-invalid");
			if (
				element.nextElementSibling &&
				element.nextElementSibling.tagName !== "DIV"
			) {
				element.insertAdjacentElement("afterend", divGenerator(msg));
			}
		} else {
			element.classList.remove("is-invalid");
			if (
				element.nextElementSibling &&
				element.nextElementSibling.tagName === "DIV"
			) {
				element.nextElementSibling.remove();
			}
		}
	};

	//Fields
	let userName = document.getElementById("userName");
	let email = document.getElementById("email");
	let firstName = document.getElementById("firstName");
	let lastName = document.getElementById("lastName");
	let dni = document.getElementById("dni");
	let telephone = document.getElementById("telephone");
	let province = document.getElementById("province");
	let location = document.getElementById("location");
	let postalCode = document.getElementById("postalCode");
	let address = document.getElementById("address");
	let password = document.getElementById("password");
	let confirmPassword = document.getElementById("confirmPassword");
	let image = document.getElementById("image");
	//Error Fields
	let userNameErr = document.getElementById("userNameErr");
	let emailErr = document.getElementById("emailErr");
	let firstNameErr = document.getElementById("firstNameErr");
	let lastNameErr = document.getElementById("lastNameErr");
	let dniErr = document.getElementById("dniErr");
	let telephoneErr = document.getElementById("telephoneErr");
	let provinceErr = document.getElementById("provinceErr");
	let locationErr = document.getElementById("locationErr");
	let postalCodeErr = document.getElementById("postalCodeErr");
	let addressErr = document.getElementById("addressErr");
	let passwordErr = document.getElementById("passwordErr");
	let confirmPasswordErr = document.getElementById("confirmPasswordErr");
	let imageErr = document.getElementById("imageErr");

	//passwordStrength Field
	let passwordStrength = document.getElementById("passwordStrength");
	//Validation Rules
	userName.addEventListener("input", async (e) => {
		if (userName.value) {
			let userNameToTest = userName.value.trim();
			let valLength = validLength(userNameToTest, 4);
			if (valLength) {
				userNameErr.classList.contains("d-none")
					? ""
					: userNameErr.classList.add("d-none");
				userNameErr.innerText = "";

				userName.classList.contains("is-invalid")
					? userName.classList.remove("is-invalid")
					: "";

				let res = await fetch(`${baseURL}/users/byUserName/${userNameToTest}`);
				let user = await res.json();
				console.log("This is the user: ", user);

				if (!user.error) {
					console.warn('The username is already in use");');

					userNameErr.classList.contains("d-none")
						? userNameErr.classList.remove("d-none")
						: "";

					userName.classList.contains("is-invalid")
						? ""
						: userName.classList.add("is-invalid");

					userNameErr.innerText = "Por favor elige otro nombre de usuario.";
				}
			} else {
				console.log("the username is too short");

				userNameErr.classList.contains("d-none")
					? userNameErr.classList.remove("d-none")
					: "";

				userNameErr.innerText =
					"El nombre del Usuario deberia contener al menos 4 caracteres";

				userName.classList.contains("is-invalid")
					? ""
					: userName.classList.add("is-invalid");
			}
		} else {
			console.log("El nombre de usuario es invalido");

			userNameErr.classList.contains("d-none")
				? userNameErr.classList.remove("d-none")
				: "";

			userName.classList.contains("is-invalid")
				? ""
				: userName.classList.add("is-invalid");

			userNameErr.innerText =
				"El nombre del Usuario deberia contener al menos 4 caracteres";
		}
	});
	//EMAIL
	email.addEventListener("input", async (e) => {
		if (email.value) {
			emailErr.classList.contains("d-none")
				? ""
				: emailErr.classList.add("d-none");
			emailErr.innerText = "";
			email.classList.contains("is-invalid")
				? email.classList.remove("is-invalid")
				: "";

			let emailToTest = email.value.trim();
			let validEmail = validateEmail(emailToTest);

			if (!validEmail) {
				emailErr.classList.contains("d-none")
					? emailErr.classList.remove("d-none")
					: "";
				emailErr.innerText = "El mail ingresado no es válido";
				email.classList.contains("is-invalid")
					? ""
					: email.classList.add("is-invalid");
			} else {
				let res = await fetch(`${baseURL}/users/byEmail/${emailToTest}`);
				let user = await res.json();

				if (!user.error) {
					emailErr.classList.contains("d-none")
						? emailErr.classList.remove("d-none")
						: "";
					emailErr.innerText = "El mail ingresado no esta disponible";
					email.classList.contains("is-invalid")
						? ""
						: email.classList.add("is-invalid");
				} else {
					emailErr.classList.contains("d-none")
						? ""
						: emailErr.classList.add("d-none");
					emailErr.innerText = "";
					email.classList.contains("in-valid")
						? email.classList.remove("in-valid")
						: "";
				}
			}
		} else {
			emailErr.classList.contains("d-none")
				? emailErr.classList.remove("d-none")
				: "";
			emailErr.innerText = "El mail ingresado no es válido";
			email.classList.contains("in-valid")
				? ""
				: email.classList.add("in-valid");
		}
	});

	/* Firstname */
	firstName.addEventListener("input", async (e) => {
		if (firstName.value) {
			firstNameErr.classList.contains("d-none")
				? ""
				: firstNameErr.classList.add("d-none");
			firstNameErr.innerText = "";
			firstName.classList.contains("is-invalid")
				? firstName.classList.remove("is-invalid")
				: "";

			let firstNameToTest = firstName.value.trim();
			let valLength = validLength(firstNameToTest, 2);

			if (!valLength) {
				firstNameErr.classList.contains("d-none")
					? firstNameErr.classList.remove("d-none")
					: "";

				firstName.classList.contains("is-invalid")
					? ""
					: firstName.classList.add("is-invalid");

				firstNameErr.innerText =
					"El nombre deberia contener al menos 2 caracteres";
			}
		} else {
			firstNameErr.classList.contains("d-none")
				? firstNameErr.classList.remove("d-none")
				: "";

			firstName.classList.contains("is-invalid")
				? ""
				: firstName.classList.add("is-invalid");

			firstNameErr.innerText =
				"El nombre deberia contener al menos 2 caracteres";
		}
	});

	/* LastName */
	lastName.addEventListener("input", async (e) => {
		if (lastName.value) {
			lastNameErr.classList.contains("d-none")
				? ""
				: lastNameErr.classList.add("d-none");
			lastNameErr.innerText = "";
			lastName.classList.contains("is-invalid")
				? lastName.classList.remove("is-invalid")
				: "";

			let firstNameToTest = lastName.value.trim();
			let valLength = validLength(firstNameToTest, 2);

			if (!valLength) {
				lastNameErr.classList.contains("d-none")
					? lastNameErr.classList.remove("d-none")
					: "";

				lastName.classList.contains("is-invalid")
					? ""
					: lastName.classList.add("is-invalid");

				lastNameErr.innerText =
					"El apellido deberia contener al menos 2 caracteres";
			}
		} else {
			lastNameErr.classList.contains("d-none")
				? lastNameErr.classList.remove("d-none")
				: "";

			lastName.classList.contains("is-invalid")
				? ""
				: lastName.classList.add("is-invalid");

			lastNameErr.innerText =
				"El apellido deberia contener al menos 2 caracteres";
		}
	});

	/* DNI */
	dni.addEventListener("input", (e) => {
		if (dni.value) {
			dniErr.classList.contains("d-none") ? "" : dniErr.classList.add("d-none");
			dniErr.innerText = "";
			dni.classList.contains("is-invalid")
				? dni.classList.remove("is-invalid")
				: "";

			let dniToTest = dni.value.trim();
			let validID = isValidID(dniToTest);
			console.log("Id is Valid: ", validID);
			if (validID) {
				dni.value = formatID(dniToTest);
			} else {
				dniErr.classList.contains("d-none")
					? dniErr.classList.remove("d-none")
					: "";

				dni.classList.contains("is-invalid")
					? ""
					: dni.classList.add("is-invalid");

				dniErr.innerText = "Debe contener 8 characteres";
			}
		} else {
			dniErr.classList.contains("d-none")
				? dniErr.classList.remove("d-none")
				: "";

			dni.classList.contains("is-invalid")
				? ""
				: dni.classList.add("is-invalid");

			dniErr.innerText = "Debe contener 8 characteres";
		}
	});

	/* Telephone */
	telephone.addEventListener("input", (e) => {
		if (telephone.value) {
			telephoneErr.classList.contains("d-none")
				? ""
				: telephoneErr.classList.add("d-none");
			telephoneErr.innerText = "";
			telephone.classList.contains("is-invalid")
				? telephone.classList.remove("is-invalid")
				: "";
			let telephoneToTest = telephone.value;
			let valTelephone = isTelephone(telephoneToTest);

			if (!valTelephone) {
				telephoneErr.classList.contains("d-none")
					? telephoneErr.classList.remove("d-none")
					: "";

				telephone.classList.contains("is-invalid")
					? ""
					: telephone.classList.add("is-invalid");

				telephoneErr.innerText = "Por favor ingrese un teléfono valido";
			}
		} else {
			telephoneErr.classList.contains("d-none")
				? telephoneErr.classList.remove("d-none")
				: "";

			telephone.classList.contains("is-invalid")
				? ""
				: telephone.classList.add("is-invalid");

			telephoneErr.innerText =
				"Por favor ingrese un teléfono valido \n Celular: (xxx)-15-xxxx-xxxx \n Fijo: (xxx)-xxxx-xxxx";
		}
	});

	/* Province */
	province.addEventListener("change", async (e) => {
		await provinceValidation();
	});
	/* Locality */

	/* PostalCode */
	postalCode.addEventListener("input", (e) => {
		if (postalCode.value) {
			postalCodeErr.classList.contains("d-none")
				? ""
				: postalCodeErr.classList.add("d-none");
			postalCodeErr.innerText = "";
			postalCode.classList.contains("is-invalid")
				? postalCode.classList.remove("is-invalid")
				: "";
			let pcToTest = postalCode.value;
			let validPC = isPostalCode(pcToTest);
			if (!validPC) {
				postalCodeErr.classList.contains("d-none")
					? postalCodeErr.classList.remove("d-none")
					: "";

				postalCode.classList.contains("is-invalid")
					? ""
					: postalCode.classList.add("is-invalid");

				postalCodeErr.innerText =
					"Por favor ingrese un código postal válido de 4 digitos";
			}
		} else {
			postalCodeErr.classList.contains("d-none")
				? postalCodeErr.classList.remove("d-none")
				: "";

			postalCode.classList.contains("is-invalid")
				? ""
				: postalCode.classList.add("is-invalid");

			postalCodeErr.innerText =
				"Por favor ingrese un código postal válido de 4 digitos";
		}
	});

	/* Password */
	password.addEventListener("input", (e) => {
		passwordErr.classList.contains("d-none")
			? ""
			: passwordErr.classList.add("d-none");
		password.classList.contains("is-invalid")
			? password.classList.remove("is-invalid")
			: "";

		if (password.value) {
			console.log("The password is being generated");
			let passwordToTest = password.value;
			let validityScore = validPassword(passwordToTest);
			passwordStrength.classList.remove("d-none");

			console.log(validityScore);
			let strength = "";
			switch (validityScore.passed) {
				case 0:
				case 1:
				case 2:
					strength =
						"<small class='progress-bar bg-danger' style='width: 40%'>Débil</small>";
					passwordErr.classList.contains("d-none")
						? passwordErr.classList.remove("d-none")
						: "";
					passwordErr.innerHTML = validityScore.errorMsg;

					password.classList.contains("is-invalid")
						? ""
						: password.classList.add("is-invalid");

					break;
				case 3:
				case 4:
					strength =
						"<small class='progress-bar bg-warning' style='width: 60%'>Mediano</small>";
					passwordErr.classList.contains("d-none")
						? passwordErr.classList.remove("d-none")
						: "";
					passwordErr.innerHTML = validityScore.errorMsg;

					password.classList.contains("is-invalid")
						? ""
						: password.classList.add("is-invalid");

					break;
				case 5:
					strength =
						"<small class='progress-bar bg-success' style='width: 100%'>Fuerte</small>";
					password.classList.add("is-valid");
					break;
			}
			passwordStrength.innerHTML = strength;
		} else {
			passwordStrength.innerHTML = "";
			passwordErr.classList.contains("d-none")
				? passwordErr.classList.remove("d-none")
				: "";

			password.classList.contains("is-invalid")
				? ""
				: password.classList.add("is-invalid");
		}
	});

	/* ConfirmPassword */
	confirmPassword.addEventListener("change", (e) => {
		confirmPasswordErr.classList.contains("d-none")
			? ""
			: confirmPasswordErr.classList.add("d-none");
		confirmPassword.classList.contains("is-invalid")
			? confirmPassword.classList.remove("is-invalid")
			: "";

		let pswdChecker = false;
		console.log(confirmPassword.value);
		console.log("The password is valid: ", password.value);
		if (confirmPassword.value && validPassword(password.value).passed == 5) {
			pswdChecker = isMatching(confirmPassword.value, password.value);
			console.log("The passwords match: ", pswdChecker);
			if (pswdChecker) {
				confirmPasswordErr.classList.contains("d-none")
					? ""
					: confirmPasswordErr.classList.add("d-none");
				confirmPassword.classList.contains("is-invalid")
					? confirmPassword.classList.remove("is-invalid")
					: "";
				confirmPassword.classList.add("is-valid");
			} else {
				confirmPasswordErr.classList.contains("d-none")
					? confirmPasswordErr.classList.remove("d-none")
					: "";
				confirmPasswordErr.innerText =
					"Por favor reingrese la misma contraseña";
				confirmPassword.classList.contains("is-invalid")
					? ""
					: confirmPassword.classList.add("is-invalid");
			}
		} else {
			confirmPasswordErr.classList.contains("d-none")
				? confirmPasswordErr.classList.remove("d-none")
				: "";
			confirmPasswordErr.innerText = "Por favor reingrese la misma contraseña";
			confirmPassword.classList.contains("is-invalid")
				? ""
				: confirmPassword.classList.add("is-invalid");
		}
	});
});

//Validation Rules

/* province 
    required
    Selected form pre-populated list
  */
/* location 
    required
    selcted form pre-populated list based on province
  */

/* address 
    required
    How to Validate?
  */

/* image 
    Optional
    Valid formats and size limits
  */

function validLength(testValue, rule) {
	let validLength = false;
	if (testValue.length >= rule) {
		validLength = true;
	}
	return validLength;
}

function validateEmail(email) {
	//const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const re = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
	return re.test(String(email).toLowerCase());
}

function isAlphaNumeric(field) {
	const re = /^[0-9a-zñáéíóúü]+$/i;
	return re.test(String(field).toLowerCase);
}

function isAlpha(field) {
	const re = /^[a-zñáéíóúü]+$/i;
	return re.test(String(field).toLowerCase);
}

function isPostalCode(field) {
	const re = /^(\d{4})$/gi;
	return re.test(String(field));
}

function isValidID(idNumber) {
	const re = /^((\d{2}\.{1}\d{3}\.\d{3})|(\d{2}\s{1}\d{3}\s\d{3})|(\d{8}))$/g;
	return re.test(idNumber);
}

function formatID(validID) {
	const re = /\s|\.+/g;
	return validID.replace(re, "");
}

function isTelephone(telephone) {
	const re = /^(?=(((\D*\d){11})|((\D*\d){13}))$)\(?\d{3,5}\)?[- .]?\d{2}[- .]?\d{2,4}[- .]?\d{4}$/g;
	return re.test(telephone);
}

function validPassword(passwordToTest) {
	//let re = [];
	let re = {
		upperCase: {
			condition: "[A-Z]",
			msg:
				"<small><li>Debe contener al menos un caracter en máyuscula</li></small>",
		},
		lowerCase: {
			condition: "[a-z]",
			msg:
				"<small><li>Debe contener al menos un caracter en míniscula</li></small>",
		},
		digit: {
			condition: "[0-9]",
			msg: "<small><li>Debe contener al menos un número de 0 a 9</li></small>",
		},
		specialCharacter: {
			condition: "[$@$!%*#?&]",
			msg:
				"<small><li>Debe contener al menos un caracter especial</li></small>",
		},
		length: {
			condition: "([A-Za-z0-9$@$!%*#?&]){8,}",
			msg: "<small><li>Debe ser al menos 8 cáracteres</li></small>",
		},
	};
	/* re.push("[A-Z]"); //UpperCase
	re.push("[a-z]"); //LowerCase
	re.push("[0-9]"); //Digit
	re.push("[$@$!%*#?&]"); //Special Characters
	re.push("([A-Za-z0-9$@$!%*#?&]){8,}"); //length */
	let passed = 0;
	let errorMsg = "";
	Object.values(re).forEach((condition) => {
		console.log(
			"TESTING ",
			condition,
			" - ",
			condition.condition,
			": ",
			new RegExp(condition.condition).test(passwordToTest)
		);
		if (new RegExp(condition.condition).test(passwordToTest)) {
			passed++;
			console.log(passed);
		} else {
			errorMsg += condition.msg;
			console.log(errorMsg);
		}
	});
	/* for (let i = 0; i < re.length; i++){
		if (new RegExp(re[i]).test(String(passwordToTest))) {
			passed++;
		}
	} */
	return { passed, errorMsg };
}

function isMatching(string1, string2) {
	isMatch = false;
	string1 === string2 ? (isMatch = true) : "";
	return isMatch;
}
/* 
async function provinceValidation() {
	if (province.value) {
		let res = await fetch(`${baseURL}/provinces/id/${province.value}`);
		let provinceTest = await res.json();
		divChecker(
			province,
			provinceTest.error,
			"La provincia elegida es inválida"
		);
	} else {
		province.classList.add("is-invalid");
		province.insertAdjacentElement(
			"afterend",
			divGenerator("Debe elegir una provincia")
		);
	}
}
async function locationValidation() {
	if (location.value) {
		let res = await fetch(`${baseURL}/localities/id/${location.value}`);
		let locationTest = await res.json();
		divChecker(location, locationTest.error, "La ciudad elegida es inválida");
	} else {
		location.classList.add("is-invalid");
		location.insertAdjacentElement(
			"afterend",
			divGenerator("Debe elegir una ciudad")
		);
	}
} */
