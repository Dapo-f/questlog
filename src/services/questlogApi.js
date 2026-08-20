import axios from "axios";

// step 1: Create an Axios instance using axios.create() with a baseURL
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

api.interceptors.request.use(
  (config) => {
    // 1. Modify your request configuration here (e.g., adding headers)
    const token = localStorage.getItem("questlog-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // CRITICAL: You must always return the config object
    return config;
  },
  (error) => {
    // 2. Do something with the request error (e.g., failed to establish connection metadata)
    return Promise.reject(error);
  },
);

export async function register(userData = {}) {
  try {
    const response = await api.post("/register", userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
}

export async function login(identifier, password) {
  try {
    const response = await api.post("/login", { identifier, password });
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}

export async function getCurrentUser() {
  try {
    const response = await api.get("/user");
    return response.data;
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw error;
  }
}

export async function getUserProfile(username) {
  // GET /users/{username}
  try {
    const response = await api.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching current user profile:", error);
    throw error;
  }
}

export async function getUserLibrary(username) {
  // GET /users/{username}/library
  try {
    const response = await api.get(`/users/${username}/library`);
    return response.data;
  } catch (error) {
    console.error("Error fetching current user library:", error);
    throw error;
  }
}

export async function getUserReviews(username) {
  // GET /users/{username}/reviews
  try {
    const response = await api.get(`/users/${username}/reviews`);
    return response.data;
  } catch (error) {
    console.error("Error fetching current user reviews:", error);
    throw error;
  }
}

export async function getFollowers(id) {
  try {
    const response = await api.get(`/users/${id}/followers`);
    return response.data;
  } catch (error) {
    console.error("Error fetching followers:", error);
    throw error;
  }
}

export async function getFollowing(id) {
  try {
    const response = await api.get(`/users/${id}/following`);
    return response.data;
  } catch (error) {
    console.error("Error fetching following:", error);
    throw error;
  }
}

export async function followUser(id) {
  try {
    const response = await api.post(`/users/${id}/follow`);
    return response.data;
  } catch (error) {
    console.error("Error following user:", error);
    throw error;
  }
}

export async function unfollowUser(id) {
  try {
    const response = await api.delete(`/users/${id}/unfollow`);
    return response.data;
  } catch (error) {
    console.error("Error unfollowing user:", error);
    throw error;
  }
}

export async function getMyLibrary() {
  // GET /library
  try {
    const response = await api.get("/library");
    return response.data;
  } catch (error) {
    console.error("Error fetching user library:", error);
    throw error;
  }
}

export async function getGameReviews(rawgId) {
  try {
    const response = await api.get(`/reviews/${rawgId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching game reviews:", error);
    throw error;
  }
}

export async function createReview(rawg_id, rating, body) {
  try {
    const response = await api.post('/reviews', { rawg_id, rating, body });
    return response.data;
  } catch (error) {
    console.error("Error creating review:", error);
    throw error;
  }
}

export async function searchUsers(query = "") {
  try {
    const response = await api.get("/users/search", { params: { q: query } });
    return response.data;
  } catch (error) {
    console.error("Error searching users:", error);
    throw error;
  }
}

export async function addToLibrary(rawg_id, status = "wishlist") {
  // POST /library
  try {
    const response = await api.post("/library", { rawg_id, status });
    return response.data;
  } catch (error) {
    console.error("Error adding game to library:", error);
    throw error;
  }
}

export async function updateLibraryEntry(rawg_id, data) {
  // PUT /library/{rawg_id}  -- data might be { status } or { status, hours_played, etc }
  try {
    const response = await api.put(`/library/${rawg_id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating game:", error);
    throw error;
  }
}

export async function removeFromLibrary(rawg_id) {
  // DELETE /library/{rawg_id}
  try {
    const response = await api.delete(`/library/${rawg_id}`);
    return response.data;
  } catch (error) {
    console.error("Error removing game:", error);
    throw error;
  }
}

export async function getRecentReviews() {
  try {
    const response = await api.get("/reviews/recent");
    return response.data;
  } catch (error) {
    console.error("Error fetching recent reviews:", error);
    throw error;
  }
}

export function getProfilePictureUrl(path) {
  if (!path) return null;
  return `http://127.0.0.1:8000/storage/${path}`;
}

export async function updateUsername(username) {
  // PUT /users/profile/username, body: { username }
  try {
    const response = await api.put("/users/profile/username", { username });
    return response.data;
  } catch (error) {
    console.error("Error updating username:", error);
    throw error;
  }
}

export async function updateProfilePicture(file) {
  // needs FormData, key 'profile_picture', POST /users/profile/picture
  const formData = new FormData();
  formData.append("profile_picture", file);
  try {
    const response = await api.post("/users/profile/picture", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating profile picture:", error);
    throw error;
  }
}

export async function removeProfilePicture() {
  // DELETE /users/profile/picture
  try {
    const response = await api.delete("/users/profile/picture");
    return response.data;
  } catch (error) {
    console.error("Error removing profile picture:", error);
    throw error;
  }
}

export async function logout() {
  try {
    const response = await api.post("/logout");
    return response.data;
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
}

export async function verifyEmail(email, code) {
  try {
    const response = await api.post("/verify-email", { email, code });
    return response.data;
  } catch (error) {
    console.error("Error verifying email:", error);
    throw error;
  }
}

export async function resendCode(email) {
  try {
    const response = await api.post("/resend-code", { email });
    return response.data;
  } catch (error) {
    console.error("Error resending code:", error);
    throw error;
  }
}

export async function forgotPassword(email) {
  try {
    const response = await api.post("/forgot-password", { email });
    return response.data;
  } catch (error) {
    console.error("Error forgetting password:", error);
    throw error;
  }
}

export async function resetPassword(
  email,
  token,
  password,
  password_confirmation,
) {
  try {
    const response = await api.post("/reset-password", {
      email,
      token,
      password,
      password_confirmation,
    });
    return response.data;
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
}

export default api;
