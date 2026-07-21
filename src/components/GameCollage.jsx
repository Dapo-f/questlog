import { useState, useEffect } from "react";
import { fetchGames } from "../services/rawgApi";

function GameCollage({
  cols = "grid-cols-4 md:grid-cols-6",
  rows = "grid-rows-4",
  pageSize = 24,
}) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGames = async () => {
      const result = await fetchGames({ page_size: pageSize });
      setLoading(false);
      setGames(result.results);
    };
    loadGames();
  }, [pageSize]);

  if (loading) {
    return (
      <div className="absolute inset-0 bg-linear-to-br from-bg via-surface to-bg" />
    );
  }

  return (
    <div
      className={`absolute inset-0 grid ${cols} ${rows} gap-1 opacity-30 scale-110 -rotate-2 h-full animate-slowDrift`}
    >
      {games.map((game) => (
        <img
          key={game.id}
          src={game.background_image}
          alt={game.name}
          className="w-full h-full object-cover"
        />
      ))}
    </div>
  );
}

export default GameCollage;