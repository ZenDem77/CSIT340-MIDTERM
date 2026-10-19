import Amenity from "../models/Amenity";

export const amenities = {
  ac: new Amenity({ id: "ac", name: "Ac", icon: "wind" }),
  restaurant: new Amenity({
    id: "restaurant",
    name: "Restaurant",
    icon: "building",
  }),
  pool: new Amenity({ id: "pool", name: "Swimming Pool", icon: "wind-2" }),
  frontDesk: new Amenity({
    id: "frontDesk",
    name: "24-Hours Front Desk",
    icon: "24-support",
  }),
};

export const amenityList = Object.values(amenities);