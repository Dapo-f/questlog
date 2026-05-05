import { NavLink, useNavigate } from "react-router-dom";
import GameCollage from "../components/GameCollage";
import Kratos from "../assets/Kratos.jpg";
import Neir from "../assets/2B.jpeg";
import Morgan from "../assets/Morgan.jpeg";

function LandingPage() {
  const navigate = useNavigate();
  const date = new Date().getFullYear();
  const gradientText = {
    background: "linear-gradient(135deg, #fff 0%, #C084FC 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  };

  const gradientText2 = {
    background:
      "linear-gradient(135deg, #C084FC 0%, #7C3AED 50%, #C084FC 100%)",
    backgroundSize: "200%",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  };
  return (
    <div>
      <section className="hero relative min-h-screen flex items-center justify-center overflow-hidden">
        <GameCollage />
        <div
          className="hero-overlay absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(124,58,237,0.15) 0%, transparent 70%), linear-gradient(to bottom, rgba(12,12,20,0.7) 0%, rgba(12,12,20,0.5) 40%, rgba(12,12,20,0.9) 80%, rgba(12,12,20,1) 100%)",
          }}
        ></div>
        <div className="hero-content relative z-3 text-center py-0 px-6 max-w-200 animate-fadeUp">
          <div className="hero-badge inline-flex items-center gap-2 bg-purple/15 border border-purple-bright/25 rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-purple-bright mb-7 animate-[fadeUp_0.9s_0.1s_ease_both]">
            <div className="hero-badge-dot w-1.5 h-1.5 rounded-full bg-purple-bright animate-pulse"></div>
            Your Ultimate Game Library
          </div>
          <h1 className="hero-title font-orbitron font-black text-6xl text-white leading-tight mb-4 animate-[fadeUp_0.9s_0.2s_ease_both]">
            Every Game.
            <br />
            <span
              className="hero-title-accent inline-block animate-shimmer"
              style={gradientText2}
            >
              One Quest.
            </span>
          </h1>
          <p className="hero-sub text-muted text-lg leading-relaxed mb-10 max-w-xl mx-auto animate-[fadeUp_0.9s_0.3s_ease_both]">
            Discover, track, and explore thousands of games. Watch trailers,
            check ratings, and find where to buy — all in one beautifully dark
            corner of the internet.
          </p>
          <div className="hero-actions flex gap-3 justify-center flex-wrap animate-[fadeUp_0.9s_0.4s_ease_both]">
            <button
              className="btn-primary bg-purple hover:bg-purple-mid text-white font-bold px-8 py-3.5 rounded-xl transition-colors shadow-lg duration-300 ease-in-out cursor-pointer"
              onClick={() => navigate("/discover")}
            >
              ⚔️ &nbsp;Explore Games
            </button>
            <button className="btn-secondary bg-white/7 hover:bg-white/10 text-white border border-border px-7 py-3.5 rounded-xl transition-colors font-semibold cursor-pointer">
              Watch Trailer
            </button>
          </div>
        </div>
      </section>
      <section className="stats relative py-20 px-12 flex justify-center gap-0 border-y border-y-border bg-surface overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, #C084FC, transparent)",
          }}
        ></div>
        <div className="stat-item flex-1 max-w-65 text-center py-0 px-10 border-r border-r-border">
          <div
            className="stat-number text-fluid-xl font-orbitron font-black mb-2 leading-none"
            style={gradientText}
          >
            500K+
          </div>
          <div className="stat-label text-sm text-muted uppercase tracking-widest font-semibold">
            Games in Database
          </div>
        </div>
        <div className="stat-item flex-1 max-w-65 text-center py-0 px-10 border-r border-r-border">
          <div
            className="stat-number text-fluid-xl font-orbitron font-black mb-2 leading-none"
            style={gradientText}
          >
            40+
          </div>
          <div className="stat-label text-sm text-muted uppercase tracking-widest font-semibold">
            Genres to Explore
          </div>
        </div>
        <div className="stat-item flex-1 max-w-65 text-center py-0 px-10 border-r border-r-border">
          <div
            className="stat-number text-fluid-xl font-orbitron font-black mb-2 leading-none"
            style={gradientText}
          >
            15+
          </div>
          <div className="stat-label text-sm text-muted uppercase tracking-widest font-semibold">
            Platforms Covered
          </div>
        </div>
        <div className="stat-item flex-1 max-w-65 text-center py-0 px-10">
          <div
            className="stat-number text-fluid-xl font-orbitron font-black mb-2 leading-none"
            style={gradientText}
          >
            100%
          </div>
          <div className="stat-label text-sm text-muted uppercase tracking-widest font-semibold">
            Free to Use
          </div>
        </div>
      </section>
      <section className="features py-30 px-12 max-w-300 my-0 mx-auto">
        <div className="section-header text-center mb-18">
          <div className="section-tag inline-block text-[11px] tracking-[0.25em] uppercase text-purple-bright mb-4 font-semibold">
            Features
          </div>
          <h2 className="section-title font-orbitron font-bold text-fluid-lg text-white leading-[1.2] mb-4">
            Everything a gamer needs
          </h2>
          <p className="section-desc text-base text-muted max-w-120 my-0 mx-auto leading-[1.65]">
            Built for discovery. Designed for the obsessed. Your game library,
            finally done right.
          </p>
        </div>
        <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            className="group feature-card featured col-span-1 border border-[rgba(124,58,237,0.3)] rounded-2xl py-9 px-8 relative overflow-hidden transition hover:border-[rgba(192,132,252,0.3)] hover:-translate-y-1 duration-300 ease-in-out"
            style={{
              background:
                "linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(28,28,46,0.8) 100%)",
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-px opacity-0 transition delay-300 group-hover:opacity-100"
              style={{
                background:
                  "linear-gradient(to right, transparent, #C084FC, transparent)",
              }}
            ></div>
            <div className="feature-icon text-3xl mb-6 w-13 h-13 rounded-xl flex items-center justify-center bg-purple/10 border border-purple/20">
              🔍
            </div>
            <div className="feature-title font-orbitron font-bold text-base text-white mb-3">
              Smart Search
            </div>
            <p className="feature-desc text-sm text-muted leading-relaxed mb-4">
              Find any game instantly. Search by name, filter by genre,
              platform, rating, or release year. The whole RAWG database at your
              fingertips.
            </p>
            <span className="feature-tag text-[11px] font-bold tracking-widest uppercase text-purple-bright bg-purple/10 border border-purple-bright/20 px-2.5 py-1 rounded">
              Powered by RAWG API
            </span>
          </div>
          <div className="group feature-card bg-surface border border-border rounded-2xl py-9 px-8 relative overflow-hidden transition hover:border-[rgba(192,132,252,0.3)] hover:-translate-y-1 duration-300 ease-in-out">
            <div
              className="absolute top-0 left-0 right-0 h-px opacity-0 transition delay-300 group-hover:opacity-100"
              style={{
                background:
                  "linear-gradient(to right, transparent, #C084FC, transparent)",
              }}
            ></div>
            <div className="feature-icon text-3xl mb-6 w-13 h-13 rounded-xl flex items-center justify-center bg-purple/10 border border-purple/20">
              🎬
            </div>
            <div className="feature-title font-orbitron font-bold text-base text-white mb-3">
              Trailers Built In
            </div>
            <p className="feature-desc text-sm text-muted leading-relaxed mb-4">
              Watch official game trailers without leaving the page. Every game
              detail page comes with embedded video previews.
            </p>
          </div>
          <div className="group feature-card bg-surface border border-border rounded-2xl py-9 px-8 relative overflow-hidden transition hover:border-[rgba(192,132,252,0.3)] hover:-translate-y-1 duration-300 ease-in-out">
            <div
              className="absolute top-0 left-0 right-0 h-px opacity-0 transition delay-300 group-hover:opacity-100"
              style={{
                background:
                  "linear-gradient(to right, transparent, #C084FC, transparent)",
              }}
            ></div>
            <div className="feature-icon text-3xl mb-6 w-13 h-13 rounded-xl flex items-center justify-center bg-purple/10 border border-purple/20">
              🛒
            </div>
            <div className="feature-title font-orbitron font-bold text-base text-white mb-3">
              Buy Anywhere
            </div>
            <p className="feature-desc text-sm text-muted leading-relaxed mb-4">
              Direct links to Steam, Epic Games, PlayStation Store and more.
              Know where to get it and at what price — instantly.
            </p>
          </div>
          <div className="group feature-card bg-surface border border-border rounded-2xl py-9 px-8 relative overflow-hidden transition hover:border-[rgba(192,132,252,0.3)] hover:-translate-y-1 duration-300 ease-in-out">
            <div
              className="absolute top-0 left-0 right-0 h-px opacity-0 transition delay-300 group-hover:opacity-100"
              style={{
                background:
                  "linear-gradient(to right, transparent, #C084FC, transparent)",
              }}
            ></div>
            <div className="feature-icon text-3xl mb-6 w-13 h-13 rounded-xl flex items-center justify-center bg-purple/10 border border-purple/20">
              📚
            </div>
            <div className="feature-title font-orbitron font-bold text-base text-white mb-3">
              Your Library
            </div>
            <p className="feature-desc text-sm text-muted leading-relaxed mb-4">
              Save games you love, want to play, or have already finished. Your
              personal collection, stored and ready whenever you return.
            </p>
          </div>
          <div className="group feature-card bg-surface border border-border rounded-2xl py-9 px-8 relative overflow-hidden transition hover:border-[rgba(192,132,252,0.3)] hover:-translate-y-1 duration-300 ease-in-out">
            <div
              className="absolute top-0 left-0 right-0 h-px opacity-0 transition delay-300 group-hover:opacity-100"
              style={{
                background:
                  "linear-gradient(to right, transparent, #C084FC, transparent)",
              }}
            ></div>
            <div className="feature-icon text-3xl mb-6 w-13 h-13 rounded-xl flex items-center justify-center bg-purple/10 border border-purple/20">
              ⭐
            </div>
            <div className="feature-title font-orbitron font-bold text-base text-white mb-3">
              Metacritic Scores
            </div>
            <p className="feature-desc text-sm text-muted leading-relaxed mb-4">
              See critic and user ratings side by side. Know exactly how good a
              game is before you spend a single penny on it.
            </p>
          </div>
          <div className="group feature-card bg-surface border border-border rounded-2xl py-9 px-8 relative overflow-hidden transition hover:border-[rgba(192,132,252,0.3)] hover:-translate-y-1 duration-300 ease-in-out">
            <div
              className="absolute top-0 left-0 right-0 h-px opacity-0 transition delay-300 group-hover:opacity-100"
              style={{
                background:
                  "linear-gradient(to right, transparent, #C084FC, transparent)",
              }}
            ></div>
            <div className="feature-icon text-3xl mb-6 w-13 h-13 rounded-xl flex items-center justify-center bg-purple/10 border border-purple/20">
              🎮
            </div>
            <div className="feature-title font-orbitron font-bold text-base text-white mb-3">
              Platform Filters
            </div>
            <p className="feature-desc text-sm text-muted leading-relaxed mb-4">
              Only on PC? Strictly console? Filter your search to see games
              available on exactly the platforms you own.
            </p>
          </div>
        </div>
      </section>
      <section className="how pt-0 px-12 pb-30 max-w-300 mx-auto">
        <div className="section-header text-center mb-18">
          <div className="section-tag inline-block text-[11px] tracking-[0.25em] uppercase text-purple-bright mb-4 font-semibold">
            How It Works
          </div>
          <h2 className="section-title font-orbitron font-bold text-fluid-lg text-white leading-[1.2] mb-4">
            Three steps to your next game
          </h2>
          <p className="section-desc text-base text-muted max-w-120 my-0 mx-auto leading-[1.65]">
            Simple, fast, and built for how gamers actually discover games.
          </p>
        </div>
        <div className="steps grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0 relative">
          <div className="absolute top-7 h-px z-0 left-[16%] right-[16%] md:inline-flex hidden" style={{ background: 'linear-gradient(to right, transparent, #C084FC, transparent)' }}></div>
          <div className="step text-center py-0 px-8 relative z-1">
            <div
              className="step-num w-14 h-14 rounded-full flex items-center justify-center font-orbitron text-[18px] font-black text-white mx-auto mb-6"
              style={{
                background: "linear-gradient(135deg, #9D5FF0, #C084FC)",
                boxShadow: "0 0 24px rgba(124,58,237,0.5)",
              }}
            >
              01
            </div>
            <div className="step-title font-orbitron text-[15px] font-bold text-white mb-3">
              Search & Filter
            </div>
            <p className="step-desc text-sm text-muted leading-[1.65] max-w-xs mx-auto">
              Type a game name or browse by genre, platform, and rating. Our
              filters make discovery effortless.
            </p>
          </div>
          <div className="step text-center py-0 px-8 relative z-1">
            <div
              className="step-num w-14 h-14 rounded-full flex items-center justify-center font-orbitron text-[18px] font-black text-white mx-auto mb-6"
              style={{
                background: "linear-gradient(135deg, #9D5FF0, #C084FC)",
                boxShadow: "0 0 24px rgba(124,58,237,0.5)",
              }}
            >
              02
            </div>
            <div className="step-title font-orbitron text-[15px] font-bold text-white mb-3">
              Explore Details
            </div>
            <p className="step-desc text-sm text-muted leading-[1.65] max-w-xs mx-auto">
              Dive into any game — screenshots, trailers, scores, descriptions,
              and store links all in one page.
            </p>
          </div>
          <div className="step text-center py-0 px-8 relative z-1">
            <div
              className="step-num w-14 h-14 rounded-full flex items-center justify-center font-orbitron text-[18px] font-black text-white mx-auto mb-6"
              style={{
                background: "linear-gradient(135deg, #9D5FF0, #C084FC)",
                boxShadow: "0 0 24px rgba(124,58,237,0.5)",
              }}
            >
              03
            </div>
            <div className="step-title font-orbitron text-[15px] font-bold text-white mb-3">
              Save to Library
            </div>
            <p className="step-desc text-sm text-muted leading-[1.65] max-w-xs mx-auto">
              Found something you love? Add it to your personal QuestLog library
              with one click.
            </p>
          </div>
        </div>
      </section>
      <section className="testimonials relative overflow-hidden py-30 px-12 bg-surface border-y border-x-0 border-border">
        <div
          className="absolute -bottom-25 -right-25 w-100 h-100 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(124,58,237,0.08), transparent 70%)",
          }}
        ></div>
        <div className="section-header mb-14 text-center">
          <div className="section-tag inline-block text-[11px] tracking-[0.25em] uppercase text-purple-bright mb-4 font-semibold">
            What Gamers Say
          </div>
          <h2 className="section-title font-orbitron font-bold text-fluid-lg text-white leading-[1.2] mb-4">
            The community loves it
          </h2>
        </div>
        <div className="testimonials-grid max-w-275 mx-auto grid grid-cols-3 gap-5">
          <div className="testimonial-card bg-surface2 border border-border rounded-2xl p-7 transition duration-300 hover:border-[rgba(192,132,252,0.25)] hover:-translate-y-1 ease-in-out">
            <div className="t-stars text-purple-bright text-[14px] mb-3.5 tracking-[2px]">
              ★★★★★
            </div>
            <p className="t-text text-[14px] text-text leading-[1.7] mb-5 italic">
              "Finally an app that doesn't feel like it was built by someone
              who's never played a game. Dark, fast, and actually useful."
            </p>
            <div className="t-author flex items-center gap-3">
              <div className="t-avatar w-9.5 h-9.5 rounded-full flex items-center justify-center text-[18px] shrink-0 overflow-hidden">
                <img
                  src={Kratos}
                  alt="Kratos"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="t-name font-semibold text-sm text-white">
                  Marcus O.
                </div>
                <div className="t-handle text-xs text-muted">
                  @arcane_marcus · PC Gamer
                </div>
              </div>
            </div>
          </div>
          <div className="testimonial-card bg-surface2 border border-border rounded-2xl p-7 transition duration-300 hover:border-[rgba(192,132,252,0.25)] hover:-translate-y-1 ease-in-out">
            <div className="t-stars text-purple-bright text-[14px] mb-3.5 tracking-[2px]">
              ★★★★★
            </div>
            <p className="t-text text-[14px] text-text leading-[1.7] mb-5 italic">
              "The trailer embeds are a game changer. I spent an hour just
              watching previews. My wallet hates QuestLog. I love it."
            </p>
            <div className="t-author flex items-center gap-3">
              <div className="t-avatar w-9.5 h-9.5 rounded-full flex items-center justify-center text-[18px] shrink-0 overflow-hidden">
                <img
                  src={Morgan}
                  alt="arthur morgan"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="t-name font-semibold text-sm text-white">
                  Aisha K.
                </div>
                <div className="t-handle text-xs text-muted">
                  @aisha_plays · PS5 + Switch
                </div>
              </div>
            </div>
          </div>
          <div className="testimonial-card bg-surface2 border border-border rounded-2xl p-7 transition duration-300 hover:border-[rgba(192,132,252,0.25)] hover:-translate-y-1 ease-in-out">
            <div className="t-stars text-purple-bright text-[14px] mb-3.5 tracking-[2px]">
              ★★★★★
            </div>
            <p className="t-text text-[14px] text-text leading-[1.7] mb-5 italic">
              "Store links directly from the game page? Insane. I found Elden
              Ring on sale and bought it in under 2 minutes. Dangerous app."
            </p>
            <div className="t-author flex items-center gap-3">
              <div className="t-avatar w-9.5 h-9.5 rounded-full flex items-center justify-center text-[18px] shrink-0 overflow-hidden">
                <img
                  src={Neir}
                  alt="2b"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="t-name font-semibold text-sm text-white">
                  Dre B.
                </div>
                <div className="t-handle text-xs text-muted">
                  @dre_builds · Xbox + PC
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="cta-banner py-30 px-12 text-center relative overflow-hidden border-y border-border">
        <div
          className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] w-175 h-100 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(124,58,237,0.15) 0%, transparent 70%)",
          }}
        ></div>
        <h2 className="cta-banner-title font-orbitron text-fluid-xxl font-black text-white mb-4 relative">
          Ready to start your quest?
        </h2>
        <p className="cta-banner-sub text-[16px] text-muted mb-10 relative">
          Thousands of games are waiting. Your library starts with one click.
        </p>
        <button
          className="btn-primary bg-purple hover:bg-purple-mid text-white font-bold px-8 py-3.5 rounded-xl transition-colors shadow-lg duration-300 ease-in-out cursor-pointer"
          onClick={() => navigate("/discover")}
        >
          ⚔️ &nbsp;Explore Games
        </button>
      </section>
      <footer className="bg-surface border-t border-border pt-15 px-12 pb-9">
        <div className="footer-top flex justify-between items-start mb-12 gap-10">
          <div className="footer-brand">
            <div className="flex items-center gap-2.5 mb-1">
              <svg width="28" height="28" viewBox="0 0 44 44" fill="none">
                <path
                  d="M22 3L6 10V22C6 31 13 38.5 22 41C31 38.5 38 31 38 22V10L22 3Z"
                  stroke="#C084FC"
                  strokeWidth="1.5"
                  fill="rgba(124,58,237,0.1)"
                />
                <circle
                  cx="22"
                  cy="21"
                  r="7"
                  stroke="#C084FC"
                  strokeWidth="2"
                  fill="none"
                />
                <line
                  x1="27"
                  y1="26"
                  x2="31"
                  y2="30"
                  stroke="#C084FC"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
              <span className="logo-text font-orbitron font-bold text-[16px] text-white">
                Quest
                <span className="text-purple-bright">Log</span>
              </span>
            </div>
            <p className="text-sm text-muted max-w-70 leading-[1.65] mt-3">
              Your personal game library. Discover, track, and explore games
              from every genre and platform.
            </p>
          </div>
          <div className="footer-links flex gap-16 flex-wrap">
            <div className="footer-col">
              <h4 className="font-orbitron text-[11px] font-black tracking-[0.2em] uppercase text-purple-bright mb-4">
                Navigate
              </h4>
              <nav className="flex flex-col text-[14px] text-muted gap-3">
                <NavLink
                  to="/discover"
                  className={({ isActive }) =>
                    isActive
                      ? "text-purple-bright font-semibold"
                      : "text-muted hover:text-white transition-colors"
                  }
                >
                  Discover
                </NavLink>
                <NavLink
                  to="/browse"
                  className={({ isActive }) =>
                    isActive
                      ? "text-purple-bright font-semibold"
                      : "text-muted hover:text-white transition-colors"
                  }
                >
                  Browse
                </NavLink>
                <NavLink
                  to="/browse"
                  className={({ isActive }) =>
                    isActive
                      ? "text-purple-bright font-semibold"
                      : "text-muted hover:text-white transition-colors"
                  }
                >
                  Library
                </NavLink>
                <NavLink
                  to="/browse"
                  className={({ isActive }) =>
                    isActive
                      ? "text-purple-bright font-semibold"
                      : "text-muted hover:text-white transition-colors"
                  }
                >
                  Game Details
                </NavLink>
              </nav>
            </div>
            <div className="footer-col">
              <h4 className="font-orbitron text-[11px] font-black tracking-[0.2em] uppercase text-purple-bright mb-4">
                Genres
              </h4>
              <nav className="flex flex-col text-[14px] text-muted gap-3">
                <NavLink
                  to="/discover"
                  className={({ isActive }) =>
                    isActive
                      ? "text-purple-bright font-semibold"
                      : "text-muted hover:text-white transition-colors"
                  }
                >
                  Action RPG
                </NavLink>
                <NavLink
                  to="/browse"
                  className={({ isActive }) =>
                    isActive
                      ? "text-purple-bright font-semibold"
                      : "text-muted hover:text-white transition-colors"
                  }
                >
                  FPS
                </NavLink>
                <NavLink
                  to="/browse"
                  className={({ isActive }) =>
                    isActive
                      ? "text-purple-bright font-semibold"
                      : "text-muted hover:text-white transition-colors"
                  }
                >
                  Strategy
                </NavLink>
                <NavLink
                  to="/browse"
                  className={({ isActive }) =>
                    isActive
                      ? "text-purple-bright font-semibold"
                      : "text-muted hover:text-white transition-colors"
                  }
                >
                  Indie
                </NavLink>
              </nav>
            </div>
            <div className="footer-col">
              <h4 className="font-orbitron text-[11px] font-black tracking-[0.2em] uppercase text-purple-bright mb-4">
                About
              </h4>
              <nav className="flex flex-col text-[14px] text-muted gap-3">
                <NavLink
                  to="/discover"
                  className={({ isActive }) =>
                    isActive
                      ? "text-purple-bright font-semibold"
                      : "text-muted hover:text-white transition-colors"
                  }
                >
                  About Questlog
                </NavLink>
                <NavLink
                  to="/browse"
                  className={({ isActive }) =>
                    isActive
                      ? "text-purple-bright font-semibold"
                      : "text-muted hover:text-white transition-colors"
                  }
                >
                  RAWG API
                </NavLink>
                <NavLink
                  to="/browse"
                  className={({ isActive }) =>
                    isActive
                      ? "text-purple-bright font-semibold"
                      : "text-muted hover:text-white transition-colors"
                  }
                >
                  Github
                </NavLink>
              </nav>
            </div>
          </div>
        </div>
        <div className="footer-bottom border-t border-border pt-6 flex justify-between items-center flex-wrap gap-3">
          <p className="text-[13px] text-muted">
            &copy; {date} QuestLog. Built with React & RAWG API. All game data
            belongs to their respective owners.
          </p>
          <div className="footer-socials flex gap-4">
            <span className="w-9 h-9 border border-border rounded-lg flex justify-center items-center text-lg cursor-pointer transition hover:border-purple-bright hover:bg-[rgba(124,58,237,0.1)]">
              <ion-icon name="logo-github"></ion-icon>
            </span>
            <span className="w-9 h-9 border border-border rounded-lg flex justify-center items-center text-lg cursor-pointer transition hover:border-purple-bright hover:bg-[rgba(124,58,237,0.1)]">
              <ion-icon name="logo-twitter"></ion-icon>
            </span>
            <span className="w-9 h-9 border border-border rounded-lg flex justify-center items-center text-lg cursor-pointer transition hover:border-purple-bright hover:bg-[rgba(124,58,237,0.1)]">
              <ion-icon name="logo-discord"></ion-icon>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
