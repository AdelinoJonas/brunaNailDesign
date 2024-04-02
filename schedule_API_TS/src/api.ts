import express from "express";
import CreateUser from "./application/usecase/CreateUser";
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

const app = express();
app.use(express.json());

app.post("/login", async function (req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("O campo email e senha são obrigatórios.");
  }
  try {
    const user = await knex("users").where({ email }).first();
    if (!user) {
      return res.status(404).json("Usuário não encontrado.");
    }
    const correctPass = await bcrypt.compare(password, user.password);
    if (!correctPass) {
      return res.status(401).json("Credenciais inválidas.");
    }
    const { password: _, ...userLogin } = user;
    
    const token = jwt.sign(
      {
        id: user.user_id,
        name: user.name,
        email: user.email,
      },
      "SECRET"
      );
      return res.status(200).json({
      user: userLogin,
      token,
    });
  } catch (error:any) {
    return res.status(400).json(error.message);
  }
});

app.post("/user", async function (req, res) {
    const useCase = new CreateUser(new UserRepositoryDataBase());
    const output = await useCase.execute(req.body);
    return res.json(output);
});

app.get("/user/:userId", async function (req, res) {
  try {
    const userId = req.params.userId;
    const userData = await knex('users')
    .select()
    .where('user_id', userId)
    .first()
    if (!userData) {
      return res.status(404).json({error: "Usuário não encontrado"})
    }
    return res.json({message: userData})
  } catch (e) {
    return res.status(500).json({ e: 'Internal server error'})
  }
})

app.delete("/user/:userId", async function (req, res) {
  try {
    const userId = req.params.userId;
    await knex('users')
    .where('user_id', userId)
    .del()
    return res.json({message: "User deleted successfully"})
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
