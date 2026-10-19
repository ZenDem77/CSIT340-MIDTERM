const paths = {
  wind: "M3 8h10a3 3 0 10-3-3M3 12h15a3 3 0 11-3 3M3 16h7",
  building: "M5 21V4h9v17M14 9h5v12M3 21h18M8 8h3M8 12h3M8 16h3",
  "wind-2":
    "M3 17c2 0 2-1.5 4-1.5S9 17 11 17s2-1.5 4-1.5 2 1.5 4 1.5M3 21c2 0 2-1.5 4-1.5S9 21 11 21s2-1.5 4-1.5 2 1.5 4 1.5M8 13V5a2 2 0 014 0M14 13V5",
  "24-support":
    "M4 14v-2a8 8 0 0116 0v2M4 14h3v5H4zM17 14h3v5h-3zM20 19a4 4 0 01-4 3h-3",
};

export default function AmenityIcon({ name, className = "h-6 w-6" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={paths[name] ?? paths.building} />
    </svg>
  );
}