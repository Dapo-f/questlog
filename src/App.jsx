import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useLibrary } from "./context/LibraryContext";
import { useAuth } from "./context/AuthContext";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import LandingPage from "./pages/LandingPage";
import DiscoverPage from "./pages/DiscoverPage";
import BrowsePage from "./pages/BrowsePage";
import UpcomingPage from "./pages/UpcomingPage";
// import NewsPage from "./pages/NewsPage"
import GameDetailsPage from "./pages/GameDetailPage";
import LibraryPage from "./pages/LibraryPage";
import LibraryProvider from "./context/LibraryContext";
import Navbar from "./components/Navbar";
import Toast from "./components/Toast";
import ScrollToTop from "./components/ScrollTop";
import AuthProvider from "./context/AuthContext";

function AppContent() {
  const { toast } = useLibrary();
  return (
    <>
      <Navbar />
      <Toast message={toast.message} visible={toast.visible} />
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/discover" element={<DiscoverPage />} />
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/upcoming" element={<UpcomingPage />} />
        {/* <Route path="/news" element={<NewsPage />} /> */}
        <Route path="/game/:id" element={<GameDetailsPage />} />
        <Route path="/library" element={<LibraryPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <LibraryProvider>
        <BrowserRouter>
          <ScrollToTop />
          <AppContent />
        </BrowserRouter>
      </LibraryProvider>
    </AuthProvider>
  );
}

export default App;
