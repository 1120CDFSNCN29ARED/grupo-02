const fs = require("fs");
const path = require("path");
const bcryptjs = require("bcryptjs");

//JSON data
const localities = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../../json/localities.json"), "utf-8")
);
const provinces = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../../json/provinces.json"), "utf-8")
);
const brands = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "../../json/_real_cars_1_brands__202104181951.json"),
    "utf-8"
  )
);
const models = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "../../json/_real_cars_01_models__202104181955.json"),
    "utf-8"
  )
);
const versions = JSON.parse(
  fs.readFileSync(
    path.join(
      __dirname,
      "../../json/_real_cars_01_vehicle_versions_noYear__202104190004.json"
    ),
    "utf-8"
  )
);

async function populateDB(db) {
  await db.Brand.bulkCreate(brands).catch((error) => console.log(error));
  await db.Model.bulkCreate(models).catch((error) => console.log(error));
  await db.VehicleVersion.bulkCreate(versions).catch((error) =>
    console.log(error.message, error.values)
  );
  await db.Province.bulkCreate(provinces).catch((error) => console.log(error));
  await db.Locality.bulkCreate(localities).catch((error) => console.log(error));
  const role = await db.Role.create({
    roleName: "user",
    roleDescription: "standard user access",
  }).catch((error) => console.log(error));

  const user = await db.User.create({
    firstName: "Pepito",
    lastName: "Oreo",
    userName: "test",
    dni: 12345678,
    email: "test@test.com",
    telephone: 12345678,
    address: "calle falsa 123",
    postalCode: 1234,
    image: "default-profile.png",
    locationID: 1,
  }).catch((error) => console.log(error));
  const userAccess = user
    .createUserAccess({
      email: user.email,
      password: bcryptjs.hashSync("test", 10),
      roleID: role.roleID,
    })
    .catch((error) => console.log(error));

  const user2 = await db.User.create({
    firstName: "Santiago",
    lastName: "Maldini",
    userName: "santi",
    dni: 12345671,
    email: "santi@test.com",
    telephone: 12345687,
    address: "alguna calle 123",
    postalCode: 1234,
    image: "default-profile.png",
    locationID: 390,
  }).catch((error) => console.log(error));
  const userAccess2 = user2
    .createUserAccess({
      email: user2.email,
      password: bcryptjs.hashSync("test", 10),
      roleID: role.roleID,
    })
    .catch((error) => console.log(error));
  const user3 = await db.User.create({
    firstName: "Simon",
    lastName: "Huxter",
    userName: "simon",
    dni: 12345679,
    email: "simon@test.com",
    telephone: 12345678,
    address: "fake street 123",
    postalCode: 1234,
    image: "default-profile.png",
    locationID: 2,
  }).catch((error) => console.log(error));
  const userAccess3 = user3
    .createUserAccess({
      email: user3.email,
      password: bcryptjs.hashSync("test", 10),
      roleID: role.roleID,
    })
    .catch((error) => console.log(error));
  const user4 = await db.User.create({
    firstName: "Pepito",
    lastName: "Oreo",
    userName: "pepito",
    dni: 12345676,
    email: "pepito@test.com",
    telephone: 12345676,
    address: "calle falsa 123",
    postalCode: 1234,
    image: "default-profile.png",
    locationID: 1,
  }).catch((error) => console.log(error));
  const userAccess4 = user4
    .createUserAccess({
      email: user4.email,
      password: bcryptjs.hashSync("test", 10),
      roleID: role.roleID,
    })
    .catch((error) => console.log(error));
  const user5 = await db.User.create({
    firstName: "Oreo",
    lastName: "Pepito",
    userName: "oreo",
    dni: 12345675,
    email: "oreo@test.com",
    telephone: 12345678,
    address: "calle falsa 123",
    postalCode: 1234,
    image: "default-profile.png",
    locationID: 1,
  }).catch((error) => console.log(error));
  const userAccess5 = user5
    .createUserAccess({
      email: user5.email,
      password: bcryptjs.hashSync("test", 10),
      roleID: role.roleID,
    })
    .catch((error) => console.log(error));
  const user6 = await db.User.create({
    firstName: "Pablo",
    lastName: "Baleztena",
    userName: "piarrot",
    dni: 12345674,
    email: "piarrot@test.com",
    telephone: 12345678,
    address: "calle falsa 123",
    postalCode: 1234,
    image: "default-profile.png",
    locationID: 1,
  }).catch((error) => console.log(error));
  const userAccess6 = user6
    .createUserAccess({
      email: user6.email,
      password: bcryptjs.hashSync("test", 10),
      roleID: role.roleID,
    })
    .catch((error) => console.log(error));

  const brand = await db.Brand.create({
    brandName: "BMW Test",
    car: true,
    motorcycle: true,
    pickup: true,
    truck: false,
    makesParts: true,
  });
  const model = await db.Model.create({
    modelName: "Serie 1",
    brandID: brand.brandID,
    car: true,
  });
  const partModel = await db.Model.create({
    modelName: "Test Part Model",
    brandID: brand.brandID,
    car: true,
    part: true,
  });
  const part = await db.Part.create({ partSerialNumber: "abc123", car: true });
  const partProduct = await db.Product.create({
    productType: "part",
    partID: part.partID,
    brandID: brand.brandID,
    modelID: partModel.modelID,
  });
  const partPost = await db.Post.create({
    title: "Test Part Title",
    description: "Test Description",
    published: true,
    publishedDate: new Date(),
    price: 1234,
    onSale: true,
    discount: 10,
    stock: 10,
    rating: 3,
    state: "nuevo",
    featured: true,
    sellerID: user.userID,
    locationID: 1,
    postalCode: 1234,
    productID: partProduct.productID,
  });
  const version = await db.VehicleVersion.create({
    brandID: brand.brandID,
    modelID: model.modelID,
    versionName: "118i Advantage 5P",
  });
  const vehicle = await db.Vehicle.create({
    versionID: version.versionID,
    gearType: "automática",
    type: "car",
    year: 2021,
    kilometers: 0,
    color: "black",
  });
  const product = await db.Product.create({
    productType: "vehicle",
    vehicleID: vehicle.vehicleID,
    brandID: brand.brandID,
    modelID: model.modelID,
  });
  const post = await db.Post.create({
    title: "El BMW de Pepito",
    description: "Un auto listo para la revolucióÑ",
    published: true,
    publishedDate: new Date(),
    price: 123456,
    onSale: true,
    discount: 20,
    stock: 1,
    rating: 4,
    state: "nuevo",
    featured: true,
    sellerID: user.userID,
    locationID: 1,
    postalCode: 1234,
    productID: product.productID,
  });
  const image = await db.ImageUrl.create({
    imageURL: "no-image-found.jpeg",
    postID: post.postID,
  });
  const favourite = await db.Favourite.create({
    userID: user.userID,
    postID: post.postID,
  });
  const cart = await db.Cart.create({
    userID: user.userID,
    status: "active",
    active: true,
  }).catch((error) => error);
  const cartItem = await db.CartItem.create({
    cartID: cart.cartID,
    postID: post.postID,
    quantity: 1,
    price: 100,
    active: true,
  }).catch((error) => error);
  const question = await db.Question.create({
    question: "Es real?",
    questionDate: new Date(),
    userID: user.userID,
    postID: post.postID,
  });
  /* Generar otro auto de prueba*/
  const vehicle2 = await db.Vehicle.create({
    versionID: 6341,
    gearType: "automática",
    type: "car",
    year: 2021,
    kilometers: 0,
    color: "black",
  });
  const product2 = await db.Product.create({
    productType: "vehicle",
    vehicleID: vehicle2.vehicleID,
    brandID: 34,
    modelID: 676,
  });
  const post2 = await db.Post.create({
    title: "Peugeot 208",
    description: `***** PEUGEOT- PLAN NACIONAL *****

•LLEVATELO CON $ 410.000, PATENTAMIENTO INCLUIDO!!
•SALDO EN CUOTAS DE $ 15.000 APROX.
•CAMBIO DE MODELO 100% PRORRATEADO.

#-LA OPERACIÓN 100% ONLINE, SIN MOVERTE DE TU CASA.

#-VENTAS A TODO EL PAÍS (GESTIONAMOS TODA LA OPERACIÓN A DISTANCIA) SOLO VENIS A RETIRAR TU 0KM.
------------------------------------------------------
*- CUPOS LIMITADOS!
*- PLANES DIRECTO DE FABRICA.
*- CUOTAS EN PESOS Y SIN INTERÉS.
*- PODES CANCELAR O ANTICIPAR CUOTAS.
*- MÍNIMOS REQUISITOS, SOLO DNI.
*- BONIFICACIONES Y DESCUENTOS EXCLUSIVOS A CLIENTES DE MERCADOLIBRE.
*- TOMAMOS TU USADO Y PLANES EN PARTE DE PAGO.

** CONSULTE TAMBIÉN POR NUESTRO STOCK DE PLANES AGRUPADOS / ADJUDICADOS!!!!**
------------------------------------------------------
Concesionario Oficial D'arc Peugeot/Citroën
Con 50 Años De Trayectoria

~Precio Publicado Corresponde Al Anticipo~
*** imágenes no contractuales ***`,
    published: true,
    publishedDate: new Date(),
    price: 1200000,
    onSale: false,
    discount: 0,
    stock: 1,
    rating: 4,
    state: "nuevo",
    featured: true,
    sellerID: user3.userID,
    locationID: 390,
    postalCode: 1234,
    productID: product2.productID,
  });
  const image2_1 = await db.ImageUrl.create({
    imageURL: "peugeot_208_1.webp",
    postID: post2.postID,
  });
  const image2_2 = await db.ImageUrl.create({
    imageURL: "peugeot_208_2.webp",
    postID: post2.postID,
  });
  const image2_3 = await db.ImageUrl.create({
    imageURL: "peugeot_208_3.webp",
    postID: post2.postID,
  });
  /* Generar otro auto de prueba*/
  const vehicle3 = await db.Vehicle.create({
    versionID: 9152,
    gearType: "automática",
    type: "pickup",
    year: 2021,
    kilometers: 0,
    color: "gris",
  });
  const product3 = await db.Product.create({
    productType: "vehicle",
    vehicleID: vehicle3.vehicleID,
    brandID: 49,
    modelID: 897,
  });
  const post3 = await db.Post.create({
    title: "Volkswagen Amarok 3.0 V6 Extreme",
    description: `UTOTAG S.A - EL CONCESIONARIO OFICIAL VOLKSWAGEN MAS ELEGIDO DE ARGENTINA

GASTON DOMINGUEZ-ASESOR DE VENTAS
CASA CENTRAL-CERTIFICADO POR VW INTERNATIONAL CENTER

***** EXPERIENCIA 5 ESTRELLAS *****

+ ENTREGA INMEDIATA
+ MAS DE 800 AUTOS EN STOCK PERMANENTE

¡CONCESIONARIO NÚMERO 1 EN VENTAS
Miembro DE GRUPO DIAZ con mas de 40 años en el mercado.

En Autotag Volkswagen priorizamos tu experiencia de compra para que sea 5 estrellas
------------------------------------------------------------------------------------------------------------
NUEVA VOLKSWAGEN AMAROK<
LLEVATELA CON LA EXCLUSIVA FINANCIACION DE VW, HASTA $850.000 CON TASA 0%!!!
12 cuotas fijas, en pesos y sin interés de $70.831!

DISPONIBLES:

VW AMAROK V6 COMFORTLINE
VW AMAROK V6 HIGHLINE
VW AMAROK V6 EXTREME*** PUBLICADO
VW AMAROK V6 EXTREME BLACK STYLE

COMPRA TU NUEVA AMAROK CON NOSOTROS

PODEMOS OFRECERTE:

COMPRA ONLINE

COLORES A ELECCIÓN

AMPLIO STOCK

MEJORES PRECIOS

ENTREGA INMEDIATA

VENDEMOS A TODO EL PAÍS

*EMITIMOS FACTURA PROFORMA

*FINANCIA SOLO CON DNI CUOTAS FIJAS

*RECIBIMOS SU USADO AL MEJOR PRECIO*

AUTOTAG - VOLKSWAGEN - CASA CENTRAL

VALOR CONTADO EFECTIVO O FINANCIADO
NO INCLUYE GASTOS NI FORMULARIOS
*FOTOS ILUSTRATIVAS*`,
    published: true,
    publishedDate: new Date(),
    price: 6651300,
    onSale: true,
    discount: 20,
    stock: 5,
    rating: 4,
    state: "nuevo",
    featured: true,
    sellerID: user2.userID,
    locationID: 390,
    postalCode: 1234,
    productID: product3.productID,
  });
  const image3_1 = await db.ImageUrl.create({
    imageURL: "amarok_1.webp",
    postID: post3.postID,
  });
  const image3_2 = await db.ImageUrl.create({
    imageURL: "amarok_2.webp",
    postID: post3.postID,
  });
  const image3_3 = await db.ImageUrl.create({
    imageURL: "amarok_3.webp",
    postID: post3.postID,
  });
  /* Generar otro auto de prueba*/
  const vehicle4 = await db.Vehicle.create({
    versionID: 9122,
    gearType: "automática",
    type: "pickup",
    year: 2020,
    kilometers: 50000,
    color: "blanco",
  });
  const product4 = await db.Product.create({
    productType: "vehicle",
    vehicleID: vehicle4.vehicleID,
    brandID: 49,
    modelID: 894,
  });
  const post4 = await db.Post.create({
    title: "Volkswagen Tiguan Allspace 2.0 Tsi Trendline 150cv Dsg",
    description: `EL MEJOR PRECIO DEL MERCADO 10 AÑOS DE TRAYECTORIA
CONTAMOS CON EL MAS AMPLIO STOCK 800 UNIDADES EN MODELOS, VERSIONES Y COLORES
LA MEJOR FINANCIACIÓN
CREDITOS PRENDARIOS SOLO CON DNI
VENTAS A TODO EL PAÍS / UNIDADES FÍSICAS PARA ENTREGA INMEDIATA
TU USADO VALE MAS EN AUTOTAG
PRECIO PROMOCIONAL SOLO POR ESTA SEMANA
LOS PRECIOS NO INCLUYEN GASTOS
FOTOS ILUSTRATIVAS

RODRIGO TOBIA
ASESOR COMERCIAL
AUTOTAG CONCESIONARIA OFICIAL VOLKSWAGEN`,
    published: true,
    publishedDate: new Date(),
    price: 4820000,
    onSale: true,
    discount: 10,
    stock: 1,
    rating: 4,
    state: "usado",
    featured: true,
    sellerID: user4.userID,
    locationID: 4130,
    postalCode: 1234,
    productID: product4.productID,
  });
  const image4_1 = await db.ImageUrl.create({
    imageURL: "tiguan_1.webp",
    postID: post4.postID,
  });
  const image4_2 = await db.ImageUrl.create({
    imageURL: "tiguan_2.webp",
    postID: post4.postID,
  });
  const image4_3 = await db.ImageUrl.create({
    imageURL: "tiguan_3.webp",
    postID: post4.postID,
  });
  try {
    const adminRole = await db.Role.create({
      roleName: "admin",
      roleDescription: "admin user access",
    });
    const admin = await db.User.create({
      firstName: "admin",
      lastName: "test",
      userName: "admin",
      dni: 12345670,
      email: "admin@test.com",
      telephone: 12345678,
      address: "calle falsa del Rey 123",
      postalCode: 1234,
      image: "no-image-found.jpeg",
      locationID: 1,
    });
    const role = await db.Role.findOne({ where: { roleName: "admin" } });
    admin.createUserAccess({
      email: admin.email,
      password: bcryptjs.hashSync("test", 10),
      roleID: adminRole.roleID,
    });
  } catch (error) {
    console.error(error);
    console.log(error);
  }
}

module.exports = populateDB;
