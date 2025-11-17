import { BookingStatus } from "@prisma/client";
import { db } from "../../config/db";
import { BookingDto } from "../../dtos/event/request/booking.dto";
import { EventDto } from "../../dtos/event/request/event.dto";
import { BookingResponseDto } from "../../dtos/event/response/booking.response.dto";
import { EventResponseDto } from "../../dtos/event/response/event.response.dto";
import { AppError } from "../../exception/AppError";
import { logger } from "../../utils/logger.util";
import { EventService } from "../event.service";

export class EventServiceimpl implements EventService{
    async bookEvent(data: BookingDto): Promise<BookingResponseDto> {
        const {userId, eventId} = data;

        const existingBooking = await db.booking.findFirst({
            where:{
                userId,
                eventId
            }
        });
        if (existingBooking){
            logger.warn(`Double booking attempt detected for user id ${userId} and event id ${eventId}`);
            throw new AppError("You have already booked for this event", 409)
        } 
        
        const newBooking = await db.booking.create({
            data:{
                userId,
                eventId,
                status: BookingStatus.PENDING,
            },
            select:{
                id: true,
                userId: true,
                eventId: true,
                status: true
            }
        });
        logger.info(`Booking created for userId ${userId} and eventId ${eventId}`);

        return newBooking as BookingResponseDto;

    }
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