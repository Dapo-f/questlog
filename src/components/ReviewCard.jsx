import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchGameDetail } from "../services/rawgApi";

function ReviewCard({ review }) {
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGame() {
      try {
        const data = await fetchGameDetail(review.rawg_id);
        setGame(data);
      } catch (error) {
        console.error("Error loading game for review:", error);
      } finally {
        setLoading(false);
      }
    }
    loadGame();
  }, [review.rawg_id]);

  if (loading) {
    return (
      <div className="bg-surface2 rounded-xl border border-border h-32 animate-pulse" />
    );
  }

  if (!game) {
    return null;
  }

  return (
    <div className="bg-surface2 rounded-xl border border-border p-4 hover:border-purple/30 transition-colors">
      <div
        className="flex items-start gap-4 cursor-pointer"
        onClick={() => navigate(`/game/${game.id}`)}
      >
        <img
          src={game.background_image}
          alt={game.name}
          className="w-16 h-16 rounded-lg object-cover shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-white font-semibold text-sm truncate">
              {game.name}
            </h3>
            <span className="text-purple-bright font-bold text-sm shrink-0">
              ★ {review.rating}
            </span>
          </div>
          <p className="text-muted text-xs mt-1">
            {new Date(review.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>
      <p className="text-text text-sm mt-3 leading-relaxed">{review.body}</p>
    </div>
  );
}

export default ReviewCard;