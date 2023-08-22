const { Router } = require("express");
require("express-async-errors");
// const login = require("./controllers/login");
// const adminControllers = require("./controllers/adminUser");
// const usersControllers = require("./controllers/user");
// const officesController = require("./controllers/offices");
// const officesLogoControllers = require("./controllers/officesLogo");
// const clientControllers = require("./controllers/clients");
// const courtHearingControllers = require("./controllers/courtHearing");
// const { globalErrorHandler } = require("./controllers/error");
// const { exampleMiddleware } = require("./middlewares/example");
// const { tokenVerify } = require("./middlewares/tokenVerify");
// const { adminVerify } = require("./middlewares/adminVerify");
// const { upload } = require("./middlewares/multer");

const routes = Router();

// routes.get("/", exampleMiddleware, (request, response) => {
//   const name = request.cookies?.user.name;
//   return response.status(200).json({ message: `hi ${name} \u1F600 ` });
// });

// routes.post("/login", login);
// routes.post("/forgot", usersControllers.forgotPassword);

// routes.use(tokenVerify);

// routes.post("/user", usersControllers.createUser);
// routes.get("/user", usersControllers.getUserInfos);
// routes.patch("/user/infos", usersControllers.updateUserInfos);
// routes.patch("/user/password", usersControllers.changePassword);
// routes.patch("/user/authorized/:id", usersControllers.changeAuthorized);
// routes.get("/user/authorized", usersControllers.listAllAuthorized);
// routes.patch("/user/status/:id", usersControllers.changeStatusUser);

// routes.get("/office/infos", officesController.getOffice);
// routes.get("/office/users", officesController.listOfficesUsers);
// routes.get("/office/client", officesController.listOfficesClients);
// routes.patch("/office", officesController.updateOffice);

// routes.post(
//   "/logo",
//   upload.single("logo"),
//   officesLogoControllers.createOfficesLogo
// );
// routes.get("/logo", officesLogoControllers.getLogoByOffices);
// routes.get("/logo/:id", officesLogoControllers.getLogoById);
// routes.patch(
//   "/logo",
//   upload.single("logo"),
//   officesLogoControllers.updateOfficesLogo
// );
// routes.delete("/logo/:id", officesLogoControllers.deleteOfficesLogo);

// routes.post("/client", clientControllers.createClient);
// routes.get("/clients", clientControllers.listClients);
// routes.get("/client/:id", clientControllers.getClient);
// routes.patch("/client/:id", clientControllers.updateClient);
// routes.delete("/client/:id", clientControllers.deleteClient);

// routes.post("/court/type", courtHearingControllers.createCourtType);
// routes.get("/court/type", courtHearingControllers.listCourtType);
// routes.post("/court", courtHearingControllers.createCourtHearing);
// routes.get("/court", courtHearingControllers.listCourtHearing);
// routes.get("/court/:id", courtHearingControllers.getCourtHearing);
// routes.patch("/court/:id", courtHearingControllers.updateCourtHearing);
// routes.delete("/court/:id", courtHearingControllers.deleteCourtHearing);

// routes.use(adminVerify);

// routes.post("/admin/user", adminControllers.createUserResponsible);
// routes.patch("/admin/user/:id", adminControllers.updateUser);
// routes.get("/admin/user/:id", adminControllers.getUser);
// routes.get("/admin/users", adminControllers.listAllUsers);
// routes.get("/admin/users/:is_active", adminControllers.listAllUsersByStatus);

// routes.use(globalErrorHandler);

module.exports = routes;
