import express from "express";
import CreateUser from "./application/usecase/CreateUser";
import UserRepositoryDataBase from "./infra/repository/UserRepositoryDataBase";
import GetUser from "./application/usecase/GetUser";
import DeleteUser from "./application/usecase/DeleteUser";
import LoginUser from "./application/usecase/Login";
import LoginRepositoryDataBase from "./infra/repository/LoginRepositoryDataBase";

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
})

app.delete("/user/:userId", async function (req, res) {
  try {
    const useCase = new DeleteUser(new UserRepositoryDataBase());
    const output = await useCase.execute({ userId: req.params.userId }); 
    return res.json(output)
  } catch (e) {
    return res.status(500).json({ e: 'Internal server error'})
  }
})

app.post("/service", async function (req, res) {
  try {
    
  } catch (error) {

  }
});

app.listen(3000, () => {
  console.log(`Servidor ouvindo na porta http://localhost:3000/`);
});
