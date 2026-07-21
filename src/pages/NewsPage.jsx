import { useState, useEffect } from "react";
import { fetchGamingNews } from "../services/rawgApi";

function NewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null); // for the modal

  useEffect(() => {
    const fetchNews = async () => {
      const newsData = await fetchGamingNews();
      setNews(newsData);
      setLoading(false);
    };
    fetchNews();
  }, []); // Fetch news data from YouTube API

  function timeAgo(dateString) {
    const seconds = Math.floor((new Date() - new Date(dateString)) / 1000);
    const days = Math.floor(seconds / 86400);
    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    const hours = Math.floor(seconds / 3600);
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    return "Just now";
  }

  return (
    <>
      <div
        className="page-header pt-10 px-4 md:px-12 pb-7 border-b border-border"
        style={{
          background:
            "linear-gradient(to bottom, rgba(124,58,237,0.08), transparent)",
        }}
      >
        {/* Page Header */}
        <div className="page-header-top flex items-end justify-between flex-wrap gap-5 mb-5">
          <h1 className="page-title font-orbitron text-[30px] font-black text-white">
            Gaming <span className="text-purple-bright">News</span>
          </h1>
        </div>
      </div>

      <main className="px-4 md:px-12 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          <section className="flex-1">
            {news[1] && (
              <div
                className="relative rounded-2xl overflow-hidden cursor-pointer group"
                onClick={() => setSelectedVideo(news[1].id.videoId)}
              >
                <img
                  src={news[1].snippet.thumbnails.high.url}
                  alt={news[1].snippet.title}
                  className="w-full aspect-video object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-xs text-purple-bright font-semibold uppercase tracking-wider">
                    {news[1].snippet.channelTitle} ·{" "}
                    {timeAgo(news[1].snippet.publishedAt)}
                  </span>
                  <h2 className="font-orbitron text-2xl font-bold text-white mt-2">
                    {news[1].snippet.title}
                  </h2>
                </div>
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <div className="rounded-full text-white flex items-center justify-center text-6xl">
                    <ion-icon name="play-circle-outline"></ion-icon>
                  </div>
                </div>
              </div>
            )}
          </section>
          {selectedVideo && (
            <div
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6"
              onClick={() => setSelectedVideo(null)}
            >
              <div
                className="w-full max-w-4xl aspect-video rounded-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                  title="News Video"
                  allowFullScreen
                  allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
            </div>
          )}
          {/* SideBar */}
          <aside className="w-full lg:w-120 shrink-0">
            <div className="flex flex-col">
              {/* Heading */}
              <h3 className="font-orbitron text-purple-bright font-bold text-lg mb-4">
                Popular
              </h3>

              {/* Content */}
              <div className="flex flex-col gap-4">
                {news.slice(2, 7).map((item, i) => (
                  <div
                    key={item.id.videoId}
                    onClick={() => setSelectedVideo(item.id.videoId)}
                    className="flex gap-3 cursor-pointer group"
                  >
                    <span className="font-orbitron font-black text-2xl text-white/80">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="text-xs text-muted">
                        {timeAgo(item.snippet.publishedAt)}
                      </p>
                      <p className="text-sm text-white font-semibold group-hover:text-purple-bright transition-colors line-clamp-2 truncate max-w-80">
                        {item.snippet.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* <div>
        <h3>Latest News</h3>
        
      </div> */}
    </>
  );
}

export default NewsPage;
