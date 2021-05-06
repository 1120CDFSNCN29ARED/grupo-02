window.addEventListener("load", () => {
  const url = "http://localhost:3000/api";

  const divGenerator = (msg) => {
    const div = document.createElement("div");
    div.classList.add("invalid-feedback");
    div.innerText = msg;
    return div;
  };

  const divChecker = (element, condition, msg) => {
    if (condition) {
      element.classList.add("is-invalid");
      if (element.nextElementSibling.tagName !== "DIV") {
        element.insertAdjacentElement("afterend", divGenerator(msg));
      }
    } else {
      element.classList.remove("is-invalid");
      if (element.nextElementSibling.tagName === "DIV") {
        element.nextElementSibling.remove();
      }
    }
  };

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

  brand.addEventListener("change", async (e) => {
    if (brand.value) {
      let res = await fetch(`${url}/brands/id/${brand.value}`);
      let brandTest = await res.json();
      if (brandTest.error) {
        brand.classList.add("is-invalid");
        brand.insertAdjacentElement(
          "afterend",
          divGenerator("La marca elegida es inválida")
        );
      } else {
        brand.classList.remove("is-invalid");
      }
    }
  });
  model.addEventListener("change", async (e) => {
    if (model.value) {
      let res = await fetch(`${url}/models/id/${model.value}`);
      let modelTest = await res.json();
      if (modelTest.error) {
        model.classList.add("is-invalid");
      } else {
        model.classList.remove("is-invalid");
      }
    }
  });
  version.addEventListener("change", async (e) => {
    if (version.value) {
      let res = await fetch(`${url}/versions/id/${version.value}`);
      let versionTest = await res.json();
      if (versionTest.error) {
        version.classList.add("is-invalid");
      } else {
        version.classList.remove("is-invalid");
      }
    }
  });
  year.addEventListener("change", (e) => {
    let condition = year.value < 1900 || year.value > new Date().getFullYear;
    divChecker(year, condition, "Debe seleccionar una fecha válida");
  });
  stock.addEventListener("input", (e) => {
    divChecker(stock, stock.value < 1, "El stock debe ser entre mayor a 0");
  });
  rating.addEventListener("input", (e) => {
    let condition = rating.value < 0 || rating.value > 5;
    let message = "El rating debe ser entre 0 y 5";
    divChecker(rating, condition, message);
  });
  gearType.addEventListener("change", (e) => {
    let condition =
      gearType.value !== "manual" && gearType.value !== "automática";
    let message = "La caja de cambios puede ser automática o manual";
    divChecker(gearType, condition, message);
  });
  kilometers.addEventListener("input", (e) => {
    let condition = kilometers.value < 0;
    let message = "El kilometraje debe ser mayor o igual a cero";
    divChecker(kilometers, condition, message);
  });
  price.addEventListener("input", (e) => {
    let condition = price.value <= 0;
    let message = "El precio debe ser mayor a cero";
    divChecker(price, condition, message);
  });
  discount.addEventListener("input", (e) => {
    let condition =
      discount.value < 0 ||
      discount.value > 99 ||
      !validator.isNumeric(discount.value);
    let message = "El descuento debe ser entre 0 y 99";
    divChecker(discount, condition, message);
  });
  color.addEventListener("change", (e) => {
    let condition = !validator.isAlfa(color.value);
    let message = "El kilometraje debe ser mayor o igual a cero";
    divChecker(color, condition, message);
  });
  province.addEventListener("change", async (e) => {
    if (province.value) {
      let res = await fetch(`${url}/provinces/id/${province.value}`);
      let provinceTest = await res.json();
      if (provinceTest.error) {
        province.classList.add("is-invalid");
        if (province.nextElementSibling.tagName !== "DIV") {
          province.insertAdjacentElement(
            "afterend",
            divGenerator("La provincia elegida es inválida")
          );
        }
      } else {
        province.classList.remove("is-invalid");
        if (province.nextElementSibling.tagName === "DIV") {
          province.nextElementSibling.remove();
        }
      }
    }
  });
  location.addEventListener("change", async (e) => {
    if (location.value) {
      let res = await fetch(`${url}/localities/id/${location.value}`);
      let locationTest = await res.json();
      if (locationTest.error) {
        location.classList.add("is-invalid");
        if (location.nextElementSibling.tagName !== "DIV") {
          location.insertAdjacentElement(
            "afterend",
            divGenerator("La ciudad elegida es inválida")
          );
        }
      } else {
        location.classList.remove("is-invalid");
        if (location.nextElementSibling.tagName === "DIV") {
          location.nextElementSibling.remove();
        }
      }
    }
  });
  postalCode.addEventListener("input", (e) => {
    let condition =
      !validator.isNumeric(postalCode.value) ||
      validator.isLength(postalCode.value, { min: 4 });
    let message = "El código postal debe ser un número de cuatro dígitos";
    divChecker(postalCode, condition, message);
  });
  title.addEventListener("input", (e) => {
    let condition = title.value.length < 15;
    let message = "El código postal debe ser un número de cuatro dígitos";
    divChecker(color, condition, message);
  });
  description.addEventListener("input", (e) => {
    let condition = description.value.length < 50;
    let message = "La descripción debe ser un texto de al menos 50 caracteres";
    divChecker(color, condition, message);
  });

  images.addEventListener("change", (e) => {
    allowedExtensions = ["jpg", "jpeg", "png", "gif"];
    let imageError = 0;
    for (image of images.files) {
      let extension = image.name
        .substring(image.name.lastIndexOf(".") + 1, image.name.length)
        .toLowerCase();
      if (!allowedExtensions.includes(extension)) {
        imageError++;
      }
    }
    if (imageError !== 0) {
      images.classList.add("is-invalid");
      if (images.nextElementSibling.tagName !== "DIV") {
        images.insertAdjacentElement(
          "afterend",
          divGenerator(
            "Las imágenes deben ser del tipo " + allowedExtensions.join(", ")
          )
        );
      }
    } else {
      images.classList.remove("is-invalid");
      if (images.nextElementSibling.tagName === "DIV") {
        images.nextElementSibling.remove();
      }
    }
  });

  form.addEventListener("submit", (e) => {
    const errors = document.getElementsByClassName("is-invalid");
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
});
