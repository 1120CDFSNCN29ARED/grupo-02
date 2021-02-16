let questions = [
    {
        question: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia minus doloribus sint velit non. Optio eius iste quaerat provident quam est obcaecati alias! Sequi laboriosam quaerat incidunt. Ad, deleniti sit!",
        answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores tempore corrupti voluptas repellendus rerum asperiores sunt, quasi error ab totam placeat veniam at fugit laboriosam inventore deserunt ut omnis excepturi."
    },
    {
        question: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia minus doloribus sint velit non. Optio eius iste quaerat provident quam est obcaecati alias! Sequi laboriosam quaerat incidunt. Ad, deleniti sit!",
        answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores tempore corrupti voluptas repellendus rerum asperiores sunt, quasi error ab totam placeat veniam at fugit laboriosam inventore deserunt ut omnis excepturi."
    },
    {
        question: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia minus doloribus sint velit non. Optio eius iste quaerat provident quam est obcaecati alias! Sequi laboriosam quaerat incidunt. Ad, deleniti sit!",
        answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores tempore corrupti voluptas repellendus rerum asperiores sunt, quasi error ab totam placeat veniam at fugit laboriosam inventore deserunt ut omnis excepturi."
    },
    {
        question: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia minus doloribus sint velit non. Optio eius iste quaerat provident quam est obcaecati alias! Sequi laboriosam quaerat incidunt. Ad, deleniti sit!",
        answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores tempore corrupti voluptas repellendus rerum asperiores sunt, quasi error ab totam placeat veniam at fugit laboriosam inventore deserunt ut omnis excepturi."
    },
    {
        question: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia minus doloribus sint velit non. Optio eius iste quaerat provident quam est obcaecati alias! Sequi laboriosam quaerat incidunt. Ad, deleniti sit!",
        answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores tempore corrupti voluptas repellendus rerum asperiores sunt, quasi error ab totam placeat veniam at fugit laboriosam inventore deserunt ut omnis excepturi."
    },
];

const vehicles = require("../json/vehicles.json");
const parts = require("../json/parts.json");
const brands = require("./brands");
const mmav = require("./mmav");

let product = "";
const productsController = {
    details: (req, res) => {
        const productID = parseInt(req.params.productID, 10);
        if(req.params.productType === "vehicle"){
            product = vehicles.find(vehicle => vehicle.adID === productID);
        }
        else if(req.params.productType === "part"){
            product = parts.find(part => part.adID === productID);
        }
        res.render("productDetails",
        {
            productType: req.params.productType,
            productID: productID,
            product: product,
            questions: questions
        });
    },
    create: (req, res) => {        
        res.render("createProduct", { brands:brands, mmav:mmav, productType: req.params.productType, product: product });
    },
    edit: (req, res) => {
        const productID = parseInt(req.params.productID, 10);
        product = vehicles.find(vehicle => vehicle.adID === productID);
        res.render("./editProduct",
        {
            productType: req.params.productType,
            product: product,
            brands: brands,
            mmav: mmav
        });
    },

}

module.exports = productsController;