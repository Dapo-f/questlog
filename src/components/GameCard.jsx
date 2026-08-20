import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLibrary } from "../context/LibraryContext";
import { forwardRef } from "react"
const GameCard = forwardRef(function GameCard({ game, className }, ref) {
  const navigate = useNavigate();
  const { isAuthenticated} = useAuth()
  const { name, id, background_image, genres, metacritic, released } = game;
  const { addGame, removeGame, isInLibrary } = useLibrary();
  const isNew = released && new Date(released) > new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
  return (
    <div ref={ref}
       className={`group relative bg-surface2 rounded-xl border border-border cursor-pointer overflow-hidden hover:border-[rgba(192,132,252,0.3)] transition hover:-translate-y-1 duration-300 ease-in-out ${className}`}
      onClick={() => navigate(`/game/${id}`)}
    >
      {isNew && (
        <span className="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider bg-purple text-white px-2 py-0.5 rounded-full z-10">
          New
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
          <div className="flex justify-between items-center mt-2">
            <span
              className="text-muted text-xs truncate max-w-28 flex-1
"
            >
              {genres?.slice(0,2).map((g) => g.name).join(",")}
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
            if (!isAuthenticated) {
              navigate('/login')
            }
            isInLibrary(id) ? removeGame(id) : addGame(game);
          }}
        >
          {isInLibrary(id) ? "✓" : "+"}
        </button>
      </div>
    </div>
  );
})

export default GameCard;
