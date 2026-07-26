import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useLibrary } from "../context/LibraryContext";
import SearchBar from "./SearchBar";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
   const { showToast } = useLibrary();
  const navigate = useNavigate();

  function handleLogout() {
    logout().then(() => {
      setDropdownOpen(false);
      showToast("Logout successful");
      navigate("/");
    });
  }

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-purple-bright font-semibold"
      : "text-muted hover:text-white transition-colors";

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
          <span
            className="logo-text font-orbitron font-bold text-[18px] text-white"
            onClick={() => setMobileMenuOpen(false)}
          >
            Quest
            <span className="text-purple-bright">Log</span>
          </span>
        </div>
      </Link>

      <SearchBar />

      <nav className="nav-links hidden md:flex gap-4 items-center">
        <NavLink to="/discover" className={navLinkClass}>
          Discover
        </NavLink>
        <NavLink to="/browse" className={navLinkClass}>
          Browse
        </NavLink>
        <NavLink to="/upcoming" className={navLinkClass}>
          Upcoming
        </NavLink>
        <NavLink to="/community" className={navLinkClass}>
          Community
        </NavLink>

        {isAuthenticated ? (
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button className="flex items-center justify-center h-9 w-9 rounded-full bg-purple text-white font-semibold uppercase overflow-hidden">
              {user?.profile_picture ? (
                <img
                  src={user.profile_picture}
                  alt={user.username}
                  className="h-full w-full object-cover"
                />
              ) : (
                user?.username?.charAt(0) || "?"
              )}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-full pt-2 w-48">
                <div className="bg-surface border border-border rounded-lg shadow-lg overflow-hidden">
                  <Link
                    to={`/profile/${user?.username}`}
                    className="block px-4 py-2.5 text-sm text-text hover:bg-surface2 transition-colors"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/library"
                    className="block px-4 py-2.5 text-sm text-text hover:bg-surface2 transition-colors"
                  >
                    Library
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-surface2 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="bg-purple text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-mid transition-colors"
            >
              Login
            </Link>
          </div>
        )}
      </nav>

      {mobileMenuOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-surface border-b border-border md:hidden flex flex-col px-6 py-4 gap-4">
          <NavLink
            to="/discover"
            onClick={() => setMobileMenuOpen(false)}
            className={navLinkClass}
          >
            Discover
          </NavLink>
          <NavLink
            to="/browse"
            onClick={() => setMobileMenuOpen(false)}
            className={navLinkClass}
          >
            Browse
          </NavLink>
          <NavLink
            to="/upcoming"
            onClick={() => setMobileMenuOpen(false)}
            className={navLinkClass}
          >
            Upcoming
          </NavLink>
          <NavLink
            to="/community"
            onClick={() => setMobileMenuOpen(false)}
            className={navLinkClass}
          >
            Community
          </NavLink>

          {isAuthenticated ? (
            <div className="border-t border-border pt-4 flex flex-col gap-4">
              <details className="group bg-bg border border-slate-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 open:ring-2 open:ring-purple">
                {/* <!-- Trigger Button --> */}
                <summary className="flex items-center justify-between p-4 text-text font-medium cursor-pointer list-none transition-colors select-none">
                  <div className="flex items-center gap-3">
                    {/* <!-- Menu Icon --> */}
                    <svg
                      className="w-5 h-5 text-purple-mid"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                    <span>Manage Account</span>
                  </div>

                  {/* <!-- Chevron Arrow (Rotates when open) --> */}
                  <svg
                    className="w-5 h-5 text-slate-400 transition-transform duration-300 group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>

                {/* <!-- Dropdown Body / Menu Items --> */}
                <div className="border-t border-slate-800 bg-slate-950 p-2 flex flex-col gap-1">
                  {/* <!-- Item 1 --> */}
                  <Link
                    to={`/profile/${user?.username}`}
                    class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted transition-colors group/item"
                  >
                    <button className="flex items-center justify-center h-6 w-6 rounded-full bg-purple text-white font-semibold uppercase overflow-hidden">
                  {user?.profile_picture ? (
                    <img
                      src={user.profile_picture}
                      alt={user.username}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    user?.username?.charAt(0) || "?"
                  )}
                </button>
                    {user?.username}
                  </Link>

                  {/* <!-- Item 2 --> */}
                  <Link
                    to="/library"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted transition-colors group/item"
                  >
                    <svg
                      className="w-6 h-6 text-purple-bright"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Library
                  </Link>

                  {/* <!-- Divider --> */}
                  <div class="h-px bg-slate-800 my-1"></div>

                  {/* <!-- Item 3 (Destructive) --> */}
                  <button
                    onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-rose-400  transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokewidth="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Sign Out
                  </button>
                </div>
              </details>
            </div>
          ) : (
            <>
              <NavLink
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-purple text-white px-4 py-2 rounded-lg font-semibold text-center"
              >
                Login
              </NavLink>
            </>
          )}
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
