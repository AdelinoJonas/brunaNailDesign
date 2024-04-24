import knex from '../../../knex';
import Login from "../../domain/Login";
const jwt = require("jsonwebtoken");
require('dotenv').config();
const bcrypt = require("bcrypt");

export default class LoginRepositoryDataBase {

  async login (login: Login) {
    const { email, password } = login;
    if (!email || !password) {
      return {message: "O campo email e senha são obrigatórios."};
    }
    const user = await knex("users").where({ email: email.value }).first();
    if (!user) {
      return {message:"Usuário não encontrado."};
    }
    const correctPass = await bcrypt.compare(password.value, user.password);
    if (!correctPass) {
      return {message: "Credenciais inválidas."};
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
      console.log("LOGIN", user, token);
      
      return{
      user: userLogin,
      token,
    };
  }
}
