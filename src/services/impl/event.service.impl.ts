import { db } from "../../config/db";
import { EventDto } from "../../dtos/event/request/event.dto";
import { EventResponseDto } from "../../dtos/event/response/event.response.dto";
import { EventService } from "../event.service";

export class EventServiceimpl implements EventService{
   async createEvents(data: EventDto): Promise<EventResponseDto> {
        const {title, description,location,date} = data
        const event = await db.event.create({
            data:{
                title,
                description,
                location,
                date
            },
            select:{
            id: true,
            title: true,
            description: true,
            location:true,
            date:true
        },
        })
            return event as EventResponseDto;
        
    }
   
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