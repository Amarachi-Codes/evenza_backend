import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { dtoValidationMiddleware } from "../middleware/validationMiddleware.middleware";
import { SignUpDto } from "../dtos/user/request/create-user.dto";
import { LoginDto } from "../dtos/auth/request/login.dto";

export const authRouter = Router();

const authController = new AuthController();

authRouter.post("/signup", dtoValidationMiddleware(SignUpDto), authController.signup)
authRouter.post("/login", dtoValidationMiddleware(LoginDto), authController.login);


export default authRouter;