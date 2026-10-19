import { Link } from "react-router-dom";
import uiText from "../data/uiText";
import { formatPrice, formatRating } from "../utils/format";
import { PinIcon, StarIcon } from "./Icons";

export default function HotelListItem({ hotel }) {
  return (
    <Link
      to={`/hotel/${hotel.id}`}
      className="flex items-start gap-4 border-b border-line py-4 last:border-b-0"
    >
      <img
        src={hotel.images[0]}
        alt={hotel.name}
        className="h-20 w-20 shrink-0 rounded-lg object-cover"
      />
      <div className="min-w-0 flex-1">
        <p className="font-semibold">{hotel.name}</p>
        <p className="mt-1 flex items-center gap-1 text-xs text-muted">
          <PinIcon className="h-3.5 w-3.5" />
          {hotel.location}
        </p>
        <p className="mt-2 font-outfit">
          <span className="text-lg font-semibold text-primary">
            {formatPrice(hotel.pricePerNight)}
          </span>
          <span className="text-sm"> {uiText.perNight}</span>
        </p>
      </div>
      <div className="flex items-center gap-1 text-sm font-medium">
        <StarIcon />
        <span>{formatRating(hotel.rating)}</span>
      </div>
    </Link>
  );
}