import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { fetchGames } from "../services/rawgApi";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (query.length < 2) return;
    const timeOut = setTimeout(() => {
      const fetchSearch = async () => {
        const data = await fetchGames({ search: query });
        setResult(data.results);
      };
      fetchSearch();
    }, 400);
    return () => clearTimeout(timeOut);
  }, [query]);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setResult([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={searchRef} className="relative">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-surface2 border border-border rounded-lg px-4 py-2 text-sm text-white placeholder-muted outline-none flex-1 w-90 focus:border-purple hidden md:block"
        type="text"
        placeholder="Search games..."
        onKeyDown={(e) => {
          if (e.key === "Enter" && query.trim()) {
            setResult([]);
            setQuery("");
            navigate(`/browse?search=${query}`);
          }
        }}
      />
      {result.length > 0 && query.length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-surface2 border border-border rounded-xl overflow-hidden z-50">
          {result.slice(0, 6).map((game) => (
            <div
              key={game.id}
              className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-surface border-b border-border last:border-b-0"
              onClick={() => {setResult([]); setQuery(""); navigate(`/game/${game.id}`) }}
            >
              <img
                src={game.background_image}
                alt={game.name}
                className="w-10 h-10 rounded object-cover shrink-0"
              />
              <div className="flex flex-col">
                <span className="text-sm text-white font-medium truncate">
                  {game.name}
                </span>
                <span
                  className={`text-xs font-bold ${game.metacritic >= 75 ? "text-green-400" : game.metacritic >= 50 ? "text-orange-400" : "text-red-400"}`}
                >
                  {game.metacritic ? `MC: ${game.metacritic}` : "No Score"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
