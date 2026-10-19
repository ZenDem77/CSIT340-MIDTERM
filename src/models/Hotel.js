export default class Hotel {
  constructor({
    id,
    name,
    location,
    description,
    rating,
    pricePerNight,
    type,
    images,
    amenities,
    isFavorite = false,
  }) {
    this.id = id;
    this.name = name;
    this.location = location;
    this.description = description;
    this.rating = rating;
    this.pricePerNight = pricePerNight;
    this.type = type;
    this.images = images;
    this.amenities = amenities;
    this.isFavorite = isFavorite;
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }
}