import { useEffect, useState } from "react";
import { fetchUpcomingGames } from "../services/rawgApi";
import UpcomingCard from "../components/UpcomingCard";
import SkeletonCard from "../components/SkeletonCard";

function UpcomingPage() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [ordering, setOrdering] = useState("-added");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const loadGames = async () => {
      setLoading(true)
      const result = await fetchUpcomingGames({
        ordering,
        ...(search && { search }),
        page,
        page_size: 12,
      });
      setGames(result.results);
      setTotalCount(result.count);
      setLoading(false);
    };
    loadGames();
  }, [ordering, search, page]);
  const button = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238884A8' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 12px center",
  };
  return (
    <>
      <div
        className="page-header pt-10 px-4 md:px-12 pb-7 border-b border-border"
        style={{
          background:
            "linear-gradient(to bottom, rgba(124,58,237,0.08), transparent)",
        }}
      >
        <div className="page-eyebrow text-[11px] tracking-[0.25em] uppercase text-purple-bright font-bold mb-3">
          🎮 Coming Soon
        </div>
        {/* Page Header */}
        <div className="page-header-top flex items-end justify-between flex-wrap gap-5 mb-5">
          <h1 className="page-title font-orbitron text-[30px] font-black text-white">
            Upcoming <span className="text-purple-bright">Games</span>
          </h1>
          <span className="result-count text-sm text-muted">
            <strong className="text-white">
              {totalCount.toLocaleString()}
            </strong>{" "}
            games found
          </span>
        </div>
      </div>
      {/* Search and Sort */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center pt-5 px-4 md:px-12 pb-7">
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
          className="w-full sm:w-auto sort-select bg-surface border-[1.5px] border-border rounded-[10px] pt-3 pr-9 pb-3 pl-4 text-text font-outfit text-sm font-medium outline-none cursor-pointer appearance-none"
          style={button}
        >
          <option value="released">Release Date ↑ (Soonest first)</option>
          <option value="-released">Release Date ↓ (Latest first)</option>
          <option value="-added">Most Popular</option>
          <option value="name">A - Z</option>
        </select>
      </div>
      <div className=" pt-0 px-4 md:px-12 pb-7">
        {/* Grid Columns */}
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 mb-8">
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
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 mb-8">
                {games.map((game) => (
                  <UpcomingCard key={game.id} game={game} />
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
                    {Math.ceil(totalCount / 12)}
                  </strong>
                </span>
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={page >= Math.ceil(totalCount / 12)}
                  className="px-4 py-2 rounded-lg bg-surface border border-border text-muted text-sm font-semibold hover:border-purple hover:text-purple-bright transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Next →
                </button>
              </div>
            </>
          )}
      </div>
    </>
  );
}

export default UpcomingPage;
