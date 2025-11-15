import { db } from "../../config/db";
import { EventResponseDto } from "../../dtos/event/response/event.response.dto";
import { EventService } from "../event.service";

export class EventServiceimpl implements EventService{
    async getAllEvents(): Promise<EventResponseDto[]> {
        const events = await db.event.findMany({
            select:{
             id: true,
             title: true,
             description: true,
             date: true,
             location: true,

            },
        });
        return events as EventResponseDto[];

        
    }

}