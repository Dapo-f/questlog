import axios from "axios";

// step 1: Create an Axios instance using axios.create() with a baseURL
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api"
});

api.interceptors.request.use(
  (config) => {
    // 1. Modify your request configuration here (e.g., adding headers)
    const token = localStorage.getItem('questlog-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // CRITICAL: You must always return the config object
    return config;
  },
  (error) => {
    // 2. Do something with the request error (e.g., failed to establish connection metadata)
    return Promise.reject(error);
  }
);

export async function register(userData = {}) {
    try {
        const response = await api.post('/register', userData);
        return response.data;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
}

export async function login(identifier, password) {
    try {
        const response = await api.post('/login', { identifier, password });
        return response.data;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
}

export async function getCurrentUser() {
    try {
        const response = await api.get('/user');
        return response.data;
    } catch (error) {
        console.error("Error fetching current user:", error);
        throw error;
    }
}

export async function logout() {
    try {
        const response = await api.post('/logout');
        return response.data;
    } catch (error) {
        console.error("Error logging out:", error);
        throw error;
    }
}

export async function verifyEmail(email, code) {
    try {
        const response = await api.post('/verify-email', { email, code });
        return response.data;
    } catch (error) {
        console.error("Error verifying email:", error);
        throw error;
    }
}

export async function resendCode(email) {
    try {
        const response = await api.post('/resend-code', { email }); 
        return response.data;
    } catch (error) {
        console.error("Error resending code:", error);
        throw error;
    }
}

export async function forgotPassword(email) {
    try {
        const response = await api.post('/forgot-password', {email})
        return response.data
    } catch (error) {
        console.error("Error forgetting password:", error)
        throw error
    }
}

export async function resetPassword(email, token, password, password_confirmation) {
   try {
      const response = await api.post('/reset-password', { email, token, password, password_confirmation })
      return response.data
   } catch (error) {
      console.error("Error resetting password:", error)
        throw error
   }
}

export default api;