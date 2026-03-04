"use client"; // <-- Bas yeh line sabse upar add karni hai //

import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════════════════════
   SUPERTEAM ACADEMY  ·  WORLD CLASS EDITION
   Web3 Hacker × Apple Cinematic × Terminal Raw Energy
   Syne · Bricolage Grotesque · JetBrains Mono
   ═══════════════════════════════════════════════════════════════════════════════ */

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,600&family=JetBrains+Mono:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --cyan:        #00E5FF;
    --cyan-10:     rgba(0,229,255,0.10);
    --cyan-06:     rgba(0,229,255,0.06);
    --cyan-03:     rgba(0,229,255,0.03);
    --yellow:      #FFE500;
    --yellow-10:   rgba(255,229,0,0.10);
    --purple:      #A78BFA;
    --red:         #FF6B6B;
    --green:       #00FF94;
    --white-90:    rgba(240,240,240,0.90);
    --white-55:    rgba(240,240,240,0.55);
    --white-35:    rgba(240,240,240,0.35);
    --white-15:    rgba(240,240,240,0.15);
    --white-06:    rgba(240,240,240,0.06);
    --white-03:    rgba(240,240,240,0.03);
    --bg:          #060608;
    --card:        rgba(12,12,16,0.85);
  }

  html { scroll-behavior: smooth; background: var(--bg); }

  body {
    background: var(--bg);
    color: var(--white-90);
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
    font-family: 'Bricolage Grotesque', sans-serif;
  }

  /* Scanlines — ultra subtle */
  body::before {
    content: '';
    position: fixed; inset: 0; z-index: 9998;
    background: repeating-linear-gradient(
      0deg,
      transparent, transparent 3px,
      rgba(0,0,0,0.018) 3px, rgba(0,0,0,0.018) 4px
    );
    pointer-events: none;
  }

  ::selection { background: rgba(0,229,255,0.18); color: #00E5FF; }
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: rgba(0,229,255,0.25); border-radius: 99px; }

  /* ── Keyframes ─────────────────────────────────────────────── */

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(36px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  @keyframes ticker {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }

  @keyframes orb-float {
    0%,100% { transform: translate(0,0) scale(1);   opacity: 0.5; }
    33%     { transform: translate(30px,-20px) scale(1.06); opacity: 0.7; }
    66%     { transform: translate(-15px,25px) scale(0.97); opacity: 0.55; }
  }
  @keyframes orb-float-r {
    0%,100% { transform: translate(0,0) scale(1);   opacity: 0.4; }
    40%     { transform: translate(-25px,20px) scale(1.04); opacity: 0.6; }
    70%     { transform: translate(20px,-30px) scale(0.98); opacity: 0.45; }
  }

  @keyframes cursor-blink {
    0%,100% { opacity: 1; }
    50%      { opacity: 0; }
  }

  @keyframes glitch-1 {
    0%,100% { clip-path: inset(0 0 96% 0); transform: translate(-4px,0); color: var(--cyan); }
    25%     { clip-path: inset(28% 0 52% 0); transform: translate(4px,0); }
    50%     { clip-path: inset(60% 0 22% 0); transform: translate(-3px,0); color: var(--yellow); }
    75%     { clip-path: inset(82% 0 4% 0);  transform: translate(3px,0); }
  }
  @keyframes glitch-2 {
    0%,100% { clip-path: inset(52% 0 28% 0); transform: translate(4px,0); color: var(--yellow); }
    30%     { clip-path: inset(8% 0 72% 0);  transform: translate(-4px,0); color: var(--cyan); }
    65%     { clip-path: inset(76% 0 6% 0);  transform: translate(2px,0); }
  }

  @keyframes neon-pulse {
    0%,100% { box-shadow: 0 0 8px rgba(0,229,255,0.4), 0 0 20px rgba(0,229,255,0.15); }
    50%     { box-shadow: 0 0 16px rgba(0,229,255,0.7), 0 0 40px rgba(0,229,255,0.25); }
  }
  @keyframes dot-live {
    0%,100% { opacity: 1; transform: scale(1); }
    50%     { opacity: 0.4; transform: scale(0.7); }
  }

  @keyframes bar-rise {
    from { transform: scaleY(0); }
    to   { transform: scaleY(1); }
  }

  @keyframes reveal-up {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes line-expand {
    from { width: 0; }
    to   { width: 100%; }
  }

  /* ── Utility classes ───────────────────────────────────────── */
  .font-syne { font-family: 'Syne', sans-serif; }
  .font-mono { font-family: 'JetBrains Mono', monospace; }
  .font-body { font-family: 'Bricolage Grotesque', sans-serif; }

  .hero-1 { animation: fadeUp 1s cubic-bezier(0.16,1,0.3,1) both; animation-delay: 0.05s; }
  .hero-2 { animation: fadeUp 1s cubic-bezier(0.16,1,0.3,1) both; animation-delay: 0.2s; }
  .hero-3 { animation: fadeUp 1s cubic-bezier(0.16,1,0.3,1) both; animation-delay: 0.38s; }
  .hero-4 { animation: fadeUp 1s cubic-bezier(0.16,1,0.3,1) both; animation-delay: 0.54s; }
  .hero-5 { animation: fadeIn 1.2s ease both; animation-delay: 0.8s; }

  /* Glitch wrapper */
  .glitch { position: relative; display: inline-block; cursor: default; }
  .glitch::before, .glitch::after {
    content: attr(data-text);
    position: absolute; top: 0; left: 0;
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: inherit;
    line-height: inherit;
    letter-spacing: inherit;
    width: 100%; height: 100%;
    pointer-events: none;
  }
  .glitch:hover::before { animation: glitch-1 0.35s steps(1) infinite; opacity: 0.75; }
  .glitch:hover::after  { animation: glitch-2 0.35s steps(1) infinite; opacity: 0.6; }

  /* Card glass */
  .card {
    background: var(--card);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 20px;
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    position: relative;
    overflow: hidden;
    transition: transform 600ms cubic-bezier(0.16,1,0.3,1),
                border-color 400ms ease,
                box-shadow 400ms ease;
  }
  .card::before {
    content: '';
    position: absolute; top: 0; left: 12%; right: 12%; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
    border-radius: 99px;
  }
  .card:hover {
    transform: translateY(-5px);
    border-color: rgba(0,229,255,0.22);
    box-shadow: 0 30px 80px rgba(0,0,0,0.7), 0 0 50px rgba(0,229,255,0.06);
  }
  .card-yellow:hover {
    border-color: rgba(255,229,0,0.22);
    box-shadow: 0 30px 80px rgba(0,0,0,0.7), 0 0 50px rgba(255,229,0,0.06);
  }
  .card-purple:hover {
    border-color: rgba(167,139,250,0.22);
    box-shadow: 0 30px 80px rgba(0,0,0,0.7), 0 0 50px rgba(167,139,250,0.06);
  }
  .card-red:hover {
    border-color: rgba(255,107,107,0.22);
    box-shadow: 0 30px 80px rgba(0,0,0,0.7), 0 0 50px rgba(255,107,107,0.06);
  }

  /* Reveal on scroll */
  .reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 800ms cubic-bezier(0.16,1,0.3,1),
                transform 800ms cubic-bezier(0.16,1,0.3,1);
  }
  .reveal.in { opacity: 1; transform: translateY(0); }

  /* Nav link */
  .nav-a {
    color: var(--white-35);
    font-size: 12.5px;
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    text-decoration: none;
    transition: color 250ms ease;
    font-family: 'JetBrains Mono', monospace;
  }
  .nav-a:hover { color: var(--cyan); }

  /* Buttons */
  .btn-primary {
    background: var(--cyan);
    color: #06060a;
    border: none;
    border-radius: 10px;
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 15px;
    letter-spacing: -0.01em;
    cursor: pointer;
    transition: transform 400ms cubic-bezier(0.16,1,0.3,1),
                box-shadow 400ms cubic-bezier(0.16,1,0.3,1);
    box-shadow: 0 0 28px rgba(0,229,255,0.28);
  }
  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 50px rgba(0,229,255,0.5), 0 20px 40px rgba(0,0,0,0.5);
  }
  .btn-primary:active { transform: scale(0.97); }

  .btn-ghost {
    background: rgba(255,255,255,0.03);
    color: var(--white-55);
    border: 1px solid rgba(255,255,255,0.09);
    border-radius: 10px;
    font-family: 'Syne', sans-serif;
    font-weight: 600;
    font-size: 15px;
    cursor: pointer;
    transition: background 350ms ease, border-color 350ms ease, color 350ms ease;
  }
  .btn-ghost:hover {
    background: rgba(0,229,255,0.05);
    border-color: rgba(0,229,255,0.2);
    color: rgba(0,229,255,0.8);
  }

  /* Progress neon */
  .progress-bar {
    height: 100%;
    border-radius: 99px;
    transition: width 1.2s cubic-bezier(0.16,1,0.3,1);
  }

  /* Bar chart */
  .bar-col {
    transform-origin: bottom;
    animation: bar-rise 0.8s cubic-bezier(0.16,1,0.3,1) both;
  }

  /* Live dot */
  .live-dot { animation: dot-live 1.4s ease-in-out infinite; }

  /* Cursor */
  .cursor { animation: cursor-blink 1.1s step-end infinite; }

  /* Neon pulse on connect btn */
  .btn-connect { animation: neon-pulse 2.5s ease-in-out infinite; }

  /* Horizontal line reveal */
  .line-reveal::after {
    content: '';
    display: block;
    height: 1px;
    background: linear-gradient(90deg, var(--cyan), transparent);
    margin-top: 1.5rem;
    animation: line-expand 1s cubic-bezier(0.16,1,0.3,1) both;
    animation-delay: 0.6s;
  }
`;

/* ── Helpers ────────────────────────────────────────────────── */
function useReveal(delay = 0) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transitionDelay = `${delay}ms`;
    el.classList.add("reveal");
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("in"); io.disconnect(); }
    }, { threshold: 0.06 });
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return ref;
}

function Counter({ to, suffix = "" }) {
  const [v, setV] = useState(0);
  const ref = useRef(null);
  const fired = useRef(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !fired.current) {
        fired.current = true;
        const step = to / (1800 / 16);
        let cur = 0;
        const t = setInterval(() => {
          cur = Math.min(cur + step, to);
          setV(Math.floor(cur));
          if (cur >= to) clearInterval(t);
        }, 16);
      }
    });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{v.toLocaleString()}{suffix}</span>;
}

/* ── Ambient Orbs ───────────────────────────────────────────── */
function Orbs() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
      <div style={{
        position: "absolute", top: "-18%", left: "-8%",
        width: "62vw", height: "62vw", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,229,255,0.042) 0%, transparent 65%)",
        animation: "orb-float 12s ease-in-out infinite",
      }} />
      <div style={{
        position: "absolute", top: "-5%", right: "-12%",
        width: "48vw", height: "48vw", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,229,0,0.022) 0%, transparent 65%)",
        animation: "orb-float-r 16s ease-in-out infinite",
      }} />
      <div style={{
        position: "absolute", bottom: "-10%", right: "18%",
        width: "40vw", height: "40vw", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,255,148,0.025) 0%, transparent 65%)",
        animation: "orb-float 18s ease-in-out infinite reverse",
      }} />
      {/* Dot grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(circle, rgba(0,229,255,0.09) 1px, transparent 1px)",
        backgroundSize: "36px 36px",
        maskImage: "radial-gradient(ellipse 75% 75% at 50% 50%, black 30%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 75% 75% at 50% 50%, black 30%, transparent 100%)",
        opacity: 0.9,
      }} />
    </div>
  );
}

/* ── Navbar ─────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      height: 64,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 clamp(1.5rem,5vw,3.5rem)",
      background: scrolled ? "rgba(6,6,10,0.88)" : "transparent",
      backdropFilter: scrolled ? "blur(28px)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(28px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(0,229,255,0.07)" : "1px solid transparent",
      transition: "all 0.45s ease",
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 34, height: 34, borderRadius: 9,
          background: "linear-gradient(135deg, rgba(0,229,255,0.15), rgba(0,229,255,0.04))",
          border: "1px solid rgba(0,229,255,0.2)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 0 18px rgba(0,229,255,0.12)",
        }}>
          <span style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: 11, color: "#00E5FF",
          }}>ST</span>
        </div>
        <span style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 700,
          fontSize: 15, letterSpacing: "-0.025em", color: "rgba(240,240,240,0.92)",
        }}>
          Superteam<span style={{ color: "#00E5FF", fontWeight: 400 }}> Academy</span>
        </span>
      </div>

      {/* Links */}
      <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
        {["Courses", "Leaderboard", "Credentials", "Docs"].map(l => (
          <a key={l} href="#" className="nav-a" style={{ display: window.innerWidth < 768 ? "none" : "block" }}>
            {l}
          </a>
        ))}
      </div>

      {/* CTA */}
      <button
        className="btn-connect"
        style={{
          background: "transparent",
          border: "1px solid rgba(0,229,255,0.35)",
          color: "#00E5FF",
          padding: "8px 20px",
          borderRadius: 6,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11.5,
          fontWeight: 500,
          cursor: "pointer",
          letterSpacing: "0.05em",
          display: "flex", alignItems: "center", gap: 8,
          transition: "background 300ms ease",
        }}
        onMouseEnter={e => e.currentTarget.style.background = "rgba(0,229,255,0.07)"}
        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
      >
        <span className="live-dot" style={{
          width: 7, height: 7, borderRadius: "50%",
          background: "#00FF94", boxShadow: "0 0 8px #00FF94",
          display: "inline-block", flexShrink: 0,
        }} />
        $ connect_wallet
      </button>
    </nav>
  );
}

/* ── Hero ───────────────────────────────────────────────────── */
function Hero() {
  return (
    <section style={{
      minHeight: "100vh",
      display: "flex", flexDirection: "column", justifyContent: "center",
      padding: "130px clamp(1.5rem,5vw,3.5rem) 100px",
      maxWidth: 1440, margin: "0 auto",
      position: "relative", overflow: "hidden",
    }}>
      {/* Extra glow behind hero text */}
      <div style={{
        position: "absolute", top: "15%", left: "55%",
        width: "55vw", height: "55vw", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,229,255,0.055) 0%, transparent 68%)",
        pointerEvents: "none",
      }} />

      {/* Eyebrow */}
      <div className="hero-1" style={{ marginBottom: "1.75rem" }}>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10.5, fontWeight: 500,
          color: "#00E5FF", letterSpacing: "0.14em", textTransform: "uppercase",
          background: "rgba(0,229,255,0.05)",
          border: "1px solid rgba(0,229,255,0.18)",
          padding: "5px 14px", borderRadius: 4,
        }}>
          <span className="live-dot" style={{
            display: "inline-block", width: 6, height: 6,
            borderRadius: "50%", background: "#00FF94",
            boxShadow: "0 0 8px #00FF94",
          }} />
          Devnet Live · Token-2022 · Metaplex Core · 283 tests ✓
        </span>
      </div>

      {/* Massive headline */}
      <div className="hero-2 line-reveal" style={{ marginBottom: "0.5rem" }}>
        <h1 style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800,
          fontSize: "clamp(3.8rem, 10vw, 9.5rem)",
          lineHeight: 0.88, letterSpacing: "-0.044em",
          color: "#F0F0F0", maxWidth: 960, margin: 0,
        }}>
          Learn.{" "}
          <span
            className="glitch"
            data-text="Build."
            style={{
              color: "transparent",
              WebkitTextStroke: "2px rgba(0,229,255,0.65)",
            }}
          >Build.</span>
          <br />
          <span style={{
            color: "#FFE500",
            textShadow: "0 0 60px rgba(255,229,0,0.25)",
          }}>
            Earn on-chain.
          </span>
        </h1>
      </div>

      {/* Subline + CTA + Card */}
      <div className="hero-3" style={{
        marginTop: "2.75rem",
        display: "grid",
        gridTemplateColumns: "minmax(0,1.15fr) auto",
        gap: "clamp(2rem,6vw,5rem)",
        alignItems: "end",
      }}>
        <div>
          <p style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontSize: "clamp(1rem,1.8vw,1.15rem)", fontWeight: 300,
            color: "rgba(240,240,240,0.52)", lineHeight: 1.75,
            maxWidth: 500, marginBottom: "2rem",
          }}>
            The only Web3 academy where your progress is{" "}
            <span style={{ color: "rgba(240,240,240,0.82)", fontWeight: 500 }}>
              soulbound on Solana.
            </span>{" "}
            XP tokens you actually own. Credentials that live forever on-chain.
          </p>

          <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
            <button className="btn-primary" style={{ padding: "14px 32px" }}>
              Start Learning →
            </button>
            <button className="btn-ghost" style={{ padding: "14px 28px" }}>
              View Curriculum
            </button>
          </div>

          {/* Terminal snippet */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            background: "rgba(0,0,0,0.55)", backdropFilter: "blur(16px)",
            border: "1px solid rgba(0,229,255,0.1)", borderRadius: 8,
            padding: "10px 16px",
          }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "rgba(0,229,255,0.4)" }}>$</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, color: "rgba(0,229,255,0.75)" }}>
              Level = ⌊ √(XP ÷ 100) ⌋
            </span>
            <span className="cursor" style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 14,
              color: "#00E5FF", lineHeight: 1,
            }}>▋</span>
          </div>
        </div>

        {/* Floating stats card */}
        <div className="card" style={{
          minWidth: 230,
          padding: "1.75rem 1.5rem",
          boxShadow: "0 0 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}>
          <div style={{
            position: "absolute", inset: 0, borderRadius: 20, pointerEvents: "none",
            background: "radial-gradient(ellipse at top, rgba(0,229,255,0.05) 0%, transparent 60%)",
          }} />
          {[
            { label: "Active Learners", to: 3241,  suf: "+", color: "#00E5FF" },
            { label: "XP Distributed",  to: 847000, suf: "",  color: "#FFE500" },
            { label: "Lessons On-chain",to: 156,   suf: "",  color: "rgba(240,240,240,0.5)" },
          ].map(({ label, to, suf, color }, i) => (
            <div key={label} style={{
              padding: "0.9rem 0",
              borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.05)" : "none",
            }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "clamp(1.4rem,2.2vw,1.9rem)", fontWeight: 500,
                color, letterSpacing: "-0.04em",
              }}>
                <Counter to={to} suffix={suf} />
              </div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9, fontWeight: 500,
                color: "rgba(240,240,240,0.28)",
                letterSpacing: "0.1em", textTransform: "uppercase",
                marginTop: 3,
              }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Ticker */}
      <div className="hero-5" style={{
        position: "absolute", bottom: 36, left: 0, right: 0,
        overflow: "hidden",
      }}>
        <div style={{
          display: "flex", gap: "2.5rem", whiteSpace: "nowrap",
          animation: "ticker 22s linear infinite",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10, color: "rgba(0,229,255,0.28)",
          letterSpacing: "0.12em",
        }}>
          {Array(8).fill(["◆ SOLANA","◆ TOKEN-2022","◆ METAPLEX CORE","◆ ANCHOR","◆ DEVNET","◆ SOULBOUND XP","◆ HELIUS DAS","◆ 283 TESTS"]).flat().map((t,i)=>(
            <span key={i}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Bento Features ─────────────────────────────────────────── */
function Bento() {
  const h = useReveal(0);
  const r0 = useReveal(0);
  const r1 = useReveal(90);
  const r2 = useReveal(160);
  const r3 = useReveal(220);
  const r4 = useReveal(280);

  const Tag = ({ label, color }) => (
    <span style={{
      display: "inline-block",
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 9, fontWeight: 500,
      letterSpacing: "0.12em", textTransform: "uppercase",
      color, background: `${color}10`,
      border: `1px solid ${color}28`,
      padding: "3px 9px", borderRadius: 3,
      marginBottom: "1.5rem",
    }}>{label}</span>
  );

  return (
    <section style={{ padding: "80px clamp(1.5rem,5vw,3.5rem) 80px", maxWidth: 1440, margin: "0 auto" }}>
      <div ref={h} style={{ marginBottom: "3.5rem" }}>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10, color: "#00E5FF", letterSpacing: "0.16em",
          textTransform: "uppercase", marginBottom: 14, opacity: 0.6,
        }}>// Architecture</div>
        <h2 style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800,
          fontSize: "clamp(2rem,4.5vw,3.5rem)",
          letterSpacing: "-0.04em", color: "#F0F0F0",
          lineHeight: 1.02, margin: 0,
        }}>
          Built different.{" "}
          <span style={{ color: "rgba(240,240,240,0.22)", fontWeight: 300, fontStyle: "italic" }}>
            By design.
          </span>
        </h2>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gridTemplateRows: "auto",
        gap: "0.875rem",
      }}>
        {/* LARGE — 2×2 */}
        <div ref={r0} className="card" style={{
          gridColumn: "span 2", gridRow: "span 2",
          padding: "2.25rem", minHeight: 340,
          display: "flex", flexDirection: "column", justifyContent: "space-between",
        }}>
          <div style={{
            position: "absolute", top: -60, right: -60,
            width: 220, height: 220, borderRadius: "50%", pointerEvents: "none",
            background: "radial-gradient(circle, rgba(0,229,255,0.07) 0%, transparent 68%)",
          }} />
          <div>
            <Tag label="Token-2022" color="#00E5FF" />
            <h3 style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 800,
              fontSize: "clamp(1.6rem,2.4vw,2.1rem)",
              letterSpacing: "-0.04em", color: "#F0F0F0",
              lineHeight: 1.1, marginBottom: "0.9rem",
            }}>Soulbound<br />XP Tokens</h3>
            <p style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: 14.5, fontWeight: 300,
              color: "rgba(240,240,240,0.45)", lineHeight: 1.72, maxWidth: 340,
            }}>
              Your learning progress is a NonTransferable Token-2022 asset.
              Your wallet balance <em style={{ fontStyle: "normal", color: "rgba(240,240,240,0.72)" }}>is</em> your
              XP. Permanently, irreversibly yours.
            </p>
          </div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            background: "rgba(0,0,0,0.45)", border: "1px solid rgba(0,229,255,0.14)",
            borderRadius: 8, padding: "10px 16px", alignSelf: "flex-start",
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#00FF94", boxShadow: "0 0 8px #00FF94", flexShrink: 0, display: "inline-block" }} />
            <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5, color: "#00E5FF" }}>
              Level = ⌊ √(XP ÷ 100) ⌋
            </code>
          </div>
        </div>

        {/* TALL — 1×2 */}
        <div ref={r1} className="card card-yellow" style={{
          gridColumn: "span 1", gridRow: "span 2",
          padding: "2rem", minHeight: 320,
          display: "flex", flexDirection: "column", justifyContent: "space-between",
        }}>
          <div style={{
            position: "absolute", bottom: -40, left: -40,
            width: 180, height: 180, borderRadius: "50%", pointerEvents: "none",
            background: "radial-gradient(circle, rgba(255,229,0,0.06) 0%, transparent 68%)",
          }} />
          <div>
            <Tag label="Metaplex Core" color="#FFE500" />
            {/* NFT mockup */}
            <div style={{
              width: "100%", maxWidth: 160, margin: "0 auto 1.25rem",
              aspectRatio: "1", borderRadius: 16,
              background: "linear-gradient(135deg, rgba(255,229,0,0.09), rgba(0,0,0,0.8))",
              border: "1px solid rgba(255,229,0,0.15)",
              boxShadow: "0 0 40px rgba(255,229,0,0.07)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 48, position: "relative", overflow: "hidden",
            }}>
              🎓
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: "45%",
                background: "linear-gradient(to top, rgba(0,0,0,0.75), transparent)",
              }} />
              <div style={{ position: "absolute", bottom: 10, left: 12 }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em" }}>CREDENTIAL</div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 11, color: "#F0F0F0" }}>Solana Builder</div>
              </div>
            </div>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 19, letterSpacing: "-0.03em", color: "#F0F0F0", marginBottom: "0.6rem" }}>
              On-chain Credentials
            </h3>
            <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 13.5, fontWeight: 300, color: "rgba(240,240,240,0.42)", lineHeight: 1.65 }}>
              Metaplex Core NFTs with PermanentFreezeDelegate. One per track, upgraded in-place. Zero clutter.
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginTop: "1rem" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#FFE500", boxShadow: "0 0 7px rgba(255,229,0,0.9)", display: "inline-block" }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(255,229,0,0.5)" }}>soulbound forever</span>
          </div>
        </div>

        {/* SMALL — 1×1 */}
        <div ref={r2} className="card card-red" style={{ gridColumn: "span 1", padding: "1.5rem", minHeight: 150 }}>
          <div style={{ position: "absolute", bottom: -20, right: -20, width: 100, height: 100, borderRadius: "50%", pointerEvents: "none", background: "radial-gradient(circle, rgba(255,107,107,0.07) 0%, transparent 68%)" }} />
          <Tag label="On-chain" color="#FF6B6B" />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 3, marginBottom: 14 }}>
            {Array.from({ length: 28 }).map((_, i) => (
              <div key={i} style={{
                width: 6, height: 6, borderRadius: "50%",
                background: i < 20 ? "#FF6B6B" : "rgba(255,255,255,0.07)",
                boxShadow: i < 20 ? "0 0 4px rgba(255,107,107,0.5)" : "none",
              }} />
            ))}
          </div>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, color: "#F0F0F0", marginBottom: 5 }}>256-bit Progress</div>
          <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 12.5, color: "rgba(240,240,240,0.38)", lineHeight: 1.6 }}>Gas-efficient bitmap per enrollment.</div>
        </div>

        {/* SMALL — 1×1 */}
        <div ref={r3} className="card card-purple" style={{ gridColumn: "span 1", padding: "1.5rem", minHeight: 150 }}>
          <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", pointerEvents: "none", background: "radial-gradient(circle, rgba(167,139,250,0.07) 0%, transparent 68%)" }} />
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
            {["EN","PT-BR","ES"].map((l, i) => (
              <span key={l} style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, fontWeight: 600,
                padding: "3px 9px", borderRadius: 4,
                ...(i === 0
                  ? { background: "#A78BFA", color: "#06060a" }
                  : { background: "rgba(167,139,250,0.07)", color: "rgba(240,240,240,0.4)", border: "1px solid rgba(167,139,250,0.15)" }
                ),
              }}>{l}</span>
            ))}
          </div>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, color: "#F0F0F0", marginBottom: 5 }}>Built for LATAM</div>
          <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 12.5, color: "rgba(240,240,240,0.38)", lineHeight: 1.6 }}>Full i18n by native speakers.</div>
        </div>

        {/* WIDE — 2×1 */}
        <div ref={r4} className="card" style={{
          gridColumn: "span 2", padding: "1.75rem 2rem",
          display: "flex", alignItems: "center", gap: "1.75rem", minHeight: 140,
        }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: 20, pointerEvents: "none", background: "radial-gradient(ellipse at right, rgba(0,229,255,0.04) 0%, transparent 60%)" }} />
          <div style={{
            flexShrink: 0, width: 52, height: 52, borderRadius: 13,
            background: "rgba(0,229,255,0.07)",
            border: "1px solid rgba(0,229,255,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 22, color: "#00E5FF",
          }}>≋</div>
          <div>
            <Tag label="Helius DAS" color="#00E5FF" />
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, color: "#F0F0F0", marginBottom: 5 }}>Off-chain Leaderboard</div>
            <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 13.5, color: "rgba(240,240,240,0.42)", lineHeight: 1.65 }}>
              Helius DAS API indexes XP token balances in real-time. Zero on-chain cost.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Courses ────────────────────────────────────────────────── */
function Courses() {
  const headRef = useReveal(0);
  const courses = [
    { track: "Foundation", title: "Solana Foundations",    lessons: 12, xp: 600,  level: "Beginner",     pct: 73,  accent: "#00E5FF", langs: ["EN","PT","ES"] },
    { track: "Programs",   title: "Anchor Development",    lessons: 18, xp: 900,  level: "Intermediate", pct: 41,  accent: "#FFE500", langs: ["EN","PT"] },
    { track: "Tokens",     title: "Token-2022 Extensions", lessons: 14, xp: 700,  level: "Advanced",     pct: 28,  accent: "#A78BFA", langs: ["EN"] },
    { track: "DeFi",       title: "DeFi on Solana",        lessons: 20, xp: 1000, level: "Expert",       pct: 15,  accent: "#FF6B6B", langs: ["EN","ES"] },
  ];

  return (
    <section style={{ padding: "80px clamp(1.5rem,5vw,3.5rem)", maxWidth: 1440, margin: "0 auto" }}>
      <div ref={headRef} style={{ marginBottom: "3rem", display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#FFE500", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 12, opacity: 0.6 }}>
            // Curriculum
          </div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2rem,4.5vw,3.5rem)", letterSpacing: "-0.04em", color: "#F0F0F0", margin: 0 }}>
            Pick your track
          </h2>
        </div>
        <a href="#" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "rgba(240,240,240,0.35)", textDecoration: "none", letterSpacing: "0.04em", transition: "color 250ms" }}
          onMouseEnter={e => e.target.style.color = "#00E5FF"}
          onMouseLeave={e => e.target.style.color = "rgba(240,240,240,0.35)"}>
          view_all →
        </a>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "0.875rem" }}>
        {courses.map((c, i) => {
          const ref = useReveal(i * 70);
          return (
            <div key={c.title} ref={ref} className="card" style={{
              padding: "1.75rem",
              borderColor: `rgba(${c.accent === "#00E5FF" ? "0,229,255" : c.accent === "#FFE500" ? "255,229,0" : c.accent === "#A78BFA" ? "167,139,250" : "255,107,107"}, 0.1)`,
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${c.accent}38`;
                e.currentTarget.style.boxShadow = `0 24px 70px rgba(0,0,0,0.65), 0 0 40px ${c.accent}12`;
                e.currentTarget.style.transform = "translateY(-5px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Top */}
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.25rem" }}>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 500,
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  color: c.accent, background: `${c.accent}10`,
                  border: `1px solid ${c.accent}25`,
                  padding: "3px 8px", borderRadius: 3,
                }}>{c.track}</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, color: "rgba(240,240,240,0.28)" }}>{c.level}</span>
              </div>

              <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18.5, letterSpacing: "-0.025em", color: "#F0F0F0", marginBottom: "1.1rem" }}>
                {c.title}
              </h3>

              {/* Progress */}
              <div style={{ marginBottom: "1.25rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(240,240,240,0.3)", letterSpacing: "0.07em", textTransform: "uppercase" }}>Completion</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: c.accent }}>{c.pct}%</span>
                </div>
                <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 99, overflow: "hidden" }}>
                  <div className="progress-bar" style={{
                    width: `${c.pct}%`,
                    background: `linear-gradient(90deg, ${c.accent}, ${c.accent}99)`,
                    boxShadow: `0 0 10px ${c.accent}`,
                  }} />
                </div>
              </div>

              {/* Footer */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "0.9rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "rgba(240,240,240,0.38)" }}>{c.lessons} lessons</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#FFE500" }}>⬡ {c.xp} XP</span>
                </div>
                <div style={{ display: "flex", gap: 4 }}>
                  {c.langs.map(l => (
                    <span key={l} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(240,240,240,0.3)", border: "1px solid rgba(255,255,255,0.1)", padding: "1px 6px", borderRadius: 3 }}>{l}</span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ── Level Progression ──────────────────────────────────────── */
function Levels() {
  const headRef = useReveal(0);
  const chartRef = useReveal(200);
  const levels = [
    { lv: 0,  xp: "0",      label: "Genesis",   color: "rgba(240,240,240,0.18)" },
    { lv: 1,  xp: "100",    label: "Initiate",  color: "#00E5FF" },
    { lv: 3,  xp: "900",    label: "Builder",   color: "#A78BFA" },
    { lv: 5,  xp: "2,500",  label: "Deployer",  color: "#FFE500" },
    { lv: 10, xp: "10,000", label: "Architect", color: "#FF6B6B" },
  ];

  return (
    <section style={{
      padding: "80px clamp(1.5rem,5vw,3.5rem)", maxWidth: 1440, margin: "0 auto",
      background: "linear-gradient(180deg, transparent 0%, rgba(0,229,255,0.018) 50%, transparent 100%)",
    }}>
      <div ref={headRef} style={{ textAlign: "center", marginBottom: "4rem" }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#FFE500", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 14, opacity: 0.6 }}>
          // Progression
        </div>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2rem,4.5vw,3.5rem)", letterSpacing: "-0.04em", color: "#F0F0F0", margin: "0 0 1rem" }}>
          Your level lives on-chain
        </h2>
        <code style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: 13.5,
          color: "#00E5FF",
          background: "rgba(0,229,255,0.05)", border: "1px solid rgba(0,229,255,0.15)",
          padding: "7px 18px", borderRadius: 6, letterSpacing: "0.03em",
        }}>Level = floor( sqrt( XP / 100 ) )</code>
      </div>

      <div ref={chartRef} style={{ display: "flex", gap: "1.5rem", alignItems: "flex-end", justifyContent: "center", flexWrap: "wrap" }}>
        {levels.map((l, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, animationDelay: `${i * 0.1}s` }}>
            <div className="bar-col" style={{
              width: 64, height: 48 + i * 34,
              background: `linear-gradient(180deg, ${l.color}20, ${l.color}42)`,
              border: `1px solid ${l.color}30`,
              borderRadius: "7px 7px 0 0",
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative", overflow: "hidden",
              animationDelay: `${0.2 + i * 0.1}s`,
            }}>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: `${25 + i * 14}%`, background: `linear-gradient(0deg, ${l.color}55, transparent)` }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: 13, color: l.color, zIndex: 1 }}>Lv.{l.lv}</span>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 700, color: l.color }}>{l.label}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, color: "rgba(240,240,240,0.3)", marginTop: 2 }}>{l.xp} XP</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Stats Band ─────────────────────────────────────────────── */
function Stats() {
  const ref = useReveal(0);
  const data = [
    { to: 3241,  suf: "+", label: "Active Learners",  c: "#00E5FF" },
    { to: 283,   suf: "",  label: "Tests Passing",     c: "#00FF94" },
    { to: 90,    suf: "%", label: "Code Coverage",     c: "#FFE500" },
    { to: 56929, suf: "+", label: "Lines Shipped",     c: "#A78BFA" },
  ];
  return (
    <section style={{ padding: "0 clamp(1.5rem,5vw,3.5rem) 80px", maxWidth: 1440, margin: "0 auto" }}>
      <div ref={ref} className="card" style={{ padding: "3rem 2.5rem" }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: 20, pointerEvents: "none", background: "radial-gradient(ellipse at top, rgba(0,229,255,0.03) 0%, transparent 60%)" }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "2rem", textAlign: "center" }}>
          {data.map(({ to, suf, label, c }) => (
            <div key={label}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2rem,3.5vw,3rem)", letterSpacing: "-0.05em", color: c }}>
                <Counter to={to} suffix={suf} />
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, color: "rgba(240,240,240,0.3)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 6 }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CTA ────────────────────────────────────────────────────── */
function CTA() {
  const ref = useReveal(0);
  return (
    <section style={{ padding: "100px clamp(1.5rem,5vw,3.5rem) 120px", maxWidth: 1440, margin: "0 auto", textAlign: "center", position: "relative" }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(0,229,255,0.04) 0%, transparent 70%)",
      }} />
      <div ref={ref}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#00E5FF", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 20, opacity: 0.55 }}>
          // Ready?
        </div>
        <h2 style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800,
          fontSize: "clamp(2.8rem,7vw,6rem)",
          letterSpacing: "-0.046em", lineHeight: 0.92,
          color: "#F0F0F0", margin: "0 0 1.5rem",
        }}>
          Start earning<br />
          <span style={{ color: "#FFE500", textShadow: "0 0 50px rgba(255,229,0,0.18)" }}>your credentials.</span>
        </h2>
        <p style={{
          fontFamily: "'Bricolage Grotesque', sans-serif",
          fontSize: 16, fontWeight: 300,
          color: "rgba(240,240,240,0.42)",
          maxWidth: 420, margin: "0 auto 2.75rem", lineHeight: 1.75,
        }}>
          Connect your wallet. Learn at your own pace. Every credential is yours forever — soulbound, on-chain.
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "2.5rem" }}>
          <button className="btn-primary" style={{
            padding: "17px 44px", fontSize: 16,
            boxShadow: "0 0 60px rgba(0,229,255,0.32), 0 0 0 1px rgba(0,229,255,0.2)",
          }}>
            Connect Wallet & Begin →
          </button>
          <a href="https://superteam-academy.vercel.app" target="_blank" rel="noopener noreferrer" style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5,
            color: "rgba(0,229,255,0.4)", textDecoration: "none",
            display: "flex", alignItems: "center",
            transition: "color 300ms",
          }}
            onMouseEnter={e => e.target.style.color = "rgba(0,229,255,0.85)"}
            onMouseLeave={e => e.target.style.color = "rgba(0,229,255,0.4)"}>
            view_live_demo ↗
          </a>
        </div>

        <div style={{ display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap" }}>
          {["Devnet Ready","Open Source · MIT","EN · PT-BR · ES","TypeScript Strict"].map(t => (
            <span key={t} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, color: "rgba(240,240,240,0.22)", letterSpacing: "0.06em" }}>
              ✓ {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Footer ─────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid rgba(255,255,255,0.05)",
      padding: "2rem clamp(1.5rem,5vw,3.5rem)",
      maxWidth: 1440, margin: "0 auto",
      display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 28, height: 28, borderRadius: 7, background: "rgba(0,229,255,0.06)", border: "1px solid rgba(0,229,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 9, color: "rgba(0,229,255,0.5)" }}>ST</span>
        </div>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "rgba(240,240,240,0.2)" }}>
          © 2026 Superteam Academy · MIT License
        </span>
      </div>
      <div style={{ display: "flex", gap: "1.75rem" }}>
        {["GitHub","Twitter","Docs"].map(l => (
          <a key={l} href="#" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "rgba(240,240,240,0.25)", textDecoration: "none", transition: "color 250ms" }}
            onMouseEnter={e => e.target.style.color = "#00E5FF"}
            onMouseLeave={e => e.target.style.color = "rgba(240,240,240,0.25)"}>
            {l}
          </a>
        ))}
      </div>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "rgba(0,229,255,0.35)" }}>
        Built on Solana ◆
      </span>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ROOT
═══════════════════════════════════════════════════════════════ */
export default function App() {
  return (
    <>
      <style>{CSS}</style>
      <div style={{ position: "relative", minHeight: "100vh", background: "var(--bg)" }}>
        <Orbs />
        <div style={{ position: "relative", zIndex: 10 }}>
          <Navbar />
          <Hero />
          <Bento />
          <Courses />
          <Levels />
          <Stats />
          <CTA />
          <Footer />
        </div>
      </div>
    </>
  );
}
