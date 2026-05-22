import { useLibrary } from "../context/LibraryContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LibraryCard from "../components/LibraryCard";
function LibraryPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const { library } = useLibrary();
  const filteredGames = library
    .filter((game) => activeTab === "all" || game.status === activeTab)
    .filter((game) => game.name.toLowerCase().includes(search.toLowerCase()));
  const stats = {
    all: library.length,
    playing: library.filter((g) => g.status === "playing").length,
    completed: library.filter((g) => g.status === "completed").length,
    wishlist: library.filter((g) => g.status === "wishlist").length,
    dropped: library.filter((g) => g.status === "dropped").length,
  };
  const tabs = [
    { key: "all", label: "All Games", icon: "🎮" },
    { key: "playing", label: "Playing", icon: "▶️" },
    { key: "completed", label: "Completed", icon: "✅" },
    { key: "wishlist", label: "Wishlist", icon: "⭐" },
    { key: "dropped", label: "Dropped", icon: "🚫" },
  ];
  const style = {
    background: "linear-gradient(135deg, #7C3AED, #9D5FF0)",
  };
  return (
    <>
      <div className="page-header pt-8 px-6 md:pt-12 md:px-14 pb-9  relative overflow-hidden">
        <div
          className="absolute -top-15 -right-15 w-100 h-100 rounded-full"
          style={{
            background:
              "radial-gradient(circle,rgba(124,58,237,0.08),transparent 70%)",
            pointerEvents: "none",
          }}
        ></div>
        <div className="header-top flex items-end justify-between flex-wrap gap-5 mb-8">
          <div className="header-left">
            <div className="page-eyebrow text-[11px] tracking-[0.25em] uppercase text-purple-bright font-bold mb-2.5">
              📚 Personal Collection
            </div>
            <h1 className="page-title font-orbitron text-4xl font-black text-white">
              My <span className="text-purple-bright">Library</span>
            </h1>
            <p className="page-sub text-sm text-muted mt-1.5">
              Your saved games, all in one place.
            </p>
          </div>
          <div className="header-actions">
            <button
              className="font-bold text-sm text-white rounded-xl py-3 px-6 cursor-pointer transition-all duration-300 inline-flex items-center gap-2 hover:-translate-y-0.5 hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #7C3AED, #9D5FF0)",
                boxShadow: "0 0 20px rgba(124,58,237,0.35)",
              }}
              onClick={() => navigate("/browse")}
            >
              + Add Games
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
          {tabs.map(({ key, label, icon }) => (
            <div
              key={key}
              className="bg-surface border border-border rounded-2xl p-6 flex-1 relative overflow-hidden hover:border-purple/30 transition-colors"
            >
              <div className="text-2xl mb-1">{icon}</div>
              <div className="font-orbitron font-black text-3xl text-purple-bright mb-1">
                {stats[key]}
              </div>
              <div className="text-xs text-muted uppercase tracking-widest font-semibold">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="px-14 mb-6 flex justify-center md:justify-start">
        <input
          className="bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-white placeholder-muted outline-none focus:border-purple transition-colors w-80"
          placeholder="Search your library..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="status-tabs flex gap-0 py-0 px-4 md:px-14 border-b border-border mb-8 overflow-x-auto scrollbar-hide">
        {tabs.map(({ key, label, icon }) => (
          <div
            key={key}
            onClick={() => setActiveTab(key)}
            className={`py-3 px-5 text-sm font-semibold cursor-pointer border-b-2 whitespace-nowrap transition flex items-center gap-2 ${
              key === activeTab
                ? "text-purple-bright border-purple-bright"
                : "text-muted border-transparent hover:text-white"
            }`}
          >
            {icon} {label}
            <span
              className={`text-xs rounded-full py-px px-2 font-bold ${
                key === activeTab
                  ? "bg-purple/20 text-purple-bright"
                  : "bg-surface2 text-muted"
              }`}
            >
              {stats[key]}
            </span>
          </div>
        ))}
      </div>
      <div className="px-4 pb-4 md:px-14 md:pb-14">
        {filteredGames.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-5xl mb-4">🎮</div>
            <h3 className="font-orbitron text-lg text-white mb-2">
              No games here yet
            </h3>
            <p className="text-muted text-sm mb-6">
              {activeTab === "all"
                ? "Start adding games from the Browse page"
                : `No games marked as ${activeTab}`}
            </p>
            <button
              onClick={() => navigate("/browse")}
              className="font-bold text-sm text-white rounded-xl py-3 px-6 transition-all hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #7C3AED, #9D5FF0)",
              }}
            >
              + Add Games
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4  md:gap-5">
            {filteredGames.map((game) => (
              <LibraryCard key={game.id} game={game} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default LibraryPage;
