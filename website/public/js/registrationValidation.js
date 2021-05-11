window.addEventListener("load", function () {
	let MYPORT = 3000;
	const baseURL = `http://localhost:${MYPORT}/api`;


	//Fields
	const userForm = document.getElementById("userForm");
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

	userName.addEventListener("input", async (e) => {
		await userNameValidation();
	});

	email.addEventListener("input", async (e) => {
		await emailValidation();
	})
	
	firstName.addEventListener("input", (e) => {
		firstNameValidation();
	});

	lastName.addEventListener("input", (e) => {
		lastNameValidation();
	})

	dni.addEventListener("input", (e) => {
		dniValidation();
	});

	telephone.addEventListener('input', (e) => {
		telephoneValidation();
	});

	province.addEventListener("change", async (e) => {
		await provinceValidation();
	});

	location.addEventListener("change", async (e) => {
		await locationValidation();
	})

	postalCode.addEventListener('input', (e) => {
		postalCodeValidation();
	})

	address.addEventListener('change', (e) => {
		addressValidation();
	});

	password.addEventListener('input',(e)=>{
		passwordValidation();
	});

	confirmPassword.addEventListener("change", (e) => {
		confirmPasswordValidation();
	});

	image.addEventListener("change", (e) => {
		imageValidation();
	});

	userForm.addEventListener("submit", async (e) => {
		await userNameValidation();
		await emailValidation();
		firstNameValidation();
		lastNameValidation();
		dniValidation();
		telephoneValidation();
		await provinceValidation();
		await locationValidation();
		postalCodeValidation();
		addressValidation();
		passwordValidation();
		confirmPasswordValidation();
		imageValidation();

		const errors = document.getElementsByClassName("is-invalid");
		
		console.warn("errors: ", errors);
		if (errors.length > 0) {
			e.preventDefault();
			console.log("errors: ", errors);
			if (form.nextElementSibling) {
				form.insertAdjacentElement(
					"afterend",
					divGenerator(
						"La descripción debe ser un texto de al menos 50 caracteres"
					)
				);
				form.nextElementSibling.classList.add("alert-danger");
			} else {
				if (form.nextElementSibling) {
					form.nextElementSibling.remove();
				}
			}
			form.insertAdjacentElement(
				"afterend",
				divGenerator(
					"Debe completar todos los campos correctamente para continuar"
				)
			);
		}
	});
	//Validation Rules
	/* UserName */
	async function userNameValidation() {
		if (userName.value) {
			let userNameToTest = userName.value.trim();
			let valLength = validLength(userNameToTest, 4);
			if (valLength) {
				let res = await fetch(`${baseURL}/users/byUserName/${userNameToTest}`);
				let user = await res.json();
				divChecker(
					userName,
					!user.error,
					"Por favor eligir otro nombre de Usuario"
				);
			} else {
				divChecker(
					userName,
					!valLength,
					"El nombre de usuario debe contener al menos 4 caracteres"
				);
			}
		} else {
			divChecker(userName, !userName.value,"El nombre de usuario es requerido")
		}
	};

	//EMAIL
	async function emailValidation() {
		if (email.value) {
			let emailToTest = email.value.trim();
			let validEmail = validateEmail(emailToTest);
			if (validEmail) {
				let res = await fetch(`${baseURL}/users/byEmail/${emailToTest}`);
				let user = await res.json();
				divChecker(email, !user.error, "El email ingresado no esta disponible");
			} else {
				divChecker(email, !validEmail, " El email ingresado no es válido");
			}
		} else {
			divChecker(email, !email.value, "Ingrese un email");
		}
	};
	
	/* Firstname */
	function firstNameValidation() {
		
		if (firstName.value) {
			let firstNameToTest = firstName.value.trim();
			let valLength = validLength(firstNameToTest, 2);
			divChecker(firstName, !valLength, "El nombre debe contener al menos 2 caracteres");			
		} else {			
			divChecker(
				firstName,
				!firstName.value,
				"El nombre debe contener al menos 2 caracteres"
			);
		}
	};

	/* LastName */
	function lastNameValidation() {
	
		if (lastName.value) {
			let lastNameToTest = lastName.value.trim();
			let valLength = validLength(lastNameToTest, 2);
			divChecker(lastName, !valLength, "El apellido debe contener al menos 2 caracteres");			
		} else {			
			divChecker(
				lastName,
				!lastName.value,
				"El apellido debe contener al menos 2 caracteres"
			);
		}
	};
	

	/* DNI */
	function dniValidation() {
		if (dni.value) {
			let dniToTest = dni.value.trim();
			let validID = isValidID(dniToTest);

			if (validID) {
				dni.value = formatID(dniToTest);
				divChecker(dni, !validID, "Debe contener 8 characteres");
			} else {
				divChecker(dni, !validID, "Debe contener 8 characteres");
			}
		} else {
			divChecker(dni, !dni.value, "Debe contener 8 characteres");
		}
	};

	/* Telephone */
	function telephoneValidation(){
		
		if (telephone.value) {
			let telephoneToTest = telephone.value;
			let valTelephone = isTelephone(telephoneToTest);
			if (valTelephone) {
				telephone.value = formatTelephone(telephoneToTest);
			}
			divChecker(telephone, !valTelephone,"Por favor ingrese un teléfono valido \n Celular: (xxx)-15-xxxx-xxxx \n Fijo: (xxx)-xxxx-xxxx")
		} else {
			divChecker(
				telephone,
				!telephone.value,
				"Requerido"
			);
		}
	};

	/* Province */
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
	};

	/* Locality */
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
	};

	/* PostalCode */
	function postalCodeValidation(){
		
		if (postalCode.value) {
			let pcToTest = postalCode.value;
			let validPC = isPostalCode(pcToTest);
				divChecker(postalCode, !validPC,"Por favor ingrese un código postal válido de 4 digitos");
		} else {
		
			divChecker(postalCode, !postalCode.value,"Por favor ingrese un código postal válido de 4 digitos");	"Por favor ingrese un código postal válido de 4 digitos";
		}
	};

	/* Address */
	function addressValidation() {
		divChecker(address, !address.value, "Requerido");
	}
	/* Password */
	function passwordValidation(){
		passwordErr.classList.contains("d-none")
			? ""
			: passwordErr.classList.add("d-none");
		password.classList.contains("is-invalid")
			? password.classList.remove("is-invalid")
			: "";

		if (password.value) {
			let passwordToTest = password.value;
			let validityScore = validPassword(passwordToTest);
			passwordStrength.classList.remove("d-none");

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
	};
	/* ConfirmPassword */
	function confirmPasswordValidation(){
		
		let pswdChecker = false;
		let condition = confirmPassword.value && validPassword(password.value).passed == 5;
		if (condition) {
			pswdChecker = isMatching(confirmPassword.value, password.value);
			divChecker(confirmPassword, !pswdChecker, "Las contraseñas no coinciden");
		} else {
			divChecker(confirmPassword, !condition, "Las contraseñas no coinciden");
		}
	};

	function imageValidation (){
		allowedExtensions = ["jpg", "jpeg", "png", "gif"];
		let imageError = 0;
		if (image.value) {
			let extension = image.name
				.substring(image.name.lastIndexOf(".") + 1, image.name.length)
				.toLowerCase();

			if (!allowedExtensions.includes(extension)) {
				imageError++;
			}
		}
		
		if (imageError !== 0) {
			image.classList.add("is-invalid");
			if (image.nextElementSibling.tagName !== "DIV") {
				image.insertAdjacentElement(
					"afterend",
					divGenerator(
						"El imágen debe ser del tipo " + allowedExtensions.join(", ")
					)
				);
			}
		} else {
			image.classList.remove("is-invalid");
			if (image.nextElementSibling.tagName === "DIV") {
				image.nextElementSibling.remove();
			}
		}
	};
});

/* Dynamic Error checking: */
	function divGenerator(msg){
		const div = document.createElement("div");
		div.classList.add("invalid-feedback");
		div.innerText = msg;
		return div;
	};

	function divChecker(element, condition, msg){
		if (condition) {
			element.classList.add("is-invalid");
			element.classList.remove("is-valid");
			if (
				element.nextElementSibling &&
				element.nextElementSibling.tagName !== "DIV"
			) {
				element.insertAdjacentElement("afterend", divGenerator(msg));
			}
		} else {
			element.classList.remove("is-invalid");
			element.classList.add("is-valid");
			if (
				element.nextElementSibling &&
				element.nextElementSibling.tagName === "DIV"
			) {
				element.nextElementSibling.remove();
			}
		}
	};
/* These should be moved to a separate file???
Validtion Helper Functions */
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

function formatTelephone(validTelephone) {
	const re = /\s|\(|\)|\-/g;
		return validTelephone.replace(re, "");
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
		if (new RegExp(condition.condition).test(passwordToTest)) {
			passed++;
		} else {
			errorMsg += condition.msg;
		}
	});
	return { passed, errorMsg };
}

function isMatching(string1, string2) {
	isMatch = false;
	string1 === string2 ? (isMatch = true) : "";
	return isMatch;
}

