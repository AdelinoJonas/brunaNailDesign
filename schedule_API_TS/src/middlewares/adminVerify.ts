import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import UserRepositoryDataBase from "../infra/repository/UserRepositoryDataBase";
const jwtSecret: string = process.env.JWT_SECRET || "Brunanail";

interface DecodedToken {
  id: any;
}

async function adminVerify(request: Request, response: Response, next: Function) {
  const authorization = request.headers.authorization;
  if (!authorization) {
    response.status(401).json({
      message: "Usuário não autenticado, por favor faça o login novamente.",
    });
    return;
  }
  try {
    const token: string = authorization.replace("Bearer ", "").trim();
    let id: string | JwtPayload;
    const decodedToken = jwt.verify(token, jwtSecret) as JwtPayload;
    if(!decodedToken || decodedToken['id'] == undefined){
      response.status(401).json({
        message: "Token inválido ou ausente.",
      });
      return;
    }

    const repository = new UserRepositoryDataBase();
    const user = await repository.get(decodedToken['id']);
    if (Number(user?.is_admin) === 0) {
      response.status(401).json({
        message: "Usuário não tem permissão para acessar.",
      });
      return;
    }

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

export default adminVerify;

