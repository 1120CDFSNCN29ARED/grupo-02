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
      element.classList.remove("is-valid");
      element.classList.add("is-invalid");
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

  const form = document.getElementById("form");
  const brand = document.getElementById("brand");
  const model = document.getElementById("model");
  const state = document.getElementById("state");
  const stateNew = document.getElementById("stateNew");
  const stateUsed = document.getElementById("stateUsed");
  const stock = document.getElementById("stock");
  const rating = document.getElementById("rating");
  const price = document.getElementById("price");
  const discount = document.getElementById("discount");
  const province = document.getElementById("province");
  const location = document.getElementById("location");
  const postalCode = document.getElementById("postalCode");
  const title = document.getElementById("title");
  const description = document.getElementById("description");
  const images = document.getElementById("images");

  let year;
  let version;
  let gearType;
  let kilometers;
  let color;

  let partSerialNumber;
  let vehicleType;
  let car;
  let pickup;
  let motorcycle;
  let truck;

  let productType;

  if (window.location.pathname.includes("vehicle")) {
    productType = "vehicle";
    year = document.getElementById("year");
    version = document.getElementById("version");
    gearType = document.getElementById("gearType");
    kilometers = document.getElementById("kilometers");
    color = document.getElementById("color");
  } else if (window.location.pathname.includes("part")) {
    productType = "part";
    partSerialNumber = document.getElementById("partSerialNumber");
    vehicleType = document.getElementById("vehicleType");
    car = document.getElementById("car");
    pickup = document.getElementById("pickup");
    motorcycle = document.getElementById("motorcycle");
    truck = document.getElementById("truck");
  }

  const brandValidation = async () => {
    if (brand.value) {
      let res = await fetch(`${url}/brands/id/${brand.value}`);
      let brandTest = await res.json();
      divChecker(brand, brandTest.error, "La marca elegida es inválida");
    } else {
      if (
        brand.nextElementSibling &&
        brand.nextElementSibling.tagName !== "DIV"
      ) {
        brand.classList.add("is-invalid");
        brand.insertAdjacentElement(
          "afterend",
          divGenerator("Debe seleccionar una marca")
        );
      }
    }
  };
  const modelValidation = async () => {
    if (model.value) {
      let res = await fetch(`${url}/models/id/${model.value}`);
      let modelTest = await res.json();
      divChecker(model, modelTest.error, "El modelo elegido es inválido");
    } else {
      if (
        model.nextElementSibling &&
        model.nextElementSibling.tagName !== "DIV"
      ) {
        model.classList.add("is-invalid");
        model.insertAdjacentElement(
          "afterend",
          divGenerator("Debe seleccionar un modelo")
        );
      }
    }
  };
  const stockValidation = () => {
    divChecker(stock, stock.value < 1, "El stock debe ser entre mayor a 0");
  };
  const stateValidation = () => {
    let condition = !stateNew.value && !stateUsed.value;
    let message = "Debe elegir un estado del producto";
    divChecker(state, condition, message);
  };
  const ratingValidation = () => {
    let condition = !rating.value || rating.value < 0 || rating.value > 5;
    let message = "El rating debe ser entre 0 y 5";
    divChecker(rating, condition, message);
  };
  const priceValidation = () => {
    let condition = price.value <= 0;
    let message = "El precio debe ser mayor a cero";
    divChecker(price, condition, message);
  };
  const discountValidation = () => {
    let condition =
      discount.value < 0 ||
      discount.value > 99 ||
      !validator.isNumeric(discount.value);
    let message = "El descuento debe ser entre 0 y 99";
    divChecker(discount, condition, message);
  };
  const provinceValidation = async () => {
    if (province.value) {
      let res = await fetch(`${url}/provinces/id/${province.value}`);
      let provinceTest = await res.json();
      divChecker(
        province,
        provinceTest.error,
        "La provincia elegida es inválida"
      );
    } else {
      if (
        province.nextElementSibling &&
        province.nextElementSibling.tagName !== "DIV"
      ) {
        province.classList.add("is-invalid");
        province.insertAdjacentElement(
          "afterend",
          divGenerator("Debe seleccionar una provincia")
        );
      }
    }
  };
  const locationValidation = async () => {
    if (location.value) {
      let res = await fetch(`${url}/localities/id/${location.value}`);
      let locationTest = await res.json();
      divChecker(location, locationTest.error, "La ciudad elegida es inválida");
    } else {
      if (
        location.nextElementSibling &&
        location.nextElementSibling.tagName !== "DIV"
      ) {
        location.classList.add("is-invalid");
        location.insertAdjacentElement(
          "afterend",
          divGenerator("Debe seleccionar una ciudad")
        );
      }
    }
  };
  const postalCodeValidation = () => {
    let condition =
      !validator.isNumeric(postalCode.value) || postalCode.value.length !== 4;
    let message = "El código postal debe ser un número de cuatro dígitos";
    divChecker(postalCode, condition, message);
  };
  const titleValidation = () => {
    let condition = !title.value || title.value.length < 15;
    let message = "El título debe tener al menos 15 caracteres";
    divChecker(title, condition, message);
  };
  const descriptionValidation = () => {
    let condition = !description.value || description.value.length < 50;
    let message = "La descripción debe ser un texto de al menos 50 caracteres";
    divChecker(description, condition, message);
  };
  const imagesValidation = () => {
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
  };

  let versionValidation;
  let yearValidation;
  let gearTypeValidation;
  let kilometersValidation;
  if (productType === "vehicle") {
    versionValidation = async () => {
      if (version.value) {
        let res = await fetch(`${url}/versions/id/${version.value}`);
        let versionTest = await res.json();
        divChecker(
          version,
          versionTest.error,
          "La versión elegida es inválida"
        );
      } else {
        if (
          version.nextElementSibling &&
          version.nextElementSibling.tagName !== "DIV"
        ) {
          version.classList.add("is-invalid");
          version.insertAdjacentElement(
            "afterend",
            divGenerator("Debe seleccionar una versión")
          );
        }
      }
    };
    yearValidation = () => {
      let condition = year.value < 1900 || year.value > new Date().getFullYear;
      divChecker(year, condition, "Debe seleccionar una fecha válida");
    };
    gearTypeValidation = () => {
      let condition =
        gearType.value !== "manual" && gearType.value !== "automática";
      let message = "La caja de cambios puede ser automática o manual";
      divChecker(gearType, condition, message);
    };
    kilometersValidation = () => {
      let condition = kilometers.value < 0;
      let message = "El kilometraje debe ser mayor o igual a cero";
      divChecker(kilometers, condition, message);
    };
    version.addEventListener("change", async (e) => {
      await versionValidation();
    });
    year.addEventListener("change", (e) => {
      yearValidation();
    });
    gearType.addEventListener("change", (e) => {
      gearTypeValidation();
    });
    kilometers.addEventListener("input", (e) => {
      kilometersValidation();
    });
    color.addEventListener("change", (e) => {
      let condition = !validator.isAlfa(color.value);
      let message = "El kilometraje debe ser mayor o igual a cero";
      divChecker(color, condition, message);
    });
  }

  let partSerialNumberValidation;
  let vehicleTypeValidation;
  if (productType === "part") {
    partSerialNumberValidation = () => {
      let condition = !partSerialNumber.value;
      let message = "Debe ingresar el número de serie de la parte";
      divChecker(partSerialNumber, condition, message);
    };
    partSerialNumber.addEventListener("input", (e) => {
      partSerialNumberValidation();
    });
    vehicleTypeValidation = () => {
      let condition =
        !car.value && !pickup.value && !pickup.value && !truck.value;
      let message = "Debe seleccionar al menos un tipo de vehículo";
      divChecker(vehicleType, condition, message);
    };
  }

  brand.addEventListener("change", async (e) => {
    await brandValidation();
  });
  model.addEventListener("change", async (e) => {
    await modelValidation();
  });
  stock.addEventListener("input", (e) => {
    stockValidation();
  });
  rating.addEventListener("input", (e) => {
    ratingValidation();
  });
  price.addEventListener("input", (e) => {
    priceValidation();
  });
  discount.addEventListener("input", (e) => {
    discountValidation();
  });
  province.addEventListener("change", async (e) => {
    await provinceValidation();
  });
  location.addEventListener("change", async (e) => {
    await locationValidation();
  });
  postalCode.addEventListener("input", (e) => {
    postalCodeValidation();
  });
  title.addEventListener("input", (e) => {
    titleValidation();
  });
  description.addEventListener("input", (e) => {
    descriptionValidation();
  });
  images.addEventListener("change", (e) => {
    imagesValidation();
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    await brandValidation();
    await modelValidation();
    stateValidation();
    stockValidation();
    ratingValidation();
    priceValidation();
    discountValidation();
    await provinceValidation();
    await locationValidation();
    postalCodeValidation();
    titleValidation();
    descriptionValidation();
    imagesValidation();

    if (productType === "vehicle") {
      await versionValidation();
      yearValidation();
      gearTypeValidation();
      kilometersValidation();
    } else if (productType === "part") {
      partSerialNumberValidation();
      vehicleTypeValidation();
    }

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
    } else {
      form.submit();
      /*
      const body = {
        brandID: brand.value,
        modelID: model.value,
        year: year.value,
        state: stateNew.value || stateUsed.value,
        stock: stock.value,
        rating: rating.value,
        discount: discount.value,
        price: price.value,
        provinceID: province.value,
        locationID: location.value,
        postalCode: postalCode.value,
        title: title.value,
        description: description.value,
        images: images.files,
      };
      if (productType === "vehicle") {
        body.type = type.value;
        body.versionID = version.value;
        body.year = year.value;
        body.gearType = gearType.value;
        body.kilometers = kilometers.value;
        body.color = color.value;
      }
      if (productType === "part") {
        body.partSerialNumber = partSerialNumber.value;
        body.car = car.value;
        body.motorcycle = motorcycle.value;
        body.pickup = pickup.value;
        body.truck = truck.value;
      }
      
      console.log("body",body)
      const bodyJSON = JSON.stringify(body);
      await fetch("http://localhost:3000/posts/create/" + productType,{
        method: "POST",
        headers:  {
          "Content-Type": "application/json",
        },
        body: bodyJSON,
      });
      */
      return;
    }
  });
});
