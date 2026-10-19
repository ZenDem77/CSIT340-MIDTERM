import uiText from "../data/uiText";
import HotelType from "../models/HotelType";
import { useApp } from "../context/AppContext";

const categories = [null, ...Object.values(HotelType)];

export default function CategoryChips() {
  const { filter, updateFilter } = useApp();

  return (
    <div className="flex gap-3 overflow-x-auto pb-1">
      {categories.map((category) => {
        const isActive = filter.type === category;
        return (
          <button
            key={category ?? "all"}
            type="button"
            onClick={() => updateFilter({ type: category })}
            className={`shrink-0 rounded-lg border px-5 py-2 font-jost text-sm ${
              isActive
                ? "border-primary bg-primary font-semibold text-white"
                : "border-line bg-white text-muted"
            }`}
          >
            {category ?? uiText.home.allCategory}
          </button>
        );
      })}
    </div>
  );
}