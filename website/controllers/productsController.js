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
            productID: parseInt(req.params.productID, 10),
            product: product,
            questions: questions
        });
    }

}

module.exports = productsController;