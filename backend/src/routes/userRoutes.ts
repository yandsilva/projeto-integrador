import { Router } from "express";
import { UserController } from "../controllers/userController";
import { isAuthenticated } from "../middleware/auth";

const userRouter = Router();

userRouter.post("/register", new UserController().createUser);
userRouter.post("/login", new UserController().loginUser);
userRouter.get("/logout", isAuthenticated, new UserController().logout);

export { userRouter };
