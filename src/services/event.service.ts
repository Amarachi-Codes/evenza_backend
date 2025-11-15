import { EventResponseDto } from "../dtos/event/response/event.response.dto";

export interface EventService{
getAllEvents():Promise<EventResponseDto[]>;
}