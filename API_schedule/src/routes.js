const { Router } = require("express");
require("express-async-errors");
const login = require("./controllers/login");
const usersControllers = require("./controllers/user");
const { globalErrorHandler } = require("./controllers/error");
// const { exampleMiddleware } = require("./middlewares/example");
const { tokenVerify } = require("./middlewares/tokenVerify");
const { adminVerify } = require("./middlewares/adminVerify");
// const { upload } = require("./middlewares/multer");

const routes = Router();

// routes.get("/", exampleMiddleware, (request, response) => {
//   const name = request.cookies?.user.name;
//   return response.status(200).json({ message: `hi ${name} \u1F600 ` });
// });

routes.post("/login", login);
// routes.post("/forgot", usersControllers.forgotPassword);
routes.post("/criateUser", usersControllers.createUser);

routes.use(tokenVerify);


routes.use(globalErrorHandler);

module.exports = routes;
