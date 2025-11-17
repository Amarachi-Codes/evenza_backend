import { BookingStatus } from "@prisma/client";

export class BookingResponseDto{
    id!: number; 
    userId!:number;
    eventId!:number;
    status!: BookingStatus
}