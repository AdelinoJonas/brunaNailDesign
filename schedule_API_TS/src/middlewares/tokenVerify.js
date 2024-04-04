const jwt = require("jsonwebtoken");
const { UserRepository } = require("../repositories/UserRepository");
const { UserService } = require("../services/usersServices");
const jwtSecret = process.env.JWT_SECRET;
const userRepository = new UserRepository();
const userService = new UserService(userRepository);

async function tokenVerify(request, response, next) {
  const { authorization } = request.headers;
  if (!authorization) {
    return response.status(401).json({
      message: "Usuário não autenticado, por favor faça o login novamente.",
    });
  }
  try {
    const token = authorization.replace("Bearer ", "").trim();
    const { id } = jwt.verify(token, jwtSecret);
    const userExists = await userService.getUser(id);
    if (!userExists) {
      return response.status(404).json({ message: "Usuário não encontrado" });
    }
    const { password, ...user } = userExists;
    request.cookies.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return response
        .status(500)
        .json({ message: "Token expirado, por favor refaça sua requisição ou login." });
    }
    return response.status(500).json(error);
  }
}

module.exports = {
  tokenVerify,
};
