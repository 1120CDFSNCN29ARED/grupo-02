window.addEventListener("load",() => {
    const url = "http://localhost:3000/api";

    const divGenerator = (msg) => {
        const div = document.createElement("div");
        div.classList.add("invalid-feedback");
        div.innerText = msg;
        return div;
    }


    const form = document.getElementById("form");
    const brand = document.getElementById("brand");
    const model = document.getElementById("model");
    const year = document.getElementById("year");
    const version = document.getElementById("version");
    const stateNew = document.getElementById("stateNew");
    const stateOld = document.getElementById("stateOld");
    const stock = document.getElementById("stock");
    const rating = document.getElementById("rating");
    const gearType = document.getElementById("gearType");
    const kilometers = document.getElementById("kilometers");
    const price = document.getElementById("price");
    const discount = document.getElementById("discount");
    const province = document.getElementById("province");
    const location = document.getElementById("location");
    const postalCode = document.getElementById("postalCode");
    const title = document.getElementById("title");
    const description = document.getElementById("description");
    const images = document.getElementById("images");

    

    brand.addEventListener("change",async (e) => {
        let res = await fetch(`${url}/brands/id/${brand.value}`);
        let brandTest = await res.json();
        if(brandTest.error){
            brand.classList.add("is-invalid");
            brand.insertAdjacentElement("afterend",divGenerator("La marca elegida es inválida"))
        }
        else{
            brand.classList.remove("is-invalid");
        }
    });
    model.addEventListener("change",async (e) => {
        let res = await fetch(`${url}/models/id/${model.value}`);
        let modelTest = await res.json();
        if(modelTest.error){
            model.classList.add("is-invalid");
        }
        else{
            model.classList.remove("is-invalid");
        }
    });
    version.addEventListener("change",async (e) => {
        let res = await fetch(`${url}/versions/id/${version.value}`);
        let versionTest = await res.json();
        if(versionTest.error){
            version.classList.add("is-invalid");
        }
        else{
            version.classList.remove("is-invalid");
        }
    });
    year.addEventListener("change",(e) => {
        if(year.value < 1900 || year.value > (new Date()).getFullYear){
            year.classList.add("is-invalid");
        }
        else{
            year.classList.remove("is-invalid");
        }
    });

    stock.addEventListener("input",(e) => {
        if(stock.value < 1){
            stock.classList.add("is-invalid");
            if(rating.nextElementSibling.tagName !== "DIV"){
                stock.insertAdjacentElement("afterend",divGenerator("El stock debe ser mayor a 0"));
            }
        }
        else{
            stock.classList.remove("is-invalid");
            if(stock.nextElementSibling.tagName === "DIV"){
                stock.nextElementSibling.remove();
            }
        }
    });
    rating.addEventListener("input",(e) => {
        if(rating.value < 0 || rating.value > 5){
            rating.classList.add("is-invalid");
            if(rating.nextElementSibling.tagName !== "DIV"){
                rating.insertAdjacentElement("afterend",divGenerator("El rating debe ser entre 0 y 5"));
            }
        }
        else{
            rating.classList.remove("is-invalid");
            if(rating.nextElementSibling.tagName === "DIV"){
                rating.nextElementSibling.remove();
            }
        }
    });
    gearType.addEventListener("change",(e) => {
        if(gearType.value !== "manual" && gearType.value !== "automática"){
            gearType.classList.add("is-invalid");
            if(gearType.nextElementSibling.tagName !== "DIV"){
                gearType.insertAdjacentElement("afterend",divGenerator("La caja de cambios puede ser automática o manual"));
            }
        }
        else{
            gearType.classList.remove("is-invalid");
            if(gearType.nextElementSibling.tagName === "DIV"){
                gearType.nextElementSibling.remove();
            }
        }
    });
    kilometers.addEventListener("input",(e) => {
        if(kilometers.value < 0){
            kilometers.classList.add("is-invalid");
            if(kilometers.nextElementSibling.tagName !== "DIV"){
                kilometers.insertAdjacentElement("afterend",divGenerator("El kilometraje debe ser mayor o igual a cero"));
            }
        }
        else{
            kilometers.classList.remove("is-invalid");
            if(kilometers.nextElementSibling.tagName === "DIV"){
                kilometers.nextElementSibling.remove();
            }
        }
    });

    form.addEventListener("submit",(e) => {
        


        

    });
});