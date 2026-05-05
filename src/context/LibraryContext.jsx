import { createContext, useContext, useState, useEffect } from "react";
const LibraryContext = createContext();

function LibraryProvider({ children }) {
  const [toast, setToast] = useState({ message: "", visible: false });
  const [library, setLibrary] = useState(() => {
    const saved = localStorage.getItem("questlog-library");
    if (saved) return JSON.parse(saved);
    return [];
  });

  const showToast = (message) => {
    setToast({ message, visible: true });
  };
  function addGame(game) {
    const newGame = { ...game, status: "wishlist" };
    setLibrary((l) => [...l, newGame]);
    showToast(`${game.name} added to library!`);
  }

  function removeGame(id) {
    setLibrary((l) => l.filter((game) => game.id !== id));
    showToast("Removed from library");
  }

  function updateStatus(id, status) {
    setLibrary((l) =>
      l.map((game) => (game.id === id ? { ...game, status } : game)),
    );
  }

  useEffect(() => {
    localStorage.setItem("questlog-library", JSON.stringify(library));
  }, [library]);

  useEffect(() => {
    if (!toast.visible) return;
    const timer = setTimeout(
      () => setToast((t) => ({ ...t, visible: false })),
      2500,
    );
    return () => clearTimeout(timer);
  }, [toast.visible]);

  function isInLibrary(id) {
    return library.some((game) => game.id === id);
  }
  return (
    <LibraryContext.Provider
      value={{ library, toast, showToast, addGame, removeGame, updateStatus, isInLibrary }}
    >
      {children}
    </LibraryContext.Provider>
  );
}

export function useLibrary() {
  return useContext(LibraryContext);
}

export default LibraryProvider;
