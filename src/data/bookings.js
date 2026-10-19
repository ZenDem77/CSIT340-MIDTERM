import Booking from "../models/Booking";
import { hotels } from "./hotels";
import { currentGuest } from "./guest";
import { paymentMethods } from "./paymentMethods";

const findHotel = (id) => hotels.find((hotel) => hotel.id === id);

export const CLEANING_FEE = 100;
export const SERVICE_FEE = 50;
export const MAX_GUESTS = 10;

export const initialBookings = [
  new Booking({
    id: "booking-1",
    hotel: findHotel("sogo-hotel"),
    guest: currentGuest,
    paymentMethod: paymentMethods[0],
    checkIn: new Date(2026, 10, 12),
    checkOut: new Date(2026, 10, 14),
    guestCount: 2,
    cleaningFee: CLEANING_FEE,
    serviceFee: SERVICE_FEE,
  }),
  new Booking({
    id: "booking-2",
    hotel: findHotel("mystic-palms"),
    guest: currentGuest,
    paymentMethod: paymentMethods[0],
    checkIn: new Date(2026, 10, 20),
    checkOut: new Date(2026, 10, 25),
    guestCount: 1,
    cleaningFee: CLEANING_FEE,
    serviceFee: SERVICE_FEE,
  }),
  new Booking({
    id: "booking-3",
    hotel: findHotel("elysian-suites"),
    guest: currentGuest,
    paymentMethod: paymentMethods[0],
    checkIn: new Date(2026, 10, 27),
    checkOut: new Date(2026, 10, 28),
    guestCount: 1,
    cleaningFee: CLEANING_FEE,
    serviceFee: SERVICE_FEE,
  }),
];