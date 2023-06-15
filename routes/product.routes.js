const { productController } = require("../controller");
const { authenticate } = require("../middleware");


const routes = require("express").Router();



routes.post("/create",authenticate.verifyToken,productController.createProduct);
routes.get("/", authenticate.verifyToken,productController.getProducts);
routes.get("/:id",authenticate.verifyToken, productController.getProduct);
routes.put("/:id",authenticate.verifyToken,productController.updateProduct)
routes.delete("/:id",authenticate.verifyToken, productController.deleteProduct);

module.exports =routes;