import { useNavigate } from "react-router-dom";
import { useLibrary } from "../context/LibraryContext";
function HeroBanner({game}) {
    const navigate = useNavigate();
    const { name, id, background_image, genres, platforms, metacritic } = game;
    const { addGame, removeGame, isInLibrary } = useLibrary()
    return(
        <div className="relative w-full h-120 bg-cover bg-center flex items-end" style={{backgroundImage: `url(${background_image})`}}>
            <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/60 to-transparent" />
            <div className="content relative z-10 md:p-10 p-3">
             <h1 className="title font-orbitron font-black text-4xl text-white mb-3">{name}</h1>
             <div className="labels flex items-center gap-3 mb-5 flex-wrap">
                {metacritic && (<span className="bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded">★ {metacritic}</span>)}
                
                <span className="text-xs font-semibold text-muted bg-white/10 px-2.5 py-1 rounded-full">{genres?.slice(0,2).map((g) => g.name).join(",")}</span>
                <span className="text-xs font-semibold text-muted bg-white/10 px-2.5 py-1 rounded-full">{platforms?.slice(0,3).map((p) => p.platform.name).join(" · ")}</span>
             </div>
             <div className="buttons flex gap-3">
                <button className="flex items-center gap-2 bg-purple hover:bg-purple-mid text-white font-bold px-6 py-2.5 rounded-xl transition-colors" onClick={() => navigate(`/game/${id}`)}>View Details <span className="text-xl flex items-center"><ion-icon name="chevron-forward-outline"></ion-icon></span></button>
                <button className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-2.5 rounded-xl border border-border transition-colors" onClick={(e) => {
            e.stopPropagation();
            isInLibrary(id) ? removeGame(id) : addGame(game);
          }}> {isInLibrary(id) ? "✓ Saved" : "+ Add to Library"}</button>
             </div>
            </div>
        </div>
    )
}

export default HeroBanner