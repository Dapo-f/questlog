import { useState, useEffect } from "react";
import { fetchGames } from "../services/rawgApi";

function GameCollage() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadGames = async () => {
      const result = await fetchGames({ page_size: 24 });
      // console.log(result);
      setLoading(false);
      setGames(result.results);
    };
    loadGames();
  }, []);
  if (loading) {
    return (
      <div className="absolute inset-0 bg-linear-to-br from-bg via-surface to-bg" />
    );
  }
  return (
    <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 gap-1 opacity-30 scale-110 -rotate-2 h-full animate-slowDrift">
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
