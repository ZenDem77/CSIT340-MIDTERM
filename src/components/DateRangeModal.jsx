import { useState } from "react";
import uiText from "../data/uiText";
import {
  formatMonthYear,
  getMonthGrid,
  isSameDay,
  startOfDay,
} from "../utils/dates";
import { ChevronLeftIcon, ChevronRightIcon } from "./Icons";

export default function DateRangeModal({ onClose, onApply }) {
  const today = startOfDay(new Date());
  const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const [viewMonth, setViewMonth] = useState(currentMonth);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);

  const cells = getMonthGrid(viewMonth.getFullYear(), viewMonth.getMonth());
  const canGoBack = viewMonth > currentMonth;

  const changeMonth = (step) =>
    setViewMonth(
      new Date(viewMonth.getFullYear(), viewMonth.getMonth() + step, 1)
    );

  const handleSelect = (date) => {
    if (!checkIn || checkOut || date <= checkIn) {
      setCheckIn(date);
      setCheckOut(null);
      return;
    }
    setCheckOut(date);
  };

  const getDayClass = (date) => {
    const base = "aspect-square w-full rounded-lg text-sm";
    if (date < today) return `${base} cursor-not-allowed text-subtle/50`;
    if (isSameDay(date, checkIn) || isSameDay(date, checkOut)) {
      return `${base} bg-primary font-semibold text-white`;
    }
    if (checkIn && checkOut && date > checkIn && date < checkOut) {
      return `${base} bg-tint text-primary`;
    }
    return `${base} text-ink hover:bg-tint`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl bg-white p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="mb-4 text-center font-jost text-lg font-semibold">
          {uiText.dates.selectDate}
        </h2>

        <div className="mb-3 flex items-center justify-between">
          <button
            type="button"
            onClick={() => changeMonth(-1)}
            disabled={!canGoBack}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-line disabled:opacity-30"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
          <p className="text-sm font-medium">{formatMonthYear(viewMonth)}</p>
          <button
            type="button"
            onClick={() => changeMonth(1)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-line"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="mb-1 grid grid-cols-7 text-center text-xs text-muted">
          {uiText.dates.weekdays.map((day) => (
            <span key={day} className="py-2">
              {day}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-y-1">
          {cells.map((date, index) =>
            date ? (
              <button
                key={date.getTime()}
                type="button"
                disabled={date < today}
                onClick={() => handleSelect(date)}
                className={getDayClass(date)}
              >
                {date.getDate()}
              </button>
            ) : (
              <span key={`empty-${index}`} />
            )
          )}
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-3 text-sm font-medium text-danger"
          >
            {uiText.dates.cancel}
          </button>
          <button
            type="button"
            disabled={!checkOut}
            onClick={() => onApply(checkIn, checkOut)}
            className="flex-1 rounded-xl bg-primary py-3 font-semibold text-white disabled:opacity-40"
          >
            {uiText.dates.apply}
          </button>
        </div>
      </div>
    </div>
  );
}