import Login from "../../application/usecase/Login";
import CreateUser from "../../application/usecase/User/CreateUser";
import CreateService from "../../application/usecase/Service/CreateService";
import GetUser from "../../application/usecase/User/GetUser";
import HttpServer from "./HttpServer";
import GetService from "../../application/usecase/Service/GetService";
import GetAllServices from "../../application/usecase/Service/GetAllServices";
import GetAllUsers from "../../application/usecase/User/GetAllUsers";
import GetSchedule from "../../application/usecase/Schedule/GetSchedule";
import GetAllSchedules from "../../application/usecase/Schedule/GetAllSchedules";
import UpdateSchedule from "../../application/usecase/Schedule/UpdateSchedule";
import CreateAppointment from "../../application/usecase/Appointment/CreateAppointment";
import GetAllAppointments from "../../application/usecase/Appointment/GetAllAppointments";
import GetAppointment from "../../application/usecase/Appointment/GetAppointment";
import UpdateAppointment from "../../application/usecase/Appointment/UpdateAppointment";
import DeleteAppointment from "../../application/usecase/Appointment/DeleteAppointment";
import UpdateUser from "../../application/usecase/User/UpdateUser";
import DeleteUser from "../../application/usecase/User/DeleteUser";
import UpdateService from "../../application/usecase/Service/UpdateService";
import DeleteService from "../../application/usecase/Service/DeleteService";
import CreateSchedule from "../../application/usecase/Schedule/CreateShedule";
import DeleteSchedule from "../../application/usecase/Schedule/DeleteSchedule";
import { tokenVerify } from "../../middlewares/tokenVerify";
import adminVerify from "../../middlewares/adminVerify";

export default class MainController {
  constructor ( 
    httpServer: HttpServer,
    login: Login,
    createUser: CreateUser,
    getuser: GetUser,
    getService: GetService,
    getAllServices: GetAllServices,
    getSchedule: GetSchedule,
    getAllSchedules: GetAllSchedules,
    updateSchedule: UpdateSchedule,
    createAppointment: CreateAppointment,
    getAppointment: GetAppointment,
    updateAppointment: UpdateAppointment,
    deleteAppointment: DeleteAppointment,
    getAllUsers: GetAllUsers,
    updateUser: UpdateUser,
    deleteUser: DeleteUser, 
    createService: CreateService,
    updateService: UpdateService,
    deleteService: DeleteService,
    createSchedule: CreateSchedule,
    deleteSchedule: DeleteSchedule,
    getAllAppointments: GetAllAppointments,

  ) {

    httpServer.on("post", "/login", async function (params: any, body: any) {
      const output = await login.execute(body);
      return output;
    });
    
    httpServer.on("post","/user", async function (params: any, body: any) {
      const output = await createUser.execute(body);
      return output;
    });
    
    httpServer.use('/user', tokenVerify);
    
    httpServer.on("get","/user/:userId", async function (params: any, body: any) {
      const output = await getuser.execute({ userId: params.userId });    
      return output;
    })
    
    httpServer.on("get","/service/:serviceId", async function (params: any, body: any) {
      const output = await getService.execute({ serviceId: params.serviceId });    
      return output;
    });
    
    httpServer.on("get","/services", async function (params: any, body: any) {
      const output = await getAllServices.execute();
      return output;
    });
    
    httpServer.on("get","/schedule/:scheduleId", async function (params: any, body: any) {
      const output = await getSchedule.execute({ scheduleId: params.scheduleId });    
      return output;
    });
    
    httpServer.on("get","/schedules", async function (params: any, body: any) {
      const output = await getAllSchedules.execute();
      return output;
    });
    
    httpServer.on("patch","/schedule/:scheduleId", async function (params: any, body: any) {
      const output = await updateSchedule.execute({ scheduleId: params.scheduleId, data: body });    
      return output;
    });
    
    httpServer.on("post","/appointment", async function (params: any, body: any) {
      const output = await createAppointment.execute(body);
      return output;
    });
    
    httpServer.on("get","/appointment/:appointmentId", async function (params: any, body: any) {
      const output = await getAppointment.execute({ appointmentId: params.appointmentId });    
      return output;
    });
    
    httpServer.on("patch","/appointment/:appointmentId", async function (params: any, body: any) {
      const output = await updateAppointment.execute({ appointmentId: params.appointmentId, data: body });    
      return output;
    });
    
    httpServer.on("delete","/appointment/:appointmentId", async function (params: any, body: any) {
      const output = await deleteAppointment.execute({ appointmentId: params.appointmentId }); 
      return output
    });
    
    httpServer.use('/admin', adminVerify);
    
    httpServer.on("get","/admin/users", async function (params: any, body: any) {
      const output = await getAllUsers.execute();
      return output;
    });
    
    
    httpServer.on("patch","/admin/user/:userId", async function (params: any, body: any) {
      const output = await updateUser.execute({ id: params.userId, data: body }); 
      return output;
    });
    
    httpServer.on("delete","/admin/user/:userId", async function (params: any, body: any) {
      const output = await deleteUser.execute({ userId: params.userId }); 
      return output
    });
    
    httpServer.on("post","/admin/service", async function (params: any, body: any) {
      const output = await createService.execute(body);
      return output;
    });
    
    httpServer.on("patch","/admin/service/:serviceId", async function (params: any, body: any) {
      const output = await updateService.execute({ serviceId: params.serviceId, data: body });    
      return output;
    });
    
    httpServer.on("delete","/admin/service/:serviceId", async function (params: any, body: any) {
      const output = await deleteService.execute({ serviceId: params.serviceId }); 
      return output
    });
    
    httpServer.on("post","/admin/schedule", async function (params: any, body: any) {
      const output = await createSchedule.execute(body);
      return output;
    });
    
    httpServer.on("delete","/admin/schedule/:scheduleId", async function (params: any, body: any) {
      const output = await deleteSchedule.execute({ scheduleId: params.scheduleId }); 
      return output
    });
    
    httpServer.on("get","/admin/appointments", async function (params: any, body: any) {
        const output = await getAllAppointments.execute();
        return output;
    });
  }
}