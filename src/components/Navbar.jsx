import { NavLink } from "react-router-dom";
import uiText from "../data/uiText";
import { useApp } from "../context/AppContext";
import { BellIcon, SearchIcon } from "./Icons";

const linkClass = ({ isActive }) =>
  `font-jost text-sm font-semibold ${isActive ? "text-primary" : "text-muted"}`;

const iconButtonClass =
  "flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white";

export default function Navbar() {
  const { guest } = useApp();

  return (
    <header className="border-b border-line bg-white">
      <div className="mx-auto flex w-full max-w-240 items-center justify-between px-6 py-5 md:px-16">
        <div className="flex items-center gap-3">
          <img
            src={guest.avatar}
            alt={guest.name}
            className="h-10 w-10 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold leading-tight">{guest.name}</p>
            <p className="text-sm text-muted">{guest.location}</p>
          </div>
        </div>

        <nav className="hidden items-center gap-10 md:flex">
          <NavLink to="/" end className={linkClass}>
            {uiText.nav.home}
          </NavLink>
          <NavLink to="/my-booking" className={linkClass}>
            {uiText.nav.myBooking}
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <button type="button" className={iconButtonClass}>
            <SearchIcon />
          </button>
          <button type="button" className={iconButtonClass}>
            <BellIcon />
          </button>
        </div>
      </div>
    </header>
  );
}