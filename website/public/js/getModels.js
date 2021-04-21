let brandDropdown = document.getElementById("brand");

brandDropdown.addEventListener("change", (e) => {
    let brandID = brandDropdown.value;
    let modelDropDown = document.getElementById("model");
    let options = document.querySelectorAll('#model option');
    options.forEach(o => o.remove());
    let option;
    option = document.createElement('option');
    modelDropDown.add(option);
    if(brandID !== ""){
        fetch("/api/models/byBrandID/" + brandID)
        .then(  
            function(response) {
                if (response.status !== 200) {  
                    console.warn('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }
                response.json().then(function(result) {
                    let models = result.data.models;
                    console.log("models: ",models);
                    console.log("result: ",result);
                    for (let i = 0; i < models.length; i++) {
                        option = document.createElement('option');
                        option.text = models[i].modelName;
                        option.value = models[i].modelID;
                        modelDropDown.add(option);
                    }
                });
            }
        )
        .catch(error => {
            console.log(error);
        });
    }
});