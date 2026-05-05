import { useNavigate } from "react-router-dom";
import GameCard from "../components/GameCard";
import { useEffect, useRef, useState } from "react";
function GameCarousel({ title, games }) {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [index, setIndex] = useState(0);
  const [stepSize, setStepSize] = useState(0);
  const [visibleCards, setVisibleCards] = useState(0);
  const containerRef = useRef(null);
  const widthRef = useRef(null);
  useEffect(() => {
    if (!widthRef.current || !containerRef.current) return;

    const observer = new ResizeObserver(() => {
      const cardWidth = widthRef.current.offsetWidth + 18;
      setStepSize(cardWidth);
      const containerWidth = containerRef.current.offsetWidth;
      setVisibleCards(Math.round(containerWidth / cardWidth));
      if (containerWidth < 640) {
        setIsMobile(true);
        setIndex(0);
      } else {
        setIsMobile(false);
      }
    });

    observer.observe(containerRef.current);
    observer.observe(widthRef.current)
    return () => observer.disconnect();
  }, []);
  function prevChange() {
    if (index > 0) {
      setIndex((i) => i - 1);
    }
  }
  function nextChange() {
    if (index < games.length - visibleCards) {
      setIndex((i) => i + 1);
    }
  }
  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <div className="title flex items-center gap-2">
          <div
            className="w-1 h-5  rounded-sm"
            style={{
              background: "linear-gradient(to bottom, #7C3AED, #9D5FF0)",
            }}
          ></div>
          <h2 className="section-title font-orbitron font-bold text-white text-lg">
            {title}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {!isMobile && (
            <div className="flex items-center gap-4">
              {" "}
              <button
                onClick={prevChange}
                disabled={index === 0}
                className="w-8 h-8 rounded-full bg-surface2 border border-border flex items-center justify-center text-muted hover:border-purple-bright hover:text-purple-bright transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-xl leading-none"
              >
                <ion-icon name="arrow-back-outline"></ion-icon>
              </button>
              <button
                onClick={nextChange}
                disabled={index >= games.length - visibleCards}
                className="w-8 h-8 rounded-full bg-surface2 border border-border flex items-center justify-center text-muted hover:border-purple-bright hover:text-purple-bright transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-xl leading-none "
              >
                <ion-icon name="arrow-forward-outline"></ion-icon>
              </button>
            </div>
          )}

          <p
            className="text-purple-bright text-sm hover:underline cursor-pointer"
            onClick={() => {
              navigate("/browse");
            }}
          >
            See all
          </p>
        </div>
      </div>
      <div
        className={`py-3 ${isMobile ? "overflow-x-auto overflow-y-hidden scrollbar-hide" : "overflow-hidden"}`}
        ref={containerRef}
      >
        <div
          className="flex gap-4 w-max transition-transform duration-300 ease-in-out"
          style={{
            transform: isMobile ? "none" : `translateX(-${index * stepSize}px)`,
          }}
        >
          {games.map((game, i) => (
            <GameCard
              key={game.id}
              game={game}
              ref={i === 0 ? widthRef : null}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default GameCarousel;
