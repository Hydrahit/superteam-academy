"use client";

import { useState, useEffect, useRef } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { I18nThemeProvider, useTranslation, useTheme } from "@/lib/i18n/context";

const BASE_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&family=JetBrains+Mono:wght@400;500;600&display=swap');

  :root, html[data-theme="dark"] {
    --bg: #060608;
    --bg2: #0c0c10;
    --surface: rgba(255,255,255,.026);
    --surface-hover: rgba(255,255,255,.04);
    --border: rgba(255,255,255,.072);
    --border-hover: rgba(255,255,255,.14);
    --text: #ffffff;
    --text-sub: rgba(255,255,255,.38);
    --text-faint: rgba(255,255,255,.18);
    --text-muted: rgba(255,255,255,.32);
    --green: #14F195;
    --green-dim: rgba(20,241,149,.12);
    --green-border: rgba(20,241,149,.22);
    --purple: #9945FF;
    --purple-dim: rgba(153,69,255,.1);
    --purple-border: rgba(153,69,255,.2);
    --nav-bg: rgba(6,6,8,.9);
    --card-bg: rgba(255,255,255,.024);
    --input-bg: rgba(255,255,255,.04);
    --pill-bg: rgba(255,255,255,.04);
    --pill-text: rgba(255,255,255,.4);
    --pill-border: rgba(255,255,255,.1);
    --footer-border: rgba(255,255,255,.042);
    --dot-color: rgba(255,255,255,.048);
    --orb1: rgba(153,69,255,.062);
    --orb2: rgba(20,241,149,.042);
  }

  html[data-theme="light"] {
    --bg: #F0EFE9;
    --bg2: #E8E7E0;
    --surface: rgba(255,255,255,.75);
    --surface-hover: rgba(255,255,255,.9);
    --border: rgba(0,0,0,.09);
    --border-hover: rgba(0,0,0,.16);
    --text: #0C0C12;
    --text-sub: rgba(12,12,18,.55);
    --text-faint: rgba(12,12,18,.3);
    --text-muted: rgba(12,12,18,.5);
    --green: #00A866;
    --green-dim: rgba(0,168,102,.1);
    --green-border: rgba(0,168,102,.25);
    --purple: #7B2FBE;
    --purple-dim: rgba(123,47,190,.08);
    --purple-border: rgba(123,47,190,.22);
    --nav-bg: rgba(240,239,233,.92);
    --card-bg: rgba(255,255,255,.6);
    --input-bg: rgba(255,255,255,.8);
    --pill-bg: rgba(0,0,0,.04);
    --pill-text: rgba(0,0,0,.45);
    --pill-border: rgba(0,0,0,.1);
    --footer-border: rgba(0,0,0,.07);
    --dot-color: rgba(0,0,0,.05);
    --orb1: rgba(123,47,190,.06);
    --orb2: rgba(0,168,102,.04);
  }

  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth;background:var(--bg)}
  body{background:var(--bg);overflow-x:hidden;-webkit-font-smoothing:antialiased;transition:background 400ms ease,color 400ms ease}
  ::selection{background:rgba(20,241,149,.18);color:var(--green)}
  ::-webkit-scrollbar{width:2px}
  ::-webkit-scrollbar-track{background:var(--bg)}
  ::-webkit-scrollbar-thumb{background:linear-gradient(to bottom,var(--green),var(--purple));border-radius:99px}

  .f-head{font-family:'Space Grotesk',sans-serif}
  .f-body{font-family:'DM Sans',sans-serif}
  .f-mono{font-family:'JetBrains Mono',monospace}

  @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
  @keyframes gradShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
  @keyframes orbFloat{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(28px,-18px) scale(1.04)}66%{transform:translate(-18px,14px) scale(.97)}}
  @keyframes orbFloat2{0%,100%{transform:translate(0,0)}50%{transform:translate(-22px,18px) scale(1.03)}}
  @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
  @keyframes langIn{from{opacity:0;transform:translateY(-8px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}

  .shimmer-text{
    background:linear-gradient(90deg,var(--green) 0%,var(--purple) 25%,var(--green) 50%,var(--purple) 75%,var(--green) 100%);
    background-size:200% auto;-webkit-background-clip:text;background-clip:text;
    -webkit-text-fill-color:transparent;animation:shimmer 4s linear infinite
  }
  .glass{
    background:var(--surface);
    backdrop-filter:blur(32px) saturate(1.5);-webkit-backdrop-filter:blur(32px) saturate(1.5);
    border:1px solid var(--border);position:relative;
    transition:all 400ms cubic-bezier(.16,1,.3,1)
  }
  .glass::before{content:'';position:absolute;top:0;left:14%;right:14%;height:1px;background:linear-gradient(90deg,transparent,var(--border-hover),transparent);border-radius:99px;pointer-events:none}
  .nav-link{color:var(--text-muted);transition:color 200ms ease;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;text-decoration:none;position:relative}
  .nav-link::after{content:'';position:absolute;bottom:-4px;left:0;right:0;height:1px;background:linear-gradient(90deg,var(--green),var(--purple));transform:scaleX(0);transition:transform 250ms ease;transform-origin:left}
  .nav-link:hover{color:var(--text)}
  .nav-link:hover::after,.nav-link.active::after{transform:scaleX(1)}
  .nav-link.active{color:var(--text)}

  .btn-primary{display:inline-flex;align-items:center;gap:10px;padding:12px 24px;border-radius:12px;background:var(--green);border:none;cursor:pointer;font-family:'Space Grotesk',sans-serif;font-size:14px;font-weight:700;color:#060608;letter-spacing:-.02em;transition:transform 200ms ease,filter 200ms ease;position:relative;overflow:hidden}
  .btn-primary:hover{transform:translateY(-2px) scale(1.02);filter:brightness(1.08)}

  .course-card{border-radius:20px;background:var(--card-bg);border:1px solid var(--border);transition:transform 400ms cubic-bezier(.16,1,.3,1),box-shadow 400ms ease,border-color 300ms ease;position:relative;overflow:hidden;cursor:pointer;backdrop-filter:blur(12px)}
  .course-card:hover{transform:translateY(-6px);box-shadow:0 24px 60px rgba(0,0,0,.18)}

  .filter-pill{padding:7px 16px;border-radius:99px;font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:600;cursor:pointer;transition:all 250ms ease;border:1px solid var(--pill-border);background:var(--pill-bg);color:var(--pill-text);letter-spacing:.04em;text-transform:uppercase}
  .filter-pill:hover{background:var(--surface-hover);color:var(--text)}
  .filter-pill.active{background:var(--green-dim);border-color:var(--green-border);color:var(--green)}

  .scroll-progress{position:fixed;top:0;left:0;height:2px;z-index:200;background:linear-gradient(90deg,var(--green),var(--purple),var(--green));background-size:200% 100%;animation:gradShift 3s linear infinite;transition:width 80ms linear}
  .cursor-spotlight{position:fixed;width:520px;height:520px;border-radius:50%;background:radial-gradient(circle,rgba(20,241,149,.048) 0%,rgba(153,69,255,.025) 40%,transparent 70%);pointer-events:none;z-index:1;transform:translate(-50%,-50%);transition:left 60ms linear,top 60ms linear;mix-blend-mode:screen}

  html[data-theme="light"] .cursor-spotlight{background:radial-gradient(circle,rgba(0,168,102,.06) 0%,rgba(123,47,190,.03) 40%,transparent 70%)}

  .reveal{opacity:0;transform:translateY(24px);transition:opacity 800ms cubic-bezier(.16,1,.3,1),transform 800ms cubic-bezier(.16,1,.3,1)}
  .reveal.on{opacity:1;transform:translateY(0)}

  .lang-dropdown{position:absolute;top:calc(100% + 10px);right:0;background:var(--nav-bg);backdrop-filter:blur(28px);border:1px solid var(--border);border-radius:14px;padding:6px;min-width:140px;animation:langIn 200ms cubic-bezier(.16,1,.3,1) both;z-index:200;box-shadow:0 12px 40px rgba(0,0,0,.3)}
  .lang-option{padding:9px 14px;border-radius:9px;cursor:pointer;display:flex;align-items:center;gap:10px;transition:background 150ms ease;font-family:'DM Sans',sans-serif;font-size:13px;color:var(--text-sub)}
  .lang-option:hover,.lang-option.selected{background:var(--surface-hover);color:var(--text)}

  .theme-btn{width:36px;height:36px;border-radius:10px;background:var(--pill-bg);border:1px solid var(--pill-border);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:16px;transition:all 250ms ease;flex-shrink:0}
  .theme-btn:hover{background:var(--surface-hover);border-color:var(--green-border)}

  @media(max-width:900px){.nav-links,.nav-cta{display:none!important}.grid-3{grid-template-columns:1fr!important}.page-pad{padding:100px 20px 60px!important}}
`;

const LANG_FLAGS: Record<string, string> = { en: "🇺🇸", pt: "🇧🇷", es: "🇲🇽" };
const LANG_LABELS: Record<string, string> = { en: "English", pt: "Português", es: "Español" };

const COURSES = [
  { slug:"web3-basics", track:"Foundation", title:"Web3 & Blockchain Basics", lessons:10, xp:500, tag:"beginner", pct:0, accentVar:"--green", emoji:"🌐", duration:"4h", desc:"Start your Web3 journey. Understand blockchain, wallets, and the decentralized internet." },
  { slug:"solana-fundamentals", track:"Solana", title:"Solana Fundamentals", lessons:14, xp:700, tag:"beginner", pct:0, accentVar:"--purple", emoji:"⚡", duration:"6h", desc:"Deep dive into Solana's architecture, accounts model, and transaction lifecycle." },
  { slug:"anchor-development", track:"Programs", title:"Anchor Development", lessons:18, xp:900, tag:"intermediate", pct:41, accentVar:"--blue", accent:"#60a5fa", emoji:"⚓", duration:"10h", desc:"Build Solana programs with the Anchor framework. PDAs, CPIs, and advanced patterns." },
  { slug:"defi-on-solana", track:"DeFi", title:"DeFi on Solana", lessons:16, xp:800, tag:"intermediate", pct:0, accent:"#f59e0b", emoji:"💱", duration:"8h", desc:"Explore AMMs, lending protocols, and yield strategies on the Solana DeFi ecosystem." },
  { slug:"nfts-metaplex", track:"NFTs", title:"NFTs & Metaplex", lessons:12, xp:600, tag:"intermediate", pct:52, accent:"#a78bfa", emoji:"🎨", duration:"5h", desc:"Mint, manage, and build with NFTs using Metaplex Core and Token Metadata." },
  { slug:"token-2022", track:"Tokens", title:"Token-2022 Extensions", lessons:14, xp:700, tag:"advanced", pct:0, accent:"#f87171", emoji:"🪙", duration:"7h", desc:"Master the new token standard: transfer hooks, confidential transfers, and more." },
];

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
      <div style={{ position: "absolute", top: "-25%", left: "-15%", width: "70vw", height: "70vw", borderRadius: "50%", background: "radial-gradient(circle,var(--orb1) 0%,transparent 65%)", animation: "orbFloat 14s ease-in-out infinite" }} />
      <div style={{ position: "absolute", top: "-10%", right: "-8%", width: "55vw", height: "55vw", borderRadius: "50%", background: "radial-gradient(circle,var(--orb2) 0%,transparent 65%)", animation: "orbFloat2 17s ease-in-out infinite" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle,var(--dot-color) 1px,transparent 1px)", backgroundSize: "30px 30px", maskImage: "radial-gradient(ellipse 85% 85% at 50% 50%,black 20%,transparent 100%)", WebkitMaskImage: "radial-gradient(ellipse 85% 85% at 50% 50%,black 20%,transparent 100%)" }} />
    </div>
  );
}

function LangSwitcher() {
  const { lang, setLang } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const fn = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", fn); return () => document.removeEventListener("mousedown", fn);
  }, []);
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button onClick={() => setOpen(o => !o)} className="theme-btn" style={{ gap: 6, width: "auto", padding: "0 12px", fontSize: 12, fontFamily: "'JetBrains Mono',monospace", fontWeight: 600, color: "var(--text-sub)", letterSpacing: ".04em" }}>
        <span>{LANG_FLAGS[lang]}</span>
        <span style={{ fontSize: 11 }}>{lang.toUpperCase()}</span>
        <span style={{ opacity: .5, fontSize: 9 }}>▾</span>
      </button>
      {open && (
        <div className="lang-dropdown">
          {(["en", "pt", "es"] as const).map(l => (
            <div key={l} className={`lang-option ${lang === l ? "selected" : ""}`} onClick={() => { setLang(l); setOpen(false); }}>
              <span style={{ fontSize: 18 }}>{LANG_FLAGS[l]}</span>
              <span>{LANG_LABELS[l]}</span>
              {lang === l && <span style={{ marginLeft: "auto", color: "var(--green)", fontSize: 12 }}>✓</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button className="theme-btn" onClick={toggleTheme} title={theme === "dark" ? "Switch to light" : "Switch to dark"}>
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 30); window.addEventListener("scroll", fn, { passive: true }); return () => window.removeEventListener("scroll", fn); }, []);
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: 62, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 48px", background: scrolled ? "var(--nav-bg)" : "transparent", backdropFilter: scrolled ? "blur(28px) saturate(1.6)" : "none", borderBottom: scrolled ? "1px solid var(--footer-border)" : "none", transition: "all 600ms cubic-bezier(.16,1,.3,1)" }}>
      <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
        <div style={{ width: 34, height: 34, borderRadius: 9, background: "linear-gradient(135deg,var(--green),var(--purple))", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 22px rgba(20,241,149,.38)" }}>
          <span className="f-head" style={{ fontSize: 12, fontWeight: 800, color: "#060608" }}>ST</span>
        </div>
        <span className="f-head" style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-.03em", color: "var(--text)" }}>Superteam<span style={{ color: "var(--text-faint)", fontWeight: 300 }}> Academy</span></span>
      </a>
      <div className="nav-links" style={{ display: "flex", gap: 30 }}>
        {([[t.nav.courses, "/courses"], [t.nav.leaderboard, "/leaderboard"], [t.nav.dashboard, "/dashboard"]] as [string, string][]).map(([l, h]) => (
          <a key={l} href={h} className={`nav-link ${h === "/courses" ? "active" : ""}`}>{l}</a>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <ThemeToggle />
        <LangSwitcher />
        <WalletMultiButton className="nav-cta" style={{ background: "var(--green)", color: "#060608", fontFamily: "Space Grotesk,sans-serif", fontWeight: 700, fontSize: 13, borderRadius: 10, padding: "9px 20px", height: "auto", lineHeight: "normal" }} />
      </div>
    </nav>
  );
}

function CourseCard({ course, delay }: { course: typeof COURSES[0], delay: number }) {
  const ref = useReveal(delay);
  const { t } = useTranslation();
  const accent = course.accent ?? "var(--green)";
  return (
    <div ref={ref} className="course-card" onClick={() => window.location.href = `/courses/${course.slug}`} style={{ padding: 28 }}>
      <div style={{ position: "absolute", top: -40, right: -40, width: 120, height: 120, borderRadius: "50%", background: `radial-gradient(circle,${accent}18 0%,transparent 70%)`, pointerEvents: "none" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
        <div>
          <span className="f-mono" style={{ display: "inline-block", fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: accent, background: `${accent}16`, border: `1px solid ${accent}28`, padding: "2px 10px", borderRadius: 4, marginBottom: 10 }}>{course.track}</span>
          <h3 className="f-head" style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-.035em", color: "var(--text)", lineHeight: 1.2 }}>{course.title}</h3>
        </div>
        <span style={{ fontSize: 32 }}>{course.emoji}</span>
      </div>
      <p className="f-body" style={{ fontSize: 13.5, fontWeight: 300, color: "var(--text-sub)", lineHeight: 1.68, marginBottom: 20 }}>{course.desc}</p>
      <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
        {[`${course.lessons} ${t.courses.lessons}`, course.duration, t.courses.levels[course.tag as keyof typeof t.courses.levels] ?? course.tag].map(tx => (
          <span key={tx} className="f-mono" style={{ fontSize: 10, color: "var(--text-faint)", letterSpacing: ".07em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ color: accent, opacity: .6 }}>◆</span>{tx}
          </span>
        ))}
      </div>
      <div style={{ marginBottom: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span className="f-mono" style={{ fontSize: 10, color: "var(--text-faint)", letterSpacing: ".06em", textTransform: "uppercase" }}>{t.courses.progress}</span>
          <span className="f-mono" style={{ fontSize: 10, color: accent }}>{course.pct}%</span>
        </div>
        <div style={{ height: 3, background: "var(--border)", borderRadius: 99, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${course.pct}%`, background: `linear-gradient(90deg,${accent}88,${accent})`, borderRadius: 99 }} />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 16, borderTop: "1px solid var(--border)" }}>
        <span className="f-head" style={{ fontSize: 15, fontWeight: 700, color: accent }}>{course.xp} XP</span>
        <button className="btn-primary" style={{ padding: "8px 18px", fontSize: 13, borderRadius: 9, animation: "none" }}>
          {course.pct > 0 ? t.courses.continue : t.courses.start}
        </button>
      </div>
    </div>
  );
}

function CoursesInner() {
  const { t } = useTranslation();
  const [track, setTrack] = useState("All");
  const [level, setLevel] = useState("all");
  const [search, setSearch] = useState("");
  const headerRef = useReveal(0);

  const TRACKS = [t.courses.all, "Foundation", "Solana", "Programs", "DeFi", "NFTs", "Tokens"];
  const LEVELS = [
    { key: "all", label: t.courses.levels.all },
    { key: "beginner", label: t.courses.levels.beginner },
    { key: "intermediate", label: t.courses.levels.intermediate },
    { key: "advanced", label: t.courses.levels.advanced },
  ];

  const filtered = COURSES.filter(c => {
    const matchTrack = track === t.courses.all || c.track === track;
    const matchLevel = level === "all" || c.tag === level;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.track.toLowerCase().includes(search.toLowerCase());
    return matchTrack && matchLevel && matchSearch;
  });

  return (
    <div style={{ position: "relative", background: "var(--bg)", minHeight: "100vh", overflowX: "hidden" }}>
      <ScrollProgress />
      <CursorSpotlight />
      <Background />
      <Navbar />

      <div className="page-pad" style={{ position: "relative", zIndex: 10, padding: "110px 48px 80px", maxWidth: 1440, margin: "0 auto" }}>
        <div ref={headerRef} style={{ marginBottom: 52 }}>
          <span className="f-mono" style={{ display: "inline-block", fontSize: 11, color: "var(--green)", letterSpacing: ".13em", textTransform: "uppercase", marginBottom: 14, opacity: .7 }}>//  {t.courses.breadcrumb}</span>
          <h1 className="f-head" style={{ fontSize: "clamp(2.4rem,5vw,5rem)", fontWeight: 700, letterSpacing: "-.048em", color: "var(--text)", lineHeight: .92, marginBottom: 16 }}>
            {t.courses.title} <span className="shimmer-text">{t.courses.titleHighlight}</span>
          </h1>
          <p className="f-body" style={{ fontSize: 16, fontWeight: 300, color: "var(--text-sub)", maxWidth: 480, lineHeight: 1.72 }}>{t.courses.sub}</p>
        </div>

        {/* Search + Filters */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 36, alignItems: "center" }}>
          <div className="glass" style={{ borderRadius: 12, padding: "10px 16px", display: "flex", alignItems: "center", gap: 10, flex: "0 0 260px" }}>
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="var(--text-faint)" strokeWidth={2}><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder={t.courses.searchPlaceholder} className="f-body" style={{ background: "none", border: "none", outline: "none", color: "var(--text)", fontSize: 13, width: "100%" }} />
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {TRACKS.map(tx => <button key={tx} className={`filter-pill ${track === tx ? "active" : ""}`} onClick={() => setTrack(tx)}>{tx}</button>)}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {LEVELS.map(lv => <button key={lv.key} className={`filter-pill ${level === lv.key ? "active" : ""}`} onClick={() => setLevel(lv.key)}>{lv.label}</button>)}
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 28, marginBottom: 36, flexWrap: "wrap" }}>
          {[["6", t.courses.stats.total], ["156", t.courses.stats.lessons], ["4,200", t.courses.stats.xp], ["100%", t.courses.stats.chain]].map(([v, l]) => (
            <div key={l} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="f-head" style={{ fontSize: 18, fontWeight: 700, color: "var(--green)" }}>{v}</span>
              <span className="f-mono" style={{ fontSize: 10, color: "var(--text-faint)", letterSpacing: ".08em", textTransform: "uppercase" }}>{l}</span>
            </div>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <p className="f-body" style={{ color: "var(--text-sub)", fontSize: 16 }}>{t.courses.noResults}</p>
          </div>
        ) : (
          <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {filtered.map((c, i) => <CourseCard key={c.slug} course={c} delay={i * 60} />)}
          </div>
        )}
      </div>

      <footer style={{ position: "relative", zIndex: 10, borderTop: "1px solid var(--footer-border)", padding: "24px 48px", maxWidth: 1440, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14 }}>
          <span className="f-body" style={{ fontSize: 13, color: "var(--text-faint)" }}>{t.footer.rights}</span>
          <div style={{ display: "flex", gap: 24 }}>
            {["GitHub", "Twitter", "Docs"].map(l => <a key={l} href="#" className="nav-link" style={{ fontSize: 12 }}>{l}</a>)}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function CoursesPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: BASE_STYLES }} suppressHydrationWarning />
      <I18nThemeProvider>
        <CoursesInner />
      </I18nThemeProvider>
    </>
  );
}
