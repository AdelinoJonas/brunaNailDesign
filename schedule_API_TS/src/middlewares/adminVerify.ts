import { Request, Response } from "express";

async function adminVerify(request: Request, response: Response, next: Function) {
  try {
    const { is_admin } = request.cookies.user as { is_admin: boolean };
    if (!is_admin) {
      response.status(403).json({
        message: "Apenas administradores da plataforma podem utilizar essa função.",
      });
    }
    next();
  } catch (error) {
    console.error("Error verifying admin status:", error);
    return response.status(500).json({ message: "Erro ao verificar permissões." });
  }
}

export default adminVerify;

