import Hotel from "../models/Hotel";
import HotelType from "../models/HotelType";
import { amenities } from "./amenities";

const description =
  "The ideal place for those looking for a luxurious and tranquil holiday experience with stunning sea views.";

export const hotels = [
  new Hotel({
    id: "sogo-hotel",
    name: "The SOGO Hotel",
    location: "Talisay, Cebu",
    description,
    rating: 4.6,
    pricePerNight: 1200,
    type: HotelType.HOTEL,
    images: ["/images/sogo-hotel.jpg"],
    amenities: [
      amenities.ac,
      amenities.restaurant,
      amenities.pool,
      amenities.frontDesk,
    ],
    isFavorite: true,
  }),
  new Hotel({
    id: "opal-grove-inn",
    name: "Opal Grove Inn",
    location: "Balay, Niya",
    description,
    rating: 4.5,
    pricePerNight: 1900,
    type: HotelType.HOTEL,
    images: ["/images/opal-grove-inn.jpg"],
    amenities: [amenities.ac, amenities.restaurant, amenities.pool],
    isFavorite: true,
  }),
  new Hotel({
    id: "astra-grand-hotel",
    name: "Astra Grand Hotel",
    location: "New York, NY",
    description,
    rating: 4.5,
    pricePerNight: 3000,
    type: HotelType.HOTEL,
    images: ["/images/astra-grand-hotel.jpg"],
    amenities: [amenities.ac, amenities.pool, amenities.frontDesk],
  }),
  new Hotel({
    id: "serenity-sands",
    name: "Serenity Sands",
    location: "Punta, Cebu",
    description,
    rating: 4.0,
    pricePerNight: 2700,
    type: HotelType.VILLA,
    images: ["/images/serenity-sands.jpg"],
    amenities: [amenities.ac, amenities.pool],
  }),
  new Hotel({
    id: "elysian-suites",
    name: "Elysian Suites",
    location: "Balay, Niya",
    description,
    rating: 3.8,
    pricePerNight: 3200,
    type: HotelType.APARTMENT,
    images: ["/images/elysian-suites.jpg"],
    amenities: [amenities.ac, amenities.restaurant, amenities.frontDesk],
  }),
  new Hotel({
    id: "mystic-palms",
    name: "Mystic Palms",
    location: "Balay, Nako",
    description,
    rating: 4.0,
    pricePerNight: 2300,
    type: HotelType.VILLA,
    images: ["/images/mystic-palms.jpg"],
    amenities: [amenities.ac, amenities.pool, amenities.restaurant],
  }),
];