import express from "express";
import CreateUser from "./application/usecase/CreateUser";
import UserRepositoryDataBase from "./infra/repository/UserRepositoryDataBase";
import GetUser from "./application/usecase/GetUser";
import DeleteUser from "./application/usecase/DeleteUser";
import knex from "../knex";
import LoginUser from "./application/usecase/Login";
import LoginRepositoryDataBase from "./infra/repository/LoginRepositoryDataBase";
const jwt = require("jsonwebtoken");
require('dotenv').config();
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());

// app.post("/login", async function (req, res) {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     return res.status(400).json("O campo email e senha são obrigatórios.");
//   }
//   try {
//     const user = await knex("users").where({ email }).first();
//     if (!user) {
//       return res.status(404).json("Usuário não encontrado.");
//     }
//     const correctPass = await bcrypt.compare(password, user.password);
//     if (!correctPass) {
//       return res.status(401).json("Credenciais inválidas.");
//     }
//     const { password: _, ...userLogin } = user;
    
//     const token = jwt.sign(
//       {
//         id: user.user_id,
//         name: user.name,
//         email: user.email,
//       },
//       "SECRET"
//       );
//       return res.status(200).json({
//       user: userLogin,
//       token,
//     });
//   } catch (error:any) {
//     return res.status(400).json(error.message);
//   }
// });
app.post("/login", async function (req, res) {
  const useCase = new LoginUser(new LoginRepositoryDataBase());
  console.log('api', useCase);
  
  const output = await useCase.execute(req.body);
  console.log('api', output);
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
