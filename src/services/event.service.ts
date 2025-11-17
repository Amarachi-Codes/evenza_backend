import { BookingDto } from "../dtos/event/request/booking.dto";
import { EventDto } from "../dtos/event/request/event.dto";
import { BookingResponseDto } from "../dtos/event/response/booking.response.dto";
import { EventResponseDto } from "../dtos/event/response/event.response.dto";

export interface EventService{
getAllEvents():Promise<EventResponseDto[]>;

createEvents(data:EventDto):Promise<EventResponseDto>

bookEvent(data: BookingDto):Promise<BookingResponseDto>;

getAllBookings():Promise<BookingResponseDto[]>
}