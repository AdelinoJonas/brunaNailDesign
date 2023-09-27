const jwt = require("jsonwebtoken");
const { UserRepository } = require("../repositories/UserRepository");
const { UserService } = require("../services/usersServices");
const bcrypt = require("bcrypt");
const path = require('path');
const yup = require('yup'); // Importe o módulo yup
const { validateUser } = require('../helpers/validators/userValidator')

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

async function createUser(request, response) {
  const {
    name,
    email,
    phone,
    password,
  } = request.body;

  try {
    await userService.createUser({
      name,
      email,
      phone,
      password,
    });

    const verifiedUser = await userService.findUserByEmail({ email });

    console.log('cheguei',verifiedUser);

    const token = jwt.sign({ userId: verifiedUser.id }, 'secreto');

    response.status(201).json({ message: "Usuário criado com sucesso", user: verifiedUser, token });
  } catch (error) {
    if (error.name === 'ValidationError') {
      response.status(400).json({ error: error.message });
    } else {
      console.error(error);
      response.status(500).json({ error: "Erro ao criar o usuário." });
    }
  }
}

module.exports = {
  createUser
};
