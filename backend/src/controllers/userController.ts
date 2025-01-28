import { Request, Response } from "express";
import { UserServices } from "../services/userServices";

class UserController {
  async createUser(req: Request, res: Response) {
    const { name, email, password } = req.body;

    try {
      const userServices = new UserServices();
      const response = await userServices.createUser({
        name,
        email,
        password,
      });

      return res.status(201).json(response);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const userServices = new UserServices();

    try {
      const response = await userServices.loginUser({
        email,
        password,
      });

      const user = await userServices.findUserByEmail(email);

      if (!user) {
        return res.status(404).json({ error: "Usuario ou Senha Incorretos" });
      }

      res.cookie("token", response.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res.json({
        message: "Login successful",
        token: response.token,
      });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async verifyToken(req: Request, res: Response) {
    const id = req.usuarioId;
    const sendDataServices = new UserServices();
    const response = await sendDataServices.verificaToken(id);
    return res.json(response);
  }

  async logout(req: Request, res: Response) {
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .json({
        success: true,
        messageL: "Logged Out",
      });
  }
}

export { UserController };
