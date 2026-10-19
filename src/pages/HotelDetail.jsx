import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import uiText from "../data/uiText";
import { useApp } from "../context/AppContext";
import { formatPriceExact, formatRating } from "../utils/format";
import AmenityIcon from "../components/AmenityIcon";
import DateRangeModal from "../components/DateRangeModal";
import { CubeIcon, PinIcon, StarIcon } from "../components/Icons";

export default function HotelDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getHotel, updateDraft } = useApp();
  const [expanded, setExpanded] = useState(false);
  const [showDates, setShowDates] = useState(false);
  const hotel = getHotel(id);

  if (!hotel) {
    return (
      <div className="py-16 text-center">
        <p className="mb-4 text-muted">{uiText.detail.notFound}</p>
        <Link to="/" className="font-semibold text-primary">
          {uiText.detail.backHome}
        </Link>
      </div>
    );
  }

  const handleApply = (checkIn, checkOut) => {
  updateDraft({ hotelId: hotel.id, checkIn, checkOut });
  navigate(`/hotel/${hotel.id}/request`);
  };

  return (
    <div className="flex flex-col gap-8 md:flex-row md:items-stretch md:gap-10">
      <img
        src={hotel.images[0]}
        alt={hotel.name}
        className="h-72 w-full rounded-2xl object-cover md:h-auto md:w-[416px] md:shrink-0"
      />

      <div className="flex flex-1 flex-col justify-between gap-6">
        <div className="space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-xl font-semibold">{hotel.name}</h1>
              <div className="mt-2 flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1 text-muted">
                  <PinIcon className="h-4 w-4 text-primary" />
                  {hotel.location}
                </span>
                <span className="flex items-center gap-1 font-medium">
                  <StarIcon />
                  {formatRating(hotel.rating)}
                </span>
              </div>
            </div>
            <button
              type="button"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-tint text-primary"
            >
              <CubeIcon />
            </button>
          </div>

          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-jost text-base font-semibold">
                {uiText.detail.commonFacilities}
              </h2>
              <span className="text-xs font-medium text-primary">
                {uiText.home.seeAll}
              </span>
            </div>
            <div className="flex flex-wrap gap-4">
              {hotel.amenities.map((amenity) => (
                <div
                  key={amenity.id}
                  className="flex w-20 flex-col items-center gap-2 text-center"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-tint text-primary">
                    <AmenityIcon name={amenity.icon} />
                  </span>
                  <span className="text-xs text-muted">{amenity.name}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-2 font-jost text-base font-semibold">
              {uiText.detail.description}
            </h2>
            <p
              className={`text-sm leading-relaxed text-muted ${
                expanded ? "" : "line-clamp-3"
              }`}
            >
              {hotel.description}
            </p>
            <button
              type="button"
              onClick={() => setExpanded((value) => !value)}
              className="mt-1 text-sm font-medium text-primary"
            >
              {expanded ? uiText.detail.showLess : uiText.detail.readMore}
            </button>
          </section>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-subtle">{uiText.detail.price}</p>
            <p className="font-outfit text-2xl font-semibold">
              {formatPriceExact(hotel.pricePerNight)}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowDates(true)}
            className="rounded-xl bg-primary px-8 py-4 font-semibold text-white"
          >
            {uiText.detail.bookNow}
          </button>
        </div>
      </div>
        {showDates && (
        <DateRangeModal
          onClose={() => setShowDates(false)}
          onApply={handleApply}
        />
      )}
    </div>
  );
}