import { useState } from "react";
import uiText from "../data/uiText";
import { amenityList } from "../data/amenities";
import { useApp } from "../context/AppContext";

const ratingOptions = [0, 3, 3.5, 4, 4.5];

const toInputValue = (value, emptyValue) =>
  value === emptyValue ? "" : String(value);

const chipClass = (isActive) =>
  `rounded-lg border px-4 py-2 font-jost text-sm ${
    isActive
      ? "border-primary bg-primary font-semibold text-white"
      : "border-line bg-white text-muted"
  }`;

const inputClass =
  "w-full rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-primary";

export default function FilterSheet({ onClose }) {
  const { filter, updateFilter } = useApp();
  const [minPrice, setMinPrice] = useState(toInputValue(filter.minPrice, 0));
  const [maxPrice, setMaxPrice] = useState(
    toInputValue(filter.maxPrice, Infinity)
  );
  const [minRating, setMinRating] = useState(filter.minRating);
  const [amenityIds, setAmenityIds] = useState(filter.amenityIds);

  const toggleAmenity = (id) =>
    setAmenityIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );

  const handleReset = () => {
    setMinPrice("");
    setMaxPrice("");
    setMinRating(0);
    setAmenityIds([]);
  };

  const handleApply = () => {
    updateFilter({
      minPrice: minPrice === "" ? 0 : Number(minPrice),
      maxPrice: maxPrice === "" ? Infinity : Number(maxPrice),
      minRating,
      amenityIds,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm md:items-center md:p-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md space-y-6 rounded-t-2xl bg-white p-6 md:rounded-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="text-center font-jost text-lg font-semibold">
          {uiText.filter.title}
        </h2>

        <section>
          <h3 className="mb-3 font-jost text-base font-semibold">
            {uiText.filter.price}
          </h3>
          <div className="flex gap-3">
            <input
              type="number"
              min="0"
              value={minPrice}
              onChange={(event) => setMinPrice(event.target.value)}
              placeholder={uiText.filter.minPrice}
              className={inputClass}
            />
            <input
              type="number"
              min="0"
              value={maxPrice}
              onChange={(event) => setMaxPrice(event.target.value)}
              placeholder={uiText.filter.maxPrice}
              className={inputClass}
            />
          </div>
        </section>

        <section>
          <h3 className="mb-3 font-jost text-base font-semibold">
            {uiText.filter.rating}
          </h3>
          <div className="flex flex-wrap gap-2">
            {ratingOptions.map((rating) => (
              <button
                key={rating}
                type="button"
                onClick={() => setMinRating(rating)}
                className={chipClass(minRating === rating)}
              >
                {rating === 0 ? uiText.filter.anyRating : `${rating}+`}
              </button>
            ))}
          </div>
        </section>

        <section>
          <h3 className="mb-3 font-jost text-base font-semibold">
            {uiText.filter.amenities}
          </h3>
          <div className="flex flex-wrap gap-2">
            {amenityList.map((amenity) => (
              <button
                key={amenity.id}
                type="button"
                onClick={() => toggleAmenity(amenity.id)}
                className={chipClass(amenityIds.includes(amenity.id))}
              >
                {amenity.name}
              </button>
            ))}
          </div>
        </section>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-3 text-sm font-medium text-danger"
          >
            {uiText.filter.reset}
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="flex-1 rounded-xl bg-primary py-3 font-semibold text-white"
          >
            {uiText.filter.apply}
          </button>
        </div>
      </div>
    </div>
  );
}