import express from "express";
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
import CreateAppointment from "./application/usecase/Appointment/CreateAppointment";
import AppointmentRepositoryDataBase from "./infra/repository/AppointmentRepositoryDataBase";
import GetAppointment from "./application/usecase/Appointment/GetAppointment";
import UpdateAppointment from "./application/usecase/Appointment/UpdateAppointment";
import DeleteAppointment from "./application/usecase/Appointment/DeleteAppointment";
import { tokenVerify } from "./middlewares/tokenVerify";
import adminVerify from "./middlewares/adminVerify";
import GetAllUsers from "./application/usecase/User/GetAllUsers";
import GetAllServices from "./application/usecase/Service/GetAllServices";
import GetAllSchedules from "./application/usecase/Schedule/GetAllSchedules";
import GetAllAppointment from "./application/usecase/Appointment/GetAllAppointment";

const app = express();
app.use(express.json());

app.post("/login", async function (req, res) {
  const useCase = new LoginUser(new LoginRepositoryDataBase());
  const output = await useCase.execute(req.body);
  return res.json(output);
});

app.post("/user", async function (req, res) {
  const useCase = new CreateUser(new UserRepositoryDataBase());
  const output = await useCase.execute(req.body);
  return res.json(output);
});

app.use('/user', tokenVerify);

app.get("/user/:userId", async function (req, res) {
  const useCase = new GetUser(new UserRepositoryDataBase());
  const output = await useCase.execute({ userId: req.params.userId });    
  if (!output) {
    return res.status(404).json({ error: "user not found" });
  }
  return res.json(output);
})

app.get("/service/:serviceId", async function (req, res) {
  const useCase = new GetService(new ServiceRepositoryDataBase());
  const output = await useCase.execute({ serviceId: req.params.serviceId });    
  if (!output) {
    return res.status(404).json({ error: "Service not found" });
  }
  return res.json(output);
});


app.get("/services", async function (req, res) {
  const useCase = new GetAllServices(new ServiceRepositoryDataBase());
  try {
    const output = await useCase.execute();
    return res.json(output);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/schedule/:scheduleId", async function (req, res) {
  const useCase = new GetSchedule(new ScheduleRepositoryDataBase());
  const output = await useCase.execute({ scheduleId: req.params.scheduleId });    
  if (!output) {
    return res.status(404).json({ error: "Schedule not found" });
  }
  return res.json(output);
});

app.get("/schedules", async function (req, res) {
  const useCase = new GetAllSchedules(new ScheduleRepositoryDataBase());
  try {
    const output = await useCase.execute();
    return res.json(output);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.patch("/schedule/:scheduleId", async function (req, res) {
  const useCase = new UpdateSchedule(new ScheduleRepositoryDataBase());
  const output = await useCase.execute({ scheduleId: req.params.scheduleId, data: req.body });    
  if (!output) {
    return res.status(404).json({ error: "Schedule not found" });
  }
  return res.json(output);
});

app.post("/appointment", async function (req, res) {
  const useCase = new CreateAppointment(new AppointmentRepositoryDataBase());
  const output = await useCase.execute(req.body);
  return res.json(output);
});

app.get("/appointment/:appointmentId", async function (req, res) {
  const useCase = new GetAppointment(new AppointmentRepositoryDataBase());
  const output = await useCase.execute({ appointmentId: req.params.appointmentId });    
  if (!output) {
    return res.status(404).json({ error: "Appointment not found" });
  }
  return res.json(output);
});

app.patch("/appointment/:appointmentId", async function (req, res) {
  const useCase = new UpdateAppointment(new AppointmentRepositoryDataBase());
  const output = await useCase.execute({ appointmentId: req.params.appointmentId, data: req.body });    
  if (!output) {
    return res.status(404).json({ error: "Appointment not found" });
  }
  return res.json(output);
});

app.delete("/appointment/:appointmentId", async function (req, res) {
try {
  const useCase = new DeleteAppointment(new AppointmentRepositoryDataBase());
  const output = await useCase.execute({ appointmentId: req.params.appointmentId }); 
  return res.json(output)
} catch (e) {
  return res.status(500).json({ e: 'Internal server error'})
}
});

app.use('/admin', adminVerify);

app.get("/admin/users", async function (req, res) {
  const useCase = new GetAllUsers(new UserRepositoryDataBase());
  try {
    const output = await useCase.execute();
    return res.json(output);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});


app.patch("/admin/user/:userId", async function (req, res) {
  const useCase = new UpdateUser(new UserRepositoryDataBase());
  const output = await useCase.execute({ userId: req.params.userId, data: req.body }); 
  console.log(output);   
  if (!output) {
    return res.status(404).json({ error: "user not found" });
  }
  return res.json(output);
});

app.delete("/admin/user/:userId", async function (req, res) {
  try {
    const useCase = new DeleteUser(new UserRepositoryDataBase());
    const output = await useCase.execute({ userId: req.params.userId }); 
    return res.json(output)
  } catch (e) {
    return res.status(500).json({ e: 'Internal server error'})
  }
});

app.post("/admin/service", async function (req, res) {
  const useCase = new CreateService(new ServiceRepositoryDataBase());
  const output = await useCase.execute(req.body);
  return res.json(output);
});

app.patch("/admin/service/:serviceId", async function (req, res) {
  const useCase = new UpdateService(new ServiceRepositoryDataBase());
  const output = await useCase.execute({ serviceId: req.params.serviceId, data: req.body });    
  if (!output) {
    return res.status(404).json({ error: "Service not found" });
  }
  return res.json(output);
});

app.delete("/admin/service/:serviceId", async function (req, res) {
try {
  const useCase = new DeleteService(new ServiceRepositoryDataBase());
  const output = await useCase.execute({ serviceId: req.params.serviceId }); 
  return res.json(output)
} catch (e) {
  return res.status(500).json({ e: 'Internal server error'})
}
});

app.post("/admin/schedule", async function (req, res) {
  const useCase = new CreateSchedule(new ScheduleRepositoryDataBase());
  const output = await useCase.execute(req.body);
  return res.json(output);
});

app.delete("/admin/schedule/:scheduleId", async function (req, res) {
try {
  const useCase = new DeleteSchedule(new ScheduleRepositoryDataBase());
  const output = await useCase.execute({ scheduleId: req.params.scheduleId }); 
  return res.json(output)
} catch (e) {
  return res.status(500).json({ e: 'Internal server error'})
}
});

app.get("/admin/appointments", async function (req, res) {
  const useCase = new GetAllAppointment(new AppointmentRepositoryDataBase());
  try {
    const output = await useCase.execute();
    return res.json(output);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(3000, () => {
  console.log(`Servidor ouvindo na porta http://localhost:3000/`);
});
