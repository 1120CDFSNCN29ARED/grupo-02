const brandsService = require("../../services/brandsService");
const modelsService = require("../../services/modelsService");
const versionsService = require("../../services/versionsService");

const modelsController = {
  all: async (req, res) => {
    const models = await modelsService.findAll();
    const result = {
      meta: {
        url: req.originalUrl,
      },
    };
    if (models) {
      result.data = {
        models,
      };
      result.meta.status = 200;
      result.meta.count = models.length;
    } else {
      result.meta.status = 409;
      result.meta.count = 0;
      result.error = {
        status: "409",
        message: `No models were found`,
      };
    }
    return res.status(result.meta.status).json(result);
  },
  byID: async (req, res) => {
    const model = await modelsService.findByPk(req.params.modelID);
    const result = {
      meta: {
        url: req.originalUrl,
      },
    };
    if (model) {
      result.data = {
        model,
      };
      result.meta.status = 200;
      result.meta.count = 1;
    } else {
      result.meta.status = 409;
      result.meta.count = 0;
      result.error = {
        status: "409",
        message: `No model was found`,
      };
    }
    return res.status(result.meta.status).json(result);
  },
  byProductType: async (req, res) => {
    let conditions = [];
    if (req.query.productTypes.includes("car")) {
      conditions.push({ vehicle_type_car: true });
    }
    if (req.query.productTypes.includes("motorcycle")) {
      conditions.push({ vehicle_type_motorcycle: true });
    }
    if (req.query.productTypes.includes("pickup")) {
      conditions.push({ vehicle_type_pickup: true });
    }
    if (req.query.productTypes.includes("truck")) {
      conditions.push({ vehicle_type_truck: true });
    }
    const models = await modelsService.findByProductType(conditions);
    const result = {
      meta: {
        url: req.originalUrl,
      },
    };
    if (models) {
      result.data = {
        models,
      };
      result.meta.status = 200;
      result.meta.count = models.length;
    } else {
      result.meta.status = 409;
      result.meta.count = 0;
      result.error = {
        status: "409",
        message: `No model were found`,
      };
    }
    return res.status(result.meta.status).json(result);
  },
  byBrandID: async (req, res) => {
    const models = await modelsService.findByBrandID(req.params.brandID);
    const brand = await brandsService.findByPk(req.params.brandID);
    const result = {
      meta: {
        url: req.originalUrl,
      },
    };
    if (models) {
      result.data = {
        brand,
        models,
      };
      result.meta.status = 200;
      result.meta.count = models.length;
    } else {
      result.meta.status = 409;
      result.meta.count = 0;
      result.error = {
        status: "409",
        message: `No models were found`,
      };
    }
    return res.status(result.meta.status).json(result);
  },
  create: async (req, res) => {
    const newData = {
      modelName: req.body.modelName,
      brandID: req.body.brandID,
    };
    if (req.body.makes) {
      if (req.body.makes.car !== undefined) {
        newData.car = req.body.makes.car;
      }
      if (req.body.makes.motorcycle !== undefined) {
        newData.motorcycle = req.body.makes.motorcycle;
      }
      if (req.body.makes.pickup !== undefined) {
        newData.pickup = req.body.makes.pickup;
      }
      if (req.body.makes.truck !== undefined) {
        newData.truck = req.body.makes.truck;
      }
      if (req.body.makes.part !== undefined) {
        newData.makesParts = req.body.part;
      }
    }
    const model = await modelsService.create(newData);
    const result = {
      meta: {
        url: req.originalUrl,
      },
    };
    if (model) {
      result.data = {
        model,
      };
      result.meta.status = 201;
      result.meta.count = model.length;
    } else {
      result.meta.status = 409;
      result.meta.count = 0;
      result.error = {
        status: "409",
        message: `No models were found`,
      };
    }
    return res.status(result.meta.status).json(result);
  },
  update: async (req, res) => {
    const newData = {};
    if (req.body.modelName !== undefined) {
      newData.modelName = req.body.modelName;
    }
    if (req.body.brandID !== undefined) {
      newData.brandID = req.body.brandID;
    }
    if (req.body.makes) {
      if (req.body.makes.car !== undefined) {
        newData.vehicle_type_car = req.body.makes.car;
      }
      if (req.body.makes.motorcycle !== undefined) {
        newData.vehicle_type_motorcycle = req.body.makes.motorcycle;
      }
      if (req.body.makes.pickup !== undefined) {
        newData.vehicle_type_pickup = req.body.makes.pickup;
      }
      if (req.body.makes.truck !== undefined) {
        newData.vehicle_type_truck = req.body.makes.truck;
      }
      if (req.body.makes.part !== undefined) {
        newData.makes_parts = req.body.makes.part;
      }
    }
    const model = await modelsService.update(req.params.modelID, newData);
    const result = {
      meta: {
        url: req.originalUrl,
      },
    };
    if (model) {
      result.data = {
        model,
      };
      result.meta.status = 200;
      result.meta.count = model.length;
    } else {
      result.meta.status = 409;
      result.meta.count = 0;
      result.error = {
        status: "409",
        message: `No model were found`,
      };
    }
    return res.status(result.meta.status).json(result);
  },
  delete: async (req, res) => {
    const result = {
      meta: {
        url: req.originalUrl,
      },
    };
    let model = await modelsService.findByPk(req.params.modelID);
    if (model) {
      const versions = await versionsService.findByModelID(model.modelID);
      if (versions.length > 0) {
        result.meta.status = 403;
        result.error = {
          status: 403,
          message: `This model has associated versions, please delete the versions first`,
          data: versions,
        };
      } else {
        model = await modelsService.delete(
          req.params.modelID,
          req.query.confirm
        );
        result.meta.status = 200;
        result.data = { model };
      }
    } else {
      result.meta.status = 404;
      result.error = {
        status: 404,
        message: `No models were found`,
      };
    }
    return res.status(result.meta.status).json(result);
  },
};

module.exports = modelsController;
