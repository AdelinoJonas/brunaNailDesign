const jwt = require("jsonwebtoken");
const { UserRepository } = require("../repositories/UserRepository");
const { UserService } = require("../services/usersServices");
const path = require('path')

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

async function createUser(request, response) {
  const {
    name,
    email,
    phone,
    password,
  } = request.body;

  const { is_admin } = request.cookies.user;

  console.log(is_admin);

  try {

    const insertedUser = await userService.createUser({
      name,
      email,
      phone,
      password,
      is_admin: false,
    });

    
    return response.status(201).json(insertedUser);
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
}


module.exports = {
  createUser,
};
