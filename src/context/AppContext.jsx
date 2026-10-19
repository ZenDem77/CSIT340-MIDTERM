import { createContext, useContext, useMemo, useState } from "react";
import Hotel from "../models/Hotel";
import Booking from "../models/Booking";
import SearchFilter from "../models/SearchFilter";
import { hotels as initialHotels } from "../data/hotels";
import { initialBookings } from "../data/bookings";
import { currentGuest } from "../data/guest";
import { paymentMethods } from "../data/paymentMethods";

const AppContext = createContext(null);

const emptyDraft = {
  hotelId: null,
  checkIn: null,
  checkOut: null,
  guestCount: 1,
};

export function AppProvider({ children }) {
  const [hotels, setHotels] = useState(initialHotels);
  const [bookings, setBookings] = useState(initialBookings);
  const [filter, setFilter] = useState(new SearchFilter());
  const [draft, setDraft] = useState(emptyDraft);

  const filteredHotels = useMemo(
    () => hotels.filter((hotel) => filter.matches(hotel)),
    [hotels, filter]
  );

  const getHotel = (id) => hotels.find((hotel) => hotel.id === id);

  const toggleFavorite = (hotelId) => {
    setHotels((prev) =>
      prev.map((hotel) => {
        if (hotel.id !== hotelId) return hotel;
        const copy = new Hotel({ ...hotel });
        copy.toggleFavorite();
        return copy;
      })
    );
  };

  const updateFilter = (changes) =>
    setFilter((prev) => new SearchFilter({ ...prev, ...changes }));

  const resetFilter = () => setFilter(new SearchFilter());

  const updateDraft = (changes) =>
    setDraft((prev) => ({ ...prev, ...changes }));

  const resetDraft = () => setDraft(emptyDraft);

  const addBooking = (booking) => setBookings((prev) => [booking, ...prev]);

  const cancelBooking = (bookingId) => {
    setBookings((prev) =>
      prev.map((booking) => {
        if (booking.id !== bookingId) return booking;
        const copy = new Booking({ ...booking });
        copy.cancel();
        return copy;
      })
    );
  };

  const value = {
    guest: currentGuest,
    paymentMethods,
    hotels,
    filteredHotels,
    bookings,
    filter,
    draft,
    getHotel,
    toggleFavorite,
    updateFilter,
    resetFilter,
    updateDraft,
    resetDraft,
    addBooking,
    cancelBooking,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  return useContext(AppContext);
}