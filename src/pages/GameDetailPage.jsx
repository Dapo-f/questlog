import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  fetchGameDetail,
  fetchGameTrailers,
  fetchSimilarGames,
  fetchGameScreenshots,
  fetchYouTubeTrailer,
} from "../services/rawgApi";
import GameBanner from "../components/GameBanner";
function GameDetailPage() {
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [trailer, setTrailer] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [screenshots, setScreenshots] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [youtubeId, setYoutubeId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const { id } = useParams();
  const storeIcons = {
    Steam: "🎮",
    "PlayStation Store": "🎯",
    "Xbox Store": "🟩",
    "Nintendo Store": "🔴",
    "Epic Games": "⬛",
    GOG: "🌌",
    "App Store": "📱",
    "Google Play": "📱",
  };

  useEffect(() => {
    const loadData = async () => {
      const [g, tr, si, sc] = await Promise.all([
        fetchGameDetail(id),
        fetchGameTrailers(id),
        fetchSimilarGames(id),
        fetchGameScreenshots(id),
      ]);
      setGame(g);
      setTrailer(tr.results);
      if (tr.results.length === 0) {
        const ytId = await fetchYouTubeTrailer(g.name);
        setYoutubeId(ytId);
      }
      setSimilar(si.results);
      setScreenshots(sc.results);
      setLoading(false);
    };
    loadData();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-muted">
        Loading...
      </div>
    );
  if (!game)
    return (
      <div className="min-h-screen flex items-center justify-center text-muted">
        Game not found
      </div>
    );
  // const plainText =
  //   game.description_raw || game.description?.replace(/<[^>]+>/g, "");

  const getStoreUrl = (store) => {
    const domain = store.store.domain;
    const gameName = encodeURIComponent(game.name);

    const searchUrls = {
      "store.steampowered.com": `https://store.steampowered.com/search/?term=${gameName}`,
      "epicgames.com": `https://store.epicgames.com/browse?q=${gameName}`,
      "playstation.com": `https://store.playstation.com/search/${gameName}`,
      "microsoft.com": `https://www.xbox.com/search?q=${gameName}`,
      "nintendo.com": `https://www.nintendo.com/search/#q=${gameName}`,
      "gog.com": `https://www.gog.com/games?search=${gameName}`,
    };

    return searchUrls[domain] || `https://${domain}`;
  };
  return (
    <div>
      <GameBanner game={game} />
      <div className="flex flex-col md:flex-row gap-8 px-4 md:px-12 py-6 md:py-10">
        {/* MAIN COLUMN */}
        <div className="flex-1 min-w-0">
          <section className="about">
            <div className="title flex items-center gap-2">
              <div
                className="w-1 h-5  rounded-sm"
                style={{
                  background: "linear-gradient(to bottom, #7C3AED, #9D5FF0)",
                }}
              ></div>
              <h2 className="section-title font-orbitron font-bold text-white text-lg">
                About
              </h2>
            </div>
            <div className="text-muted text-sm leading-relaxed mt-4 mb-3 space-y-3">
              {(expanded
                ? game.description_raw
                : game.description_raw?.slice(0, 500)
              )
                ?.split("\n")
                .filter((line) => line.trim() !== "")
                .map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
            </div>
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-purple-bright text-sm font-semibold mt-2 hover:underline"
            >
              {expanded ? "Show less ↑" : "Read more ↓"}
            </button>
          </section>
          <section className="trailers mt-6">
            <div className="title flex items-center gap-2 ">
              <div
                className="w-1 h-5  rounded-sm"
                style={{
                  background: "linear-gradient(to bottom, #7C3AED, #9D5FF0)",
                }}
              ></div>
              <h2 className="section-title font-orbitron font-bold text-white text-lg">
                Trailer
              </h2>
            </div>
            {trailer.length > 0 ? (
              <video
                controls
                className="w-full rounded-xl mt-4"
                poster={trailer[0]?.preview}
              >
                <source src={trailer[0]?.data?.max} type="video/mp4" />
              </video>
            ) : youtubeId ? (
              <iframe
                className="w-full aspect-video rounded-xl mt-4"
                src={`https://www.youtube.com/embed/${youtubeId}`}
                title="Game Trailer"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            ) : (
              <p className="text-muted text-sm mt-4">
                No trailer available for this game
              </p>
            )}
          </section>
          <section className="screenshot mt-6">
            <div className="title flex items-center gap-2 ">
              <div
                className="w-1 h-5  rounded-sm"
                style={{
                  background: "linear-gradient(to bottom, #7C3AED, #9D5FF0)",
                }}
              ></div>
              <h2 className="section-title font-orbitron font-bold text-white text-lg">
                Screenshot
              </h2>
            </div>
            {screenshots.length > 0 ? (
              <div className="grid grid-cols-3 gap-3 mt-4">
                {screenshots.slice(0, 6).map((shot) => (
                  <div
                    key={shot.id}
                    className="rounded-xl overflow-hidden aspect-video group cursor-pointer"
                  >
                    <img
                      src={shot.image}
                      alt="screenshot"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      onClick={() => setSelectedImage(shot.image)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted text-sm mt-4">
                No screenshots available for this game
              </p>
            )}
          </section>
          {selectedImage && (
            <div
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-8"
              onClick={() => setSelectedImage(null)}
            >
              <img
                src={selectedImage}
                className="max-w-full max-h-full rounded-xl object-contain"
              />
            </div>
          )}
          <section className="wtb mt-6">
            <div className="title flex items-center gap-2 ">
              <div
                className="w-1 h-5  rounded-sm"
                style={{
                  background: "linear-gradient(to bottom, #7C3AED, #9D5FF0)",
                }}
              ></div>
              <h2 className="section-title font-orbitron font-bold text-white text-lg">
                Where To Buy
              </h2>
            </div>
            {game.stores?.length > 0 && (
              <div className="flex flex-col gap-3 mt-4">
                {game.stores?.map((store) => (
                  <a
                    key={store.store.id}
                    href={getStoreUrl(store)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between bg-surface2 border border-border rounded-xl px-4 py-3 hover:border-purple-bright/30 hover:translate-x-1 transition-all group"
                  >
                    {/* <img
                      src={game.stores?.[store]?.store?.name}
                      alt={game.stores?.[store]?.store?.name}
                    /> */}
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">
                        {storeIcons[store.store.name] || "🛒"}
                      </span>
                      <div>
                        <p className="text-white text-sm font-semibold group-hover:text-purple-bright transition-colors">
                          {store.store.name}
                        </p>
                        <p className="text-muted text-xs mt-0.5">
                          Click to visit store
                        </p>
                      </div>
                    </div>
                    <span className="text-muted text-lg">→</span>
                  </a>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* ASIDE */}
        <div className="w-72 shrink-0">
          {game.metacritic && (
            <div className="bg-surface border border-border rounded-2xl p-6 mb-6 flex items-center justify-between">
              <span className="font-orbitron font-bold text-white text-sm">
                Metacritic
              </span>
              <span
                className={`font-orbitron font-black text-2xl ${game.metacritic >= 75 ? "text-green-400" : game.metacritic >= 50 ? "text-orange-400" : "text-red-400"}`}
              >
                {game.metacritic}
              </span>
            </div>
          )}
          <div className="bg-surface border border-border rounded-2xl p-6 mb-6">
            {[
              { label: "Developer", value: game.developers?.[0]?.name },
              { label: "Publisher", value: game.publishers?.[0]?.name },
              { label: "Released", value: game.released },
              {
                label: "Genre",
                value: game.genres?.map((g) => g.name).join(", "),
              },
              {
                label: "Platforms",
                value: game.platforms
                  ?.slice(0, 3)
                  .map((p) => p.platform.name)
                  .join(", "),
              },
              { label: "ESRB", value: game.esrb_rating?.name ?? "Not rated" },
              {
                label: "Playtime",
                value: game.playtime ? `~${game.playtime} hrs` : "N/A",
              },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex justify-between items-start py-3 border-b border-border last:border-none"
              >
                <span className="text-xs text-muted uppercase tracking-wider font-semibold">
                  {label}
                </span>
                <span className="text-sm text-white font-medium text-right max-w-40">
                  {value || "N/A"}
                </span>
              </div>
            ))}
          </div>
          {similar.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-1 h-5 rounded-sm"
                  style={{
                    background: "linear-gradient(to bottom, #7C3AED, #9D5FF0)",
                  }}
                />
                <h2 className="font-orbitron font-bold text-white text-base">
                  Similar Games
                </h2>
              </div>
              <div className="flex flex-col gap-3">
                {similar.slice(0, 5).map((s) => (
                  <div
                    key={s.id}
                    onClick={() => navigate(`/game/${s.id}`)}
                    className="flex gap-3 items-center bg-surface border border-border rounded-xl p-3 cursor-pointer hover:border-purple-bright/30 transition-colors group"
                  >
                    <img
                      src={s.background_image}
                      alt={s.name}
                      className="w-14 h-14 rounded-lg object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-white text-sm font-semibold truncate group-hover:text-purple-bright transition-colors">
                        {s.name}
                      </p>
                      <p className="text-muted text-xs mt-0.5">
                        {s.genres?.[0]?.name}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-bold ml-auto shrink-0 ${s.metacritic >= 75 ? "text-green-400" : "text-orange-400"}`}
                    >
                      {s.metacritic ? `★ ${s.metacritic}` : ""}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GameDetailPage;
