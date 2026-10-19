export const startOfDay = (date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

export const isSameDay = (a, b) =>
  Boolean(a) && Boolean(b) && a.getTime() === b.getTime();

export const getMonthGrid = (year, month) => {
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = Array(firstWeekday).fill(null);
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(new Date(year, month, day));
  }
  return cells;
};

export const formatMonthYear = (date) =>
  date.toLocaleDateString("en-US", { month: "long", year: "numeric" });

export const formatShortDate = (date) =>
  date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const shortMonth = (date) =>
  date.toLocaleDateString("en-US", { month: "short" });

export const formatDateRange = (start, end) => {
  const sameMonth =
    start.getMonth() === end.getMonth() &&
    start.getFullYear() === end.getFullYear();

  if (sameMonth) {
    return `${start.getDate()} - ${end.getDate()} ${shortMonth(end)} ${end.getFullYear()}`;
  }
  return `${start.getDate()} ${shortMonth(start)} - ${end.getDate()} ${shortMonth(end)} ${end.getFullYear()}`;
};