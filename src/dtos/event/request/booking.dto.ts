import { IsNotEmpty, IsNumber } from "class-validator";

export class BookingDto{
    @IsNotEmpty()
    @IsNumber()
    userId!:number;

    @IsNotEmpty()
    @IsNumber()
    eventId!:number;
}