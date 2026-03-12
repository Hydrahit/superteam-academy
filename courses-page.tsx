"use client";

import { useState, useEffect, useRef } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&family=JetBrains+Mono:wght@400;500;600&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth;background:#060608}
  body{background:#060608;overflow-x:hidden;-webkit-font-smoothing:antialiased}
  ::selection{background:rgba(20,241,149,.18);color:#14F195}
  ::-webkit-scrollbar{width:2px}
  ::-webkit-scrollbar-track{background:#060608}
  ::-webkit-scrollbar-thumb{background:linear-gradient(to bottom,#14F195,#9945FF);border-radius:99px}
  .f-head{font-family:'Space Grotesk',sans-serif}
  .f-body{font-family:'DM Sans',sans-serif}
  .f-mono{font-family:'JetBrains Mono',monospace}
  @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
  @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
  @keyframes glowPulse{0%,100%{box-shadow:0 0 20px rgba(20,241,149,.25),0 0 60px rgba(20,241,149,.08)}50%{box-shadow:0 0 44px rgba(20,241,149,.6),0 0 110px rgba(20,241,149,.2)}}
  @keyframes orbFloat{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(28px,-18px) scale(1.04)}66%{transform:translate(-18px,14px) scale(.97)}}
  @keyframes orbFloat2{0%,100%{transform:translate(0,0)}50%{transform:translate(-22px,18px) scale(1.03)}}
  @keyframes gradShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
  @keyframes heartbeat{0%,100%{transform:scale(1)}14%{transform:scale(1.18)}28%{transform:scale(1)}42%{transform:scale(1.1)}}
  @keyframes rankIn{from{opacity:0;transform:translateX(-20px)}to{opacity:1;transform:translateX(0)}}
  .shimmer-text{background:linear-gradient(90deg,#14F195 0%,#9945FF 25%,#14F195 50%,#9945FF 75%,#14F195 100%);background-size:200% auto;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:shimmer 4s linear infinite}
  .glass{background:rgba(255,255,255,.026);backdrop-filter:blur(32px) saturate(1.5);-webkit-backdrop-filter:blur(32px) saturate(1.5);border:1px solid rgba(255,255,255,.072);position:relative;transition:transform 500ms cubic-bezier(.16,1,.3,1),box-shadow 500ms ease,border-color 300ms ease}
  .glass::before{content:'';position:absolute;top:0;left:14%;right:14%;height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.11),transparent);border-radius:99px;pointer-events:none}
  .nav-link{color:rgba(255,255,255,.32);transition:color 200ms ease;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;text-decoration:none;position:relative}
  .nav-link::after{content:'';position:absolute;bottom:-4px;left:0;right:0;height:1px;background:linear-gradient(90deg,#14F195,#9945FF);transform:scaleX(0);transition:transform 250ms ease;transform-origin:left}
  .nav-link:hover{color:rgba(255,255,255,.9)}
  .nav-link:hover::after{transform:scaleX(1)}
  .nav-link.active{color:#fff}
  .nav-link.active::after{transform:scaleX(1)}
  .btn-primary{display:inline-flex;align-items:center;gap:10px;padding:12px 24px;border-radius:12px;background:#14F195;border:none;cursor:pointer;font-family:'Space Grotesk',sans-serif;font-size:14px;font-weight:700;color:#060608;letter-spacing:-.02em;position:relative;overflow:hidden;transition:transform 200ms ease,filter 200ms ease}
  .btn-primary:hover{transform:translateY(-2px) scale(1.02);filter:brightness(1.08)}
  .btn-secondary{padding:12px 24px;border-radius:12px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;color:rgba(255,255,255,.5);cursor:pointer;transition:all 300ms ease}
  .btn-secondary:hover{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.18);color:rgba(255,255,255,.88);transform:translateY(-2px)}
  .course-card{border-radius:20px;background:rgba(255,255,255,.024);border:1px solid rgba(255,255,255,.07);transition:transform 400ms cubic-bezier(.16,1,.3,1),box-shadow 400ms ease,border-color 300ms ease;position:relative;overflow:hidden;cursor:pointer}
  .course-card:hover{transform:translateY(-6px);box-shadow:0 24px 60px rgba(0,0,0,.7)}
  .filter-pill{padding:7px 16px;border-radius:99px;font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:600;cursor:pointer;transition:all 250ms ease;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.04);color:rgba(255,255,255,.4);letter-spacing:.04em;text-transform:uppercase}
  .filter-pill:hover{background:rgba(255,255,255,.08);color:rgba(255,255,255,.7)}
  .filter-pill.active{background:rgba(20,241,149,.1);border-color:rgba(20,241,149,.3);color:#14F195}
  .scroll-progress{position:fixed;top:0;left:0;height:2px;z-index:200;background:linear-gradient(90deg,#14F195,#9945FF,#14F195);background-size:200% 100%;animation:gradShift 3s linear infinite;transition:width 80ms linear}
  .cursor-spotlight{position:fixed;width:520px;height:520px;border-radius:50%;background:radial-gradient(circle,rgba(20,241,149,.048) 0%,rgba(153,69,255,.025) 40%,transparent 70%);pointer-events:none;z-index:1;transform:translate(-50%,-50%);transition:left 60ms linear,top 60ms linear;mix-blend-mode:screen}
  .reveal{opacity:0;transform:translateY(24px);transition:opacity 800ms cubic-bezier(.16,1,.3,1),transform 800ms cubic-bezier(.16,1,.3,1)}
  .reveal.on{opacity:1;transform:translateY(0)}
  @media(max-width:900px){.nav-links,.nav-cta{display:none!important}.grid-3{grid-template-columns:1fr!important}.page-pad{padding:100px 20px 60px!important}}
`;

const COURSES = [
  { slug:"web3-basics", track:"Foundation", title:"Web3 & Blockchain Basics", lessons:10, xp:500, tag:"Beginner", pct:0, accent:"#14F195", emoji:"🌐", duration:"4h", desc:"Start your Web3 journey. Understand blockchain, wallets, and the decentralized internet." },
  { slug:"solana-fundamentals", track:"Solana", title:"Solana Fundamentals", lessons:14, xp:700, tag:"Beginner", pct:0, accent:"#9945FF", emoji:"⚡", duration:"6h", desc:"Deep dive into Solana's architecture, accounts model, and transaction lifecycle." },
  { slug:"anchor-development", track:"Programs", title:"Anchor Development", lessons:18, xp:900, tag:"Intermediate", pct:0, accent:"#60a5fa", emoji:"⚓", duration:"10h", desc:"Build Solana programs with the Anchor framework. PDAs, CPIs, and advanced patterns." },
  { slug:"defi-on-solana", track:"DeFi", title:"DeFi on Solana", lessons:16, xp:800, tag:"Intermediate", pct:0, accent:"#f59e0b", emoji:"💱", duration:"8h", desc:"Explore AMMs, lending protocols, and yield strategies on the Solana DeFi ecosystem." },
  { slug:"nfts-metaplex", track:"NFTs", title:"NFTs & Metaplex", lessons:12, xp:600, tag:"Intermediate", pct:0, accent:"#a78bfa", emoji:"🎨", duration:"5h", desc:"Mint, manage, and build with NFTs using Metaplex Core and Token Metadata." },
  { slug:"token-2022", track:"Tokens", title:"Token-2022 Extensions", lessons:14, xp:700, tag:"Advanced", pct:0, accent:"#f87171", emoji:"🪙", duration:"7h", desc:"Master the new token standard: transfer hooks, confidential transfers, and more." },
];

const TRACKS = ["All", "Foundation", "Solana", "Programs", "DeFi", "NFTs", "Tokens"];
const LEVELS = ["All", "Beginner", "Intermediate", "Advanced"];

function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    el.style.transitionDelay = `${delay}ms`; el.classList.add("reveal");
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("on"); obs.disconnect(); } }, { threshold: .06 });
    obs.observe(el); return () => obs.disconnect();
  }, [delay]);
  return ref;
}

function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const fn = () => { const el = document.documentElement; setPct((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100); };
    window.addEventListener("scroll", fn, { passive: true }); return () => window.removeEventListener("scroll", fn);
  }, []);
  return <div className="scroll-progress" style={{ width: `${pct}%` }} />;
}

function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const fn = (e: MouseEvent) => { if (ref.current) { ref.current.style.left = e.clientX + "px"; ref.current.style.top = e.clientY + "px"; } };
    window.addEventListener("mousemove", fn, { passive: true }); return () => window.removeEventListener("mousemove", fn);
  }, []);
  return <div ref={ref} className="cursor-spotlight" />;
}

function Background() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "-25%", left: "-15%", width: "70vw", height: "70vw", borderRadius: "50%", background: "radial-gradient(circle,rgba(153,69,255,.062) 0%,transparent 65%)", animation: "orbFloat 14s ease-in-out infinite" }} />
      <div style={{ position: "absolute", top: "-10%", right: "-8%", width: "55vw", height: "55vw", borderRadius: "50%", background: "radial-gradient(circle,rgba(20,241,149,.042) 0%,transparent 65%)", animation: "orbFloat2 17s ease-in-out infinite" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle,rgba(255,255,255,.048) 1px,transparent 1px)", backgroundSize: "30px 30px", maskImage: "radial-gradient(ellipse 85% 85% at 50% 50%,black 20%,transparent 100%)", WebkitMaskImage: "radial-gradient(ellipse 85% 85% at 50% 50%,black 20%,transparent 100%)" }} />
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 30); window.addEventListener("scroll", fn, { passive: true }); return () => window.removeEventListener("scroll", fn); }, []);
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: 62, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 48px", background: scrolled ? "rgba(6,6,8,.9)" : "transparent", backdropFilter: scrolled ? "blur(28px) saturate(1.6)" : "none", borderBottom: scrolled ? "1px solid rgba(255,255,255,.05)" : "none", transition: "all 600ms cubic-bezier(.16,1,.3,1)" }}>
      <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
        <div style={{ width: 34, height: 34, borderRadius: 9, background: "linear-gradient(135deg,#14F195,#9945FF)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 22px rgba(20,241,149,.38)" }}>
          <span className="f-head" style={{ fontSize: 12, fontWeight: 800, color: "#060608" }}>ST</span>
        </div>
        <span className="f-head" style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-.03em", color: "rgba(255,255,255,.9)" }}>Superteam<span style={{ color: "rgba(255,255,255,.26)", fontWeight: 300 }}> Academy</span></span>
      </a>
      <div className="nav-links" style={{ display: "flex", gap: 30 }}>
        {[["Courses", "/courses"], ["Leaderboard", "/leaderboard"], ["Dashboard", "/dashboard"]].map(([l, h]) => (
          <a key={l} href={h} className={`nav-link ${h === "/courses" ? "active" : ""}`}>{l}</a>
        ))}
      </div>
      <WalletMultiButton className="nav-cta" style={{ background: "#14F195", color: "#060608", fontFamily: "Space Grotesk,sans-serif", fontWeight: 700, fontSize: 13, borderRadius: 10, padding: "9px 20px", height: "auto", lineHeight: "normal" }} />
    </nav>
  );
}

function CourseCard({ course, delay }: { course: typeof COURSES[0], delay: number }) {
  const ref = useReveal(delay);
  return (
    <div ref={ref} className="course-card" onClick={() => window.location.href = `/courses/${course.slug}`} style={{ padding: 28 }}>
      <div style={{ position: "absolute", top: -40, right: -40, width: 120, height: 120, borderRadius: "50%", background: `radial-gradient(circle,${course.accent}18 0%,transparent 70%)`, pointerEvents: "none" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
        <div>
          <span className="f-mono" style={{ display: "inline-block", fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: course.accent, background: `${course.accent}14`, border: `1px solid ${course.accent}28`, padding: "2px 10px", borderRadius: 4, marginBottom: 10 }}>{course.track}</span>
          <h3 className="f-head" style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-.035em", color: "#fff", lineHeight: 1.2 }}>{course.title}</h3>
        </div>
        <span style={{ fontSize: 32 }}>{course.emoji}</span>
      </div>
      <p className="f-body" style={{ fontSize: 13.5, fontWeight: 300, color: "rgba(255,255,255,.36)", lineHeight: 1.68, marginBottom: 20 }}>{course.desc}</p>
      <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
        {[`${course.lessons} lessons`, course.duration, course.tag].map(t => (
          <span key={t} className="f-mono" style={{ fontSize: 10, color: "rgba(255,255,255,.2)", letterSpacing: ".07em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ color: course.accent, opacity: .6 }}>◆</span>{t}
          </span>
        ))}
      </div>
      <div style={{ marginBottom: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span className="f-mono" style={{ fontSize: 10, color: "rgba(255,255,255,.2)", letterSpacing: ".06em", textTransform: "uppercase" }}>Progress</span>
          <span className="f-mono" style={{ fontSize: 10, color: course.accent }}>{course.pct}%</span>
        </div>
        <div style={{ height: 3, background: "rgba(255,255,255,.052)", borderRadius: 99, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${course.pct}%`, background: `linear-gradient(90deg,${course.accent}88,${course.accent})`, borderRadius: 99 }} />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 16, borderTop: "1px solid rgba(255,255,255,.048)" }}>
        <span className="f-head" style={{ fontSize: 15, fontWeight: 700, color: course.accent }}>{course.xp} XP</span>
        <button className="btn-primary" style={{ padding: "8px 18px", fontSize: 13, borderRadius: 9, animation: "none" }}>
          Start →
        </button>
      </div>
    </div>
  );
}

export default function CoursesPage() {
  const [track, setTrack] = useState("All");
  const [level, setLevel] = useState("All");
  const [search, setSearch] = useState("");
  const headerRef = useReveal(0);

  const filtered = COURSES.filter(c => {
    const matchTrack = track === "All" || c.track === track;
    const matchLevel = level === "All" || c.tag === level;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.track.toLowerCase().includes(search.toLowerCase());
    return matchTrack && matchLevel && matchSearch;
  });

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} suppressHydrationWarning />
      <div style={{ position: "relative", background: "#060608", minHeight: "100vh", overflowX: "hidden" }}>
        <ScrollProgress />
        <CursorSpotlight />
        <Background />
        <Navbar />

        <div className="page-pad" style={{ position: "relative", zIndex: 10, padding: "110px 48px 80px", maxWidth: 1440, margin: "0 auto" }}>

          {/* Header */}
          <div ref={headerRef} style={{ marginBottom: 52 }}>
            <span className="f-mono" style={{ display: "inline-block", fontSize: 11, color: "rgba(20,241,149,.52)", letterSpacing: ".13em", textTransform: "uppercase", marginBottom: 14 }}>//  Curriculum</span>
            <h1 className="f-head" style={{ fontSize: "clamp(2.4rem,5vw,5rem)", fontWeight: 700, letterSpacing: "-.048em", color: "#fff", lineHeight: .92, marginBottom: 16 }}>
              Pick your <span className="shimmer-text">track.</span>
            </h1>
            <p className="f-body" style={{ fontSize: 16, fontWeight: 300, color: "rgba(255,255,255,.35)", maxWidth: 480, lineHeight: 1.72 }}>
              Every course ends with an on-chain NFT credential. Your XP is soulbound — non-transferable, permanently yours.
            </p>
          </div>

          {/* Search + Filters */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginBottom: 40, alignItems: "center" }}>
            <div className="glass" style={{ borderRadius: 12, padding: "10px 16px", display: "flex", alignItems: "center", gap: 10, flex: "0 0 280px" }}>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,.3)" strokeWidth={2}><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search courses..." className="f-body" style={{ background: "none", border: "none", outline: "none", color: "#fff", fontSize: 13, width: "100%" }} />
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {TRACKS.map(t => <button key={t} className={`filter-pill ${track === t ? "active" : ""}`} onClick={() => setTrack(t)}>{t}</button>)}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {LEVELS.map(l => <button key={l} className={`filter-pill ${level === l ? "active" : ""}`} onClick={() => setLevel(l)}>{l}</button>)}
            </div>
          </div>

          {/* Stats bar */}
          <div style={{ display: "flex", gap: 28, marginBottom: 36, flexWrap: "wrap" }}>
            {[["6", "Total Courses"], ["156", "Total Lessons"], ["4,200", "XP Available"], ["100%", "On-Chain"]].map(([v, l]) => (
              <div key={l} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span className="f-head" style={{ fontSize: 18, fontWeight: 700, color: "#14F195" }}>{v}</span>
                <span className="f-mono" style={{ fontSize: 10, color: "rgba(255,255,255,.2)", letterSpacing: ".08em", textTransform: "uppercase" }}>{l}</span>
              </div>
            ))}
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
              <p className="f-body" style={{ color: "rgba(255,255,255,.3)", fontSize: 16 }}>No courses match your filters</p>
            </div>
          ) : (
            <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
              {filtered.map((c, i) => <CourseCard key={c.slug} course={c} delay={i * 60} />)}
            </div>
          )}
        </div>

        {/* Footer */}
        <footer style={{ position: "relative", zIndex: 10, borderTop: "1px solid rgba(255,255,255,.042)", padding: "24px 48px", maxWidth: 1440, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14 }}>
            <span className="f-body" style={{ fontSize: 13, color: "rgba(255,255,255,.18)" }}>Superteam Academy · MIT · 2026</span>
            <div style={{ display: "flex", gap: 24 }}>
              {["GitHub", "Twitter", "Docs"].map(l => <a key={l} href="#" className="nav-link" style={{ fontSize: 12 }}>{l}</a>)}
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
