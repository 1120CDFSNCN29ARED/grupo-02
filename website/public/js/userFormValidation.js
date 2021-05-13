window.addEventListener("load", function () {
	let MYPORT = 3000;
	const baseURL = `http://localhost:${MYPORT}/api`;
	let editUser = false;
	let currentUserName = "";
	let currentEmail = "";
	let userID = "";

	//Fields
	const form = document.getElementById("userForm");
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
	
	//passwordStrength Field
	let passwordStrength = document.getElementById("passwordStrength");
	if (window.location.pathname.includes("edit")) {
		editUser = true;
		currentUserName = userName.value;
		currentEmail = email.value;
		let pathArray = window.location.pathname.split("/");
		console.log(pathArray);
		userID = pathArray[3];
		console.log(userID);

	};

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

	form.addEventListener("submit", async (e) => {
		e.preventDefault();
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
		console.log("errors: ", errors.length);
		if (errors.length > 0) {
			e.preventDefault();
			console.log("errors: ", errors);			
			form.insertAdjacentElement(
				"afterend",
				divGenerator(
					"Debe completar todos los campos correctamente para continuar"
				)
			);
		} else {
			if (editUser) {
				console.log("ENTRE A Editar EL USUARIO");
				const body = JSON.stringify({
					userName: userName.value,
					email: email.value,
					firstName: firstName.value,
					lastName: lastName.value,
					dni: dni.value,
					telephone: telephone.value,
					province: province.value,
					location: location.value,
					postalCode: postalCode.value,
					address: address.value,
					password: password.value,
					confirmPassword: confirmPassword.value,
					image: image.file,
				});
				console.log("Haciendo el Fetch para editar el usuario");
				/* await fetch(`http://localhost:${MYPORT}/users/edit/${userID}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					redirect: 'follow',
					body,
				}); */
				console.log("Edited the user");
				form.submit();
				
			} else {
							
				console.log("ENTRE A CREAR EL USUARIO");
				const body = JSON.stringify({
					userName: userName.value,
					email: email.value,
					firstName: firstName.value,
					lastName: lastName.value,
					dni: dni.value,
					telephone: telephone.value,
					province: province.value,
					location: location.value,
					postalCode: postalCode.value,
					address: address.value,
					password: password.value,
					confirmPassword: confirmPassword.value,
					image: image.file
				});
				console.log("Haciendo el Fetch");
				/* await fetch(`http://localhost:${MYPORT}/users/register`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					redirect: "follow",
					body,
				}); */
				form.submit();
				console.log("Create the user");
			}
		}
	});
	//Validation Rules
	/* UserName */
	async function userNameValidation() {
		//Check if editing user so as to check if same as current user Value.
		if (userName.value) {
			
			if (editUser) {
			
				if (userName.value == currentUserName) {
					userName.classList.add("is-valid");
					return;
				}
			}
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
			
			if (editUser) {
			
				if (email.value == currentEmail) {
					email.classList.add("is-valid");
					return;
				}
			}
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
			divChecker(province, !province.value, "Por favor elige una provincia");
		}
	};

	/* Locality */
	async function locationValidation() {
		
		if (location.value) {
			let res = await fetch(`${baseURL}/localities/id/${location.value}`);
			let locationTest = await res.json();
			divChecker(location, locationTest.error, "La ciudad elegida es inválida");
		} else {
			divChecker(location, !location.value, "Elige una ciudad");
		}
	};

	/* PostalCode */
	function postalCodeValidation(){
		
		if (postalCode.value) {
			let pcToTest = postalCode.value;
			let validPC = isPostalCode(pcToTest);
				divChecker(postalCode, !validPC,"Por favor ingrese un código postal válido de 4 digitos");
		} else {		
			divChecker(postalCode, !postalCode.value,"Por favor ingrese un código postal válido de 4 digitos");
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
		
		if (editUser &&!password.value) { return; }
		
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
		if (editUser && !password.value && !confirmPassword.value) { return; };
		
		let pswdChecker = false;
		
		let condition = confirmPassword.value && validPassword(password.value).passed == 5;
		
		if (condition) {
			pswdChecker = isMatching(confirmPassword.value, password.value);
			divChecker(confirmPassword, !pswdChecker, "Las contraseñas no coinciden");
		} else {
			divChecker(confirmPassword, !condition, "Las contraseñas no coinciden");
		}
	};

	function imageValidation() {
		allowedExtensions = ["jpg", "jpeg", "png", "gif"];
		let imageError = 0;
		if (image.files.length>0) {
			console.log("FILES: ",image.files);
			let extension = image.name
				.substring(image.name.lastIndexOf(".") + 1, image.name.length)
				.toLowerCase();

			if (!allowedExtensions.includes(extension)) {
				imageError++;
			}
			console.log(imageError);
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
	}
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

