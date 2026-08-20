import { useState, useEffect } from "react";
import { searchUsers, getRecentReviews, getProfilePictureUrl } from "../services/questlogApi";
import { useNavigate } from "react-router-dom";
import ReviewCard from "../components/ReviewCard";

function CommunityPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [recentReviews, setRecentReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);

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
    const timeOut = setTimeout(() => {
      async function loadData() {
        try {
          const data = await searchUsers(search);
          setUsers(data);
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

  return (
  <div className="min-h-screen bg-bg text-text font-outfit px-4 md:px-12 py-24">
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
      
      {/* LEFT COLUMN: ACTIVITY FEED (65% width on desktop) */}
      <div className="flex-1 lg:max-w-[65%]">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-1 h-5 rounded-sm bg-purple-bright" />
          <h2 className="text-fluid-md font-orbitron font-bold text-white">Recent Activity</h2>
        </div>

        {reviewsLoading ? (
          <p className="text-muted text-sm animate-pulse">Loading activity...</p>
        ) : (
          <div className="space-y-6">
            {recentReviews.map((review) => (
              <div key={review.id} className="group bg-surface/30 p-4 rounded-xl border border-border/40 hover:border-purple/40 transition-all duration-300">
                <p className="text-xs text-muted mb-2">
                  Reviewed by{" "}
                  <span
                    className="text-purple-bright font-medium cursor-pointer hover:underline"
                    onClick={() => navigate(`/profile/${review.user.username}`)}
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
          <h2 className="text-fluid-md font-orbitron font-bold text-white">Find Users</h2>
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
          <p className="text-muted text-sm animate-pulse">Searching platform...</p>
        ) : (
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
              <p className="col-span-2 text-center text-xs text-muted py-4">No users found</p>
            )}
          </div>
        )}
      </div>

    </div>
  </div>
);

}

export default CommunityPage;