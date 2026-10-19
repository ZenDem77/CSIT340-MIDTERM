import { useMemo, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import uiText from "../data/uiText";
import { CLEANING_FEE, MAX_GUESTS, SERVICE_FEE } from "../data/bookings";
import { useApp } from "../context/AppContext";
import Booking from "../models/Booking";
import { formatPrice } from "../utils/format";
import { formatShortDate } from "../utils/dates";
import DateRangeModal from "../components/DateRangeModal";
import { CalendarIcon, WalletIcon } from "../components/Icons";

const softBox = "flex flex-1 items-center gap-3 rounded-xl bg-[#f6f6f6] px-4 py-3";

export default function RequestToBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    getHotel,
    draft,
    guest,
    paymentMethods,
    updateDraft,
    resetDraft,
    addBooking,
  } = useApp();
  const [showDates, setShowDates] = useState(false);

  const hotel = getHotel(id);
  const paymentMethod = paymentMethods[0];
  const isDraftReady =
    hotel && draft.hotelId === hotel.id && draft.checkIn && draft.checkOut;

  const preview = useMemo(() => {
    if (!isDraftReady) return null;
    return new Booking({
      id: "preview",
      hotel,
      guest,
      paymentMethod,
      checkIn: draft.checkIn,
      checkOut: draft.checkOut,
      guestCount: draft.guestCount,
      cleaningFee: CLEANING_FEE,
      serviceFee: SERVICE_FEE,
    });
  }, [isDraftReady, hotel, guest, paymentMethod, draft]);

  if (!hotel) return <Navigate to="/" replace />;
  if (!preview) return <Navigate to={`/hotel/${hotel.id}`} replace />;

  const changeGuests = (step) =>
    updateDraft({
      guestCount: Math.min(MAX_GUESTS, Math.max(1, draft.guestCount + step)),
    });

  const handleApplyDates = (checkIn, checkOut) => {
    updateDraft({ checkIn, checkOut });
    setShowDates(false);
  };

  const handleCheckout = () => {
    addBooking(new Booking({ ...preview, id: `booking-${Date.now()}` }));
    resetDraft();
    navigate("/my-booking");
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <h1 className="text-center font-jost text-lg font-semibold">
        {uiText.request.title}
      </h1>

      <div className="space-y-8 md:grid md:grid-cols-2 md:gap-10 md:space-y-0">
        <div className="space-y-6">
          <section>
            <h2 className="mb-3 font-jost text-base font-semibold">
              {uiText.request.date}
            </h2>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowDates(true)}
                className={`${softBox} text-left`}
              >
                <CalendarIcon className="h-5 w-5 shrink-0 text-ink" />
                <span>
                  <span className="block text-sm font-medium">
                    {uiText.request.checkIn}
                  </span>
                  <span className="block text-xs text-muted">
                    {formatShortDate(preview.checkIn)}
                  </span>
                </span>
              </button>
              <button
                type="button"
                onClick={() => setShowDates(true)}
                className={`${softBox} text-left`}
              >
                <CalendarIcon className="h-5 w-5 shrink-0 text-ink" />
                <span>
                  <span className="block text-sm font-medium">
                    {uiText.request.checkOut}
                  </span>
                  <span className="block text-xs text-muted">
                    {formatShortDate(preview.checkOut)}
                  </span>
                </span>
              </button>
            </div>
          </section>

          <section className="flex items-center justify-between">
            <h2 className="font-jost text-base font-semibold">
              {uiText.request.guest}
            </h2>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => changeGuests(-1)}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-line text-lg leading-none text-primary"
              >
                −
              </button>
              <span className="w-4 text-center font-medium">
                {draft.guestCount}
              </span>
              <button
                type="button"
                onClick={() => changeGuests(1)}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-lg leading-none text-white"
              >
                +
              </button>
            </div>
          </section>

          <section>
            <h2 className="mb-3 font-jost text-base font-semibold">
              {uiText.request.payWith}
            </h2>
            <div className="flex items-center gap-3 rounded-xl border border-line px-4 py-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-tint text-primary">
                <WalletIcon />
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium">{paymentMethod.name}</p>
                <p className="text-xs text-muted">
                  {paymentMethod.maskedNumber}
                </p>
              </div>
              <button
                type="button"
                className="rounded-full border border-primary px-4 py-1 text-xs font-medium text-primary"
              >
                {uiText.request.edit}
              </button>
            </div>
          </section>
        </div>

        <section className="flex flex-col justify-between gap-6">
          <div>
            <h2 className="mb-4 font-jost text-base font-semibold">
              {uiText.request.paymentDetails}
            </h2>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt>
                  {uiText.request.total} :{" "}
                  {uiText.units.night(preview.getNights())}
                </dt>
                <dd className="font-outfit">
                  {formatPrice(preview.getSubtotal())}
                </dd>
              </div>
              <div className="flex justify-between text-muted">
                <dt>{uiText.request.cleaningFee}</dt>
                <dd className="font-outfit">
                  {formatPrice(preview.cleaningFee)}
                </dd>
              </div>
              <div className="flex justify-between text-muted">
                <dt>{uiText.request.serviceFee}</dt>
                <dd className="font-outfit">
                  {formatPrice(preview.serviceFee)}
                </dd>
              </div>
              <div className="flex justify-between border-t border-line pt-3 font-medium">
                <dt>{uiText.request.totalPayment}</dt>
                <dd className="font-outfit text-base">
                  {formatPrice(preview.getTotalPrice())}
                </dd>
              </div>
            </dl>
          </div>

          <button
            type="button"
            onClick={handleCheckout}
            className="w-full rounded-xl bg-primary py-4 font-semibold text-white"
          >
            {uiText.request.checkout}
          </button>
        </section>
      </div>

      {showDates && (
        <DateRangeModal
          onClose={() => setShowDates(false)}
          onApply={handleApplyDates}
        />
      )}
    </div>
  );
}