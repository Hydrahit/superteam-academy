"use client";

import { useState, useEffect, useRef } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { I18nThemeProvider, useTranslation, useTheme } from "@/lib/i18n/context";

// Reuse BASE_STYLES from courses — import in real project, inlined here for standalone use
const BASE_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&family=JetBrains+Mono:wght@400;500;600&display=swap');
  :root,html[data-theme="dark"]{--bg:#060608;--bg2:#0c0c10;--surface:rgba(255,255,255,.026);--surface-hover:rgba(255,255,255,.04);--border:rgba(255,255,255,.072);--border-hover:rgba(255,255,255,.14);--text:#ffffff;--text-sub:rgba(255,255,255,.38);--text-faint:rgba(255,255,255,.18);--text-muted:rgba(255,255,255,.32);--green:#14F195;--green-dim:rgba(20,241,149,.12);--green-border:rgba(20,241,149,.22);--purple:#9945FF;--purple-dim:rgba(153,69,255,.1);--purple-border:rgba(153,69,255,.2);--nav-bg:rgba(6,6,8,.9);--card-bg:rgba(255,255,255,.024);--input-bg:rgba(255,255,255,.04);--pill-bg:rgba(255,255,255,.04);--pill-text:rgba(255,255,255,.4);--pill-border:rgba(255,255,255,.1);--footer-border:rgba(255,255,255,.042);--dot-color:rgba(255,255,255,.048);--orb1:rgba(153,69,255,.062);--orb2:rgba(20,241,149,.042)}
  html[data-theme="light"]{--bg:#F0EFE9;--bg2:#E8E7E0;--surface:rgba(255,255,255,.75);--surface-hover:rgba(255,255,255,.9);--border:rgba(0,0,0,.09);--border-hover:rgba(0,0,0,.16);--text:#0C0C12;--text-sub:rgba(12,12,18,.55);--text-faint:rgba(12,12,18,.3);--text-muted:rgba(12,12,18,.5);--green:#00A866;--green-dim:rgba(0,168,102,.1);--green-border:rgba(0,168,102,.25);--purple:#7B2FBE;--purple-dim:rgba(123,47,190,.08);--purple-border:rgba(123,47,190,.22);--nav-bg:rgba(240,239,233,.92);--card-bg:rgba(255,255,255,.6);--input-bg:rgba(255,255,255,.8);--pill-bg:rgba(0,0,0,.04);--pill-text:rgba(0,0,0,.45);--pill-border:rgba(0,0,0,.1);--footer-border:rgba(0,0,0,.07);--dot-color:rgba(0,0,0,.05);--orb1:rgba(123,47,190,.06);--orb2:rgba(0,168,102,.04)}
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth;background:var(--bg)}
  body{background:var(--bg);overflow-x:hidden;-webkit-font-smoothing:antialiased;transition:background 400ms ease,color 400ms ease}
  ::selection{background:rgba(20,241,149,.18);color:var(--green)}
  ::-webkit-scrollbar{width:2px}::-webkit-scrollbar-track{background:var(--bg)}::-webkit-scrollbar-thumb{background:linear-gradient(to bottom,var(--green),var(--purple));border-radius:99px}
  .f-head{font-family:'Space Grotesk',sans-serif}.f-body{font-family:'DM Sans',sans-serif}.f-mono{font-family:'JetBrains Mono',monospace}
  @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
  @keyframes gradShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
  @keyframes orbFloat{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(28px,-18px) scale(1.04)}66%{transform:translate(-18px,14px) scale(.97)}}
  @keyframes orbFloat2{0%,100%{transform:translate(0,0)}50%{transform:translate(-22px,18px) scale(1.03)}}
  @keyframes heartbeat{0%,100%{transform:scale(1)}14%{transform:scale(1.18)}28%{transform:scale(1)}42%{transform:scale(1.1)}}
  @keyframes rankIn{from{opacity:0;transform:translateX(-20px)}to{opacity:1;transform:translateX(0)}}
  @keyframes langIn{from{opacity:0;transform:translateY(-8px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}
  .shimmer-text{background:linear-gradient(90deg,var(--green) 0%,var(--purple) 25%,var(--green) 50%,var(--purple) 75%,var(--green) 100%);background-size:200% auto;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:shimmer 4s linear infinite}
  .glass{background:var(--surface);backdrop-filter:blur(32px) saturate(1.5);-webkit-backdrop-filter:blur(32px) saturate(1.5);border:1px solid var(--border);position:relative;transition:all 400ms cubic-bezier(.16,1,.3,1)}
  .glass::before{content:'';position:absolute;top:0;left:14%;right:14%;height:1px;background:linear-gradient(90deg,transparent,var(--border-hover),transparent);border-radius:99px;pointer-events:none}
  .nav-link{color:var(--text-muted);transition:color 200ms ease;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;text-decoration:none;position:relative}
  .nav-link::after{content:'';position:absolute;bottom:-4px;left:0;right:0;height:1px;background:linear-gradient(90deg,var(--green),var(--purple));transform:scaleX(0);transition:transform 250ms ease;transform-origin:left}
  .nav-link:hover{color:var(--text)}.nav-link:hover::after,.nav-link.active::after{transform:scaleX(1)}.nav-link.active{color:var(--text)}
  .rank-row{animation:rankIn .5s cubic-bezier(.16,1,.3,1) both;transition:background 200ms ease,transform 200ms ease}
  .rank-row:hover{background:var(--surface-hover)!important;transform:translateX(4px)}
  .medal-1{display:inline-block;animation:heartbeat 2s ease-in-out infinite}
  .scroll-progress{position:fixed;top:0;left:0;height:2px;z-index:200;background:linear-gradient(90deg,var(--green),var(--purple),var(--green));background-size:200% 100%;animation:gradShift 3s linear infinite;transition:width 80ms linear}
  .cursor-spotlight{position:fixed;width:520px;height:520px;border-radius:50%;background:radial-gradient(circle,rgba(20,241,149,.048) 0%,rgba(153,69,255,.025) 40%,transparent 70%);pointer-events:none;z-index:1;transform:translate(-50%,-50%);transition:left 60ms linear,top 60ms linear;mix-blend-mode:screen}
  html[data-theme="light"] .cursor-spotlight{background:radial-gradient(circle,rgba(0,168,102,.06) 0%,rgba(123,47,190,.03) 40%,transparent 70%)}
  .tab-btn{padding:8px 20px;border-radius:99px;font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:600;cursor:pointer;transition:all 250ms ease;border:1px solid var(--pill-border);background:var(--pill-bg);color:var(--pill-text);letter-spacing:.04em;text-transform:uppercase}
  .tab-btn.active{background:var(--green-dim);border-color:var(--green-border);color:var(--green)}
  .reveal{opacity:0;transform:translateY(24px);transition:opacity 800ms cubic-bezier(.16,1,.3,1),transform 800ms cubic-bezier(.16,1,.3,1)}
  .reveal.on{opacity:1;transform:translateY(0)}
  .lang-dropdown{position:absolute;top:calc(100% + 10px);right:0;background:var(--nav-bg);backdrop-filter:blur(28px);border:1px solid var(--border);border-radius:14px;padding:6px;min-width:140px;animation:langIn 200ms cubic-bezier(.16,1,.3,1) both;z-index:200;box-shadow:0 12px 40px rgba(0,0,0,.3)}
  .lang-option{padding:9px 14px;border-radius:9px;cursor:pointer;display:flex;align-items:center;gap:10px;transition:background 150ms ease;font-family:'DM Sans',sans-serif;font-size:13px;color:var(--text-sub)}
  .lang-option:hover,.lang-option.selected{background:var(--surface-hover);color:var(--text)}
  .theme-btn{width:36px;height:36px;border-radius:10px;background:var(--pill-bg);border:1px solid var(--pill-border);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:16px;transition:all 250ms ease;flex-shrink:0}
  .theme-btn:hover{background:var(--surface-hover);border-color:var(--green-border)}
  @media(max-width:900px){.nav-links,.nav-cta{display:none!important}.lb-grid{grid-template-columns:40px 1fr auto auto!important}.page-pad{padding:100px 20px 60px!important}.hide-mobile{display:none!important}}
`;

const LANG_FLAGS: Record<string, string> = { en: "🇺🇸", pt: "🇧🇷", es: "🇲🇽" };
const LANG_LABELS: Record<string, string> = { en: "English", pt: "Português", es: "Español" };

const ROWS = [
  { rank:1, name:"0xAlpha", wallet:"7xKp...3mRt", xp:12450, level:11, medal:"🥇", glow:"rgba(255,215,0,.14)", courses:8, streak:14 },
  { rank:2, name:"CryptoVitor", wallet:"9sWq...8nUv", xp:9820, level:9, medal:"🥈", glow:"rgba(192,192,192,.1)", courses:6, streak:9 },
  { rank:3, name:"SolanaRita", wallet:"4jBm...2pLx", xp:8610, level:9, medal:"🥉", glow:"rgba(205,127,50,.1)", courses:6, streak:7 },
  { rank:4, name:"devBruno", wallet:"3cNp...7kEs", xp:6240, level:7, medal:null, glow:null, courses:4, streak:5 },
  { rank:5, name:"web3Maria", wallet:"6tFh...1wAz", xp:5180, level:7, medal:null, glow:null, courses:4, streak:3 },
  { rank:6, name:"lucasdev", wallet:"8uHj...9kPm", xp:4720, level:6, medal:null, glow:null, courses:3, streak:6 },
  { rank:7, name:"SolDev_BR", wallet:"2wRs...5nQv", xp:3890, level:6, medal:null, glow:null, courses:3, streak:2 },
  { rank:8, name:"web3pedro", wallet:"5tYk...1mBn", xp:3210, level:5, medal:null, glow:null, courses:2, streak:4 },
  { rank:9, name:"cryptoana", wallet:"9pLc...3dKx", xp:2850, level:5, medal:null, glow:null, courses:2, streak:1 },
  { rank:10, name:"solbuilder", wallet:"1vMq...7fNr", xp:2440, level:4, medal:null, glow:null, courses:2, streak:8 },
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
  useEffect(() => { const fn = () => { const el = document.documentElement; setPct((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100); }; window.addEventListener("scroll", fn, { passive: true }); return () => window.removeEventListener("scroll", fn); }, []);
  return <div className="scroll-progress" style={{ width: `${pct}%` }} />;
}

function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { const fn = (e: MouseEvent) => { if (ref.current) { ref.current.style.left = e.clientX + "px"; ref.current.style.top = e.clientY + "px"; } }; window.addEventListener("mousemove", fn, { passive: true }); return () => window.removeEventListener("mousemove", fn); }, []);
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
  useEffect(() => { const fn = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); }; document.addEventListener("mousedown", fn); return () => document.removeEventListener("mousedown", fn); }, []);
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button onClick={() => setOpen(o => !o)} className="theme-btn" style={{ gap: 6, width: "auto", padding: "0 12px", fontSize: 12, fontFamily: "'JetBrains Mono',monospace", fontWeight: 600, color: "var(--text-sub)", letterSpacing: ".04em" }}>
        <span>{LANG_FLAGS[lang]}</span><span style={{ fontSize: 11 }}>{lang.toUpperCase()}</span><span style={{ opacity: .5, fontSize: 9 }}>▾</span>
      </button>
      {open && (
        <div className="lang-dropdown">
          {(["en", "pt", "es"] as const).map(l => (
            <div key={l} className={`lang-option ${lang === l ? "selected" : ""}`} onClick={() => { setLang(l); setOpen(false); }}>
              <span style={{ fontSize: 18 }}>{LANG_FLAGS[l]}</span><span>{LANG_LABELS[l]}</span>
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
  return <button className="theme-btn" onClick={toggleTheme}>{theme === "dark" ? "☀️" : "🌙"}</button>;
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 30); window.addEventListener("scroll", fn, { passive: true }); return () => window.removeEventListener("scroll", fn); }, []);
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: 62, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 48px", background: scrolled ? "var(--nav-bg)" : "transparent", backdropFilter: scrolled ? "blur(28px) saturate(1.6)" : "none", borderBottom: scrolled ? "1px solid var(--footer-border)" : "none", transition: "all 600ms" }}>
      <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
        <div style={{ width: 34, height: 34, borderRadius: 9, background: "linear-gradient(135deg,var(--green),var(--purple))", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 22px rgba(20,241,149,.38)" }}>
          <span className="f-head" style={{ fontSize: 12, fontWeight: 800, color: "#060608" }}>ST</span>
        </div>
        <span className="f-head" style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-.03em", color: "var(--text)" }}>Superteam<span style={{ color: "var(--text-faint)", fontWeight: 300 }}> Academy</span></span>
      </a>
      <div className="nav-links" style={{ display: "flex", gap: 30 }}>
        {([[t.nav.courses, "/courses"], [t.nav.leaderboard, "/leaderboard"], [t.nav.dashboard, "/dashboard"]] as [string,string][]).map(([l, h]) => (
          <a key={h} href={h} className={`nav-link ${h === "/leaderboard" ? "active" : ""}`}>{l}</a>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <ThemeToggle /><LangSwitcher />
        <WalletMultiButton className="nav-cta" style={{ background: "var(--green)", color: "#060608", fontFamily: "Space Grotesk,sans-serif", fontWeight: 700, fontSize: 13, borderRadius: 10, padding: "9px 20px", height: "auto", lineHeight: "normal" }} />
      </div>
    </nav>
  );
}

function LeaderboardInner() {
  const { t } = useTranslation();
  const [period, setPeriod] = useState<string>("");
  useEffect(() => { setPeriod(t.leaderboard.allTime); }, [t]);
  const headerRef = useReveal(0);
  const tableRef = useReveal(100);
  const topThree = ROWS.slice(0, 3);
  const PERIODS = [t.leaderboard.allTime, t.leaderboard.thisMonth, t.leaderboard.thisWeek];

  return (
    <div style={{ position: "relative", background: "var(--bg)", minHeight: "100vh", overflowX: "hidden" }}>
      <ScrollProgress /><CursorSpotlight /><Background /><Navbar />
      <div className="page-pad" style={{ position: "relative", zIndex: 10, padding: "110px 48px 80px", maxWidth: 1440, margin: "0 auto" }}>

        <div ref={headerRef} style={{ marginBottom: 52 }}>
          <span className="f-mono" style={{ display: "inline-block", fontSize: 11, color: "var(--green)", letterSpacing: ".13em", textTransform: "uppercase", marginBottom: 14, opacity: .7 }}>//  {t.leaderboard.breadcrumb}</span>
          <h1 className="f-head" style={{ fontSize: "clamp(2.4rem,5vw,5rem)", fontWeight: 700, letterSpacing: "-.048em", color: "var(--text)", lineHeight: .92, marginBottom: 16 }}>
            <span className="shimmer-text">{t.leaderboard.title}</span>
          </h1>
          <p className="f-body" style={{ fontSize: 16, fontWeight: 300, color: "var(--text-sub)", maxWidth: 480, lineHeight: 1.72 }}>{t.leaderboard.sub}</p>
        </div>

        {/* Podium top 3 */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 40, maxWidth: 680 }}>
          {topThree.map((r, i) => (
            <div key={r.rank} className="glass" style={{ borderRadius: 20, padding: 24, textAlign: "center", background: r.glow ? `radial-gradient(ellipse at top,${r.glow} 0%,var(--surface) 70%)` : "var(--surface)", order: i === 0 ? 1 : i === 1 ? 0 : 2 }}>
              <div style={{ fontSize: i === 0 ? 36 : 28, marginBottom: 8 }} className={i === 0 ? "medal-1" : ""}>{r.medal}</div>
              <div className="f-head" style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>{r.name}</div>
              <div className="f-mono" style={{ fontSize: 10, color: "var(--text-faint)", marginBottom: 10, letterSpacing: ".06em" }}>{r.wallet}</div>
              <div className="f-head" style={{ fontSize: 18, fontWeight: 700, color: "var(--green)" }}>{r.xp.toLocaleString()}</div>
              <div className="f-mono" style={{ fontSize: 9, color: "var(--text-faint)", letterSpacing: ".08em", textTransform: "uppercase" }}>{t.leaderboard.xp}</div>
              <div style={{ marginTop: 10 }}>
                <span className="f-mono" style={{ fontSize: 11, color: "var(--purple)", background: "var(--purple-dim)", border: "1px solid var(--purple-border)", padding: "2px 10px", borderRadius: 99 }}>Lv.{r.level}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Period tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
          {PERIODS.map(p => <button key={p} className={`tab-btn ${period === p ? "active" : ""}`} onClick={() => setPeriod(p)}>{p}</button>)}
        </div>

        {/* Table */}
        <div ref={tableRef} className="glass" style={{ borderRadius: 24, overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,var(--border-hover),transparent)" }} />
          <div className="lb-grid" style={{ display: "grid", gridTemplateColumns: "60px 1fr 1fr 80px 100px 80px", padding: "13px 28px", borderBottom: "1px solid var(--border)" }}>
            {[t.leaderboard.rank, t.leaderboard.learner, t.leaderboard.wallet, t.leaderboard.level, t.leaderboard.xp, t.leaderboard.streak].map(col => (
              <span key={col} className="f-mono" style={{ fontSize: 10, color: "var(--text-faint)", letterSpacing: ".12em", textTransform: "uppercase", textAlign: ["XP","XP Streak","Racha","Pontos","Sequência"].includes(col) ? "right" : "left" }}>{col}</span>
            ))}
          </div>
          {ROWS.map((r, i) => (
            <div key={r.rank} className="rank-row" style={{ display: "grid", gridTemplateColumns: "60px 1fr 1fr 80px 100px 80px", padding: "17px 28px", borderBottom: i < ROWS.length - 1 ? "1px solid var(--border)" : "none", background: r.glow ? `radial-gradient(ellipse at left,${r.glow} 0%,transparent 55%)` : "transparent", animationDelay: `${i * 60}ms` }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                {r.medal ? <span className={r.rank === 1 ? "medal-1" : ""} style={{ fontSize: 20 }}>{r.medal}</span> : <span className="f-mono" style={{ fontSize: 13, fontWeight: 500, color: "var(--text-faint)" }}>#{r.rank}</span>}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,var(--green-dim),var(--purple-dim))", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span className="f-mono" style={{ fontSize: 11, fontWeight: 700, color: "var(--text-sub)" }}>{r.name.slice(0, 2).toUpperCase()}</span>
                </div>
                <div>
                  <div className="f-head" style={{ fontSize: 14, fontWeight: 600, color: "var(--text)" }}>{r.name}</div>
                  <div className="f-mono hide-mobile" style={{ fontSize: 10, color: "var(--text-faint)" }}>{r.courses} {t.leaderboard.completed}</div>
                </div>
              </div>
              <span className="f-mono hide-mobile" style={{ fontSize: 12, color: "var(--text-faint)", display: "flex", alignItems: "center" }}>{r.wallet}</span>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span className="f-mono" style={{ fontSize: 12, color: "var(--purple)", background: "var(--purple-dim)", border: "1px solid var(--purple-border)", padding: "2px 11px", borderRadius: 99 }}>Lv.{r.level}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                <span className="f-head" style={{ fontSize: 15, fontWeight: 700, color: "var(--green)" }}>{r.xp.toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 4 }}>
                <span style={{ fontSize: 12 }}>🔥</span>
                <span className="f-mono" style={{ fontSize: 12, color: "var(--text-sub)" }}>{r.streak}d</span>
              </div>
            </div>
          ))}
        </div>

        {/* Meta info */}
        <div style={{ marginTop: 24, display: "flex", gap: 24, flexWrap: "wrap" }}>
          {[[t.leaderboard.indexedVia, "Helius DAS API"], [t.leaderboard.updated, "Real-time"], [t.leaderboard.network, "Solana Devnet"], [t.leaderboard.token, "NonTransferable XP"]].map(([k, v]) => (
            <div key={k} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="f-mono" style={{ fontSize: 10, color: "var(--text-faint)", letterSpacing: ".07em", textTransform: "uppercase" }}>{k}:</span>
              <span className="f-mono" style={{ fontSize: 10, color: "var(--green)", opacity: .7, letterSpacing: ".07em" }}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      <footer style={{ position: "relative", zIndex: 10, borderTop: "1px solid var(--footer-border)", padding: "24px 48px", maxWidth: 1440, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14 }}>
          <span className="f-body" style={{ fontSize: 13, color: "var(--text-faint)" }}>{t.footer.rights}</span>
          <div style={{ display: "flex", gap: 24 }}>{["GitHub","Twitter","Docs"].map(l => <a key={l} href="#" className="nav-link" style={{ fontSize: 12 }}>{l}</a>)}</div>
        </div>
      </footer>
    </div>
  );
}

export default function LeaderboardPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: BASE_STYLES }} suppressHydrationWarning />
      <I18nThemeProvider><LeaderboardInner /></I18nThemeProvider>
    </>
  );
}
