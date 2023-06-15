const { userController } = require("../controller");
const { authenticate } = require("../middleware");

const routes = require("express").Router();

routes.post("/login",userController.login);
routes.post("/register",userController.register);
routes.get("/:id",authenticate.verifyToken,userController.getUser);
routes.get("/",authenticate.verifyToken,userController.getUsers);
routes.put("/:id",authenticate.verifyToken,userController.updateUser);

module.exports = routes;