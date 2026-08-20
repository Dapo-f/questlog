import React from "react";
import { useNavigate } from "react-router-dom";
import { useLibrary } from "../context/LibraryContext";
import { useAuth } from "../context/AuthContext";

function GameBanner({ game, onWatchTrailer }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { name, id, background_image, genres, platforms, released } = game;
  const { addGame, removeGame, isInLibrary } = useLibrary();
  const releaseDate =
  released && !isNaN(new Date(released))
    ? new Date(released).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "TBA";
  return (
    <div
      className="relative h-125 bg-cover bg-center flex items-end"
      style={{ backgroundImage: `url(${background_image})` }}
    >
      <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/60 to-transparent" />
      <div className="content relative z-10 md:p-12 p-3">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white hover:text-white text-sm mb-4 transition-colors"
        >
          ← Back
        </button>
        <h1 className="title font-orbitron font-black text-4xl text-white mb-3">
          {name}
        </h1>
        <div className="labels flex items-center gap-3 mb-5 flex-wrap">
          <span className="text-xs font-semibold text-muted bg-white/10 px-2.5 py-1 rounded-full">
            {genres
              ?.slice(0, 2)
              .map((g) => g.name)
              .join(",")}
          </span>
          <span className="text-xs font-semibold text-muted bg-white/10 px-2.5 py-1 rounded-full">
            {platforms
              ?.slice(0, 3)
              .map((p) => p.platform.name)
              .join(" · ")}
          </span>
          <span className="text-xs font-semibold text-white bg-green-500/20 border border-green-500/30 px-2.5 py-1 rounded-full">
            {releaseDate}
          </span>
        </div>
        <div className="buttons flex gap-3">
          <button
            className="bg-purple hover:bg-purple-mid text-white font-bold px-6 py-2.5 rounded-xl transition-colors"
            onClick={onWatchTrailer}
          >
            🎬 Watch Trailer
          </button>
          <button
            className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-2.5 rounded-xl border border-border transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              if (!isAuthenticated) {
              navigate('/login')
            }
              isInLibrary(id) ? removeGame(id) : addGame(game);
            }}
          >
            {" "}
            {isInLibrary(id) ? "✓ Saved" : "+ Add to Library"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameBanner;
