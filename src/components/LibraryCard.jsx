import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLibrary } from "../context/LibraryContext";

function LibraryCard({ game }) {
  const { name, id, background_image, genres, metacritic, released } = game;
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [status, setStatus] = useState({});
  const { updateStatus, removeGame } = useLibrary();
  const statuses = [
    { key: "playing", label: "▶ Playing" },
    { key: "completed", label: "✅ Completed" },
    { key: "wishlist", label: "⭐ Wishlist" },
    { key: "dropped", label: "🚫 Dropped" },
  ];
  const statusColors = {
    wishlist: "bg-orange-400/20 border border-orange-400/30 text-orange-400",
    playing: "bg-green-400/20 border border-green-400/30 text-green-400",
    completed: "bg-purple/20 border border-purple-bright/30 text-purple-bright",
    dropped: "bg-red-400/20 border border-red-400/30 text-red-400",
  };
  return (
    <>
      <div
        className="Wrapper group relative w-56 shrink-0 bg-surface2 rounded-xl border border-border cursor-pointer overflow-hidden hover:border-[rgba(192,132,252,0.3)] transition hover:-translate-y-1 duration-300 ease-in-out"
        onClick={() => navigate(`/game/${id}`)}
      >
        <span
          className={`absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full z-10 ${statusColors[game.status]}`}
        >
          {game.status}
        </span>
        <div className="thumbnail relative h-48 overflow-hidden">
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300 block"
            src={background_image}
            alt={name}
          />
        </div>
        <div className="bottom-label px-4 py-3">
          <div className="bottom-content ">
            <p className="text-white font-semibold text-sm truncate">{name}</p>
            <div className="flex justify-between items-center mt-2">
              <span
                className="text-muted text-xs truncate max-w-28 flex-1
"
              >
                {genres
                  ?.slice(0, 2)
                  .map((g) => g.name)
                  .join(",")}
              </span>
              <span
                className={`text-xs font-bold ${metacritic >= 75 ? "text-green-400" : metacritic >= 50 ? "text-orange-400" : "text-red-400"}`}
              >
                {metacritic ? `★ ${metacritic}` : ""}
              </span>
            </div>
          </div>
          <div>
            <button
              id="dropdownMenuIconButton"
              datadropdowntoggle="dropdownDots"
              className="absolute top-2 right-2 w-8 h-8 rounded-lg bg-purple hover:bg-purple/80 transition flex items-center justify-center text-sm"
              type="button"
              onClick={(e) => {
                e.stopPropagation(); // prevents navigating to game page
                setMenuOpen((m) => !m);
              }}
            >
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="3"
                  d="M12 6h.01M12 12h.01M12 18h.01"
                />
              </svg>
            </button>

            {/* <!-- Dropdown menu --> */}
            {menuOpen && (
              <div
                id="dropdownDots"
                className="absolute top-10 right-2 z-20 bg-surface border border-border rounded-xl shadow-lg w-44 overflow-hidden"
              >
                <div
                  className="p-2 text-sm text-body font-medium"
                  ariaLabelledby="dropdownMenuIconButton"
                >
                  {statuses.map(({ key, label }) => (
                    <p
                      className={`px-3 py-2 text-sm cursor-pointer rounded-lg transition-colors hover:bg-surface2 ${game.status === key ? statusColors[key] : "text-muted hover:text-white"}`}
                      key={key}
                      onClick={(e) => {
                        e.stopPropagation();
                        updateStatus(id, key);
                        setMenuOpen(false);
                      }}
                    >
                      {label}
                    </p>
                  ))}
                  <hr className="border-border my-1" />
                  <p
                    className="px-3 py-2 text-sm cursor-pointer rounded-lg text-red-400 hover:bg-red-400/10 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeGame(id);
                    }}
                  >
                    Remove
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default LibraryCard;
