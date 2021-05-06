window.addEventListener("load", () => {
  const url = "http://localhost:3000/api";

  const divGenerator = (msg) => {
    const div = document.createElement("div");
    div.classList.add("invalid-feedback");
    div.innerText = msg;
    return div;
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
    if (year.value < 1900 || year.value > new Date().getFullYear) {
      year.classList.add("is-invalid");
    } else {
      year.classList.remove("is-invalid");
    }
  });

  stock.addEventListener("input", (e) => {
    if (stock.value < 1) {
      stock.classList.add("is-invalid");
      if (stock.nextElementSibling.tagName !== "DIV") {
        stock.insertAdjacentElement(
          "afterend",
          divGenerator("El stock debe ser entre mayor a 0 ")
        );
      }
    } else {
      stock.classList.remove("is-invalid");
      if (stock.nextElementSibling.tagName === "DIV") {
        stock.nextElementSibling.remove();
      }
    }
  });
  rating.addEventListener("input", (e) => {
    if (rating.value < 0 || rating.value > 5) {
      rating.classList.add("is-invalid");
      if (rating.nextElementSibling.tagName !== "DIV") {
        rating.insertAdjacentElement(
          "afterend",
          divGenerator("El rating debe ser entre 0 y 5")
        );
      }
    } else {
      rating.classList.remove("is-invalid");
      if (rating.nextElementSibling.tagName === "DIV") {
        rating.nextElementSibling.remove();
      }
    }
  });
  gearType.addEventListener("change", (e) => {
    if (gearType.value !== "manual" && gearType.value !== "automática") {
      gearType.classList.add("is-invalid");
      if (gearType.nextElementSibling.tagName !== "DIV") {
        gearType.insertAdjacentElement(
          "afterend",
          divGenerator("La caja de cambios puede ser automática o manual")
        );
      }
    } else {
      gearType.classList.remove("is-invalid");
      if (gearType.nextElementSibling.tagName === "DIV") {
        gearType.nextElementSibling.remove();
      }
    }
  });
  kilometers.addEventListener("input", (e) => {
    if (kilometers.value < 0) {
      kilometers.classList.add("is-invalid");
      if (kilometers.nextElementSibling.tagName !== "DIV") {
        kilometers.insertAdjacentElement(
          "afterend",
          divGenerator("El kilometraje debe ser mayor o igual a cero")
        );
      }
    } else {
      kilometers.classList.remove("is-invalid");
      if (kilometers.nextElementSibling.tagName === "DIV") {
        kilometers.nextElementSibling.remove();
      }
    }
  });
  price.addEventListener("input", (e) => {
    if (price.value <= 0) {
      price.classList.add("is-invalid");
      if (price.nextElementSibling.tagName !== "DIV") {
        price.insertAdjacentElement(
          "afterend",
          divGenerator("El precio debe ser mayor a cero")
        );
      }
    } else {
      price.classList.remove("is-invalid");
      if (price.nextElementSibling.tagName === "DIV") {
        price.nextElementSibling.remove();
      }
    }
  });
  discount.addEventListener("input", (e) => {
    if (discount.value < 0 || !validator.isNumeric(discount.value)) {
      discount.classList.add("is-invalid");
      if (discount.nextElementSibling.tagName !== "DIV") {
        discount.insertAdjacentElement(
          "afterend",
          divGenerator("El descuento debe ser mayor o igual a cero")
        );
      }
    } else {
      discount.classList.remove("is-invalid");
      if (discount.nextElementSibling.tagName === "DIV") {
        discount.nextElementSibling.remove();
      }
    }
  });
  color.addEventListener("change", (e) => {
    if (!validator.isAlfa(color.value)) {
      color.classList.add("is-invalid");
      if (color.nextElementSibling.tagName !== "DIV") {
        color.insertAdjacentElement(
          "afterend",
          divGenerator("El kilometraje debe ser mayor o igual a cero")
        );
      }
    } else {
      color.classList.remove("is-invalid");
      if (color.nextElementSibling.tagName === "DIV") {
        color.nextElementSibling.remove();
      }
    }
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
    if (
      !validator.isNumeric(postalCode.value) ||
      validator.isLength(postalCode.value, { min: 4 })
    ) {
      postalCode.classList.add("is-invalid");
      if (postalCode.nextElementSibling.tagName !== "DIV") {
        postalCode.insertAdjacentElement(
          "afterend",
          divGenerator("El código postal debe ser un número de cuatro dígitos")
        );
      }
    } else {
      postalCode.classList.remove("is-invalid");
      if (postalCode.nextElementSibling.tagName === "DIV") {
        postalCode.nextElementSibling.remove();
      }
    }
  });
  title.addEventListener("input", (e) => {
    if (title.value.length < 15) {
      title.classList.add("is-invalid");
      if (title.nextElementSibling.tagName !== "DIV") {
        title.insertAdjacentElement(
          "afterend",
          divGenerator("El título debe ser un texto de al menos 15 caracteres")
        );
      }
    } else {
      title.classList.remove("is-invalid");
      if (title.nextElementSibling.tagName === "DIV") {
        title.nextElementSibling.remove();
      }
    }
  });
  description.addEventListener("input", (e) => {
    if (description.value.length < 50) {
      description.classList.add("is-invalid");
      if (description.nextElementSibling.tagName !== "DIV") {
        description.insertAdjacentElement(
          "afterend",
          divGenerator(
            "La descripción debe ser un texto de al menos 50 caracteres"
          )
        );
      }
    } else {
      description.classList.remove("is-invalid");
      if (description.nextElementSibling.tagName === "DIV") {
        description.nextElementSibling.remove();
      }
    }
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

  form.addEventListener("submit", (e) => {});
});
