import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import Questlog from "../assets/logo.png";
import SearchBar from "./SearchBar";
function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 bg-surface/80 backdrop-blur-md border-b border-border">
      <Link to="/">
        <div className="flex items-center gap-2.5 mb-1">
          <svg width="32" height="32" viewBox="0 0 44 44" fill="none">
            <path
              d="M22 3L6 10V22C6 31 13 38.5 22 41C31 38.5 38 31 38 22V10L22 3Z"
              stroke="#C084FC"
              strokeWidth="1.5"
              fill="rgba(124,58,237,0.1)"
            />
            <circle
              cx="22"
              cy="21"
              r="7"
              stroke="#C084FC"
              strokeWidth="2"
              fill="none"
            />
            <line
              x1="27"
              y1="26"
              x2="31"
              y2="30"
              stroke="#C084FC"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
          <span className="logo-text font-orbitron font-bold text-[18px] text-white" onClick={() => setMobileMenuOpen(false)}>
            Quest
            <span className="text-purple-bright">Log</span>
          </span>
        </div>
      </Link>
      <SearchBar />

      <nav className="nav-links hidden md:flex gap-4 items-center">
        <NavLink
          to="/discover"
          className={({ isActive }) =>
            isActive
              ? "text-purple-bright font-semibold"
              : "text-muted hover:text-white transition-colors"
          }
        >
          Discover
        </NavLink>
        <NavLink
          to="/browse"
          className={({ isActive }) =>
            isActive
              ? "text-purple-bright font-semibold"
              : "text-muted hover:text-white transition-colors"
          }
        >
          Browse
        </NavLink>
        <NavLink
          to="/upcoming"
          className={({ isActive }) =>
            isActive
              ? "text-purple-bright font-semibold"
              : "text-muted hover:text-white transition-colors"
          }
        >
          Upcoming
        </NavLink>
        <NavLink
          to="/library"
          className="bg-purple text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-mid transition-colors"
        >
          Library
        </NavLink>
      </nav>
      {mobileMenuOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-surface border-b border-border md:hidden flex flex-col px-6 py-4 gap-4">
          <NavLink
            to="/discover"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "text-purple-bright font-semibold"
                : "text-muted hover:text-white transition-colors"
            }
          >
            Discover
          </NavLink>
          <NavLink
            to="/browse"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "text-purple-bright font-semibold"
                : "text-muted hover:text-white transition-colors"
            }
          >
            Browse
          </NavLink>
          <NavLink
          to="/upcoming"
          className={({ isActive }) =>
            isActive
              ? "text-purple-bright font-semibold"
              : "text-muted hover:text-white transition-colors"
          }
        >
          Upcoming
        </NavLink>
          <NavLink
            to="/library"
            onClick={() => setMobileMenuOpen(false)}
            className="bg-purple text-white px-4 py-2 rounded-lg font-semibold text-center"
          >
            Library
          </NavLink>
        </div>
      )}
      <button
        onClick={() => setMobileMenuOpen((prev) => !prev)}
        className="text-3xl flex items-center justify-center md:hidden"
      >
        <ion-icon
          name={mobileMenuOpen ? "close-outline" : "menu-outline"}
        ></ion-icon>
      </button>
    </div>
  );
}

export default Navbar;
