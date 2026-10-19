import { useState } from "react";
import uiText from "../data/uiText";
import { useApp } from "../context/AppContext";
import FilterSheet from "./FilterSheet";
import { FilterIcon, SearchIcon } from "./Icons";

export default function SearchBar() {
  const { filter, updateFilter } = useApp();
  const [showFilters, setShowFilters] = useState(false);

  const hasActiveFilters =
    filter.minPrice > 0 ||
    filter.maxPrice !== Infinity ||
    filter.minRating > 0 ||
    filter.amenityIds.length > 0;

  return (
    <>
      <div className="flex items-center gap-3 rounded-full border border-line bg-white px-5 py-3">
        <SearchIcon className="h-5 w-5 text-muted" />
        <input
          type="text"
          value={filter.keyword}
          onChange={(event) => updateFilter({ keyword: event.target.value })}
          placeholder={uiText.home.searchPlaceholder}
          className="min-w-0 flex-1 bg-transparent font-jost text-sm font-semibold text-ink outline-none placeholder:text-subtle"
        />
        <button
          type="button"
          onClick={() => setShowFilters(true)}
          className="relative border-l border-line pl-3 text-ink"
        >
          <FilterIcon />
          {hasActiveFilters && (
            <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-primary" />
          )}
        </button>
      </div>

      {showFilters && <FilterSheet onClose={() => setShowFilters(false)} />}
    </>
  );
}