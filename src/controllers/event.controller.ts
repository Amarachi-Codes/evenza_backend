import { Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.util";
import { EventServiceimpl } from "../services/impl/event.service.impl";
import { AuthRequest } from "../middleware/auth.middleware";

export class EventController{
    private eventService = new EventServiceimpl()

// Get all Events(Public or Authenticated)
getAllEvents = asyncHandler(async(_req: AuthRequest, res: Response)=>{
    const events = await this.eventService.getAllEvents();
    res.status(200).json(events)
})

}