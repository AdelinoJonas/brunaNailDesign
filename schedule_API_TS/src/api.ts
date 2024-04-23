import express from "express";
import LoginUser from "./application/usecase/Login";
import CreateUser from "./application/usecase/User/CreateUser";
import DeleteUser from "./application/usecase/User/DeleteUser";
import GetUser from "./application/usecase/User/GetUser";
import UpdateUser from "./application/usecase/User/UpdateUser";
import LoginRepositoryDataBase from "./infra/repository/LoginRepositoryDataBase";
import UserRepositoryDataBase from "./infra/repository/UserRepositoryDataBase";
import CreateService from "./application/usecase/Service/CreateService";
import ServiceRepositoryDataBase from "./infra/repository/ServiceRepositoryDataBase";
import GetService from "./application/usecase/Service/GetService";
import DeleteService from "./application/usecase/Service/DeleteService";
import UpdateService from "./application/usecase/Service/UpdateService";
import ScheduleRepositoryDataBase from "./infra/repository/ScheduleRepositoryDataBase";
import CreateSchedule from "./application/usecase/Schedule/CreateShedule";

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

app.get("/user/:userId", async function (req, res) {
    const useCase = new GetUser(new UserRepositoryDataBase());
    const output = await useCase.execute({ userId: req.params.userId });    
    if (!output) {
      return res.status(404).json({ error: "user not found" });
    }
    return res.json(output);
});

app.patch("/user/:userId", async function (req, res) {
  const useCase = new UpdateUser(new UserRepositoryDataBase());
  const output = await useCase.execute({ userId: req.params.userId, data: req.body });    
  if (!output) {
    return res.status(404).json({ error: "user not found" });
  }
  return res.json(output);
});

app.delete("/user/:userId", async function (req, res) {
  try {
    const useCase = new DeleteUser(new UserRepositoryDataBase());
    const output = await useCase.execute({ userId: req.params.userId }); 
    return res.json(output)
  } catch (e) {
    return res.status(500).json({ e: 'Internal server error'})
  }
});

app.post("/service", async function (req, res) {
  const useCase = new CreateService(new ServiceRepositoryDataBase());
  const output = await useCase.execute(req.body);
  return res.json(output);
});

app.get("/service/:serviceId", async function (req, res) {
  const useCase = new GetService(new ServiceRepositoryDataBase());
  const output = await useCase.execute({ serviceId: req.params.serviceId });    
  if (!output) {
    return res.status(404).json({ error: "Service not found" });
  }
  return res.json(output);
});

app.patch("/service/:serviceId", async function (req, res) {
  const useCase = new UpdateService(new ServiceRepositoryDataBase());
  const output = await useCase.execute({ serviceId: req.params.serviceId, data: req.body });    
  if (!output) {
    return res.status(404).json({ error: "Service not found" });
  }
  return res.json(output);
});

app.delete("/service/:serviceId", async function (req, res) {
try {
  const useCase = new DeleteService(new ServiceRepositoryDataBase());
  const output = await useCase.execute({ serviceId: req.params.serviceId }); 
  return res.json(output)
} catch (e) {
  return res.status(500).json({ e: 'Internal server error'})
}
});

app.post("/schedule", async function (req, res) {
  const useCase = new CreateSchedule(new ScheduleRepositoryDataBase());
  const output = await useCase.execute(req.body);
  return res.json(output);
});

// app.get("/service/:serviceId", async function (req, res) {
//   const useCase = new GetService(new ServiceRepositoryDataBase());
//   const output = await useCase.execute({ serviceId: req.params.serviceId });    
//   if (!output) {
//     return res.status(404).json({ error: "Service not found" });
//   }
//   return res.json(output);
// });

// app.patch("/service/:serviceId", async function (req, res) {
//   const useCase = new UpdateService(new ServiceRepositoryDataBase());
//   const output = await useCase.execute({ serviceId: req.params.serviceId, data: req.body });    
//   if (!output) {
//     return res.status(404).json({ error: "Service not found" });
//   }
//   return res.json(output);
// });

// app.delete("/service/:serviceId", async function (req, res) {
// try {
//   const useCase = new DeleteService(new ServiceRepositoryDataBase());
//   const output = await useCase.execute({ serviceId: req.params.serviceId }); 
//   return res.json(output)
// } catch (e) {
//   return res.status(500).json({ e: 'Internal server error'})
// }
// });

app.listen(3000, () => {
  console.log(`Servidor ouvindo na porta http://localhost:3000/`);
});
