import uiText from "../data/uiText";
import Booking from "../models/Booking";
import { formatPrice, formatRating } from "../utils/format";
import { formatDateRange } from "../utils/dates";
import { CalendarIcon, PinIcon, StarIcon, UserIcon } from "./Icons";

export default function BookingCard({ booking, onCancel }) {
  const { hotel } = booking;
  const isCancelled = booking.status === Booking.STATUS.CANCELLED;

  return (
    <article
      className={`flex gap-4 rounded-2xl border border-line bg-white p-3 ${
        isCancelled ? "opacity-60" : ""
      }`}
    >
      <img
        src={hotel.images[0]}
        alt={hotel.name}
        className="h-36 w-28 shrink-0 rounded-xl object-cover"
      />

      <div className="flex min-w-0 flex-1 flex-col justify-between gap-2">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h2 className="truncate font-semibold">{hotel.name}</h2>
            <span className="flex items-center gap-1 text-sm font-medium">
              <StarIcon />
              {formatRating(hotel.rating)}
            </span>
          </div>
          <p className="mt-1 flex items-center gap-1 text-xs text-muted">
            <PinIcon className="h-3.5 w-3.5" />
            {hotel.location}
          </p>
          <p className="mt-1 font-outfit">
            <span className="font-semibold text-primary">
              {formatPrice(hotel.pricePerNight)}
            </span>
            <span className="text-sm"> {uiText.perNight}</span>
          </p>
        </div>

        <div className="space-y-1 text-xs">
          <p className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-muted" />
            <span className="text-muted">{uiText.myBooking.dates}</span>
            <span className="font-medium">
              {formatDateRange(booking.checkIn, booking.checkOut)}
            </span>
          </p>
          <p className="flex items-center gap-2">
            <UserIcon className="h-4 w-4 text-muted" />
            <span className="font-medium">
              {uiText.units.guest(booking.guestCount)}
            </span>
          </p>
        </div>

        {isCancelled ? (
          <span className="self-end rounded-full bg-[#f6f6f6] px-4 py-1 text-xs font-medium text-muted">
            {uiText.myBooking.cancelled}
          </span>
        ) : (
          <button
            type="button"
            onClick={() => onCancel(booking.id)}
            className="self-end rounded-full bg-danger px-5 py-1.5 text-xs font-semibold text-white"
          >
            {uiText.myBooking.cancel}
          </button>
        )}
      </div>
    </article>
  );
}