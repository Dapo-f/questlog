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
  const currentYear = new Date().getFullYear();
  const today = new Date().toISOString().split("T")[0];
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      const [t, tr, nr] = await Promise.all([
        fetchGames({
          ordering: "-added",
          platforms: "18,187,1,186,7",
          dates: `${currentYear}-01-01,${today}`,
        }),
        fetchGames({
          ordering: "-metacritic",
          platforms: "18,187,1,186,7",
          metacritic: "70,100",
        }),
        fetchGames({
          ordering: "-released",
          platforms: "18,187,1,186,7",
          dates: `${currentYear}-01-01,${today}`,
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
        <div className="px-4 py-6 md:px-12 md:py-10">
        <SkeletonCardCarousel />
        <SkeletonCardCarousel />
        <SkeletonCardCarousel />
        </div>
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
      <div className="pt-16 px-4 md:px-12 py-6 md:py-10">
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
          <div
            className="platform-card flex-1 min-w-32.5 bg-surface border border-border rounded-xl py-5 px-4 flex flex-col items-center gap-2 cursor-pointer transition duration-200 ease-in-out hover:border-purple hover:bg-[rgba(124,58,237,0.07)] hover:-translate-y-1"
            onClick={() => navigate("/browse?platform=4")}
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 fill-white"
            >
              <title>Steam</title>
              <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.253 0-2.265-1.014-2.265-2.265z" />
            </svg>
            <div className="platform-nam text-[13px] font-semibold text-text">
              PC
            </div>
            <div className="platform-count text-[11px] text-muted">
              280,000+ games
            </div>
          </div>
          <div
            className="platform-card flex-1 min-w-32.5 bg-surface border border-border rounded-xl py-5 px-4 flex flex-col items-center gap-2 cursor-pointer transition duration-200 ease-in-out hover:border-purple hover:bg-[rgba(124,58,237,0.07)] hover:-translate-y-1"
            onClick={() => navigate("/browse?platform=187")}
          >
            <div className="platform-icon">
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 fill-white"
              >
                <title>PlayStation</title>
                <path d="M8.984 2.596v17.547l3.915 1.261V6.688c0-.69.304-1.151.794-.991.636.18.76.814.76 1.505v5.875c2.441 1.193 4.362-.002 4.362-3.152 0-3.237-1.126-4.675-4.438-5.827-1.307-.448-3.728-1.186-5.39-1.502zm4.656 16.241l6.296-2.275c.715-.258.826-.625.246-.818-.586-.192-1.637-.139-2.357.123l-4.205 1.5V14.98l.24-.085s1.201-.42 2.913-.615c1.696-.18 3.785.03 5.437.661 1.848.601 2.04 1.472 1.576 2.072-.465.6-1.622 1.036-1.622 1.036l-8.544 3.107V18.86zM1.807 18.6c-1.9-.545-2.214-1.668-1.352-2.32.801-.586 2.16-1.052 2.16-1.052l5.615-2.013v2.313L4.205 17c-.705.271-.825.632-.239.826.586.195 1.637.15 2.343-.12L8.247 17v2.074c-.12.03-.256.044-.39.073-1.939.331-3.996.196-6.038-.479z" />
              </svg>
            </div>
            <div className="platform-name text-[13px] font-semibold text-text">
              PlayStation 5
            </div>
            <div className="platform-cou text-[11px] text-muted">
              4,200+ games
            </div>
          </div>
          <div
            className="platform-card flex-1 min-w-32.5 bg-surface border border-border rounded-xl py-5 px-4 flex flex-col items-center gap-2 cursor-pointer transition duration-200 ease-in-out hover:border-purple hover:bg-[rgba(124,58,237,0.07)] hover:-translate-y-1"
            onClick={() => navigate("/browse?platform=186")}
          >
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 fill-white"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <g>
                  {" "}
                  <path fill="none" d="M0 0h24v24H0z"></path>{" "}
                  <path
                    fill-rule="nonzero"
                    d="M5.418 19.527A9.956 9.956 0 0 0 12 22a9.967 9.967 0 0 0 6.585-2.473c1.564-1.593-3.597-7.257-6.585-9.514-2.985 2.257-8.15 7.921-6.582 9.514zm9.3-12.005c2.084 2.468 6.237 8.595 5.064 10.76A9.952 9.952 0 0 0 22 12.003a9.958 9.958 0 0 0-2.975-7.113s-.022-.018-.068-.035a.686.686 0 0 0-.235-.038c-.493 0-1.654.362-4.004 2.705zM5.045 4.856c-.048.017-.068.034-.072.035A9.963 9.963 0 0 0 2 12.003c0 2.379.832 4.561 2.218 6.278C3.05 16.11 7.2 9.988 9.284 7.523 6.934 5.178 5.771 4.818 5.28 4.818a.604.604 0 0 0-.234.039v-.002zM12 4.959S9.546 3.523 7.63 3.455c-.753-.027-1.212.246-1.268.282C8.149 2.538 10.049 2 11.987 2H12c1.945 0 3.838.538 5.638 1.737-.056-.038-.512-.31-1.266-.282-1.917.068-4.372 1.5-4.372 1.5v.004z"
                  ></path>{" "}
                </g>{" "}
              </g>
            </svg>
            <div className="platform-name text-[13px] font-semibold text-text">
              Xbox Series
            </div>
            <div className="platform-cou text-[11px] text-muted">
              3,800+ games
            </div>
          </div>
          <div
            className="platform-card flex-1 min-w-32.5 bg-surface border border-border rounded-xl py-5 px-4 flex flex-col items-center gap-2 cursor-pointer transition duration-200 ease-in-out hover:border-purple hover:bg-[rgba(124,58,237,0.07)] hover:-translate-y-1"
            onClick={() => navigate("/browse?platform=7")}
          >
            <svg
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 fill-white"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path d="M18.901 32h4.901c4.5 0 8.198-3.698 8.198-8.198v-15.604c0-4.5-3.698-8.198-8.198-8.198h-5c-0.099 0-0.203 0.099-0.203 0.198v31.604c0 0.099 0.099 0.198 0.302 0.198zM25 14.401c1.802 0 3.198 1.5 3.198 3.198 0 1.802-1.5 3.198-3.198 3.198-1.802 0-3.198-1.396-3.198-3.198-0.104-1.797 1.396-3.198 3.198-3.198zM15.198 0h-7c-4.5 0-8.198 3.698-8.198 8.198v15.604c0 4.5 3.698 8.198 8.198 8.198h7c0.099 0 0.203-0.099 0.203-0.198v-31.604c0-0.099-0.099-0.198-0.203-0.198zM12.901 29.401h-4.703c-3.099 0-5.599-2.5-5.599-5.599v-15.604c0-3.099 2.5-5.599 5.599-5.599h4.604zM5 9.599c0 1.698 1.302 3 3 3s3-1.302 3-3c0-1.698-1.302-3-3-3s-3 1.302-3 3z"></path>{" "}
              </g>
            </svg>
            <div className="platform-name text-[13px] font-semibold text-text">
              Nintendo Switch
            </div>
            <div className="platform-cou text-[11px] text-muted">
              6,500+ games
            </div>
          </div>
          <div
            className="platform-card flex-1 min-w-32.5 bg-surface border border-border rounded-xl py-5 px-4 flex flex-col items-center gap-2 cursor-pointer transition duration-200 ease-in-out hover:border-purple hover:bg-[rgba(124,58,237,0.07)] hover:-translate-y-1"
            onClick={() => navigate("/browse?platform=21")}
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 fill-white"
            >
              <title>Android</title>
              <path d="M18.4395 5.5586c-.675 1.1664-1.352 2.3318-2.0274 3.498-.0366-.0155-.0742-.0286-.1113-.043-1.8249-.6957-3.484-.8-4.42-.787-1.8551.0185-3.3544.4643-4.2597.8203-.084-.1494-1.7526-3.021-2.0215-3.4864a1.1451 1.1451 0 0 0-.1406-.1914c-.3312-.364-.9054-.4859-1.379-.203-.475.282-.7136.9361-.3886 1.5019 1.9466 3.3696-.0966-.2158 1.9473 3.3593.0172.031-.4946.2642-1.3926 1.0177C2.8987 12.176.452 14.772 0 18.9902h24c-.119-1.1108-.3686-2.099-.7461-3.0683-.7438-1.9118-1.8435-3.2928-2.7402-4.1836a12.1048 12.1048 0 0 0-2.1309-1.6875c.6594-1.122 1.312-2.2559 1.9649-3.3848.2077-.3615.1886-.7956-.0079-1.1191a1.1001 1.1001 0 0 0-.8515-.5332c-.5225-.0536-.9392.3128-1.0488.5449zm-.0391 8.461c.3944.5926.324 1.3306-.1563 1.6503-.4799.3197-1.188.0985-1.582-.4941-.3944-.5927-.324-1.3307.1563-1.6504.4727-.315 1.1812-.1086 1.582.4941zM7.207 13.5273c.4803.3197.5506 1.0577.1563 1.6504-.394.5926-1.1038.8138-1.584.4941-.48-.3197-.5503-1.0577-.1563-1.6504.4008-.6021 1.1087-.8106 1.584-.4941z" />
            </svg>
            <div className="platform-name text-[13px] font-semibold text-text">
              Mobile
            </div>
            <div className="platform-count text-[11px] text-muted">
              500,000+ games
            </div>
          </div>
        </div>
        <GameCarousel title="Trending" games={trending} ordering="-added" />
        <GameCarousel
          title="Top Rated"
          games={topRated}
          ordering="-metacritic"
        />
        <GameCarousel
          title="New Releases"
          games={newReleases}
          ordering="-released"
        />
      </div>
    </>
  );
}

export default DiscoverPage;
