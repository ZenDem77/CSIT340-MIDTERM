import { Link } from "react-router-dom";
import uiText from "../data/uiText";
import { useApp } from "../context/AppContext";
import { formatPrice, formatRating } from "../utils/format";
import { HeartIcon, StarIcon } from "./Icons";

export default function PopularCard({ hotel }) {
  const { toggleFavorite } = useApp();

  const handleFavorite = (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleFavorite(hotel.id);
  };

  return (
    <Link
      to={`/hotel/${hotel.id}`}
      className="relative block h-64 w-44 shrink-0 overflow-hidden rounded-2xl md:h-80 md:w-auto"
    >
      <img
        src={hotel.images[0]}
        alt={hotel.name}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />

      <button
        type="button"
        onClick={handleFavorite}
        className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white"
      >
        <HeartIcon filled={hotel.isFavorite} />
      </button>

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 text-white">
        <div>
          <p className="font-jost text-base font-semibold">{hotel.name}</p>
          <p className="font-jost text-xs">{hotel.location}</p>
          <p className="mt-1 font-jost text-sm font-semibold">
            {formatPrice(hotel.pricePerNight)}
            {uiText.perNight}
          </p>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <StarIcon />
          <span>{formatRating(hotel.rating)}</span>
        </div>
      </div>
    </Link>
  );
}