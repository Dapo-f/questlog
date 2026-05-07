
import axios from "axios";

const BASE_URL = "https://api.rawg.io/api";
const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

async function fetchGames(params = {}) {
  try {
    const response = await axios.get(`${BASE_URL}/games`, {
      params: { key: API_KEY, page_size: 20, ...params },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching games:", error);
    throw error;
  }
}

async function fetchGameDetail(id) {
  try {
    const response = await axios.get(`${BASE_URL}/games/${id}`, 
      { params: { key: API_KEY } },
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching game detail:", error);
    throw error;
  }
}

async function fetchGameTrailers(id) {
    try {
        const response =  await axios.get(`${BASE_URL}/games/${id}/movies`, { params: { key: API_KEY } })
        return response.data
    } catch (error) {
        console.error("Error fetching game trailer:", error);
    throw error;
    }
}
async function fetchSimilarGames(id) {
    try {
        const response =  await axios.get(`${BASE_URL}/games/${id}/game-series`, { params: { key: API_KEY } })
        return response.data
    } catch (error) {
        console.error("Error fetching Similar games:", error);
    throw error;
    }
}

async function fetchGameScreenshots(id) {
  try {
    const response = await axios.get(`${BASE_URL}/games/${id}/screenshots`, {
      params: { key: API_KEY }
    })
    return response.data
  } catch (error) {
    console.error("Error fetching screenshots:", error)
    throw error
  }
}

export async function fetchYouTubeTrailer(gameName) {
  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        key: import.meta.env.VITE_YOUTUBE_API_KEY,
        q: `${gameName} official trailer`,
        part: 'snippet',
        type: 'video',
        maxResults: 1,
      }
    })
    const video = response.data.items[0]
    return video ? video.id.videoId : null
  } catch (error) {
    console.error("YouTube fetch error:", error)
    return null
  }
}

export { fetchGames, fetchGameDetail, fetchGameTrailers, fetchSimilarGames, fetchGameScreenshots }