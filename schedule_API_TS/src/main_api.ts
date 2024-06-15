import LoginUser from "./application/usecase/Login";
import CreateSchedule from "./application/usecase/Schedule/CreateShedule";
import DeleteSchedule from "./application/usecase/Schedule/DeleteSchedule";
import GetSchedule from "./application/usecase/Schedule/GetSchedule";
import UpdateSchedule from "./application/usecase/Schedule/UpdateSchedule";
import CreateService from "./application/usecase/Service/CreateService";
import DeleteService from "./application/usecase/Service/DeleteService";
import GetService from "./application/usecase/Service/GetService";
import UpdateService from "./application/usecase/Service/UpdateService";
import CreateUser from "./application/usecase/User/CreateUser";
import DeleteUser from "./application/usecase/User/DeleteUser";
import GetUser from "./application/usecase/User/GetUser";
import UpdateUser from "./application/usecase/User/UpdateUser";
import LoginRepositoryDataBase from "./infra/repository/LoginRepositoryDataBase";
import ScheduleRepositoryDataBase from "./infra/repository/ScheduleRepositoryDataBase";
import ServiceRepositoryDataBase from "./infra/repository/ServiceRepositoryDataBase";
import UserRepositoryDataBase from "./infra/repository/UserRepositoryDataBase";
import CreateAppointment from "./application/usecase/Appointment/CreateAppointment";
import AppointmentRepositoryDataBase from "./infra/repository/AppointmentRepositoryDataBase";
import GetAppointment from "./application/usecase/Appointment/GetAppointment";
import UpdateAppointment from "./application/usecase/Appointment/UpdateAppointment";
import DeleteAppointment from "./application/usecase/Appointment/DeleteAppointment";
import GetAllUsers from "./application/usecase/User/GetAllUsers";
import GetAllServices from "./application/usecase/Service/GetAllServices";
import GetAllSchedules from "./application/usecase/Schedule/GetAllSchedules";
import GetAllAppointment from "./application/usecase/Appointment/GetAllAppointments";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import MainController from "./infra/http/MainController";
import { tokenVerify } from "./middlewares/tokenVerify";
import adminVerify from "./middlewares/adminVerify";

const jwt = require("jsonwebtoken");
require('dotenv').config();
const bcrypt = require("bcrypt");
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '0.0.0.0',
    port : 3318,
    user : 'jonas',
    password : '123456',
    database : 'appbrunanail_db'
  },
  useNullAsDefault: true
});

const login = new LoginUser(new LoginRepositoryDataBase());
const createUser = new CreateUser(new UserRepositoryDataBase());
const getuser = new GetUser(new UserRepositoryDataBase());
const getService = new GetService(new ServiceRepositoryDataBase());
const getAllServices = new GetAllServices(new ServiceRepositoryDataBase());
const getSchedule = new GetSchedule(new ScheduleRepositoryDataBase());
const getAllSchedules = new GetAllSchedules(new ScheduleRepositoryDataBase());
const updateSchedule = new UpdateSchedule(new ScheduleRepositoryDataBase());
const createAppointment = new CreateAppointment(new AppointmentRepositoryDataBase());
const getAppointment = new GetAppointment(new AppointmentRepositoryDataBase());
const updateAppointment = new UpdateAppointment(new AppointmentRepositoryDataBase());
const deleteAppointment = new DeleteAppointment(new AppointmentRepositoryDataBase());
const getAllUsers = new GetAllUsers(new UserRepositoryDataBase());
const updateUser = new UpdateUser(new UserRepositoryDataBase());
const deleteUser = new DeleteUser(new UserRepositoryDataBase());
const createService = new CreateService(new ServiceRepositoryDataBase());
const updateService = new UpdateService(new ServiceRepositoryDataBase());
const deleteService = new DeleteService(new ServiceRepositoryDataBase());
const createSchedule = new CreateSchedule(new ScheduleRepositoryDataBase());
const deleteSchedule = new DeleteSchedule(new ScheduleRepositoryDataBase());
const getAllAppointments = new GetAllAppointment(new AppointmentRepositoryDataBase());
const httpServer = new ExpressAdapter();
new MainController(
  httpServer, 
  login,
  createUser,
  getuser,
  getService,
  getAllServices,
  getSchedule,
  getAllSchedules,
  updateSchedule,
  createAppointment,
  getAppointment,
  updateAppointment,
  deleteAppointment,
  getAllUsers,
  updateUser,
  deleteUser, 
  createService,
  updateService,
  deleteService,
  createSchedule,
  deleteSchedule,
  getAllAppointments,
)
httpServer.listen(3000);
