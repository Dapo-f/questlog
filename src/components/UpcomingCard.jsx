import { useNavigate } from "react-router-dom";
import { useLibrary } from "../context/LibraryContext";

function UpcomingCard({ game }) {
  const navigate = useNavigate();
  const { name, id, background_image, genres, metacritic, released } = game;
  const { addGame, removeGame, isInLibrary } = useLibrary();
  const releaseDate = game.released
    ? new Date(game.released).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "TBA";
  const daysUntilRelease = Math.ceil(
    (new Date(game.released) - new Date()) / (1000 * 60 * 60 * 24),
  );
  const isReleasingSoon = daysUntilRelease <= 90 && daysUntilRelease > 0;
  
  return (
    <div
      className="group relative bg-surface2 rounded-xl border border-border cursor-pointer overflow-hidden hover:border-[rgba(192,132,252,0.3)] transition hover:-translate-y-1 duration-300 ease-in-out"
      onClick={() => navigate(`/game/${id}`)}
    >
      {isReleasingSoon && (
        <span className="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider bg-orange-400 text-white px-2 py-0.5 rounded-full z-10">
          Soon
        </span>
      )}
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
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs">📅</span>
            <span
              className={`text-xs font-bold ${
                releaseDate === "TBA"
                  ? "text-muted"
                  : isReleasingSoon
                    ? "text-orange-400"
                    : "text-purple-bright"
              }`}
            >
              {releaseDate === "TBA"
                ? "TBA"
                : isReleasingSoon
                  ? `🔥 ${releaseDate}`
                  : releaseDate}
            </span>
          </div>
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
        <button
          className="absolute top-2 right-2 w-8 h-8 rounded-lg bg-purple hover:bg-purple/80 transition flex items-center justify-center text-sm"
          onClick={(e) => {
            e.stopPropagation();
            isInLibrary(id) ? removeGame(id) : addGame(game);
          }}
        >
          {isInLibrary(id) ? "✓" : "+"}
        </button>
      </div>
    </div>
  );
}

export default UpcomingCard;
