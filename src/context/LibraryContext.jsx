import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import {
  getMyLibrary,
  addToLibrary,
  removeFromLibrary,
  updateLibraryEntry,
} from "../services/questlogApi";
const LibraryContext = createContext();

function LibraryProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [toast, setToast] = useState({ message: "", visible: false });
  const [library, setLibrary] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      setLibrary([]);
      return;
    }

    getMyLibrary()
      .then((data) => {
        setLibrary(data);
      })
      .catch((err) => {
        console.error("Error fetching user library:", err);
      });
  }, [isAuthenticated]);

  const showToast = (message) => {
    setToast({ message, visible: true });
  };
  function addGame(game) {
    addToLibrary(game.id, "wishlist")
      .then((newEntry) => {
        setLibrary((l) => [...l, newEntry]);
        showToast(`${game.name} added to library!`);
      })
      .catch((err) => {
        console.error("Error adding game:", err);
        showToast("Failed to add game");
      });
  }

  function removeGame(rawgId) {
    removeFromLibrary(rawgId)
      .then(() => {
        setLibrary((l) => l.filter((entry) => entry.rawg_id !== rawgId));
        showToast("Removed from library");
      })
      .catch((err) => {
        console.error("Error removing game:", err);
        showToast("Failed to remove game");
      });
  }

  function updateStatus(rawgId, status) {
    updateLibraryEntry(rawgId, {status})
     .then((updatedEntry) => {
      setLibrary((l) =>
        l.map((entry) => (entry.rawg_id === rawgId ? updatedEntry : entry)),
      );
      showToast("Game updated");
    }).catch((err) => {
        console.error("Error updating game:", err);
        showToast("Failed to update game");
      });
  }


  useEffect(() => {
    if (!toast.visible) return;
    const timer = setTimeout(
      () => setToast((t) => ({ ...t, visible: false })),
      2500,
    );
    return () => clearTimeout(timer);
  }, [toast.visible]);

  function isInLibrary(rawgId) {
    return library.some((entry) => entry.rawg_id === rawgId);
  }
  return (
    <LibraryContext.Provider
      value={{
        library,
        toast,
        showToast,
        addGame,
        removeGame,
        updateStatus,
        isInLibrary,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
}

export function useLibrary() {
  return useContext(LibraryContext);
}

export default LibraryProvider;
