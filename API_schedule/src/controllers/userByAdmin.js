const jwt = require("jsonwebtoken");
const { UserByAdminRepository } = require("../repositories/UserByAdminRepository");
const { UserByAdminService } = require("../services/UsersByAdminServices");
const bcrypt = require("bcrypt");
const { validateUser } = require('../helpers/validators/userValidator');

const userByAdminRepository = new UserByAdminRepository();
const userByAdminService = new UserByAdminService(userByAdminRepository);

async function createUserByAdmin(request, response) {
  const {
    name,
    email,
    phone,
    password,
  } = request.body;
  try {
    // await validateUser.validate({
    //   name,
    //   email,
    //   phone,
    //   password,
    // });
    const hashedPassword = await bcrypt.hash(password, 10);
    await userByAdminService.createUserByAdmin({
      name,
      email,
      phone,
      password: hashedPassword,
    });
    const verifiedUser = await userByAdminService.findUserByEmail({ email });
    console.log(verifiedUser);
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
  createUserByAdmin
};