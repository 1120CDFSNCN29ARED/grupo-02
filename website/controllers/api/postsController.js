const _ = require("lodash");

const usersService = require("../../services/usersService");
const provincesService = require("../../services/provincesService");
const localitiesService = require("../../services/localitiesService");
const brandsService = require("../../services/brandsService");
const modelsService = require("../../services/modelsService");
const versionsService = require("../../services/versionsService");
const postsService = require("../../services/postsService");
const productsService = require("../../services/productsService");
const partsService = require("../../services/partsService");
const vehiclesService = require("../../services/vehiclesService");
const questionsService = require("../../services/questionsService");
const imagesService = require("../../services/imagesService");

const getPostData = require("../../middlewares/getPostData");

const types = ["car", "motorcycle", "pickup", "truck"];

const postsController = {
  all: async (req, res) => {
    const posts = await postsService.findAll();

    const result = {
      meta: {
        url: req.originalUrl,
      },
    };
    if (!_.isEmpty(posts)) {
      result.data = [];
      for (post of posts) {
        //
        const postData = await getPostData(post);
        result.data.push(postData);
      }
      result.meta.status = 200;
      result.meta.count = posts.length;
    } else {
      result.meta.status = 409;
      result.meta.count = 0;
      result.error = {
        status: "409",
        message: `No posts were found`,
      };
    }
    return res.status(result.meta.status).json(result);
  },
  byID: async (req, res) => {
    const post = await postsService.findByPk(req.params.postID);
    const result = {
      meta: {
        url: req.originalUrl,
      },
    };
    if (post) {
      const postData = await getPostData(post);
      result.data = {
        postData,
      };
      result.meta.status = 200;
      result.meta.count = 1;
    } else {
      result.meta.status = 409;
      result.meta.count = 0;
      result.error = {
        status: "409",
        message: `No posts were found`,
      };
    }
    return res.status(result.meta.status).json(result);
  },
  published: async (req, res) => {
    const posts = await postsService.published();
    console.log(posts);
    const result = {
      meta: {
        url: req.originalUrl,
      },
    };
    if (!_.isEmpty(posts)) {
      result.data = [];
      for (post of posts) {
        const postData = await getPostData(post);
        result.data.push(postData);
      }
      result.meta.status = 200;
      result.meta.count = posts.length;
    } else {
      result.meta.status = 409;
      result.meta.count = 0;
      result.error = {
        status: "409",
        message: `No posts were found`,
      };
    }
    return res.status(result.meta.status).json(result);
  },
  onSale: async (req, res) => {
    const posts = await postsService.onSale();
    const result = {
      meta: {
        url: req.originalUrl,
      },
    };
    if (!_.isEmpty(posts)) {
      result.data = [];
      for (post of posts) {
        const postData = await getPostData(post);
        result.data.push(postData);
      }
      result.meta.status = 200;
      result.meta.count = posts.length;
    } else {
      result.meta.status = 409;
      result.meta.count = 0;
      result.error = {
        status: "409",
        message: `No posts were found`,
      };
    }
    return res.status(result.meta.status).json(result);
  },
  bySellerID: async (req, res) => {
    const errors = {};
    const seller = await usersService.findByPk(req.params.sellerID);
    if (!seller) {
      errors.seller = `No seller was found with the ID ${req.params.sellerID}`;
    }
    const posts = await postsService.findBySellerID(req.params.sellerID);
    const result = {
      meta: {
        url: req.originalUrl,
      },
    };
    if (!_.isEmpty(posts)) {
      result.data = [];
      for (post of posts) {
        const postData = await getPostData(post);
        result.data.push(postData);
      }
      result.meta.status = 200;
      result.meta.count = posts.length;
    } else {
      result.meta.status = 409;
      result.meta.count = 0;
      result.error = {
        status: "409",
        message: `No posts were found`,
      };
    }
    return res.status(result.meta.status).json(result);
  },
  byProvinceID: async (req, res) => {
    const errors = {};
    let count = 0;
    const result = {
      meta: {
        url: req.originalUrl,
      },
    };
    const province = await provincesService.findByPk(req.params.provinceID);
    if (!province) {
      errors.province = "Invalid provinceID";
    }
    if (_.isEmpty(errors)) {
      const localities = await localitiesService.findByProvinceID(
        req.params.provinceID
      );
      result.data = {};
      for (locality of localities) {
        const localityName = locality.localityName;
        const posts = await postsService.findByLocalityID(locality.localityID);
        const postDataArray = [];
        if (!_.isEmpty(posts)) {
          for (post of posts) {
            const postData = await getPostData(post);
            postDataArray.push(postData);
          }
          result.data[localityName] = postDataArray;
          count += posts.length;
        }
      }
      result.meta.status = 200;
      result.meta.count = count;
    } else {
      result.meta.status = 409;
      result.meta.count = 0;
      result.error = {
        status: "409",
        message: `No posts were found`,
        errors,
      };
    }
    return res.status(result.meta.status).json(result);
  },
  byLocalityID: async (req, res) => {
    const errors = {};
    const result = {
      meta: {
        url: req.originalUrl,
      },
    };
    const locality = await localitiesService.findByPk(req.params.localityID);
    if (!locality) {
      errors.locality = "Invalid localityID";
    }
    const posts = await postsService.findByLocalityID(req.params.localityID);
    if (!_.isEmpty(posts)) {
      result.data = [];
      for (post of posts) {
        const postData = await getPostData(post);
        result.data.push(postData);
      }
      result.meta.status = 200;
      result.meta.count = posts.length;
    } else {
      result.meta.status = 409;
      result.meta.count = 0;
      result.error = {
        status: "409",
        message: `No posts were found`,
      };
    }
    return res.status(result.meta.status).json(result);
  },
  create: async (req, res) => {
    const result = {
      meta: { url: req.originalUrl },
    };
    const errors = {};
    let brand = null;
    let model = null;
    let version = null;
    const newPart = {};
    let part = null;
    const newVehicle = {};
    let vehicle = null;
    const newProduct = {};
    let product = null;
    const newPost = {};
    let post = null;
    let locality = null;
    let province = null;
    //const productTypes = await productsService.findPostTypes();
    const productTypes = ["vehicle", "part"];
    if (!productTypes.includes(req.body.productType)) {
      errors.postType =
        "Invalid post type, please enter: " + productTypes.join(", ");
    } else {
      if (req.body.productType === "part") {
        brand = await brandsService.findByPk(req.body.brandID);
        if (!brand || brand.makesParts === false) {
          errors.brandID = "Invalid brandID";
        } else {
          model = await modelsService.findByPk(req.body.modelID);
          if (
            !model ||
            model.brandID !== brand.brandID ||
            model.car === false ||
            model.pickup === false ||
            model.motorcycle === false ||
            model.truck === false
          ) {
            errors.modelID = "Invalid modelD";
          } else {
            newProduct.modelID = model.modelID;
            newPart.partSerialNumber = req.body.partSerialNumber;
            newPart.car = req.body.car;
            newPart.motorcycle = req.body.motorcycle;
            newPart.pickup = req.body.pickup;
            newPart.truck = req.body.truck;
          }
        }
      } else if (req.body.productType === "vehicle") {
        brand = await brandsService.findByPk(req.body.brandID);
        if (
          !brand ||
          (brand.car === false &&
            brand.pickup === false &&
            brand.motorcycle === false &&
            brand.truck === false)
        ) {
          errors.brandID = "Invalid brandID";
        } else {
          model = await modelsService.findByPk(req.body.modelID);
          if (
            !model ||
            model.brandID !== brand.brandID ||
            (model.car === false &&
              model.pickup === false &&
              model.motorcycle === false &&
              model.truck === false)
          ) {
            errors.modelID = "Invalid modelID";
          } else {
            version = await versionsService.findByPk(req.body.versionID);
            if (!version || version.modelID !== model.modelID) {
              errors.versionID = "Invalid versionID";
            } else {
              if (types.includes(req.body.type)) {
                newVehicle.versionID = version.versionID;
                newVehicle.type = req.body.type;
                newVehicle.gearType = req.body.gearType;
                newVehicle.year = req.body.year;
                newVehicle.kilometers = req.body.kilometers;
                newVehicle.color = req.body.color;
              } else {
                errors.type =
                  "Invalid type, it must be either: " + types.join(", ");
              }
            }
          }
        }
      }
    }
    locality = await localitiesService.findByPk(req.body.locationID);
    if (!locality) {
      errors.location = "Invalid locationID";
    } else {
      province = await provincesService.findByPk(locality.provinceID);
    }
    let seller = await usersService.findByPk(req.body.sellerID);
    if (!seller) {
      errors.sellerID = "Invalid sellerID";
    }

    if (_.isEmpty(errors)) {
      newProduct.productType = req.body.productType;
      if (req.body.productType === "part") {
        part = await partsService.create(newPart);
        newProduct.partID = part.partID;
      }
      if (req.body.productType === "vehicle") {
        vehicle = await vehiclesService.create(newVehicle);
        newProduct.vehicleID = vehicle.vehicleID;
      }
      newProduct.brandID = req.body.brandID;
      newProduct.modelID = req.body.modelID;
      product = await productsService.create(newProduct);

      newPost.title = req.body.title;
      newPost.description = req.body.description;
      if (req.body.published) {
        newPost.published = req.body.published;
        newPost.publishedDate = new Date();
      }
      if (req.body.discount > 0) {
        newPost.onSale = true;
        newPost.discount = req.body.discount;
      }
      newPost.price = req.body.price;
      newPost.discount = req.body.discount;
      newPost.stock = req.body.stock;
      newPost.rating = req.body.rating;
      newPost.state = req.body.state;
      newPost.featured = req.body.featured;
      newPost.sellerID = req.body.sellerID;
      newPost.locationID = locality.localityID;
      newPost.postalCode = req.body.postalCode;
      newPost.productID = product.productID;

      post = await postsService.create(newPost);
      console.log("post: ", post);

      if (post) {
        const postData = await getPostData(post);
        result.data = postData;
        result.meta.status = 201;
        result.meta.count = 1;
      }
    } else {
      result.meta.status = 409;
      result.meta.count = 0;
      result.error = {
        status: "409",
        message: "Post not created",
        errors,
      };
    }
    return res.status(result.meta.status).json(result);
  },
  update: async (req, res) => {
    const errors = {};
    const result = { meta: {} };
    let post = await postsService.findByPk(req.params.postID);
    let newPost = {};
    let product = null;
    let newProduct = {};
    let brand = null;
    let newBrand = null;
    let model = null;
    let newModel = null;
    let version = null;
    let newVersion = null;
    let vehicle = null;
    let newVehicle = {};
    let part = null;
    let newPart = {};
    if (!post) {
      errors.postID = "Invalid postID";
    } else {
      product = await productsService.findByPk(post.productID);
      if (product.productType === "vehicle") {
        if (req.body.brandID) {
          newBrand = await brandsService.findByPk(req.body.brandID);
          if (
            !newBrand ||
            (newBrand.car === false &&
              newBrand.motorcycle === false &&
              newBrand.pickup === false &&
              newBrand.truck === false)
          ) {
            errors.brandID = "Invalid brandID";
          } else {
            if (!req.body.modelID) {
              errors.modelID =
                "Please provide a modelID when changing the brandID";
            } else {
              newModel = await modelsService.findByPk(req.body.modelID);
              if (
                !newModel ||
                newModel.brandID !== newBrand.brandID ||
                (newBrand.car === false &&
                  newBrand.motorcycle === false &&
                  newBrand.pickup === false &&
                  newBrand.truck === false)
              ) {
                errors.modelID = "Invalid modelID";
              } else {
                if (req.body.versionID) {
                  newVersion = await versionsService.findByPk(
                    req.body.versionID
                  );
                  if (!newVersion || newVersion.modelID !== model.modelID) {
                    errors.versionID = "Invalid versionID";
                  }
                } else {
                  errors.versionID =
                    "Please provide a versionID when changing the modelID";
                }
              }
            }
          }
        } else if (req.body.modelID || req.body.versionID) {
          errors.brandID = "Please provide a brandID, modelID and versionID";
        }
        if (req.body.type && !types.includes(req.body.type)) {
          errors.type =
            "Invalid vehicle type. Please use either: " + types.join(", ");
        }
      } else if (product.productType === "part") {
        if (req.body.brandID) {
          newBrand = await brandsService.findByPk(req.body.brandID);
          if (!newBrand || newBrand.makesParts === false) {
            errors.brandID = "Invalid brandID";
          } else {
            if (!req.body.modelID) {
              errors.modelID =
                "Please provide a modelID when changing the brandID";
            } else {
              newModel = await modelsService.findByPk(req.body.modelID);
              if (
                !newModel ||
                newModel.brandID !== newBrand.brandID ||
                newBrand.idPart === false
              ) {
                errors.modelID = "Invalid modelID";
              }
            }
          }
        } else if (req.body.modelID || req.body.versionID) {
          errors.brandID = "Please provide a brandID, modelID and versionID";
        }
      }
      if (req.body.locationID) {
        locality = localitiesService.findByPk(req.body.locationID);
        if (!locality) {
          errors.locationID = "Invalid location ID";
        }
      }
      if (
        req.body.gearType &&
        !(req.body.gearType === "automática" || req.body.gearType === "manual")
      ) {
        errors.gearType = "Invalid gearType, please use manual or automática";
      }
    }
    if (_.isEmpty(errors)) {
      if (product.productType === "vehicle") {
        if (req.body.gearType) {
          newVehicle.gearType = req.body.gearType;
        }
        if (req.body.type) {
          newVehicle.type = req.body.type;
        }
        if (req.body.year) {
          newVehicle.year = req.body.year;
        }
        if (req.body.kilometers) {
          newVehicle.kilometers = req.body.kilometers;
        }
        if (req.body.color) {
          newVehicle.color = req.body.color;
        }
        if (req.body.versionID) {
          newVehicle.versionID = req.body.versionID;
        }
        if (!_.isEmpty(newVehicle)) {
          vehicle = await vehiclesService.update(product.vehicleID, newVehicle);
        }
      } else if (product.productType === "part") {
        if (req.body.partSerialNumber) {
          newPart.partSerialNumber = req.body.partSerialNumber;
        }
        if (req.body.car) {
          newPart.car = req.body.car;
        }
        if (req.body.motorcycle) {
          newPart.motorcycle = req.body.motorcycle;
        }
        if (req.body.pickup) {
          newPart.pickup = req.body.pickup;
        }
        if (req.body.truck) {
          newPart.truck = req.body.truck;
        }
        if (!_.isEmpty(newPart)) {
          part = await partsService.update(product.partID, newPart);
        }
      }

      if (req.body.brandID) {
        newProduct.brandID = req.body.brandID;
      }
      if (req.body.modelID) {
        newProduct.modelID = req.body.modelID;
      }
      if (!_.isEmpty(newProduct)) {
        product = await productsService.update(product.productID, newProduct);
      }

      if (req.body.title) {
        newPost.title = req.body.title;
      }
      if (req.body.description) {
        newPost.description = req.body.description;
      }
      if (req.body.published) {
        newPost.published = req.body.published;
        newPost.publishedDate = new Date();
      }
      if (req.body.onSale) {
        newPost.onSale = req.body.onSale;
      }
      if (req.body.discount) {
        newPost.discount = req.body.discount;
      }
      if (req.body.price) {
        newPost.price = req.body.price;
      }
      if (req.body.stock) {
        newPost.stock = req.body.stock;
      }
      if (req.body.rating) {
        newPost.rating = req.body.rating;
      }
      if (req.body.locationID) {
        newPost.locationID = req.body.locationID;
      }
      if (req.body.postalCode) {
        newPost.postalCode = req.body.postalCode;
      }
      if (!_.isEmpty(newPost)) {
        post = await postsService.update(post.postID, newPost);
      }
      if (post) {
        const postData = await getPostData(post);
        result.data = postData;
        result.meta.status = 201;
        result.meta.count = 1;
      }
    } else {
      result.meta.status = 409;
      result.meta.count = 0;
      result.error = {
        status: "409",
        message: "Post not created",
        errors,
      };
    }

    return res.status(result.meta.status).json(result);
  },
  delete: async (req, res) => {
    const result = {
      meta: {
        url: req.originalUrl,
        status: 400,
      },
      error: {
        status: 400,
        message: "Post deletion through API is not implemented yet",
      },
    };
    return res.status(result.meta.status).json(result);
  },
};

module.exports = postsController;
