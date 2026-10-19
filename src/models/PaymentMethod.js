export default class PaymentMethod {
  constructor({ id, name, maskedNumber }) {
    this.id = id;
    this.name = name;
    this.maskedNumber = maskedNumber;
  }
}