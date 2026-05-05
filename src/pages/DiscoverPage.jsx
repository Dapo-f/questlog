import { useState, useEffect } from "react";
import { fetchGames } from "../services/rawgApi";
import { useNavigate } from "react-router-dom";
import GameCarousel from "../components/GameCarousel";
import HeroBanner from "../components/HeroBanner";
import SkeletonCardCarousel from "../components/SkeletonCardCarousel";
import SkeletonHeroBanner from "../components/SkeletonHeroBanner";
function DiscoverPage() {
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      const [t, tr, nr] = await Promise.all([
        fetchGames({
          ordering: "-added",
          platforms: "18,187,1,186,7",
          metacritic: "70,100",
        }),
        fetchGames({
          ordering: "-metacritic",
          platforms: "18,187,1,186,7",
          metacritic: "70,100",
        }),
        fetchGames({
          ordering: "-released",
          platforms: "18,187,1,186,7",
          metacritic: "70,100",
        }),
      ]);
      setTrending(t.results);
      setTopRated(tr.results);
      setNewReleases(nr.results);
      setLoading(false);
    };
    loadData();
  }, []);
  useEffect(() => {
    if (trending.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % 5);
    }, 5000);
    return () => clearInterval(interval);
  }, [trending]);
  if (loading) {
    return (
      <div>
        <SkeletonHeroBanner />
        <SkeletonCardCarousel />
        <SkeletonCardCarousel />
        <SkeletonCardCarousel />
      </div>
    );
  }
  return (
    <>
      <HeroBanner game={trending[currentIndex]} />
      <div className="flex justify-center gap-2 mt-3">
        {[0, 1, 2, 3, 4].map((i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? "w-6 bg-purple-bright" : "w-1.5 bg-border"}`}
          />
        ))}
      </div>
      <div className="px-12 py-10">
        <div className="section-head flex items-center gap-2">
          <div
            className="w-1 h-5  rounded-sm"
            style={{
              background: "linear-gradient(to bottom, #7C3AED, #9D5FF0)",
            }}
          ></div>
          <div className="section-title font-orbitron text-lg font-bold text-white">
            Browse by Platform
          </div>
        </div>
        <div className="platform-row flex gap-3 mt-12 flex-wrap">
          <div className="platform-card flex-1 min-w-32.5 bg-surface border border-border rounded-xl py-5 px-4 flex flex-col items-center gap-2 cursor-pointer transition duration-200 ease-in-out hover:border-purple hover:bg-[rgba(124,58,237,0.07)] hover:-translate-y-1" onClick={() => navigate("/browse?platform=4")}>
            <div className="platform-icon text-[28px]">🖥️</div>
            <div className="platform-nam text-[13px] font-semibold text-texte">PC</div>
            <div className="platform-count text-[11px] text-muted">280,000+ games</div>
          </div>
          <div className="platform-card flex-1 min-w-32.5 bg-surface border border-border rounded-xl py-5 px-4 flex flex-col items-center gap-2 cursor-pointer transition duration-200 ease-in-out hover:border-purple hover:bg-[rgba(124,58,237,0.07)] hover:-translate-y-1" onClick={() => navigate("/browse?platform=187")}>
            <div className="platform-icon text-[28px]">🎮</div>
            <div className="platform-name text-[13px] font-semibold text-text">PlayStation 5</div>
            <div className="platform-cou text-[11px] text-muted">4,200+ games</div>
          </div>
          <div className="platform-card flex-1 min-w-32.5 bg-surface border border-border rounded-xl py-5 px-4 flex flex-col items-center gap-2 cursor-pointer transition duration-200 ease-in-out hover:border-purple hover:bg-[rgba(124,58,237,0.07)] hover:-translate-y-1" onClick={() => navigate("/browse?platform=186")}>
            <div className="platform-icon text-[28px]">🟩</div>
            <div className="platform-name text-[13px] font-semibold text-text">Xbox Series</div>
            <div className="platform-cou text-[11px] text-muted">3,800+ games</div>
          </div>
          <div className="platform-card flex-1 min-w-32.5 bg-surface border border-border rounded-xl py-5 px-4 flex flex-col items-center gap-2 cursor-pointer transition duration-200 ease-in-out hover:border-purple hover:bg-[rgba(124,58,237,0.07)] hover:-translate-y-1" onClick={() => navigate("/browse?platform=7")}>
            <div className="platform-icon text-[28px]">🔴</div>
            <div className="platform-name text-[13px] font-semibold text-text">Nintendo Switch</div>
            <div className="platform-cou text-[11px] text-muted">6,500+ games</div>
          </div>
          <div className="platform-card flex-1 min-w-32.5 bg-surface border border-border rounded-xl py-5 px-4 flex flex-col items-center gap-2 cursor-pointer transition duration-200 ease-in-out hover:border-purple hover:bg-[rgba(124,58,237,0.07)] hover:-translate-y-1" onClick={() => navigate("/browse?platform=21")}>
            <div className="platform-icon text-[28px]">📱</div>
            <div className="platform-name text-[13px] font-semibold text-text">Mobile</div>
            <div className="platform-count text-[11px] text-muted">500,000+ games</div>
          </div>
        </div>
        <GameCarousel title="Trending" games={trending} />
        <GameCarousel title="Top Rated" games={topRated} />
        <GameCarousel title="New Releases" games={newReleases} />
      </div>
    </>
  );
}

export default DiscoverPage;
