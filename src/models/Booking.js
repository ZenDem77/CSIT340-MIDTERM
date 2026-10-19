const MS_PER_DAY = 1000 * 60 * 60 * 24;

export default class Booking {
  static STATUS = Object.freeze({
    CONFIRMED: "confirmed",
    CANCELLED: "cancelled",
  });

  constructor({
    id,
    hotel,
    guest,
    paymentMethod,
    checkIn,
    checkOut,
    guestCount,
    cleaningFee,
    serviceFee,
    status = Booking.STATUS.CONFIRMED,
  }) {
    this.id = id;
    this.hotel = hotel;
    this.guest = guest;
    this.paymentMethod = paymentMethod;
    this.checkIn = checkIn;
    this.checkOut = checkOut;
    this.guestCount = guestCount;
    this.cleaningFee = cleaningFee;
    this.serviceFee = serviceFee;
    this.status = status;
  }

  getNights() {
    const diff = this.checkOut - this.checkIn;
    return Math.max(0, Math.round(diff / MS_PER_DAY));
  }

  getSubtotal() {
    return this.getNights() * this.hotel.pricePerNight;
  }

  getTotalPrice() {
    return this.getSubtotal() + this.cleaningFee + this.serviceFee;
  }

  cancel() {
    this.status = Booking.STATUS.CANCELLED;
  }
}