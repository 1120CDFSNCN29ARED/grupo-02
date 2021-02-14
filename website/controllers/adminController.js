const brands = require("./brands");
const mmav = require("./mmav");
const adminController = {
    display: (req, res) => {
        res.render("admin", { brands:brands,mmav:mmav});
    },
};
module.exports = adminController;