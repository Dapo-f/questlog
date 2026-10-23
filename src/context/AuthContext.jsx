import { createContext, useContext, useState, useEffect } from "react";
import {
  login as loginApi,
  getCurrentUser,
  register as registerApi,
  logout as logoutApi,
  verifyEmail as verifyEmailApi,
  resendCode as resendCodeApi,
  forgotPasswordResendCode as forgotPasswordResendCodeApi,
  forgotPassword as forgotPasswordApi,
  resetPassword as resetPasswordApi,
} from "../services/questlogApi";
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved =
      localStorage.getItem("questlog-user") ||
      sessionStorage.getItem("questlog-user");
    if (saved) return JSON.parse(saved);
    return null;
  });
  const [token, setToken] = useState(() => {
    return (
      localStorage.getItem("questlog-token") ||
      sessionStorage.getItem("questlog-token")
    );
  });

  async function register(userData) {
    try {
      return await registerApi(userData);
    } catch (error) {
      console.error("Error registering:", error);
      throw error;
    }
  }

  async function login(identifier, password, rememberMe = true) {
  try {
    const data = await loginApi(identifier, password);
    const storage = rememberMe ? localStorage : sessionStorage;

    storage.setItem("questlog-token", data.token);
    setToken(data.token);

    const userData = await getCurrentUser();
    storage.setItem("questlog-user", JSON.stringify(userData));
    setUser(userData);
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}

  async function verifyEmail(email, code) {
    try {
      const data = await verifyEmailApi(email, code);
      setToken(data.token);
      localStorage.setItem("questlog-token", data.token);
      const userData = await getCurrentUser();
      setUser(userData);
      localStorage.setItem("questlog-user", JSON.stringify(userData));
    } catch (error) {
      console.error("Error verifying email:", error);
      throw error;
    }
  }

  async function resendCode(email) {
    try {
      return await resendCodeApi(email);
    } catch (error) {
      console.error("Error resending code:", error);
      throw error;
    }
  }
  async function forgotPasswordResendCode(email) {
    try {
      return await forgotPasswordResendCodeApi(email);
    } catch (error) {
      console.error("Error resending code:", error);
      throw error;
    }
  }

  async function forgotPassword(email) {
    try {
      return await forgotPasswordApi(email);
    } catch (error) {
      console.error("Error forgetting password:", error);
      throw error;
    }
  }

  async function resetPassword(email, token, password, password_confirmation) {
    try {
      return await resetPasswordApi(
        email,
        token,
        password,
        password_confirmation,
      );
    } catch (error) {
      console.error("Error resetting password:", error);
      throw error;
    }
  }

 async function logout() {
  try {
    await logoutApi();
  } catch (error) {
    console.error("Error logging out:", error);
  } finally {
    setToken(null);
    setUser(null);
    localStorage.removeItem("questlog-token");
    localStorage.removeItem("questlog-user");
    sessionStorage.removeItem("questlog-token");
    sessionStorage.removeItem("questlog-user");
  }
}

  function updateUser(updatedFields) {
  setUser((prev) => {
    const newUser = { ...prev, ...updatedFields };
    const storage = localStorage.getItem("questlog-token") ? localStorage : sessionStorage;
    storage.setItem("questlog-user", JSON.stringify(newUser));
    return newUser;
  });
}

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        register,
        logout,
        isAuthenticated,
        verifyEmail,
        resendCode,
        forgotPasswordResendCode,
        forgotPassword,
        resetPassword,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;
