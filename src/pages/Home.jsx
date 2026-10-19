import uiText from "../data/uiText";
import { useApp } from "../context/AppContext";
import SearchBar from "../components/SearchBar";
import CategoryChips from "../components/CategoryChips";
import PopularCard from "../components/PopularCard";
import HotelListItem from "../components/HotelListItem";

const POPULAR_COUNT = 3;

export default function Home() {
  const { filteredHotels } = useApp();

  const popularHotels = [...filteredHotels]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, POPULAR_COUNT);

  return (
    <div className="space-y-8">
      <SearchBar />

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-jost text-base font-semibold">
            {uiText.home.mostPopular}
          </h2>
          <span className="text-xs font-medium text-primary">
            {uiText.home.seeAll}
          </span>
        </div>
        <div className="-mx-6 flex gap-4 overflow-x-auto px-6 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
          {popularHotels.map((hotel) => (
            <PopularCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-jost text-base font-semibold">
            {uiText.home.recommended}
          </h2>
          <span className="text-xs font-medium text-primary">
            {uiText.home.seeAll}
          </span>
        </div>
        <CategoryChips />
        {filteredHotels.length === 0 ? (
          <p className="py-8 text-center text-muted">
            {uiText.home.noResults}
          </p>
        ) : (
          <div>
            {filteredHotels.map((hotel) => (
              <HotelListItem key={hotel.id} hotel={hotel} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}