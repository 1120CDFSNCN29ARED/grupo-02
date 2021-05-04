window.addEventListener('load', function () {
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
  /* userName 
    required
    length>4
    cannot be already be in use -> API
    */
  /* email 
    required
    valid email format
    cannot be in use -> API
  */
  /* firstName 
    required
    length>2
  */
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

  //Validation Rules
  userName.addEventListener("input", function(){
		/* userName 
    required
    length>4
    cannot be already be in use -> API
    */
    let valLength = validLength(userName.value, 4);
    if (valLength) {
      userNameErr.classList.contains('d-none') ? '' : userNameErr.classList.add('d-none');
      userNameErr.innerText = "";
      let userExists;
      let user = fetch("/api/users/byUserName/" + userName.value)
				.then(function (response) {
					if (response.status !== 200) {
						console.warn(
							"Looks like there was a problem. Status Code: " + response.status
            );
            userExists = false;
            
						return;
          }
          userExists = true;
          console.warn('The username is already in use");')
          userNameErr.classList.contains("d-none")
            ? userNameErr.classList.remove("d-none")
            : "";
          userNameErr.innerText = "Por favor elige otro nombre de usuario.";
				})
				.catch((error) => {
					console.warn(error);
				});      
    } else {
      console.log("the username is too short");
      userNameErr.classList.contains("d-none")
				? userNameErr.classList.remove("d-none")
				: '';
      userNameErr.innerText = "El nombre del Usuario deberia contener al menos 4 caracteres";
    }
	});

});

//Validation Functions
/* 
notEmpty
required
alpha
alpha-numeric
numeric
length
id number
telephone
Password with REGEX
*/

function validLength(testValue,rule) {
  let validLength = false;
  if (testValue.length >= rule) {
    validLength = true;
  }
  return validLength;
};