import { Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.util";
import { EventServiceimpl } from "../services/impl/event.service.impl";
import { AuthRequest } from "../middleware/auth.middleware";
import { EventDto } from "../dtos/event/request/event.dto";
import { AppError } from "../exception/AppError";

export class EventController{
    private eventService = new EventServiceimpl()

// Get all Events(Public or Authenticated)
getAllEvents = asyncHandler(async(_req: AuthRequest, res: Response)=>{
    const events = await this.eventService.getAllEvents();
    res.status(200).json(events)
})

createEvent = asyncHandler(async(req:AuthRequest, res: Response) =>{
    if(!req.user){
        throw new AppError("Unauthorized", 401);
    }
    const eventdata: EventDto = req.body
    const newEvent = await this.eventService.createEvents(eventdata);
    res.status(201).json(newEvent)
})

}