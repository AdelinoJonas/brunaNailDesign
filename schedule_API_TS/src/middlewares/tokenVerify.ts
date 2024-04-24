import { Request, Response} from "express";
import jwt from "jsonwebtoken";
import LoginRepositoryDataBase from "../infra/repository/LoginRepositoryDataBase";
import LoginUser from "../application/usecase/Login";

interface DecodedToken {
  userId: string;
}

const jwtSecret: string = process.env.JWT_SECRET || "Brunanail";
const LoginRepository = new LoginRepositoryDataBase();

async function tokenVerify(request: Request, response: Response, next: Function): Promise<void> {
  const authorization = request.headers.authorization;
  if (!authorization) {
    response.status(401).json({
      message: "Usuário não autenticado, por favor faça o login novamente.",
    });
    return;
  }
  try {
    const token: string = authorization.replace("Bearer ", "").trim();
    let id: string | undefined;
    const decodedToken = jwt.verify(token, jwtSecret) as DecodedToken;
    id = decodedToken.userId;
    if (!id) {
      response.status(401).json({
        message: "Token inválido ou ausente.",
      });
      return;
    }
    const userExists = new LoginUser(LoginRepository);
    if (!userExists) {
      response.status(404).json({ message: "Usuário não encontrado" });
      return;
    }
    const { ...user } = userExists;
    (request.cookies as any).user = user;
    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      response
        .status(500)
        .json({ message: "Token expirado, por favor refaça sua requisição ou login." });
    }
    response.status(500).json(error);
  }
}

export { tokenVerify };
