let provinceDropdown = document.getElementById("province");

provinceDropdown.addEventListener("change", (e) => {
    console.log("THE PROVINCE HAS CHANGED");
    let provinceID = provinceDropdown.value;
    let locationDropDown = document.getElementById("location");
    let options = document.querySelectorAll('#location option');
    options.forEach(o => o.remove());
    let option;
    option = document.createElement('option');
    locationDropDown.add(option);
    if(provinceID !== ""){
        fetch("/api/localities/byProvinceID/" + provinceID)
        .then(  
            function(response) {
                if (response.status !== 200) {  
                    console.warn('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }
                response.json().then(function(result) {
                    let locations = result.data.localities;
                    console.log("locations: ",locations);
                    console.log("result: ",result);
                    for (let i = 0; i < locations.length; i++) {
                        option = document.createElement('option');
                        option.text = locations[i].localityName;
                        option.value = locations[i].localityID;
                        locationDropDown.add(option);
                    }
                });
            }
        )
        .catch(error => {
            console.log(error);
        });
    }
});