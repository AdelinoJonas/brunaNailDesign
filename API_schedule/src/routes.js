const { Router } = require("express");
require("express-async-errors");
const login = require("./controllers/login");
const usersControllers = require("./controllers/user");
const serviceControllers = require("./controllers/service");
// const adminControllers = require("./controllers/admin");
const { globalErrorHandler } = require("./controllers/error");
const { tokenVerify } = require("./middlewares/tokenVerify");
const { adminVerify } = require("./middlewares/adminVerify");
// const userByAdmin  = require("./controllers/userByAdmin");

const routes = Router();
routes.use(globalErrorHandler);

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
// routes.post("/admin/user", userByAdmin.createUserByAdmin);

// routes.patch("/admin/user/:id", adminControllers.updateUser);
// routes.get("/admin/user/:id", adminControllers.getUser);
// routes.get("/admin/users", adminControllers.listAllUsers);
// routes.delete("/admin/user/:id", adminControllers.deleteUser);

// routes.post("/admin/service", serviceControllers.createService);
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

module.exports = routes;