import { useState, useEffect } from "react";
import { fetchGameDetail } from "../services/rawgApi";
import GameCard from "./GameCard";

function ProfileGameCard({ rawgId }) {
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGame() {
      try {
        const data = await fetchGameDetail(rawgId);
        setGame(data);
      } catch (error) {
        console.error("Error loading game:", error);
      } finally {
        setLoading(false);
      }
    }
    loadGame();
  }, [rawgId]);

  if (loading) {
    return (
      <div className="bg-surface2 rounded-xl border border-border h-64 animate-pulse" />
    );
  }

  if (!game) {
    return null;
  }

  return <GameCard game={game} />;
}

export default ProfileGameCard;