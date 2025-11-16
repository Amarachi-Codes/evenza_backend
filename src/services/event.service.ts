import { EventDto } from "../dtos/event/request/event.dto";
import { EventResponseDto } from "../dtos/event/response/event.response.dto";

export interface EventService{
getAllEvents():Promise<EventResponseDto[]>;

createEvents(data:EventDto):Promise<EventResponseDto>


}