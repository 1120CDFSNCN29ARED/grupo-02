const localitiesService = require("./../../services/localitiesService");
const postsService = require("./../../services/postsService");
const usersService = require("./../../services/usersService");

const localitiesController = {
  findAll: async (req, res) => {
    const localities = await localitiesService.findAll({ active: true });
    const result = {
      meta: {
        url: req.originalUrl,
      },
    };
    if (localities) {
      result.data = {
        localities,
      };
      result.meta.status = 200;
      result.meta.count = localities.length;
    } else {
      result.meta.status = 409;
      result.meta.count = 0;
      result.error = {
        status: "409",
        message: `No provinces were found`,
      };
    }
    return res.status(result.meta.status).json(result);
  },
  findByID: async (req, res) => {
    const locality = await localitiesService.findByPk(req.params.localityID);
    const result = {
      meta: {
        url: req.originalUrl,
      },
    };
    if (locality) {
      result.data = {
        locality,
      };
      result.meta.status = 200;
      result.meta.count = 1;
    } else {
      result.meta.status = 409;
      result.meta.count = 0;
      result.error = {
        status: "409",
        message: `No localities were found`,
      };
    }
    return res.status(result.meta.status).json(result);
  },
  findByName: async (req, res) => {
    const localities = await localitiesService.findByName(
      req.params.localityName
    );
    const result = {
      meta: {
        url: req.originalUrl,
      },
    };
    if (localities) {
      result.data = {
        localities,
      };
      result.meta.status = 200;
      result.meta.count = localities.length;
    } else {
      result.meta.status = 409;
      result.meta.count = 0;
      result.error = {
        status: "409",
        message: `No localities were found`,
      };
    }
    return res.status(result.meta.status).json(result);
  },
  findOneByName: async (req, res) => {
    const locality = await localitiesService.findOneByName(
      req.params.localityName
    );
    const result = {
      meta: {
        url: req.originalUrl,
      },
    };
    if (locality) {
      result.data = {
        locality,
      };
      result.meta.status = 200;
      result.meta.count = 1;
    } else {
      result.meta.status = 409;
      result.meta.count = 0;
      result.error = {
        status: "409",
        message: `No localities were found`,
      };
    }
    return res.status(result.meta.status).json(result);
  },
  findByProvinceID: async (req, res) => {
    const localities = await localitiesService.findByProvinceID(
      req.params.provinceID
    );
    const result = {
      meta: {
        url: req.originalUrl,
      },
    };
    if (localities) {
      result.data = {
        localities,
      };
      result.meta.status = 200;
      result.meta.count = localities.length;
    } else {
      result.meta.status = 409;
      result.meta.count = 0;
      result.error = {
        status: "409",
        message: `No localities were found`,
      };
    }
    return res.status(result.meta.status).json(result);
  },
  create: async (req, res) => {
    const newLocality = {
      provinceID: req.body.provinceID,
      localityName: req.body.localityName,
    };
    const locality = await localitiesService.create(newLocality);
    const result = {
      meta: {
        url: req.originalUrl,
      },
    };
    if (locality) {
      result.data = {
        locality,
      };
      result.meta.status = 201;
      result.meta.count = 1;
    } else {
      result.meta.status = 409;
      result.meta.count = 0;
      result.error = {
        status: "409",
        message: `No localities were found`,
      };
    }
    return res.status(result.meta.status).json(result);
  },
  update: async (req, res) => {
    const newLocality = {};
    if (req.body.localityName !== undefined) {
      newLocality.localityName = req.body.localityName;
    }
    if (req.body.provinceID !== undefined) {
      newLocality.provinceID = req.body.provinceID;
    }
    const locality = await localitiesService.update(
      req.params.localityID,
      newLocality
    );
    const result = {
      meta: {
        url: req.originalUrl,
      },
    };
    if (locality) {
      result.data = {
        locality,
      };
      result.meta.status = 200;
      result.meta.count = 1;
    } else {
      result.meta.status = 409;
      result.meta.count = 0;
      result.error = {
        status: "409",
        message: `No localities were found`,
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

    let locality = await localitiesService.findByPk(req.params.localityID);
    if (locality) {
      const users = await usersService.findByLocation(locality.localityID);
      const posts = await postsService.findByLocalityID(locality.localityID);
      if (posts.length === 0 && users.length === 0) {
        locality = await localitiesService.delete(locality.localityID);
        result.meta.status = 200;
        result.data = locality;
      } else {
        if (posts.length > 0) {
        }
        result.meta.status = 400;
        result.error = {
          status: 400,
          message: `This locality has associated ${
            posts.length > 0 ? "posts " : ""
          }${posts.length > 0 && users.length > 0 ? "and " : ""}${
            users.length > 0 ? "users " : ""
          }`,
          data: {},
        };
        result.error.data["users"] = users;
        result.error.data["posts"] = posts;
      }
    } else {
      result.meta.status = 400;
      result.error = {
        message: "Invalid locality",
        status: 400,
      };
    }
    return res.status(result.meta.status).json(result);
  },
};

module.exports = localitiesController;
