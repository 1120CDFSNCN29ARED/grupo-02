
window.addEventListener("load", function () {
	let MYPORT = 3000;
	const baseURL = `http://localhost:${MYPORT}/api`;
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

	//Validation Rules
	userName.addEventListener("input", async (e) => {
		/* userName 
    required
    length>4
    cannot be already be in use -> API
    */

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
		/* email 
    required
    valid email format
    cannot be in use -> API
  */
    if (email.value) {
      emailErr.classList.contains("d-none")
				? "":emailErr.classList.add("d-none");
			emailErr.innerText = "";
			email.classList.contains("is-invalid")
        ? email.classList.remove("is-invalid") : "";
      
      let emailToTest = email.value.trim();
      let validEmail = validateEmail(emailToTest);
      
      if (!validEmail) {
        emailErr.classList.contains("d-none")
					? emailErr.classList.remove("d-none")
          : "";
        emailErr.innerText="El mail ingresado no es válido"
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
		email.classList.contains("in-valid") ? "" : email.classList.add("in-valid");
    }
  });
  
  firstName.addEventListener('input', async (e) => {
		/* firstName 
    required
    length>2
  */
    if (firstName.value) {
      let firstNameToTest = firstName.value.trim();

    } else {
      firstNameErr.classList.contains("d-none")
				? firstNameErr.classList.remove("d-none")
				: "";

			userName.classList.contains("is-invalid")
				? ""
				: firstName.classList.add("is-invalid");

			firstNameErr.innerText =
				"El nombre deberia contener al menos 2 caracteres";
    }
	});
});

//Validation Rules

/* lastName
    required
    length>2
  */
/* dni 
    required
    valid Arg ID format
      length: up to 8 characters
      only number NO "." or "-"
  */
/* telephone 
    required  
    valid Arg number
      length
      only numbers
  */
/* province 
    required
    Selected form pre-populated list
  */
/* location 
    required
    selcted form pre-populated list based on province
  */
/* postalCode 
    required
    valid Arg postal code of 4 numbers
    length 4
    only numbers
  */
/* address 
    required
    How to Validate?
  */
/* password 
    required
    length>8
    one Cpaital
    one lower
    one number
    one special character
  */
/* confirmPassword 
    required
    Coincide with password
  */
/* image 
    Optional
    Valid formats and size limits
  */

//Validation Functions
/* 
notEmpty=>test fo rvalue
required => if value does not exist then error
alpha =>
alpha-numeric =>creaed regex function
numeric => create function to check if integer
length => created function
id number
telephone
Password with REGEX
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