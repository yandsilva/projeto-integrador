import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
  sub: string;
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization;
  if (!authToken) {
    return res.json({ dados: "Token Inválido" });
  }
  const [, token] = authToken.split(" ");
  const secretKey = process.env.JWT_SECRETO || "defaultSecretKey";

  try {
    const { sub } = verify(token, secretKey) as Payload;
    req.usuarioId = sub;
    return next();
  } catch (err) {
    return res.json({ dados: "Token Inválido" });
  }
}
