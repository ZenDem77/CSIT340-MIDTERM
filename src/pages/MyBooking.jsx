import uiText from "../data/uiText";
import { useApp } from "../context/AppContext";
import BookingCard from "../components/BookingCard";

export default function MyBooking() {
  const { bookings, cancelBooking } = useApp();

  return (
    <div className="space-y-6">
      <h1 className="text-center font-jost text-lg font-semibold">
        {uiText.myBooking.title}
      </h1>

      {bookings.length === 0 ? (
        <p className="py-12 text-center text-muted">
          {uiText.myBooking.empty}
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {bookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onCancel={cancelBooking}
            />
          ))}
        </div>
      )}
    </div>
  );
}