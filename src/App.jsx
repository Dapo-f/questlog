import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useLibrary } from "./context/LibraryContext"
import LandingPage from "./pages/LandingPage";
import DiscoverPage from "./pages/DiscoverPage";
import BrowsePage from "./pages/BrowsePage";
import GameDetailsPage from "./pages/GameDetailPage";
import LibraryPage from "./pages/LibraryPage";
import LibraryProvider from "./context/LibraryContext";
import Navbar from "./components/Navbar";
import Toast from "./components/Toast"
import ScrollToTop from "./components/ScrollTop";


function AppContent() {
  const { toast } = useLibrary()
  return (
    <>
      <Navbar />
      <Toast message={toast.message} visible={toast.visible} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/discover" element={<DiscoverPage />} />
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/game/:id" element={<GameDetailsPage />} />
        <Route path="/library" element={<LibraryPage />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <LibraryProvider>
      <BrowserRouter>
      <ScrollToTop />
        <AppContent />
      </BrowserRouter>
    </LibraryProvider>
  )
}


export default App;
