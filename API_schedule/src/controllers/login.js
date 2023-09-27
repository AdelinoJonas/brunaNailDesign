const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserService } = require("../services/usersServices");
const { UserRepository } = require("../repositories/UserRepository");
const { loginValidatorSchema } = require("../helpers/validators/loginValidator");

const userRepository = new UserRepository();
const userServices = new UserService(userRepository);

async function login(request, response) {
  const { email, password } = request.body;
  try {
    await loginValidatorSchema.validate({ email, password });
    const user = await userServices.findUserByEmail({ email });
    if (!user) {
      return response
        .status(400)
        .json({ message: "E-mail ou Senha inválido." });
    }
    const passwordVerified = bcrypt.compareSync(password, user.password);
    if (!passwordVerified) {
      return response
        .status(400)
        .json({ message: "E-mail ou Senha inválido." });
    }
    const { password: _, ...userLogin } = user;
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET
    );
    return response.status(200).json({
      user: userLogin,
      token,
    });
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
}

module.exports = login;