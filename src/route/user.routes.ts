import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";

    export const userRouter = Router();
    const userController = new UserController();

    userRouter.get("/:id", userController.getUserById);
    userRouter.get("/", authMiddleware(["ADMIN"]), userController.getAllUsers);
    userRouter.delete("/:id", userController.deleteUser);