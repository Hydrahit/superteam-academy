"use client";

import { useState, useEffect, useRef } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

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
  @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
  @keyframes gradShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
  @keyframes orbFloat{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(28px,-18px) scale(1.04)}66%{transform:translate(-18px,14px) scale(.97)}}
  @keyframes orbFloat2{0%,100%{transform:translate(0,0)}50%{transform:translate(-22px,18px) scale(1.03)}}
  @keyframes xpFill{from{width:0}to{width:var(--w,60%)}}
  @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
  @keyframes heartbeat{0%,100%{transform:scale(1)}14%{transform:scale(1.18)}28%{transform:scale(1)}42%{transform:scale(1.1)}}
  @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
  @keyframes glowPulse{0%,100%{box-shadow:0 0 20px rgba(20,241,149,.25),0 0 60px rgba(20,241,149,.08)}50%{box-shadow:0 0 44px rgba(20,241,149,.6),0 0 110px rgba(20,241,149,.2)}}
  .shimmer-text{background:linear-gradient(90deg,#14F195 0%,#9945FF 25%,#14F195 50%,#9945FF 75%,#14F195 100%);background-size:200% auto;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:shimmer 4s linear infinite}
  .glass{background:rgba(255,255,255,.026);backdrop-filter:blur(32px) saturate(1.5);-webkit-backdrop-filter:blur(32px) saturate(1.5);border:1px solid rgba(255,255,255,.072);position:relative;transition:transform 500ms cubic-bezier(.16,1,.3,1),box-shadow 500ms ease,border-color 300ms ease}
  .glass::before{content:'';position:absolute;top:0;left:14%;right:14%;height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.11),transparent);border-radius:99px;pointer-events:none}
  .nav-link{color:rgba(255,255,255,.32);transition:color 200ms ease;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;text-decoration:none;position:relative}
  .nav-link::after{content:'';position:absolute;bottom:-4px;left:0;right:0;height:1px;background:linear-gradient(90deg,#14F195,#9945FF);transform:scaleX(0);transition:transform 250ms ease;transform-origin:left}
  .nav-link:hover{color:rgba(255,255,255,.9)}
  .nav-link:hover::after{transform:scaleX(1)}
  .nav-link.active{color:#fff}
  .nav-link.active::after{transform:scaleX(1)}
  .btn-primary{display:inline-flex;align-items:center;gap:10px;padding:12px 24px;border-radius:12px;background:#14F195;border:none;cursor:pointer;font-family:'Space Grotesk',sans-serif;font-size:14px;font-weight:700;color:#060608;letter-spacing:-.02em;transition:transform 200ms ease,filter 200ms ease;animation:glowPulse 2.8s ease-in-out infinite}
  .btn-primary:hover{transform:translateY(-2px) scale(1.02);filter:brightness(1.08)}
  .scroll-progress{position:fixed;top:0;left:0;height:2px;z-index:200;background:linear-gradient(90deg,#14F195,#9945FF,#14F195);background-size:200% 100%;animation:gradShift 3s linear infinite;transition:width 80ms linear}
  .cursor-spotlight{position:fixed;width:520px;height:520px;border-radius:50%;background:radial-gradient(circle,rgba(20,241,149,.048) 0%,rgba(153,69,255,.025) 40%,transparent 70%);pointer-events:none;z-index:1;transform:translate(-50%,-50%);transition:left 60ms linear,top 60ms linear;mix-blend-mode:screen}
  .stat-card{border-radius:20px;padding:24px;background:rgba(255,255,255,.024);border:1px solid rgba(255,255,255,.07);transition:border-color 300ms ease,transform 400ms cubic-bezier(.16,1,.3,1)}
  .stat-card:hover{border-color:rgba(20,241,149,.2);transform:translateY(-4px)}
  .course-row{padding:18px 24px;border-bottom:1px solid rgba(255,255,255,.042);transition:background 200ms ease;cursor:pointer}
  .course-row:hover{background:rgba(255,255,255,.025)}
  .course-row:last-child{border-bottom:none}
  .cert-card{border-radius:16px;background:rgba(255,255,255,.024);border:1px solid rgba(255,255,255,.07);padding:20px;transition:all 300ms ease;cursor:pointer}
  .cert-card:hover{border-color:rgba(153,69,255,.3);transform:translateY(-4px);box-shadow:0 16px 48px rgba(0,0,0,.6)}
  .reveal{opacity:0;transform:translateY(24px);transition:opacity 800ms cubic-bezier(.16,1,.3,1),transform 800ms cubic-bezier(.16,1,.3,1)}
  .reveal.on{opacity:1;transform:translateY(0)}
  @media(max-width:900px){.nav-links,.nav-cta{display:none!important}.dash-grid{grid-template-columns:1fr!important}.stats-row{grid-template-columns:1fr 1fr!important}.page-pad{padding:100px 20px 60px!important}}
`;

const ENROLLED = [
  { slug:"web3-basics", title:"Web3 & Blockchain Basics", track:"Foundation", pct:85, xp:425, accent:"#14F195", emoji:"🌐", nextLesson:"Smart Contracts 101" },
  { slug:"solana-fundamentals", title:"Solana Fundamentals", track:"Solana", pct:42, xp:294, accent:"#9945FF", emoji:"⚡", nextLesson:"Account Model Deep Dive" },
  { slug:"anchor-development", title:"Anchor Development", track:"Programs", pct:15, xp:135, accent:"#60a5fa", emoji:"⚓", nextLesson:"PDA Creation & Signing" },
];

const CERTS = [
  { title:"Web3 Foundations", date:"Feb 2026", score:94, accent:"#14F195", emoji:"🌐" },
];

const ACHIEVEMENTS = [
  { emoji:"🔥", title:"7-Day Streak", desc:"Learned 7 days in a row", unlocked:true },
  { emoji:"⚡", title:"First XP", desc:"Earned your first XP tokens", unlocked:true },
  { emoji:"🎓", title:"First Certificate", desc:"Minted an on-chain certificate", unlocked:true },
  { emoji:"🏗", title:"Builder", desc:"Complete 3 courses", unlocked:false },
  { emoji:"🚀", title:"Solana Native", desc:"Complete Solana track", unlocked:false },
  { emoji:"💎", title:"DeFi Expert", desc:"Complete DeFi track", unlocked:false },
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
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: 62, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 48px", background: scrolled ? "rgba(6,6,8,.9)" : "transparent", backdropFilter: scrolled ? "blur(28px) saturate(1.6)" : "none", borderBottom: scrolled ? "1px solid rgba(255,255,255,.05)" : "none", transition: "all 600ms" }}>
      <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
        <div style={{ width: 34, height: 34, borderRadius: 9, background: "linear-gradient(135deg,#14F195,#9945FF)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 22px rgba(20,241,149,.38)" }}>
          <span className="f-head" style={{ fontSize: 12, fontWeight: 800, color: "#060608" }}>ST</span>
        </div>
        <span className="f-head" style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-.03em", color: "rgba(255,255,255,.9)" }}>Superteam<span style={{ color: "rgba(255,255,255,.26)", fontWeight: 300 }}> Academy</span></span>
      </a>
      <div className="nav-links" style={{ display: "flex", gap: 30 }}>
        {[["Courses", "/courses"], ["Leaderboard", "/leaderboard"], ["Dashboard", "/dashboard"]].map(([l, h]) => (
          <a key={l} href={h} className={`nav-link ${h === "/dashboard" ? "active" : ""}`}>{l}</a>
        ))}
      </div>
      <WalletMultiButton className="nav-cta" style={{ background: "#14F195", color: "#060608", fontFamily: "Space Grotesk,sans-serif", fontWeight: 700, fontSize: 13, borderRadius: 10, padding: "9px 20px", height: "auto", lineHeight: "normal" }} />
    </nav>
  );
}

function ConnectPrompt() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "70vh", textAlign: "center", gap: 24 }}>
      <div style={{ width: 72, height: 72, borderRadius: 20, background: "linear-gradient(135deg,rgba(20,241,149,.15),rgba(153,69,255,.15))", border: "1px solid rgba(255,255,255,.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 }}>🔐</div>
      <div>
        <h2 className="f-head" style={{ fontSize: 28, fontWeight: 700, color: "#fff", marginBottom: 10, letterSpacing: "-.04em" }}>Connect your wallet</h2>
        <p className="f-body" style={{ fontSize: 15, color: "rgba(255,255,255,.38)", lineHeight: 1.7, maxWidth: 340 }}>Your dashboard, XP, and credentials are linked to your Solana wallet.</p>
      </div>
      <WalletMultiButton style={{ background: "#14F195", color: "#060608", fontFamily: "Space Grotesk,sans-serif", fontWeight: 700, fontSize: 15, borderRadius: 12, padding: "12px 28px", height: "auto" }} />
    </div>
  );
}

export default function DashboardPage() {
  const { publicKey, connected } = useWallet();
  const totalXP = 854;
  const level = Math.floor(Math.sqrt(totalXP / 100));
  const nextLevelXP = Math.pow(level + 1, 2) * 100;
  const pct = Math.round((totalXP / nextLevelXP) * 100);
  const headerRef = useReveal(0);
  const statsRef = useReveal(80);
  const coursesRef = useReveal(160);
  const certsRef = useReveal(240);
  const achievRef = useReveal(320);

  const walletShort = publicKey ? `${publicKey.toString().slice(0, 4)}...${publicKey.toString().slice(-4)}` : "7xKp...3mRt";

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} suppressHydrationWarning />
      <div style={{ position: "relative", background: "#060608", minHeight: "100vh", overflowX: "hidden" }}>
        <ScrollProgress />
        <CursorSpotlight />
        <Background />
        <Navbar />

        <div className="page-pad" style={{ position: "relative", zIndex: 10, padding: "110px 48px 80px", maxWidth: 1440, margin: "0 auto" }}>
          {!connected ? <ConnectPrompt /> : (
            <>
              {/* Header */}
              <div ref={headerRef} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 48, flexWrap: "wrap", gap: 20 }}>
                <div>
                  <span className="f-mono" style={{ display: "inline-block", fontSize: 11, color: "rgba(20,241,149,.52)", letterSpacing: ".13em", textTransform: "uppercase", marginBottom: 14 }}>//  Your Dashboard</span>
                  <h1 className="f-head" style={{ fontSize: "clamp(2rem,4vw,3.8rem)", fontWeight: 700, letterSpacing: "-.048em", color: "#fff", lineHeight: .92, marginBottom: 10 }}>
                    gm, <span className="shimmer-text">{walletShort}</span>
                  </h1>
                  <p className="f-body" style={{ fontSize: 15, fontWeight: 300, color: "rgba(255,255,255,.35)", lineHeight: 1.72 }}>Level {level} · Builder · {totalXP.toLocaleString()} XP on-chain</p>
                </div>
                <div className="glass" style={{ borderRadius: 18, padding: "18px 24px", display: "flex", alignItems: "center", gap: 16, minWidth: 280 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: "linear-gradient(135deg,rgba(20,241,149,.2),rgba(153,69,255,.2))", border: "1px solid rgba(255,255,255,.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>⚡</div>
                  <div style={{ flex: 1 }}>
                    <div className="f-mono" style={{ fontSize: 9, color: "rgba(255,255,255,.2)", letterSpacing: ".09em", textTransform: "uppercase", marginBottom: 4 }}>XP to Level {level + 1}</div>
                    <div className="f-head" style={{ fontSize: 20, fontWeight: 700, color: "#14F195", marginBottom: 8 }}>{totalXP.toLocaleString()} <span style={{ fontSize: 13, color: "rgba(255,255,255,.3)", fontWeight: 400 }}>/ {nextLevelXP.toLocaleString()}</span></div>
                    <div style={{ height: 4, background: "rgba(255,255,255,.055)", borderRadius: 99, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg,#9945FF,#14F195)", borderRadius: 99, boxShadow: "0 0 10px rgba(20,241,149,.5)", transition: "width 1s cubic-bezier(.16,1,.3,1)" }} />
                    </div>
                    <div className="f-mono" style={{ fontSize: 9, color: "rgba(20,241,149,.5)", marginTop: 4, textAlign: "right" }}>{pct}% to Level {level + 1}</div>
                  </div>
                </div>
              </div>

              {/* Stats row */}
              <div ref={statsRef} className="stats-row" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 40 }}>
                {[
                  { label: "XP Earned", value: totalXP.toLocaleString(), sub: "Non-transferable", icon: "⚡", accent: "#14F195" },
                  { label: "Level", value: level, sub: "Builder tier", icon: "🏗", accent: "#9945FF" },
                  { label: "Courses", value: "3", sub: "In progress", icon: "📚", accent: "#60a5fa" },
                  { label: "Streak", value: "7d", sub: "Keep going!", icon: "🔥", accent: "#f59e0b" },
                ].map(s => (
                  <div key={s.label} className="stat-card">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                      <span className="f-mono" style={{ fontSize: 10, color: "rgba(255,255,255,.2)", letterSpacing: ".08em", textTransform: "uppercase" }}>{s.label}</span>
                      <span style={{ fontSize: 20 }}>{s.icon}</span>
                    </div>
                    <div className="f-head" style={{ fontSize: 28, fontWeight: 700, color: s.accent, letterSpacing: "-.04em", marginBottom: 4 }}>{s.value}</div>
                    <div className="f-body" style={{ fontSize: 12, color: "rgba(255,255,255,.25)" }}>{s.sub}</div>
                  </div>
                ))}
              </div>

              {/* Main grid */}
              <div className="dash-grid" style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 20, marginBottom: 40 }}>

                {/* Courses in progress */}
                <div ref={coursesRef}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <h2 className="f-head" style={{ fontSize: 18, fontWeight: 700, color: "#fff", letterSpacing: "-.03em" }}>In Progress</h2>
                    <a href="/courses" className="f-mono" style={{ fontSize: 11, color: "rgba(20,241,149,.6)", letterSpacing: ".06em", textDecoration: "none", textTransform: "uppercase" }}>View all →</a>
                  </div>
                  <div className="glass" style={{ borderRadius: 20, overflow: "hidden" }}>
                    {ENROLLED.map((c, i) => (
                      <div key={c.slug} className="course-row" onClick={() => window.location.href = `/courses/${c.slug}`}>
                        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                          <div style={{ width: 44, height: 44, borderRadius: 12, background: `${c.accent}14`, border: `1px solid ${c.accent}28`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{c.emoji}</div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                              <span className="f-head" style={{ fontSize: 15, fontWeight: 600, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.title}</span>
                              <span className="f-mono" style={{ fontSize: 11, color: c.accent, marginLeft: 12, flexShrink: 0 }}>{c.pct}%</span>
                            </div>
                            <div style={{ height: 3, background: "rgba(255,255,255,.052)", borderRadius: 99, overflow: "hidden", marginBottom: 6 }}>
                              <div style={{ height: "100%", width: `${c.pct}%`, background: `linear-gradient(90deg,${c.accent}88,${c.accent})`, borderRadius: 99, boxShadow: `0 0 6px ${c.accent}88` }} />
                            </div>
                            <div style={{ display: "flex", gap: 12 }}>
                              <span className="f-body" style={{ fontSize: 12, color: "rgba(255,255,255,.3)" }}>Next: {c.nextLesson}</span>
                              <span className="f-mono" style={{ fontSize: 11, color: c.accent }}>+{c.xp} XP</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right column */}
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {/* XP Terminal */}
                  <div ref={certsRef} className="glass" style={{ borderRadius: 18, padding: "20px 22px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
                      {["#ff5f57", "#febc2e", "#28c840"].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
                      <span className="f-mono" style={{ fontSize: 10, color: "rgba(255,255,255,.16)", marginLeft: 6, letterSpacing: ".07em" }}>xp_console</span>
                    </div>
                    {[
                      { t: `$ xp.balance("${walletShort}")`, c: "rgba(255,255,255,.36)" },
                      { t: `> ${totalXP.toLocaleString()} XP confirmed ✓`, c: "#14F195" },
                      { t: `$ level.calculate(${totalXP})`, c: "rgba(255,255,255,.36)" },
                      { t: `> Level = ⌊ √(${totalXP} ÷ 100) ⌋`, c: "rgba(255,255,255,.52)" },
                      { t: `> Level ${level} · Builder 🏗`, c: "#14F195" },
                    ].map((l, i) => (
                      <div key={i} className="f-mono" style={{ fontSize: 12, color: l.c, lineHeight: 1.9, letterSpacing: ".02em" }}>{l.t}</div>
                    ))}
                    <div className="f-mono" style={{ fontSize: 12, color: "rgba(255,255,255,.18)", marginTop: 2 }}>
                      <span style={{ animation: "blink 1s step-end infinite", color: "#14F195" }}>█</span>
                    </div>
                  </div>

                  {/* Certificates */}
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                      <h2 className="f-head" style={{ fontSize: 16, fontWeight: 700, color: "#fff", letterSpacing: "-.03em" }}>Certificates</h2>
                      <span className="f-mono" style={{ fontSize: 10, color: "rgba(255,255,255,.2)", letterSpacing: ".07em", textTransform: "uppercase" }}>{CERTS.length} minted</span>
                    </div>
                    {CERTS.map(cert => (
                      <div key={cert.title} className="cert-card">
                        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                          <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg,rgba(153,69,255,.2),rgba(20,241,149,.1))", border: "1px solid rgba(255,255,255,.09)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🎓</div>
                          <div>
                            <div className="f-head" style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 3 }}>{cert.title}</div>
                            <div style={{ display: "flex", gap: 8 }}>
                              <span className="f-mono" style={{ fontSize: 10, color: "rgba(255,255,255,.25)", letterSpacing: ".06em" }}>{cert.date}</span>
                              <span className="f-mono" style={{ fontSize: 10, color: "#14F195" }}>Score: {cert.score}%</span>
                            </div>
                          </div>
                          <div style={{ marginLeft: "auto" }}>
                            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#14F195", boxShadow: "0 0 8px #14F195", display: "inline-block" }} />
                          </div>
                        </div>
                        <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,.05)", display: "flex", gap: 8 }}>
                          <button style={{ flex: 1, padding: "7px 0", borderRadius: 8, background: "rgba(153,69,255,.09)", border: "1px solid rgba(153,69,255,.17)", fontFamily: "JetBrains Mono,monospace", fontSize: 10, color: "#9945FF", cursor: "pointer", letterSpacing: ".06em", textTransform: "uppercase" }}>View on-chain ↗</button>
                          <button style={{ flex: 1, padding: "7px 0", borderRadius: 8, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", fontFamily: "JetBrains Mono,monospace", fontSize: 10, color: "rgba(255,255,255,.4)", cursor: "pointer", letterSpacing: ".06em", textTransform: "uppercase" }}>Share</button>
                        </div>
                      </div>
                    ))}
                    {CERTS.length === 0 && (
                      <div className="glass" style={{ borderRadius: 16, padding: 24, textAlign: "center" }}>
                        <div style={{ fontSize: 28, marginBottom: 8 }}>🎓</div>
                        <div className="f-body" style={{ fontSize: 13, color: "rgba(255,255,255,.3)" }}>Complete a course to mint your first certificate</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div ref={achievRef}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <h2 className="f-head" style={{ fontSize: 18, fontWeight: 700, color: "#fff", letterSpacing: "-.03em" }}>Achievements</h2>
                  <span className="f-mono" style={{ fontSize: 11, color: "rgba(255,255,255,.2)", letterSpacing: ".07em", textTransform: "uppercase" }}>{ACHIEVEMENTS.filter(a => a.unlocked).length}/{ACHIEVEMENTS.length} unlocked</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 12 }}>
                  {ACHIEVEMENTS.map(a => (
                    <div key={a.title} className="glass" style={{ borderRadius: 16, padding: 18, textAlign: "center", opacity: a.unlocked ? 1 : .35, transition: "all 300ms ease", cursor: a.unlocked ? "default" : "not-allowed" }}>
                      <div style={{ fontSize: 28, marginBottom: 8, filter: a.unlocked ? "none" : "grayscale(1)" }}>{a.emoji}</div>
                      <div className="f-head" style={{ fontSize: 12, fontWeight: 600, color: a.unlocked ? "#fff" : "rgba(255,255,255,.5)", marginBottom: 4, lineHeight: 1.2 }}>{a.title}</div>
                      <div className="f-body" style={{ fontSize: 11, color: "rgba(255,255,255,.2)", lineHeight: 1.4 }}>{a.desc}</div>
                      {a.unlocked && <div style={{ marginTop: 8, width: 6, height: 6, borderRadius: "50%", background: "#14F195", boxShadow: "0 0 8px #14F195", margin: "8px auto 0" }} />}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

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
