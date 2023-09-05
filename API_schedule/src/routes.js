const { Router } = require("express");
require("express-async-errors");
const login = require("./controllers/login");
const usersControllers = require("./controllers/userManag/user");
// const adminControllers = require("./controllers/admin");
const { globalErrorHandler } = require("./controllers/error");
const { tokenVerify } = require("./middlewares/tokenVerify");
const { adminVerify } = require("./middlewares/adminVerify");

const routes = Router();

routes.post("/login", login);
routes.post("/createUser", usersControllers.createUser);

// Rotas que requerem autenticação de token
routes.use(tokenVerify);

// Rotas de usuário regular
// routes.post("/user/appointment", usersControllers.createAppointment);
// routes.patch("/user/appointment/:id", usersControllers.updateAppointment);
// routes.delete("/user/appointment/:id", usersControllers.deleteAppointment);

// Rotas que requerem verificação de administrador
routes.use(adminVerify);

// Rotas de administrador
// routes.post("/admin/user", adminControllers.createUser);
// routes.patch("/admin/user/:id", adminControllers.updateUser);
// routes.get("/admin/user/:id", adminControllers.getUser);
// routes.get("/admin/users", adminControllers.listAllUsers);
// routes.delete("/admin/user/:id", adminControllers.deleteUser);

// routes.post("/admin/service", adminControllers.createService);
// routes.patch("/admin/service/:id", adminControllers.updateService);
// routes.get("/admin/service/:id", adminControllers.getService);
// routes.delete("/admin/service/:id", adminControllers.deleteService);
// routes.get("/admin/services", adminControllers.listAllServices);
// routes.get("/admin/service/class/:is_course", adminControllers.listAllUsersClass);

// routes.post("/admin/schedule", adminControllers.createSchedule);
// routes.patch("/admin/schedule/:id", adminControllers.updateSchedule);
// routes.get("/admin/schedule/:id", adminControllers.getSchedule);
// routes.delete("/admin/schedule/:id", adminControllers.deleteSchedule);
// routes.get("/admin/schedules", adminControllers.listAllSchedules);

routes.use(globalErrorHandler);

module.exports = routes;
// const { Router } = require("express");
// require("express-async-errors");
// const login = require("./controllers/login");
// const usersControllers = require("./controllers/user");
// const { globalErrorHandler } = require("./controllers/error");
// // const { exampleMiddleware } = require("./middlewares/example");
// const { tokenVerify } = require("./middlewares/tokenVerify");
// const { adminVerify } = require("./middlewares/adminVerify");
// // const { upload } = require("./middlewares/multer");

// const routes = Router();

// // routes.get("/", exampleMiddleware, (request, response) => {
// //   const name = request.cookies?.user.name;
// //   return response.status(200).json({ message: `hi ${name} \u1F600 ` });
// // });

// routes.post("/login", login);
// // routes.post("/forgot", usersControllers.forgotPassword);
// routes.post("/criateUser", usersControllers.createUser);

// routes.use(tokenVerify);

// // routes.post("/user/appointment", usersControllers.createAppointment);
// // routes.post("/user/appointment", usersControllers.updateAppointment);
// // routes.post("/user/appointment", usersControllers.deleteAppointment);

// routes.use(adminVerify);

// // routes.post("/admin/user", adminControllers.createUser);
// // routes.patch("/admin/user/:id", adminControllers.updateUser);
// // routes.get("/admin/user/:id", adminControllers.getUser);
// // routes.get("/admin/users", adminControllers.listAllUsers);
// // routes.get("/admin/user/:id", adminControllers.deleteUser);

// // routes.get("/admin/service", adminControllers.createService);
// // routes.get("/admin/service/id", adminControllers.updateService);
// // routes.get("/admin/service/id", adminControllers.deleteService);
// // routes.get("/admin/services", adminControllers.listAllServices);
// // routes.get("/admin/service/:is_course", adminControllers.listAllUsersClass);

// // routes.post(
// //   "/logo",
// //   upload.single("logo"),
// //   servicesLogoControllers.createServicesLogo
// // );
// // routes.get("/logo", servicesLogoControllers.getLogoByService);
// // routes.get("/logo/:id", servicesLogoControllers.getLogoById);
// // routes.patch(
// //   "/logo",
// //   upload.single("logo"),
// //   servicesLogoControllers.updateServiceLogo
// // );
// // routes.delete("/logo/:id", servicesLogoControllers.deleteServiceLogo);

// // routes.get("/admin/schedule", adminControllers.createSchedule);
// // routes.get("/admin/schedule/id", adminControllers.updateSchedule);
// // routes.get("/admin/schedule/id", adminControllers.deleteSchedule);
// // routes.get("/admin/schedules", adminControllers.listAllSchedules);

// routes.use(globalErrorHandler);

// module.exports = routes;
