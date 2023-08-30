const jwt = require("jsonwebtoken");
const { UserRepository } = require("../repositories/UserRepository");
const { UserService } = require("../services/usersServices");
const bcrypt = require("bcrypt");
const path = require('path');
const yup = require('yup'); // Importe o módulo yup
const {validateUser} = require('../helpers/validators/userValidator')

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
    await validateUser.validate({
      name,
      email,
      phone,
      password,
    });

    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      return response.status(409).json({ error: "Já existe um usuário com este e-mail." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email,
      phone,
      password: hashedPassword,
    };

    const createdUser = await userRepository.create(newUser);

    const token = jwt.sign({ userId: createdUser.id }, 'secreto', { expiresIn: '1h' });

    response.status(201).json({ message: "Usuário criado com sucesso", user: createdUser, token });
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
