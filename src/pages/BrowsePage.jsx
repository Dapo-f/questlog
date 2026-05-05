import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchGames } from "../services/rawgApi";
import GameCard from "../components/GameCard";
import SkeletonCard from "../components/SkeletonCard";
function BrowsePage() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [ordering, setOrdering] = useState("-added");
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [yearFrom, setYearFrom] = useState(2000);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const loadGames = async () => {
      setLoading(true);
      const result = await fetchGames({
        ordering,
        ...(selectedPlatform && { platforms: selectedPlatform }),
        ...(selectedGenres.length > 0 && { genres: selectedGenres.join(",") }),
        ...(search && { search }),
        page,
        dates: `${yearFrom}-01-01,2025-12-31`,
      });
      setGames(result.results);
      setTotalCount(result.count);
      setLoading(false);
    };
    loadGames();
  }, [ordering, selectedPlatform, selectedGenres, search, page, yearFrom]);

  useEffect(() => {
    const platformFromUrl = searchParams.get("platform");
    if (platformFromUrl) setSelectedPlatform(platformFromUrl);
  }, []);

  const button = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238884A8' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 12px center",
  };

  const genres = [
    { id: 4, name: "Action" },
    { id: 51, name: "Indie" },
    { id: 3, name: "Adventure" },
    { id: 5, name: "RPG" },
    { id: 10, name: "Strategy" },
    { id: 2, name: "Shooter" },
    { id: 7, name: "Puzzle" },
    { id: 1, name: "Racing" },
    { id: 15, name: "Sports" },
  ];
  const platforms = [
    { id: 4, name: "PC" },
    { id: 187, name: "PS5" },
    { id: 186, name: "Xbox" },
    { id: 7, name: "Switch" },
    { id: 21, name: "Mobile" },
  ];
  function toggleGenre(genreId) {
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((g) => g !== genreId)
        : [...prev, genreId],
    );
  }
  function clearAll() {
    setSelectedGenres([]);
    setSelectedPlatform(null);
    setSearch("");
    setOrdering("-added");
    setPage(1);
  }
  return (
    <>
      <div
        className="page-header pt-10 px-12 pb-7 border-b border-border"
        style={{
          background:
            "linear-gradient(to bottom,rgba(124,58,237,0.05),transparent)",
        }}
      >
        <div className="page-header-top flex items-end justify-between flex-wrap gap-5 mb-5">
          <h1 className="page-title font-orbitron text-[30px] font-black text-white">
            Browse <span className="text-purple-bright">Games</span>
          </h1>
          <span className="result-count text-sm text-muted">
            <strong className="text-white">
              {totalCount.toLocaleString()}
            </strong>{" "}
            games found
          </span>
        </div>
        <div className="flex gap-3 items-center mb-3.5">
          <input
            className="flex-1 max-w-lg bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-white placeholder-muted outline-none focus:border-purple transition-colors"
            placeholder="Search games..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1); // reset to page 1 on new search
            }}
          />
          <select
            value={ordering}
            onChange={(e) => setOrdering(e.target.value)}
            className="sort-select bg-surface border-[1.5px] border-border rounded-[10px] pt-3 pr-9 pb-3 pl-4 text-text font-outfit text-sm font-medium outline-none cursor-pointer appearance-none"
            style={button}
          >
            <option value="-added">Sort: Trending</option>
            <option value="-metacritic">Sort: Highest Rated</option>
            <option value="-released">Sort: Newest First</option>
            <option value="-rating">Sort: Most Popular</option>
          </select>
        </div>

        <div className="active-filters flex gap-2 flex-wrap items-center">
          <div className="active-filters flex gap-2 flex-wrap items-center">
            {(selectedGenres.length > 0 || selectedPlatform || search) && (
              <span className="text-xs text-muted font-semibold">Active:</span>
            )}
            {selectedGenres.map((id) => (
              <div
                key={id}
                onClick={() => toggleGenre(id)}
                className="inline-flex items-center gap-1.5 bg-purple/15 border border-purple-bright/30 rounded-full py-1 px-3 text-xs font-semibold text-purple-bright cursor-pointer"
              >
                {genres.find((g) => g.id === id)?.name} <span>×</span>
              </div>
            ))}
            {selectedPlatform && (
              <div
                onClick={() => setSelectedPlatform(null)}
                className="inline-flex items-center gap-1.5 bg-purple/15 border border-purple-bright/30 rounded-full py-1 px-3 text-xs font-semibold text-purple-bright cursor-pointer"
              >
                {platforms.find((p) => p.id == selectedPlatform)?.name}{" "}
                <span>×</span>
              </div>
            )}
            {(selectedGenres.length > 0 || selectedPlatform) && (
              <span
                onClick={clearAll}
                className="text-xs font-semibold text-muted cursor-pointer px-2 py-1 rounded hover:text-red-400"
              >
                Clear all
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="browse-layout flex">
        <aside className=" w-64 shrink-0 bg-surface border-r border-border p-5 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto sidebar-scroll">
          <div className="filter-section mb-6">
            <div className="filter-label font-orbitron text-xs font-bold tracking-widest uppercase text-muted mb-3 flex justify-between items-center">
              Genre 
            </div>
            {genres.map((genre) => (
              <div
                key={genre.id}
                onClick={() => toggleGenre(genre.id)}
                className={`flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer transition-colors hover:bg-surface2 ${selectedGenres.includes(genre.id) ? "text-white" : "text-muted"}`}
              >
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center border text-xs transition-colors ${selectedGenres.includes(genre.id) ? "bg-purple border-purple text-white" : "border-border"}`}
                >
                  {selectedGenres.includes(genre.id) ? "✓" : ""}
                </div>
                <span className="text-sm flex-1">{genre.name}</span>
              </div>
            ))}
          </div>

          <div className="sidebar-divider h-0.5 bg-border mt-1 mx-0 mb-6"></div>

          <div className="filter-section mb-6">
            <div className="filter-label font-orbitron text-xs font-bold tracking-widest uppercase text-muted mb-3 flex justify-between items-center">
              Platform 
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {platforms.map((p) => (
                <div
                  key={p.id}
                  onClick={() =>
                    setSelectedPlatform((prev) => (prev == p.id ? null : p.id))
                  }
                  className={`px-3 py-1.5 rounded-full border text-xs font-semibold cursor-pointer transition-all ${selectedPlatform == p.id ? "border-purple bg-purple/15 text-purple-bright" : "border-border text-muted hover:border-purple"}`}
                >
                  {p.name}
                </div>
              ))}
            </div>
          </div>
          <div className="sidebar-divider h-0.5 bg-border mt-1 mx-0 mb-6"></div>
          <div className="filter-section mb-6">
            <div className="filter-label font-orbitron text-xs font-bold tracking-widest uppercase text-muted mb-3 flex justify-between items-center">
              Release Year
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-xs text-muted">
                From: <strong className="text-white">{yearFrom}</strong>
              </span>
              <span className="text-xs text-muted">
                To: <strong className="text-white">2025</strong>
              </span>
            </div>
            <input
              type="range"
              min="1980"
              max="2025"
              value={yearFrom}
              onChange={(e) => {
                setYearFrom(Number(e.target.value));
                setPage(1);
              }}
              className="w-full accent-purple cursor-pointer"
            />
          </div>
        </aside>
        <div className="flex-1 p-8">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {[...Array(12)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : games.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="text-5xl mb-4">🎮</div>
              <h3 className="font-orbitron text-lg text-white mb-2">
                No games found
              </h3>
              <p className="text-muted text-sm">Try adjusting your filters</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-8">
                {games.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
              {/* pagination */}
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-lg bg-surface border border-border text-muted text-sm font-semibold hover:border-purple hover:text-purple-bright transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ← Prev
                </button>
                <span className="px-4 py-2 text-sm text-muted">
                  Page <strong className="text-white">{page}</strong> of{" "}
                  <strong className="text-white">
                    {Math.ceil(totalCount / 20)}
                  </strong>
                </span>
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={page >= Math.ceil(totalCount / 20)}
                  className="px-4 py-2 rounded-lg bg-surface border border-border text-muted text-sm font-semibold hover:border-purple hover:text-purple-bright transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Next →
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default BrowsePage;
