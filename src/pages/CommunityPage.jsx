import { useState, useEffect } from "react";
import {
  searchUsers,
  getRecentReviews,
  getProfilePictureUrl,
} from "../services/questlogApi";
import { fetchGamingNews } from "../services/rawgApi";
import { useNavigate } from "react-router-dom";
import ReviewCard from "../components/ReviewCard";

function CommunityPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [news, setNews] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [recentReviews, setRecentReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    async function loadRecentReviews() {
      try {
        const data = await getRecentReviews();
        setRecentReviews(data);
      } catch (error) {
        console.error("Error fetching recent reviews:", error);
      } finally {
        setReviewsLoading(false);
      }
    }
    loadRecentReviews();
  }, []);

  useEffect(() => {
    async function loadNews() {
      try {
        const data = await fetchGamingNews(8);
        setNews(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setNewsLoading(false);
      }
    }
    loadNews();
  }, []);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      async function loadData() {
        setLoading(true);
        try {
          const data = await searchUsers(search, 1);
          setUsers(data.users);
          setHasMore(data.hasMore);
          setPage(1);
        } catch (error) {
          console.error("Error fetching users:", error);
        } finally {
          setLoading(false);
        }
      }
      loadData();
    }, 400);
    return () => clearTimeout(timeOut);
  }, [search]);

  function handleLoadMore() {
    const nextPage = page + 1;
    setLoadingMore(true);
    searchUsers(search, nextPage)
      .then((data) => {
        setUsers((prev) => [...prev, ...data.users]);
        setHasMore(data.hasMore);
        setPage(nextPage);
      })
      .catch((error) => {
        console.error("Error loading more users:", error);
      })
      .finally(() => {
        setLoadingMore(false);
      });
  }

  return (
    <div className="min-h-screen bg-bg text-text font-outfit px-4 md:px-12 py-24">
      <div className="max-w-7xl mx-auto">
        {/* LATEST NEWS — full width band at top */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1 h-5 rounded-sm bg-purple-bright" />
            <h2 className="text-fluid-md font-orbitron font-bold text-white">
              Latest News
            </h2>
          </div>

          {newsLoading ? (
            <p className="text-muted text-sm animate-pulse">Loading news...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {news.map((item) => (
                <div
                  key={item.id.videoId}
                  onClick={() => setSelectedVideo(item.id.videoId)}
                  // target="_blank"
                  rel="noreferrer"
                  className="bg-surface2 border border-border rounded-xl overflow-hidden hover:border-purple-bright/30 transition-colors group"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={item.snippet.thumbnails.medium.url}
                      alt={item.snippet.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-white text-sm font-semibold line-clamp-2 group-hover:text-purple-bright transition-colors">
                      {item.snippet.title}
                    </p>
                    <p className="text-muted text-xs mt-1">
                      {item.snippet.channelTitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

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

        {/* ACTIVITY FEED + FIND USERS — two-column row below */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* LEFT COLUMN: ACTIVITY FEED (65% width on desktop) */}
          <div className="flex-1 lg:max-w-[65%]">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-5 rounded-sm bg-purple-bright" />
              <h2 className="text-fluid-md font-orbitron font-bold text-white">
                Recent Activity
              </h2>
            </div>

            {reviewsLoading ? (
              <p className="text-muted text-sm animate-pulse">
                Loading activity...
              </p>
            ) : (
              <div className="space-y-6">
                {recentReviews.map((review) => (
                  <div
                    key={review.id}
                    className="group bg-surface/30 p-4 rounded-xl border border-border/40 hover:border-purple/40 transition-all duration-300"
                  >
                    <p className="text-xs text-muted mb-2">
                      Reviewed by{" "}
                      <span
                        className="text-purple-bright font-medium cursor-pointer hover:underline"
                        onClick={() =>
                          navigate(`/profile/${review.user.username}`)
                        }
                      >
                        @{review.user.username}
                      </span>
                    </p>
                    <ReviewCard review={review} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: USER DISCOVERY SIDEBAR (35% width on desktop) */}
          <div className="w-full lg:w-[35%] bg-surface/20 p-6 rounded-2xl border border-border/50 h-fit lg:sticky lg:top-28">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 rounded-sm bg-purple" />
              <h2 className="text-fluid-md font-orbitron font-bold text-white">
                Find Users
              </h2>
            </div>

            <div className="relative mb-6">
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setLoading(true);
                }}
                className="bg-surface2 border border-border rounded-xl px-4 py-3 text-sm text-white placeholder-muted outline-none w-full focus:border-purple transition-all"
                type="text"
                placeholder="Type a username..."
              />
            </div>

            {loading ? (
              <p className="text-muted text-sm animate-pulse">
                Searching platform...
              </p>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4">
                  {users.map((user) => (
                    <div
                      key={user.id}
                      onClick={() => navigate(`/profile/${user?.username}`)}
                      className="flex flex-col items-center text-center p-3 rounded-xl bg-surface3/40 border border-transparent hover:border-purple-bright/30 hover:bg-surface2/30 cursor-pointer transition-all duration-200"
                    >
                      <div className="relative flex items-center justify-center h-14 w-14 rounded-full bg-surface border-2 border-border/80 text-purple-bright font-orbitron text-md font-bold uppercase overflow-hidden shadow-md">
                        {user?.profile_picture ? (
                          <img
                            src={getProfilePictureUrl(user.profile_picture)}
                            alt={user.username}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          user?.username?.charAt(0) || "?"
                        )}
                      </div>
                      <h3 className="mt-2 text-xs font-semibold text-text truncate w-full">
                        {user.username}
                      </h3>
                    </div>
                  ))}
                  {users.length === 0 && (
                    <p className="col-span-2 text-center text-xs text-muted py-4">
                      No users found
                    </p>
                  )}
                </div>

                {hasMore && (
                  <div className="flex justify-center mt-6">
                    <button
                      onClick={handleLoadMore}
                      disabled={loadingMore}
                      className={`bg-surface2 border border-border text-text px-6 py-2 rounded-lg text-sm font-semibold hover:border-purple transition-colors ${loadingMore ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      {loadingMore ? "Loading..." : "Load More"}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityPage;
