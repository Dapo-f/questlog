import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLibrary } from "../context/LibraryContext";
import { useAuth } from "../context/AuthContext";
import {
  getUserProfile,
  getUserLibrary,
  getUserReviews,
  getFollowers,
  getFollowing,
  followUser,
  unfollowUser,
  getProfilePictureUrl,
  updateUsername,
  updateProfilePicture,
  removeProfilePicture,
} from "../services/questlogApi";
import ProfileGameCard from "../components/ProfileGameCard";
import ReviewCard from "../components/ReviewCard";
import ProfilePageSkeleton from "../components/ProfilePageSkeleton";

function ProfilePage() {
  const { username } = useParams();
  const navigate = useNavigate();
  const { user: currentUser, updateUser } = useAuth();
  const { showToast } = useLibrary();
  const [profile, setProfile] = useState(null);
  const [library, setLibrary] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [editing, setEditing] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  const isOwnProfile = currentUser?.username === username;
  const isFollowing = followers.some((f) => f.follower_id === currentUser?.id);

  useEffect(() => {
    async function loadData() {
      try {
        const [profileData, libraryData, reviewsData] = await Promise.all([
          getUserProfile(username),
          getUserLibrary(username),
          getUserReviews(username),
        ]);
        setProfile(profileData);
        setLibrary(libraryData);
        setReviews(reviewsData);

        const followersData = await getFollowers(profileData.id);
        const followingData = await getFollowing(profileData.id);
        setFollowers(followersData);
        setFollowing(followingData);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [username]);

  function handleFollow() {
    followUser(profile.id)
      .then(() => {
        showToast(`Started following ${profile.username}`);
        setFollowers((prev) => [...prev, { follower_id: currentUser.id }]);
      })
      .catch((err) => {
        console.error("Error following user:", err);
      });
  }

  function handleUnfollow() {
    unfollowUser(profile.id)
      .then(() => {
        showToast(`Unfollowed ${profile.username}`);
        setFollowers((prev) =>
          prev.filter((f) => f.follower_id !== currentUser.id),
        );
      })
      .catch((err) => {
        console.error("Error unfollowing user:", err);
      });
  }

  function handleSaveAll() {
    const promises = [];

    if (newUsername && newUsername !== profile.username) {
      promises.push(
        updateUsername(newUsername).then((updatedProfile) => {
          setProfile((prev) => ({
            ...prev,
            username: updatedProfile.username,
          }));
          updateUser({ username: updatedProfile.username });
        }),
      );
    }

    if (selectedFile) {
      promises.push(
        updateProfilePicture(selectedFile).then((updatedProfile) => {
          setProfile((prev) => ({
            ...prev,
            profile_picture: updatedProfile.profile_picture,
          }));
          updateUser({ profile_picture: updatedProfile.profile_picture });
        }),
      );
    }

    if (promises.length === 0) {
      setEditing(false);
      return;
    }

    Promise.all(promises)
      .then(() => {
        showToast("Profile updated successfully!");
        setEditing(false);
        if (newUsername && newUsername !== profile.username) {
          navigate(`/profile/${newUsername}`, { replace: true });
        }
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
        showToast("Failed to update profile");
      });
  }

  function handleRemovePicture() {
    // call removeProfilePicture, update profile state, show toast
    removeProfilePicture()
      .then((updatedProfile) => {
        setProfile(updatedProfile);
        showToast("Profile picture removed successfully!");
      })
      .catch((err) => {
        console.error("Error removing profile picture:", err);
        showToast("Failed to remove profile picture");
      });
  }

  function handleFileSelect(e) {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  }

  if (loading) {
    return <ProfilePageSkeleton />;
  }

  return (
    <div className="min-h-screen bg-bg text-text font-outfit px-4 md:px-8 py-12 max-w-6xl mx-auto animate-fadeUp">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-white hover:text-purple-bright text-sm mb-4 transition-colors"
      >
        ← Back
      </button>
      {/* ─── GAMER CARD HEADER PANEL ─── */}
      <div className="relative bg-surface2 border border-border rounded-2xl overflow-hidden p-6 md:p-8 mb-12 shadow-2xl">
        {/* Subtle decorative purple glow overlay */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple/10 blur-[100px] pointer-events-none rounded-full" />

        {/* Futuristic Top Trim Line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-line" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          {/* Avatar & Core Identity */}
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="relative group">
              {/* Animated Ring Accent */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple via-purple-mid to-purple-bright rounded-full blur opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />

              <div className="relative flex items-center justify-center h-28 w-28 rounded-full bg-surface border-2 border-border text-purple-bright font-orbitron text-fluid-lg font-bold uppercase overflow-hidden shadow-inner">
                {profile?.profile_picture ? (
                  <img
                    src={getProfilePictureUrl(profile.profile_picture)}
                    alt={profile.username}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  profile?.username?.charAt(0) || "?"
                )}
              </div>
            </div>

            <div>
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <h1 className="text-fluid-xl font-bold font-orbitron tracking-tight text-white uppercase bg-clip-text">
                  {profile.username}
                </h1>
                {isOwnProfile && (
                  <span className="text-[10px] uppercase font-orbitron tracking-widest px-2 py-0.5 rounded border border-purple-bright/40 text-purple-bright bg-purple/10">
                    Host
                  </span>
                )}
              </div>
              <p className="text-muted text-xs font-outfit uppercase tracking-wider mt-1.5">
                Player since{" "}
                {new Date(profile.created_at).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                })}
              </p>
            </div>
          </div>

          {/* Social Stats Counters */}
          <div className="flex gap-4 bg-surface/60 border border-border/60 backdrop-blur-md px-6 py-4 rounded-xl text-center shadow-md">
            <div>
              <span className="block text-fluid-sm font-bold font-orbitron text-purple-bright">
                {followers.length}
              </span>
              <span className="text-[11px] text-muted uppercase font-outfit tracking-wider">
                Followers
              </span>
            </div>
            <div className="w-px bg-border my-1" />
            <div>
              <span className="block text-fluid-sm font-bold font-orbitron text-purple-bright">
                {following.length}
              </span>
              <span className="text-[11px] text-muted uppercase font-outfit tracking-wider">
                Following
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Action Bar */}
        <div className="mt-6 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Quick Metrics Bar instead of Bio */}
          <div className="flex gap-6 text-xs font-outfit uppercase tracking-widest text-muted">
            <div>
              Games:{" "}
              <span className="text-text font-bold">{library.length}</span>
            </div>
            <div>
              Reviews:{" "}
              <span className="text-text font-bold">{reviews.length}</span>
            </div>
          </div>

          {!isOwnProfile && currentUser && (
            <div className="w-full sm:w-auto">
              {isFollowing ? (
                <button
                  onClick={handleUnfollow}
                  className="w-full sm:w-auto bg-surface2 border border-purple-mid text-purple-bright px-6 py-2 rounded-lg font-orbitron font-semibold text-xs tracking-wider uppercase hover:bg-purple/10 transition-all duration-300"
                >
                  Unfollow
                </button>
              ) : (
                <button
                  onClick={handleFollow}
                  className="w-full sm:w-auto bg-purple text-white px-6 py-2 rounded-lg font-outfit font-semibold text-xs tracking-wider uppercase hover:bg-purple-mid transition-all duration-300 shadow-[0_0_15px_rgba(124,58,237,0.4)]"
                >
                  Follow Player
                </button>
              )}
            </div>
          )}
          {isOwnProfile && (
            <div className="w-full sm:w-auto flex gap-2 justify-center md:justify-end">
              <button
                onClick={() => setEditing(true)}
                className="bg-surface2 border border-purple-mid text-purple-bright px-6 py-2 rounded-lg font-orbitron font-semibold text-xs tracking-wider uppercase hover:bg-purple/10 transition-all duration-300"
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>
        {/* Edit Profile Form */}
        {/* {editing && isOwnProfile && (
          
        )} */}
      </div>

      {/* ─── MAIN CONTENT SPLIT GRID ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Side Container: Library Rack (Takes 2 columns) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <h2 className="text-fluid-sm font-bold font-orbitron uppercase tracking-wider text-purple-bright">
              Active Library
            </h2>
            <span className="text-xs font-outfit text-muted bg-surface px-2 py-0.5 border border-border rounded">
              {library.length} Total
            </span>
          </div>

          {library.length === 0 ? (
            <div className="bg-surface rounded-xl p-8 border border-border border-dashed text-center text-muted text-sm font-outfit">
              NO GAMES LOGGED
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {library.map((entry) => (
                <div
                  key={entry.id}
                  className="transition-transform duration-300 hover:-translate-y-1"
                >
                  <ProfileGameCard rawgId={entry.rawg_id} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Side Container: Intel/Reviews Feed (Takes 1 column) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <h2 className="text-fluid-sm font-bold font-orbitron uppercase tracking-wider text-purple-bright">
              Review Logs
            </h2>
            <span className="text-xs font-outfit text-muted bg-surface px-2 py-0.5 border border-border rounded">
              {reviews.length} Logs
            </span>
          </div>

          {reviews.length === 0 ? (
            <div className="bg-surface rounded-xl p-8 border border-border border-dashed text-center text-muted text-sm font-outfit">
              NO REVIEWS SUBMITTED
            </div>
          ) : (
            <div className="space-y-4 max-h-[70vh] overflow-y-auto sidebar-scroll pr-1">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          )}
        </div>
      </div>

      {editing && isOwnProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-surface2 border border-border rounded-2xl p-6 w-full max-w-md relative">
            <button
              onClick={() => setEditing(false)}
              className="absolute top-4 right-4 text-muted hover:text-white transition-colors"
            >
              ✕
            </button>
            <h3 className="text-fluid-sm font-bold font-orbitron uppercase text-purple-bright mb-6">
              Edit Profile
            </h3>

            {/* Centered large preview */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative h-28 w-28 rounded-full bg-surface border-2 border-border overflow-hidden mb-3">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                ) : profile?.profile_picture ? (
                  <img
                    src={getProfilePictureUrl(profile.profile_picture)}
                    alt={profile.username}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-purple-bright font-orbitron text-fluid-md font-bold uppercase">
                    {profile?.username?.charAt(0) || "?"}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <label className="cursor-pointer bg-surface border border-border text-text px-4 py-1.5 rounded-lg text-xs font-semibold uppercase hover:border-purple transition-colors">
                  Choose Photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>
                {profile.profile_picture && (
                  <button
                    onClick={handleRemovePicture}
                    className="bg-surface border border-red-400/40 text-red-400 px-4 py-1.5 rounded-lg text-xs font-semibold uppercase hover:bg-red-400/10 transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-outfit uppercase tracking-wider text-muted mb-2">
                Username
              </label>
              <input
                type="text"
                defaultValue={profile.username}
                onChange={(e) => setNewUsername(e.target.value)}
                className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-text outline-none focus:border-purple"
                placeholder="New username"
              />
            </div>

            <button
              onClick={handleSaveAll}
              className="w-full bg-purple text-white px-4 py-2.5 rounded-lg text-sm font-semibold uppercase hover:bg-purple-mid transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
