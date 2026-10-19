import uiText from "../data/uiText";

export const formatPrice = (amount) =>
  `${uiText.currency}${amount.toLocaleString("en-PH")}`;

export const formatRating = (rating) => rating.toFixed(1);

export const formatPriceExact = (amount) =>
  `${uiText.currency}${amount.toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;