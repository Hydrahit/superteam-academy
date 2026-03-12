"use client";

import { useState, useEffect, useRef } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { I18nThemeProvider, useTranslation, useTheme } from "@/lib/i18n/context";

const BASE_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&family=JetBrains+Mono:wght@400;500;600&display=swap');
  :root,html[data-theme="dark"]{--bg:#060608;--bg2:#0c0c10;--surface:rgba(255,255,255,.026);--surface-hover:rgba(255,255,255,.04);--border:rgba(255,255,255,.072);--border-hover:rgba(255,255,255,.14);--text:#ffffff;--text-sub:rgba(255,255,255,.38);--text-faint:rgba(255,255,255,.18);--text-muted:rgba(255,255,255,.32);--green:#14F195;--green-dim:rgba(20,241,149,.12);--green-border:rgba(20,241,149,.22);--purple:#9945FF;--purple-dim:rgba(153,69,255,.1);--purple-border:rgba(153,69,255,.2);--nav-bg:rgba(6,6,8,.9);--card-bg:rgba(255,255,255,.024);--pill-bg:rgba(255,255,255,.04);--pill-text:rgba(255,255,255,.4);--pill-border:rgba(255,255,255,.1);--footer-border:rgba(255,255,255,.042);--dot-color:rgba(255,255,255,.048);--orb1:rgba(153,69,255,.062);--orb2:rgba(20,241,149,.042)}
  html[data-theme="light"]{--bg:#F0EFE9;--bg2:#E8E7E0;--surface:rgba(255,255,255,.75);--surface-hover:rgba(255,255,255,.9);--border:rgba(0,0,0,.09);--border-hover:rgba(0,0,0,.16);--text:#0C0C12;--text-sub:rgba(12,12,18,.55);--text-faint:rgba(12,12,18,.3);--text-muted:rgba(12,12,18,.5);--green:#00A866;--green-dim:rgba(0,168,102,.1);--green-border:rgba(0,168,102,.25);--purple:#7B2FBE;--purple-dim:rgba(123,47,190,.08);--purple-border:rgba(123,47,190,.22);--nav-bg:rgba(240,239,233,.92);--card-bg:rgba(255,255,255,.6);--pill-bg:rgba(0,0,0,.04);--pill-text:rgba(0,0,0,.45);--pill-border:rgba(0,0,0,.1);--footer-border:rgba(0,0,0,.07);--dot-color:rgba(0,0,0,.05);--orb1:rgba(123,47,190,.06);--orb2:rgba(0,168,102,.04)}
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth;background:var(--bg)}
  body{background:var(--bg);overflow-x:hidden;-webkit-font-smoothing:antialiased;transition:background 400ms ease}
  ::selection{background:rgba(20,241,149,.18);color:var(--green)}
  ::-webkit-scrollbar{width:2px}::-webkit-scrollbar-track{background:var(--bg)}::-webkit-scrollbar-thumb{background:linear-gradient(to bottom,var(--green),var(--purple));border-radius:99px}
  .f-head{font-family:'Space Grotesk',sans-serif}.f-body{font-family:'DM Sans',sans-serif}.f-mono{font-family:'JetBrains Mono',monospace}
  @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
  @keyframes gradShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
  @keyframes orbFloat{0%,100%{transform:translate(0,0)}33%{transform:translate(28px,-18px)}66%{transform:translate(-18px,14px)}}
  @keyframes orbFloat2{0%,100%{transform:translate(0,0)}50%{transform:translate(-22px,18px)}}
  @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
  @keyframes glowPulse{0%,100%{box-shadow:0 0 20px rgba(20,241,149,.25)}50%{box-shadow:0 0 44px rgba(20,241,149,.6)}}
  @keyframes langIn{from{opacity:0;transform:translateY(-8px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}
  .shimmer-text{background:linear-gradient(90deg,var(--green) 0%,var(--purple) 25%,var(--green) 50%,var(--purple) 75%,var(--green) 100%);background-size:200% auto;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:shimmer 4s linear infinite}
  .glass{background:var(--surface);backdrop-filter:blur(32px) saturate(1.5);-webkit-backdrop-filter:blur(32px) saturate(1.5);border:1px solid var(--border);position:relative;transition:all 400ms cubic-bezier(.16,1,.3,1)}
  .glass::before{content:'';position:absolute;top:0;left:14%;right:14%;height:1px;background:linear-gradient(90deg,transparent,var(--border-hover),transparent);border-radius:99px;pointer-events:none}
  .nav-link{color:var(--text-muted);transition:color 200ms ease;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;text-decoration:none;position:relative}
  .nav-link::after{content:'';position:absolute;bottom:-4px;left:0;right:0;height:1px;background:linear-gradient(90deg,var(--green),var(--purple));transform:scaleX(0);transition:transform 250ms ease;transform-origin:left}
  .nav-link:hover{color:var(--text)}.nav-link:hover::after,.nav-link.active::after{transform:scaleX(1)}.nav-link.active{color:var(--text)}
  .btn-primary{display:inline-flex;align-items:center;gap:10px;padding:12px 24px;border-radius:12px;background:var(--green);border:none;cursor:pointer;font-family:'Space Grotesk',sans-serif;font-size:14px;font-weight:700;color:#060608;transition:transform 200ms ease,filter 200ms ease;animation:glowPulse 2.8s ease-in-out infinite}
  .btn-primary:hover{transform:translateY(-2px) scale(1.02);filter:brightness(1.08)}
  .scroll-progress{position:fixed;top:0;left:0;height:2px;z-index:200;background:linear-gradient(90deg,var(--green),var(--purple),var(--green));background-size:200% 100%;animation:gradShift 3s linear infinite;transition:width 80ms linear}
  .cursor-spotlight{position:fixed;width:520px;height:520px;border-radius:50%;background:radial-gradient(circle,rgba(20,241,149,.048) 0%,rgba(153,69,255,.025) 40%,transparent 70%);pointer-events:none;z-index:1;transform:translate(-50%,-50%);transition:left 60ms linear,top 60ms linear;mix-blend-mode:screen}
  html[data-theme="light"] .cursor-spotlight{background:radial-gradient(circle,rgba(0,168,102,.06) 0%,rgba(123,47,190,.03) 40%,transparent 70%)}
  .stat-card{border-radius:20px;padding:24px;background:var(--card-bg);border:1px solid var(--border);transition:border-color 300ms ease,transform 400ms cubic-bezier(.16,1,.3,1);backdrop-filter:blur(12px)}
  .stat-card:hover{border-color:var(--green-border);transform:translateY(-4px)}
  .course-row{padding:18px 24px;border-bottom:1px solid var(--border);transition:background 200ms ease;cursor:pointer}
  .course-row:hover{background:var(--surface-hover)}.course-row:last-child{border-bottom:none}
  .cert-card{border-radius:16px;background:var(--card-bg);border:1px solid var(--border);padding:20px;transition:all 300ms ease;cursor:pointer;backdrop-filter:blur(12px)}
  .cert-card:hover{border-color:var(--purple-border);transform:translateY(-4px);box-shadow:0 16px 48px rgba(0,0,0,.15)}
  .reveal{opacity:0;transform:translateY(24px);transition:opacity 800ms cubic-bezier(.16,1,.3,1),transform 800ms cubic-bezier(.16,1,.3,1)}
  .reveal.on{opacity:1;transform:translateY(0)}
  .lang-dropdown{position:absolute;top:calc(100% + 10px);right:0;background:var(--nav-bg);backdrop-filter:blur(28px);border:1px solid var(--border);border-radius:14px;padding:6px;min-width:140px;animation:langIn 200ms cubic-bezier(.16,1,.3,1) both;z-index:200;box-shadow:0 12px 40px rgba(0,0,0,.3)}
  .lang-option{padding:9px 14px;border-radius:9px;cursor:pointer;display:flex;align-items:center;gap:10px;transition:background 150ms ease;font-family:'DM Sans',sans-serif;font-size:13px;color:var(--text-sub)}
  .lang-option:hover,.lang-option.selected{background:var(--surface-hover);color:var(--text)}
  .theme-btn{width:36px;height:36px;border-radius:10px;background:var(--pill-bg);border:1px solid var(--pill-border);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:16px;transition:all 250ms ease;flex-shrink:0}
  .theme-btn:hover{background:var(--surface-hover);border-color:var(--green-border)}
  @media(max-width:900px){.nav-links,.nav-cta{display:none!important}.dash-grid{grid-template-columns:1fr!important}.stats-row{grid-template-columns:1fr 1fr!important}.page-pad{padding:100px 20px 60px!important}.achiev-grid{grid-template-columns:repeat(3,1fr)!important}}
`;

const LANG_FLAGS: Record<string,string> = { en:"🇺🇸", pt:"🇧🇷", es:"🇲🇽" };
const LANG_LABELS: Record<string,string> = { en:"English", pt:"Português", es:"Español" };

const ENROLLED = [
  { slug:"web3-basics", title:"Web3 & Blockchain Basics", track:"Foundation", pct:85, xp:425, accent:"#14F195", emoji:"🌐", nextLesson:"Smart Contracts 101" },
  { slug:"solana-fundamentals", title:"Solana Fundamentals", track:"Solana", pct:42, xp:294, accent:"#9945FF", emoji:"⚡", nextLesson:"Account Model Deep Dive" },
  { slug:"anchor-development", title:"Anchor Development", track:"Programs", pct:15, xp:135, accent:"#60a5fa", emoji:"⚓", nextLesson:"PDA Creation & Signing" },
];

const CERTS = [{ title:"Web3 Foundations", date:"Feb 2026", score:94 }];

const ACHIEVEMENTS = [
  { emoji:"🔥", key:"streak7", unlocked:true },
  { emoji:"⚡", key:"firstXP", unlocked:true },
  { emoji:"🎓", key:"firstCert", unlocked:true },
  { emoji:"🏗", key:"builder", unlocked:false },
  { emoji:"🚀", key:"solNative", unlocked:false },
  { emoji:"💎", key:"defiExpert", unlocked:false },
];

const ACHIEV_LABELS: Record<string, { en:string; pt:string; es:string; descEn:string; descPt:string; descEs:string }> = {
  streak7:   { en:"7-Day Streak", pt:"7 Dias Seguidos", es:"Racha de 7 Días", descEn:"Learned 7 days in a row", descPt:"Aprendeu 7 dias seguidos", descEs:"Aprendiste 7 días seguidos" },
  firstXP:   { en:"First XP", pt:"Primeiro XP", es:"Primer XP", descEn:"Earned your first XP tokens", descPt:"Ganhou seus primeiros XP", descEs:"Ganaste tus primeros XP" },
  firstCert: { en:"First Certificate", pt:"Primeiro Certificado", es:"Primer Certificado", descEn:"Minted an on-chain certificate", descPt:"Cunhou um certificado on-chain", descEs:"Acuñaste un certificado on-chain" },
  builder:   { en:"Builder", pt:"Construtor", es:"Constructor", descEn:"Complete 3 courses", descPt:"Complete 3 cursos", descEs:"Completa 3 cursos" },
  solNative: { en:"Solana Native", pt:"Nativo Solana", es:"Nativo Solana", descEn:"Complete Solana track", descPt:"Complete a trilha Solana", descEs:"Completa la pista Solana" },
  defiExpert:{ en:"DeFi Expert", pt:"Expert DeFi", es:"Experto DeFi", descEn:"Complete DeFi track", descPt:"Complete a trilha DeFi", descEs:"Completa la pista DeFi" },
};

function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { const el = ref.current; if (!el) return; el.style.transitionDelay = `${delay}ms`; el.classList.add("reveal"); const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("on"); obs.disconnect(); } }, { threshold:.06 }); obs.observe(el); return () => obs.disconnect(); }, [delay]);
  return ref;
}

function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => { const fn = () => { const el = document.documentElement; setPct((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100); }; window.addEventListener("scroll", fn, { passive:true }); return () => window.removeEventListener("scroll", fn); }, []);
  return <div className="scroll-progress" style={{ width:`${pct}%` }} />;
}

function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { const fn = (e: MouseEvent) => { if (ref.current) { ref.current.style.left = e.clientX + "px"; ref.current.style.top = e.clientY + "px"; } }; window.addEventListener("mousemove", fn, { passive:true }); return () => window.removeEventListener("mousemove", fn); }, []);
  return <div ref={ref} className="cursor-spotlight" />;
}

function Background() {
  return (
    <div style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:"-25%", left:"-15%", width:"70vw", height:"70vw", borderRadius:"50%", background:"radial-gradient(circle,var(--orb1) 0%,transparent 65%)", animation:"orbFloat 14s ease-in-out infinite" }} />
      <div style={{ position:"absolute", top:"-10%", right:"-8%", width:"55vw", height:"55vw", borderRadius:"50%", background:"radial-gradient(circle,var(--orb2) 0%,transparent 65%)", animation:"orbFloat2 17s ease-in-out infinite" }} />
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle,var(--dot-color) 1px,transparent 1px)", backgroundSize:"30px 30px", maskImage:"radial-gradient(ellipse 85% 85% at 50% 50%,black 20%,transparent 100%)", WebkitMaskImage:"radial-gradient(ellipse 85% 85% at 50% 50%,black 20%,transparent 100%)" }} />
    </div>
  );
}

function LangSwitcher() {
  const { lang, setLang } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { const fn = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); }; document.addEventListener("mousedown", fn); return () => document.removeEventListener("mousedown", fn); }, []);
  return (
    <div ref={ref} style={{ position:"relative" }}>
      <button onClick={() => setOpen(o => !o)} className="theme-btn" style={{ gap:6, width:"auto", padding:"0 12px", fontSize:12, fontFamily:"'JetBrains Mono',monospace", fontWeight:600, color:"var(--text-sub)", letterSpacing:".04em" }}>
        <span>{LANG_FLAGS[lang]}</span><span style={{ fontSize:11 }}>{lang.toUpperCase()}</span><span style={{ opacity:.5, fontSize:9 }}>▾</span>
      </button>
      {open && (
        <div className="lang-dropdown">
          {(["en","pt","es"] as const).map(l => (
            <div key={l} className={`lang-option ${lang===l?"selected":""}`} onClick={() => { setLang(l); setOpen(false); }}>
              <span style={{ fontSize:18 }}>{LANG_FLAGS[l]}</span><span>{LANG_LABELS[l]}</span>
              {lang===l && <span style={{ marginLeft:"auto", color:"var(--green)", fontSize:12 }}>✓</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return <button className="theme-btn" onClick={toggleTheme}>{theme==="dark"?"☀️":"🌙"}</button>;
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 30); window.addEventListener("scroll", fn, { passive:true }); return () => window.removeEventListener("scroll", fn); }, []);
  return (
    <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, height:62, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 48px", background:scrolled?"var(--nav-bg)":"transparent", backdropFilter:scrolled?"blur(28px) saturate(1.6)":"none", borderBottom:scrolled?"1px solid var(--footer-border)":"none", transition:"all 600ms" }}>
      <a href="/" style={{ display:"flex", alignItems:"center", gap:10, textDecoration:"none" }}>
        <div style={{ width:34, height:34, borderRadius:9, background:"linear-gradient(135deg,var(--green),var(--purple))", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 0 22px rgba(20,241,149,.38)" }}>
          <span className="f-head" style={{ fontSize:12, fontWeight:800, color:"#060608" }}>ST</span>
        </div>
        <span className="f-head" style={{ fontSize:15, fontWeight:600, letterSpacing:"-.03em", color:"var(--text)" }}>Superteam<span style={{ color:"var(--text-faint)", fontWeight:300 }}> Academy</span></span>
      </a>
      <div className="nav-links" style={{ display:"flex", gap:30 }}>
        {([[t.nav.courses,"/courses"],[t.nav.leaderboard,"/leaderboard"],[t.nav.dashboard,"/dashboard"]] as [string,string][]).map(([l,h]) => (
          <a key={h} href={h} className={`nav-link ${h==="/dashboard"?"active":""}`}>{l}</a>
        ))}
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
        <ThemeToggle /><LangSwitcher />
        <WalletMultiButton className="nav-cta" style={{ background:"var(--green)", color:"#060608", fontFamily:"Space Grotesk,sans-serif", fontWeight:700, fontSize:13, borderRadius:10, padding:"9px 20px", height:"auto", lineHeight:"normal" }} />
      </div>
    </nav>
  );
}

function DashboardInner() {
  const { t, lang } = useTranslation();
  const { connected, publicKey } = useWallet();
  const totalXP = 854;
  const level = Math.floor(Math.sqrt(totalXP / 100));
  const nextLevelXP = Math.pow(level + 1, 2) * 100;
  const pct = Math.round((totalXP / nextLevelXP) * 100);
  const walletShort = publicKey ? `${publicKey.toString().slice(0,4)}...${publicKey.toString().slice(-4)}` : "7xKp...3mRt";
  const h1 = useReveal(0); const h2 = useReveal(80); const h3 = useReveal(160); const h4 = useReveal(240); const h5 = useReveal(320);

  if (!connected) {
    return (
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:"70vh", textAlign:"center", gap:24 }}>
        <div style={{ width:72, height:72, borderRadius:20, background:"linear-gradient(135deg,var(--green-dim),var(--purple-dim))", border:"1px solid var(--border)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:32 }}>🔐</div>
        <div>
          <h2 className="f-head" style={{ fontSize:28, fontWeight:700, color:"var(--text)", marginBottom:10, letterSpacing:"-.04em" }}>{t.dashboard.connect.title}</h2>
          <p className="f-body" style={{ fontSize:15, color:"var(--text-sub)", lineHeight:1.7, maxWidth:340 }}>{t.dashboard.connect.sub}</p>
        </div>
        <WalletMultiButton style={{ background:"var(--green)", color:"#060608", fontFamily:"Space Grotesk,sans-serif", fontWeight:700, fontSize:15, borderRadius:12, padding:"12px 28px", height:"auto" }} />
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div ref={h1} style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:48, flexWrap:"wrap", gap:20 }}>
        <div>
          <span className="f-mono" style={{ display:"inline-block", fontSize:11, color:"var(--green)", letterSpacing:".13em", textTransform:"uppercase", marginBottom:14, opacity:.7 }}>//  {t.dashboard.breadcrumb}</span>
          <h1 className="f-head" style={{ fontSize:"clamp(2rem,4vw,3.8rem)", fontWeight:700, letterSpacing:"-.048em", color:"var(--text)", lineHeight:.92, marginBottom:10 }}>
            {t.dashboard.greeting} <span className="shimmer-text">{walletShort}</span>
          </h1>
          <p className="f-body" style={{ fontSize:15, fontWeight:300, color:"var(--text-sub)", lineHeight:1.72 }}>
            {t.dashboard.sub.replace("{xp}", totalXP.toLocaleString())}
          </p>
        </div>
        <div className="glass" style={{ borderRadius:18, padding:"18px 24px", display:"flex", alignItems:"center", gap:16, minWidth:280 }}>
          <div style={{ width:48, height:48, borderRadius:14, background:"linear-gradient(135deg,var(--green-dim),var(--purple-dim))", border:"1px solid var(--border)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>⚡</div>
          <div style={{ flex:1 }}>
            <div className="f-mono" style={{ fontSize:9, color:"var(--text-faint)", letterSpacing:".09em", textTransform:"uppercase", marginBottom:4 }}>{t.dashboard.xpTo} {level + 1}</div>
            <div className="f-head" style={{ fontSize:20, fontWeight:700, color:"var(--green)", marginBottom:8 }}>
              {totalXP.toLocaleString()} <span style={{ fontSize:13, color:"var(--text-faint)", fontWeight:400 }}>/ {nextLevelXP.toLocaleString()}</span>
            </div>
            <div style={{ height:4, background:"var(--border)", borderRadius:99, overflow:"hidden" }}>
              <div style={{ height:"100%", width:`${pct}%`, background:"linear-gradient(90deg,var(--purple),var(--green))", borderRadius:99, boxShadow:"0 0 10px rgba(20,241,149,.4)", transition:"width 1s cubic-bezier(.16,1,.3,1)" }} />
            </div>
            <div className="f-mono" style={{ fontSize:9, color:"var(--green)", marginTop:4, textAlign:"right", opacity:.7 }}>{pct}% → Lv.{level+1}</div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div ref={h2} className="stats-row" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:40 }}>
        {[
          { label:t.dashboard.stats.xp, value:totalXP.toLocaleString(), sub:t.dashboard.stats.xpSub, icon:"⚡", c:"var(--green)" },
          { label:t.dashboard.stats.level, value:level, sub:t.dashboard.stats.levelSub, icon:"🏗", c:"var(--purple)" },
          { label:t.dashboard.stats.courses, value:"3", sub:t.dashboard.stats.coursesSub, icon:"📚", c:"#60a5fa" },
          { label:t.dashboard.stats.streak, value:"7d", sub:t.dashboard.stats.streakSub, icon:"🔥", c:"#f59e0b" },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}>
              <span className="f-mono" style={{ fontSize:10, color:"var(--text-faint)", letterSpacing:".08em", textTransform:"uppercase" }}>{s.label}</span>
              <span style={{ fontSize:20 }}>{s.icon}</span>
            </div>
            <div className="f-head" style={{ fontSize:28, fontWeight:700, color:s.c, letterSpacing:"-.04em", marginBottom:4 }}>{s.value}</div>
            <div className="f-body" style={{ fontSize:12, color:"var(--text-sub)" }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Main 2-col grid */}
      <div className="dash-grid" style={{ display:"grid", gridTemplateColumns:"1fr 360px", gap:20, marginBottom:40 }}>
        {/* In progress */}
        <div ref={h3}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
            <h2 className="f-head" style={{ fontSize:18, fontWeight:700, color:"var(--text)", letterSpacing:"-.03em" }}>{t.dashboard.inProgress}</h2>
            <a href="/courses" className="f-mono" style={{ fontSize:11, color:"var(--green)", letterSpacing:".06em", textDecoration:"none", textTransform:"uppercase", opacity:.8 }}>{t.dashboard.viewAll}</a>
          </div>
          <div className="glass" style={{ borderRadius:20, overflow:"hidden" }}>
            {ENROLLED.map(c => (
              <div key={c.slug} className="course-row" onClick={() => window.location.href = `/courses/${c.slug}`}>
                <div style={{ display:"flex", gap:16, alignItems:"center" }}>
                  <div style={{ width:44, height:44, borderRadius:12, background:`${c.accent}14`, border:`1px solid ${c.accent}28`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>{c.emoji}</div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
                      <span className="f-head" style={{ fontSize:15, fontWeight:600, color:"var(--text)", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{c.title}</span>
                      <span className="f-mono" style={{ fontSize:11, color:c.accent, marginLeft:12, flexShrink:0 }}>{c.pct}%</span>
                    </div>
                    <div style={{ height:3, background:"var(--border)", borderRadius:99, overflow:"hidden", marginBottom:6 }}>
                      <div style={{ height:"100%", width:`${c.pct}%`, background:`linear-gradient(90deg,${c.accent}88,${c.accent})`, borderRadius:99 }} />
                    </div>
                    <div style={{ display:"flex", gap:12 }}>
                      <span className="f-body" style={{ fontSize:12, color:"var(--text-sub)" }}>{t.dashboard.next} {c.nextLesson}</span>
                      <span className="f-mono" style={{ fontSize:11, color:c.accent }}>+{c.xp} XP</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right col */}
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          {/* XP Terminal */}
          <div ref={h4} className="glass" style={{ borderRadius:18, padding:"20px 22px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:14 }}>
              {["#ff5f57","#febc2e","#28c840"].map(c => <div key={c} style={{ width:10, height:10, borderRadius:"50%", background:c }} />)}
              <span className="f-mono" style={{ fontSize:10, color:"var(--text-faint)", marginLeft:6, letterSpacing:".07em" }}>xp_console</span>
            </div>
            {[
              { t:`$ xp.balance("${walletShort}")`, c:"var(--text-muted)" },
              { t:`> ${totalXP.toLocaleString()} XP confirmed ✓`, c:"var(--green)" },
              { t:`$ level.calculate(${totalXP})`, c:"var(--text-muted)" },
              { t:`> Level = ⌊ √(${totalXP} ÷ 100) ⌋`, c:"var(--text-sub)" },
              { t:`> Level ${level} · Builder 🏗`, c:"var(--green)" },
            ].map((l, i) => <div key={i} className="f-mono" style={{ fontSize:12, color:l.c, lineHeight:1.9, letterSpacing:".02em" }}>{l.t}</div>)}
            <div className="f-mono" style={{ fontSize:12, color:"var(--text-faint)", marginTop:2 }}><span style={{ animation:"blink 1s step-end infinite", color:"var(--green)" }}>█</span></div>
          </div>

          {/* Certificates */}
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
              <h2 className="f-head" style={{ fontSize:16, fontWeight:700, color:"var(--text)", letterSpacing:"-.03em" }}>{t.dashboard.certificates}</h2>
              <span className="f-mono" style={{ fontSize:10, color:"var(--text-faint)", letterSpacing:".07em", textTransform:"uppercase" }}>{CERTS.length} {t.dashboard.minted}</span>
            </div>
            {CERTS.map(cert => (
              <div key={cert.title} className="cert-card">
                <div style={{ display:"flex", gap:12, alignItems:"center" }}>
                  <div style={{ width:44, height:44, borderRadius:12, background:"linear-gradient(135deg,var(--purple-dim),var(--green-dim))", border:"1px solid var(--border)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>🎓</div>
                  <div>
                    <div className="f-head" style={{ fontSize:14, fontWeight:600, color:"var(--text)", marginBottom:3 }}>{cert.title}</div>
                    <div style={{ display:"flex", gap:8 }}>
                      <span className="f-mono" style={{ fontSize:10, color:"var(--text-faint)", letterSpacing:".06em" }}>{cert.date}</span>
                      <span className="f-mono" style={{ fontSize:10, color:"var(--green)" }}>Score: {cert.score}%</span>
                    </div>
                  </div>
                  <div style={{ marginLeft:"auto" }}><span style={{ width:8, height:8, borderRadius:"50%", background:"var(--green)", boxShadow:"0 0 8px var(--green)", display:"inline-block" }} /></div>
                </div>
                <div style={{ marginTop:12, paddingTop:12, borderTop:"1px solid var(--border)", display:"flex", gap:8 }}>
                  <button style={{ flex:1, padding:"7px 0", borderRadius:8, background:"var(--purple-dim)", border:"1px solid var(--purple-border)", fontFamily:"JetBrains Mono,monospace", fontSize:10, color:"var(--purple)", cursor:"pointer", letterSpacing:".06em", textTransform:"uppercase" }}>{t.dashboard.viewOnChain}</button>
                  <button style={{ flex:1, padding:"7px 0", borderRadius:8, background:"var(--pill-bg)", border:"1px solid var(--pill-border)", fontFamily:"JetBrains Mono,monospace", fontSize:10, color:"var(--text-sub)", cursor:"pointer", letterSpacing:".06em", textTransform:"uppercase" }}>{t.dashboard.share}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div ref={h5}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
          <h2 className="f-head" style={{ fontSize:18, fontWeight:700, color:"var(--text)", letterSpacing:"-.03em" }}>{t.dashboard.achievements}</h2>
          <span className="f-mono" style={{ fontSize:11, color:"var(--text-faint)", letterSpacing:".07em", textTransform:"uppercase" }}>
            {ACHIEVEMENTS.filter(a => a.unlocked).length}/{ACHIEVEMENTS.length} {t.dashboard.unlocked}
          </span>
        </div>
        <div className="achiev-grid" style={{ display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:12 }}>
          {ACHIEVEMENTS.map(a => {
            const al = ACHIEV_LABELS[a.key];
            const title = al[lang === "pt" ? "pt" : lang === "es" ? "es" : "en"] as string;
            const desc = al[lang === "pt" ? "descPt" : lang === "es" ? "descEs" : "descEn"] as string;
            return (
              <div key={a.key} className="glass" style={{ borderRadius:16, padding:18, textAlign:"center", opacity:a.unlocked?1:.35, cursor:a.unlocked?"default":"not-allowed" }}>
                <div style={{ fontSize:28, marginBottom:8, filter:a.unlocked?"none":"grayscale(1)" }}>{a.emoji}</div>
                <div className="f-head" style={{ fontSize:12, fontWeight:600, color:a.unlocked?"var(--text)":"var(--text-sub)", marginBottom:4, lineHeight:1.2 }}>{title}</div>
                <div className="f-body" style={{ fontSize:11, color:"var(--text-faint)", lineHeight:1.4 }}>{desc}</div>
                {a.unlocked && <div style={{ marginTop:8, width:6, height:6, borderRadius:"50%", background:"var(--green)", boxShadow:"0 0 8px var(--green)", margin:"8px auto 0" }} />}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default function DashboardPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: BASE_STYLES }} suppressHydrationWarning />
      <I18nThemeProvider>
        <div style={{ position:"relative", background:"var(--bg)", minHeight:"100vh", overflowX:"hidden" }}>
          <ScrollProgress /><CursorSpotlight /><Background /><Navbar />
          <div className="page-pad" style={{ position:"relative", zIndex:10, padding:"110px 48px 80px", maxWidth:1440, margin:"0 auto" }}>
            <DashboardInner />
          </div>
          <footer style={{ position:"relative", zIndex:10, borderTop:"1px solid var(--footer-border)", padding:"24px 48px", maxWidth:1440, margin:"0 auto" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:14 }}>
              <span className="f-body" style={{ fontSize:13, color:"var(--text-faint)" }}>Superteam Academy · MIT · 2026</span>
              <div style={{ display:"flex", gap:24 }}>{["GitHub","Twitter","Docs"].map(l => <a key={l} href="#" className="nav-link" style={{ fontSize:12 }}>{l}</a>)}</div>
            </div>
          </footer>
        </div>
      </I18nThemeProvider>
    </>
  );
}
