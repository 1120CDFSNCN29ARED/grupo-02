let modelDropdown = document.getElementById("model");

modelDropdown.addEventListener("change", (e) => {
    let modelID = modelDropdown.value;
    let versionDropDown = document.getElementById("version");
    let options = document.querySelectorAll('#version option');
    options.forEach(o => o.remove());
    let option;
    option = document.createElement('option');
    versionDropDown.add(option);
    if(modelID !== ""){
        fetch("/api/versions/byModelID/" + modelID)
        .then(  
            function(response) {
                if (response.status !== 200) {  
                    console.warn('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }
                response.json().then(function(result) {
                    let versions = result.data.versions;
                    console.log("versions: ",versions);
                    console.log("result: ",result);
                    for (let i = 0; i < versions.length; i++) {
                        option = document.createElement('option');
                        option.text = versions[i].versionName;
                        option.value = versions[i].versionID;
                        versionDropDown.add(option);
                    }
                });
            }
        )
        .catch(error => {
            console.log(error);
        });
    }
});