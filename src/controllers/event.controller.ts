import { Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.util";
import { EventServiceimpl } from "../services/impl/event.service.impl";
import { AuthRequest } from "../middleware/auth.middleware";
import { EventDto } from "../dtos/event/request/event.dto";
import { AppError } from "../exception/AppError";
import { BookingDto } from "../dtos/event/request/booking.dto";

export class EventController {
  private eventService = new EventServiceimpl();

  // Get all Events(Public or Authenticated)
  getAllEvents = asyncHandler(async (_req: AuthRequest, res: Response) => {
    const events = await this.eventService.getAllEvents();
    res.status(200).json(events);
  });

  // Create a new event (Authenticated, Optional: Admin/Organizer restriction)
  createEvent = asyncHandler(async (req: AuthRequest, res: Response) => {
    if (!req.user) {
      throw new AppError("Unauthorized", 401);
    }
    const eventData: EventDto = req.body;
    const newEvent = await this.eventService.createEvents(eventData);
    res.status(201).json(newEvent);
  });

  // Book an event (Authenticated)
  bookEvent = asyncHandler(async (req: AuthRequest, res: Response) => {
    if (!req.user) {
      throw new AppError("Unauthorized", 401);
    }
    const bookingData: BookingDto = {
      ...req.body,
      userId: Number(req.user.sub),
    };
    const booking = await this.eventService.bookEvent(bookingData);
    res.status(201).json(booking);
  });

  // Get all bookings(authenticated)
  getAllBookings = asyncHandler(async (req: AuthRequest, res: Response) => {
    if (!req.user) {
      throw new AppError("Unauthorized", 401);
    }

    const allBookings = await this.eventService.getAllBookings();
    res.status(200).json(allBookings);
  });

  // Get events booked by logged-in user
  getEventsBookedByUser = asyncHandler(
    async (req: AuthRequest, res: Response) => {
      if (!req.user) {
        throw new AppError("Unauthorized", 401);
      }
      const eventBookedByUser = await this.eventService.getEventsBookedByUser(
        Number(req.user.sub)
      );
      res.status(200).json(eventBookedByUser);
    }
  );
}
