import { Router } from "express";
import { EventController } from "../controllers/event.controller";
import { authMiddleware } from "../middleware/auth.middleware";

export const eventRouter = Router();
const eventController = new EventController();

// Authenticated routes
eventRouter.get("/", authMiddleware(), eventController.getAllEvents);