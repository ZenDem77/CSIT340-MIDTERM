export default class SearchFilter {
  constructor({
    keyword = "",
    type = null,
    minPrice = 0,
    maxPrice = Infinity,
    minRating = 0,
    amenityIds = [],
  } = {}) {
    this.keyword = keyword;
    this.type = type;
    this.minPrice = minPrice;
    this.maxPrice = maxPrice;
    this.minRating = minRating;
    this.amenityIds = amenityIds;
  }

  matches(hotel) {
    const keyword = this.keyword.trim().toLowerCase();
    const matchesKeyword =
      keyword === "" ||
      hotel.name.toLowerCase().includes(keyword) ||
      hotel.location.toLowerCase().includes(keyword);
    const matchesType = this.type === null || hotel.type === this.type;
    const matchesPrice =
      hotel.pricePerNight >= this.minPrice &&
      hotel.pricePerNight <= this.maxPrice;
    const matchesRating = hotel.rating >= this.minRating;
    const matchesAmenities = this.amenityIds.every((id) =>
      hotel.amenities.some((amenity) => amenity.id === id)
    );

    return (
      matchesKeyword &&
      matchesType &&
      matchesPrice &&
      matchesRating &&
      matchesAmenities
    );
  }
}