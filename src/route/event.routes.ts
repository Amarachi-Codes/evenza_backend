import { Router } from "express";
import { EventController } from "../controllers/event.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { dtoValidationMiddleware } from "../middleware/validationMiddleware.middleware";
import { EventDto } from "../dtos/event/request/event.dto";

export const eventRouter = Router();
const eventController = new EventController();

// Authenticated routes
eventRouter.get("/", authMiddleware(), eventController.getAllEvents);

eventRouter.post("/create",
     authMiddleware(["ADMIN", "ORGANIZER"]), 
     dtoValidationMiddleware(EventDto),
     eventController.createEvent)