// @ts-nocheck
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

/* ════════════════════════════════════════════════════════════════
   SUPERTEAM ACADEMY V3 ULTRA
   New: Canvas network viz, 3D tilt cards, magnetic buttons,
        typing hero, course modal, XP mini-game, live network
        stats, section indicator, sound engine, confetti burst
════════════════════════════════════════════════════════════════ */

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&family=JetBrains+Mono:wght@400;500;600&display=swap');

  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  html { scroll-behavior:smooth; background:#060608; }
  body { background:#060608; overflow-x:hidden; -webkit-font-smoothing:antialiased; }
  ::selection { background:rgba(20,241,149,.18); color:#14F195; }
  ::-webkit-scrollbar { width:2px; }
  ::-webkit-scrollbar-track { background:#060608; }
  ::-webkit-scrollbar-thumb { background:linear-gradient(to bottom,#14F195,#9945FF); border-radius:99px; }

  .f-head { font-family:'Space Grotesk',sans-serif; }
  .f-body { font-family:'DM Sans',sans-serif; }
  .f-mono { font-family:'JetBrains Mono',monospace; }

  @keyframes fadeUp    { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn    { from{opacity:0} to{opacity:1} }
  @keyframes ticker    { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  @keyframes orbFloat  { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(28px,-18px) scale(1.04)} 66%{transform:translate(-18px,14px) scale(.97)} }
  @keyframes orbFloat2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-22px,18px) scale(1.03)} }
  @keyframes blink     { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes scanPan   { 0%{top:-4px} 100%{top:100%} }
  @keyframes glowPulse { 0%,100%{box-shadow:0 0 20px rgba(20,241,149,.25),0 0 60px rgba(20,241,149,.08)} 50%{box-shadow:0 0 44px rgba(20,241,149,.6),0 0 110px rgba(20,241,149,.2)} }
  @keyframes xpFill    { from{width:0} to{width:var(--w,60%)} }
  @keyframes rankIn    { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }
  @keyframes particleDrift { 0%{transform:translateY(0) translateX(0);opacity:0} 10%{opacity:1} 90%{opacity:.5} 100%{transform:translateY(-110vh) translateX(var(--dx,20px));opacity:0} }
  @keyframes toastIn   { from{opacity:0;transform:translateX(110%)} to{opacity:1;transform:translateX(0)} }
  @keyframes toastOut  { from{opacity:1;transform:translateX(0)} to{opacity:0;transform:translateX(110%)} }
  @keyframes shimmer   { 0%{background-position:-200% center} 100%{background-position:200% center} }
  @keyframes gradShift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
  @keyframes ripple    { 0%{transform:scale(0);opacity:.45} 100%{transform:scale(4.5);opacity:0} }
  @keyframes confettiFall { 0%{transform:translateY(-10px) rotate(0deg);opacity:1} 100%{transform:translateY(120px) rotate(var(--r,360deg));opacity:0} }
  @keyframes heartbeat { 0%,100%{transform:scale(1)} 14%{transform:scale(1.18)} 28%{transform:scale(1)} 42%{transform:scale(1.1)} }
  @keyframes floatBadge{ 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
  @keyframes drawerIn  { from{transform:translateX(100%)} to{transform:translateX(0)} }
  @keyframes modalIn   { from{opacity:0;transform:scale(.94) translateY(20px)} to{opacity:1;transform:scale(1) translateY(0)} }
  @keyframes xpBounce  { 0%{transform:scale(1)} 30%{transform:scale(1.25)} 60%{transform:scale(.95)} 100%{transform:scale(1)} }
  @keyframes sectionPill{ from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
  @keyframes netPulse  { 0%,100%{opacity:.4;r:3} 50%{opacity:1;r:5} }
  @keyframes typewrite { from{width:0} to{width:100%} }
  @keyframes cursorBlink{ 50%{border-color:transparent} }

  .scanline-pan {
    position:absolute; left:0; right:0; height:1px;
    background:linear-gradient(90deg,transparent,rgba(20,241,149,.22),rgba(20,241,149,.55),rgba(20,241,149,.22),transparent);
    animation:scanPan 5s linear infinite; pointer-events:none; z-index:2;
  }
  .crt::after {
    content:''; position:fixed; inset:0; z-index:999; pointer-events:none;
    background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.022) 2px,rgba(0,0,0,.022) 4px);
  }
  .glass {
    background:rgba(255,255,255,.026);
    backdrop-filter:blur(32px) saturate(1.5); -webkit-backdrop-filter:blur(32px) saturate(1.5);
    border:1px solid rgba(255,255,255,.072); position:relative;
    transition:transform 500ms cubic-bezier(.16,1,.3,1), box-shadow 500ms ease, border-color 300ms ease;
  }
  .glass::before {
    content:''; position:absolute; top:0; left:14%; right:14%; height:1px;
    background:linear-gradient(90deg,transparent,rgba(255,255,255,.11),transparent);
    border-radius:99px; pointer-events:none;
  }
  .reveal { opacity:0; transform:translateY(28px); transition:opacity 900ms cubic-bezier(.16,1,.3,1), transform 900ms cubic-bezier(.16,1,.3,1); }
  .reveal.on { opacity:1; transform:translateY(0); }

  .shimmer-text {
    background:linear-gradient(90deg,#14F195 0%,#9945FF 25%,#14F195 50%,#9945FF 75%,#14F195 100%);
    background-size:200% auto; -webkit-background-clip:text; background-clip:text;
    -webkit-text-fill-color:transparent; animation:shimmer 4s linear infinite;
  }
  .nav-link {
    color:rgba(255,255,255,.32); transition:color 200ms ease;
    font-family:'DM Sans',sans-serif; font-size:13px; font-weight:500;
    text-decoration:none; position:relative;
  }
  .nav-link::after {
    content:''; position:absolute; bottom:-4px; left:0; right:0; height:1px;
    background:linear-gradient(90deg,#14F195,#9945FF);
    transform:scaleX(0); transition:transform 250ms ease; transform-origin:left;
  }
  .nav-link:hover { color:rgba(255,255,255,.9); }
  .nav-link:hover::after { transform:scaleX(1); }

  .scroll-row { display:flex; gap:16px; overflow-x:auto; padding-bottom:12px; scrollbar-width:none; scroll-snap-type:x mandatory; -webkit-overflow-scrolling:touch; }
  .scroll-row::-webkit-scrollbar { display:none; }
  .scroll-row > * { scroll-snap-align:start; flex-shrink:0; }

  .ticker-track { animation:ticker 36s linear infinite; display:flex; gap:48px; white-space:nowrap; }
  .ticker-track:hover { animation-play-state:paused; }

  .course-card {
    border-radius:20px; padding:22px; width:268px; cursor:pointer;
    border:1px solid rgba(255,255,255,.07);
    transition:transform 400ms cubic-bezier(.16,1,.3,1), box-shadow 400ms ease, border-color 300ms ease;
    background:rgba(255,255,255,.024); position:relative; overflow:hidden;
  }
  .course-card:hover { transform:translateY(-8px) scale(1.02); box-shadow:0 28px 70px rgba(0,0,0,.7); }
  .quick-play { opacity:0; transform:translateY(10px); transition:all 300ms ease; }
  .course-card:hover .quick-play { opacity:1; transform:translateY(0); }

  .rank-row { animation:rankIn 0.5s cubic-bezier(.16,1,.3,1) both; transition:background 200ms ease, transform 200ms ease; }
  .rank-row:hover { background:rgba(255,255,255,.025) !important; transform:translateX(4px); }

  .cursor-spotlight {
    position:fixed; width:520px; height:520px; border-radius:50%;
    background:radial-gradient(circle,rgba(20,241,149,.048) 0%,rgba(153,69,255,.025) 40%,transparent 70%);
    pointer-events:none; z-index:1; transform:translate(-50%,-50%);
    transition:left 60ms linear,top 60ms linear; mix-blend-mode:screen;
  }
  .scroll-progress {
    position:fixed; top:0; left:0; height:2px; z-index:200;
    background:linear-gradient(90deg,#14F195,#9945FF,#14F195); background-size:200% 100%;
    animation:gradShift 3s linear infinite; transition:width 80ms linear;
  }
  .toast {
    position:fixed; bottom:28px; right:28px; z-index:500;
    background:rgba(8,10,14,.94); backdrop-filter:blur(28px);
    border:1px solid rgba(20,241,149,.18); border-radius:14px;
    padding:14px 18px; display:flex; align-items:center; gap:12px;
    box-shadow:0 8px 32px rgba(0,0,0,.65),0 0 24px rgba(20,241,149,.07);
    animation:toastIn 500ms cubic-bezier(.16,1,.3,1) both; max-width:300px;
  }
  .toast.hiding { animation:toastOut 400ms ease forwards; }
  .mobile-drawer {
    position:fixed; top:0; right:0; bottom:0; width:280px; z-index:300;
    background:rgba(6,6,8,.97); backdrop-filter:blur(32px);
    border-left:1px solid rgba(255,255,255,.07);
    animation:drawerIn 380ms cubic-bezier(.16,1,.3,1) both;
    padding:80px 32px 32px; display:flex; flex-direction:column; gap:8px;
  }
  .btn-primary {
    display:inline-flex; align-items:center; gap:10px;
    padding:15px 32px; border-radius:14px;
    background:#14F195; border:none; cursor:pointer;
    font-family:'Space Grotesk',sans-serif; font-size:15px; font-weight:700;
    color:#060608; letter-spacing:-.02em; position:relative; overflow:hidden;
    animation:glowPulse 2.8s ease-in-out infinite;
    transition:transform 200ms ease, filter 200ms ease;
  }
  .btn-primary:hover { transform:translateY(-2px) scale(1.02); filter:brightness(1.08); }
  .btn-primary::after { content:''; position:absolute; inset:0; border-radius:14px; background:linear-gradient(135deg,rgba(255,255,255,.14),transparent); pointer-events:none; }
  .btn-secondary {
    padding:15px 32px; border-radius:14px;
    background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.1);
    font-family:'DM Sans',sans-serif; font-size:15px; font-weight:500;
    color:rgba(255,255,255,.5); cursor:pointer; transition:all 300ms ease;
  }
  .btn-secondary:hover { background:rgba(255,255,255,.08); border-color:rgba(255,255,255,.18); color:rgba(255,255,255,.88); transform:translateY(-2px); }
  .xp-bar-fill { animation:xpFill 1.6s cubic-bezier(.16,1,.3,1) forwards; }
  .medal-1 { display:inline-block; animation:heartbeat 2s ease-in-out infinite; }
  .float-badge { animation:floatBadge 3s ease-in-out infinite; }
  .bento-card {
    border-radius:24px; position:relative; overflow:hidden;
    background:rgba(255,255,255,.024); border:1px solid rgba(255,255,255,.068);
    transition:border-color 300ms ease, box-shadow 500ms ease; cursor:default;
    transform-style:preserve-3d; will-change:transform;
  }
  .bento-green:hover { border-color:rgba(20,241,149,.22); box-shadow:0 20px 55px rgba(0,0,0,.55),0 0 44px rgba(20,241,149,.07); }
  .bento-purple:hover { border-color:rgba(153,69,255,.22); box-shadow:0 20px 55px rgba(0,0,0,.55),0 0 44px rgba(153,69,255,.07); }

  /* Modal */
  .modal-overlay {
    position:fixed; inset:0; z-index:400; display:flex; align-items:center; justify-content:center;
    background:rgba(0,0,0,.75); backdrop-filter:blur(12px);
    animation:fadeIn 250ms ease;
  }
  .modal-box {
    background:rgba(8,10,14,.96); border:1px solid rgba(255,255,255,.09);
    border-radius:28px; padding:40px; max-width:520px; width:90%;
    position:relative; animation:modalIn 380ms cubic-bezier(.16,1,.3,1) both;
    box-shadow:0 40px 100px rgba(0,0,0,.8);
  }
  .modal-box::before {
    content:''; position:absolute; top:0; left:15%; right:15%; height:1px;
    background:linear-gradient(90deg,transparent,rgba(255,255,255,.1),transparent);
  }

  /* Section indicator */
  .section-indicator {
    position:fixed; right:28px; top:50%; transform:translateY(-50%);
    z-index:80; display:flex; flex-direction:column; gap:10px;
    animation:sectionPill 600ms cubic-bezier(.16,1,.3,1) both;
  }
  .sec-dot {
    width:6px; height:6px; border-radius:99px; cursor:pointer;
    transition:all 300ms cubic-bezier(.16,1,.3,1);
    background:rgba(255,255,255,.14);
  }
  .sec-dot.active { width:6px; height:24px; background:#14F195; box-shadow:0 0 8px #14F195; }
  .sec-dot:hover { background:rgba(255,255,255,.4); }

  /* XP mini-game */
  .xp-game-btn {
    position:relative; overflow:hidden; cursor:pointer;
    border-radius:12px; border:1px solid rgba(20,241,149,.3);
    background:rgba(20,241,149,.07); padding:12px 20px;
    font-family:'Space Grotesk',sans-serif; font-size:13px; font-weight:700;
    color:#14F195; transition:all 300ms ease; display:inline-flex; align-items:center; gap:8px;
  }
  .xp-game-btn:hover:not(:disabled) { background:rgba(20,241,149,.14); transform:translateY(-2px); }
  .xp-game-btn:disabled { opacity:.4; cursor:not-allowed; }
  .xp-game-btn.claimed { animation:xpBounce .6s cubic-bezier(.16,1,.3,1); }

  /* Live network stats */
  .net-stat { display:flex; flex-direction:column; align-items:center; gap:3px; }
  .net-val { font-family:'JetBrains Mono',monospace; font-size:13px; font-weight:600; color:#14F195; letter-spacing:.02em; }
  .net-label { font-family:'JetBrains Mono',monospace; font-size:9px; color:rgba(255,255,255,.22); letter-spacing:.1em; text-transform:uppercase; }

  /* Typewriter cursor */
  .type-cursor { border-right:2px solid #14F195; animation:cursorBlink 1s step-end infinite; padding-right:2px; }

  /* Confetti */
  .confetti-piece {
    position:fixed; width:8px; height:8px; border-radius:2px;
    animation:confettiFall var(--dur,.8s) ease-out var(--delay,0s) forwards;
    pointer-events:none; z-index:600;
  }

  /* Ripple */
  .ripple-container { position:relative; overflow:hidden; }
  .ripple-effect { position:absolute; border-radius:50%; background:rgba(20,241,149,.22); width:60px; height:60px; margin-left:-30px; margin-top:-30px; animation:ripple 600ms ease-out forwards; pointer-events:none; }

  /* Sound toggle */
  .sound-toggle {
    position:fixed; bottom:28px; left:28px; z-index:80;
    width:40px; height:40px; border-radius:50%;
    background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.1);
    display:flex; align-items:center; justify-content:center;
    cursor:pointer; transition:all 300ms ease; backdrop-filter:blur(12px);
    font-size:16px;
  }
  .sound-toggle:hover { background:rgba(255,255,255,.1); border-color:rgba(20,241,149,.3); }

  @media (max-width:900px) {
    .hero-grid { grid-template-columns:1fr !important; }
    .bento-grid { grid-template-columns:1fr 1fr !important; }
    .bento-span2 { grid-column:span 2 !important; }
    .stats-grid { grid-template-columns:1fr 1fr !important; }
    .nav-links,.nav-cta-desktop { display:none !important; }
    .nav-hamburger { display:flex !important; }
    .hero-pad { padding:90px 22px 60px !important; }
    .section-pad { padding:48px 22px !important; }
    .section-indicator { display:none !important; }
    .footer-inner { flex-direction:column !important; gap:16px !important; }
  }
  @media (max-width:600px) {
    .bento-grid { grid-template-columns:1fr !important; }
    .bento-span2 { grid-column:span 1 !important; }
    .stats-grid { grid-template-columns:1fr 1fr !important; }
    .hero-h1 { font-size:3rem !important; }
  }
`;

/* ── Sound Engine (Web Audio API, no files) ──────────────────── */
function createSoundEngine() {
  let ctx: any = null;
  const getCtx = () => { if (!ctx) ctx = new (window.AudioContext || (window as any).webkitAudioContext)(); return ctx; };
  return {
    click() {
      try {
        const c = getCtx(); const o = c.createOscillator(); const g = c.createGain();
        o.connect(g); g.connect(c.destination);
        o.frequency.setValueAtTime(800, c.currentTime); o.frequency.exponentialRampToValueAtTime(400, c.currentTime + .08);
        g.gain.setValueAtTime(.08, c.currentTime); g.gain.exponentialRampToValueAtTime(.001, c.currentTime + .1);
        o.start(); o.stop(c.currentTime + .1);
      } catch {}
    },
    xp() {
      try {
        const c = getCtx();
        [523, 659, 784, 1047].forEach((f, i) => {
          const o = c.createOscillator(); const g = c.createGain();
          o.connect(g); g.connect(c.destination); o.type = "sine";
          o.frequency.value = f; const t = c.currentTime + i * .1;
          g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.12, t + .03);
          g.gain.exponentialRampToValueAtTime(.001, t + .2);
          o.start(t); o.stop(t + .25);
        });
      } catch {}
    },
    hover() {
      try {
        const c = getCtx(); const o = c.createOscillator(); const g = c.createGain();
        o.connect(g); g.connect(c.destination); o.type = "sine"; o.frequency.value = 1200;
        g.gain.setValueAtTime(.03, c.currentTime); g.gain.exponentialRampToValueAtTime(.001, c.currentTime + .06);
        o.start(); o.stop(c.currentTime + .06);
      } catch {}
    },
  };
}
const SOUND = createSoundEngine();

/* ── Hooks ───────────────────────────────────────────────────── */
function useReveal(delay = 0) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current as HTMLElement | null; if (!el) return;
    el.style.transitionDelay = `${delay}ms`; el.classList.add("reveal");
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("on"); obs.disconnect(); } }, { threshold:.06 });
    obs.observe(el); return () => obs.disconnect();
  }, [delay]);
  return ref;
}

function Counter({ to, suffix = "" }: { to: number, suffix?: string }) {
  const [v, setV] = useState(0); const ref = useRef(null); const fired = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !fired.current) {
        fired.current = true;
        const step = to / (1800 / 16); let cur = 0;
        const t = setInterval(() => { cur = Math.min(cur + step, to); setV(Math.floor(cur)); if (cur >= to) clearInterval(t); }, 16);
      }
    }, { threshold:.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{v.toLocaleString()}{suffix}</span>;
}

/* ── Typewriter ──────────────────────────────────────────────── */
function useTypewriter(words, speed = 55, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [phase, setPhase] = useState("typing");
  useEffect(() => {
    const word = words[wordIdx];
    if (phase === "typing") {
      if (display.length < word.length) {
        const t = setTimeout(() => setDisplay(word.slice(0, display.length + 1)), speed);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase("deleting"), pause);
        return () => clearTimeout(t);
      }
    } else {
      if (display.length > 0) {
        const t = setTimeout(() => setDisplay(display.slice(0, -1)), speed / 2);
        return () => clearTimeout(t);
      } else {
        setWordIdx((wordIdx + 1) % words.length);
        setPhase("typing");
      }
    }
  }, [display, phase, wordIdx, words, speed, pause]);
  return { display, phase };
}

/* ── Confetti ────────────────────────────────────────────────── */
function spawnConfetti(x, y) {
  const colors = ["#14F195","#9945FF","#fff","#60a5fa","#f59e0b"];
  const pieces = Array.from({ length: 28 }, (_, i) => {
    const el = document.createElement("div");
    el.className = "confetti-piece";
    el.style.cssText = `left:${x + (Math.random()-0.5)*80}px;top:${y}px;background:${colors[i%colors.length]};--r:${Math.random()*720-360}deg;--dur:${Math.random()*.6+.6}s;--delay:${Math.random()*.3}s;transform:rotate(${Math.random()*360}deg)`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1200);
    return el;
  });
}

/* ── Network Canvas ──────────────────────────────────────────── */
function NetworkCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W, H, nodes, raf;
    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      nodes = Array.from({ length: 38 }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35,
        r: Math.random() * 2.5 + 1.2,
        pulse: Math.random() * Math.PI * 2,
        color: Math.random() > .5 ? "#14F195" : "#9945FF",
      }));
    };
    resize();
    window.addEventListener("resize", resize);
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy; n.pulse += .025;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      });
      nodes.forEach((a, i) => {
        nodes.slice(i + 1).forEach(b => {
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx*dx+dy*dy);
          if (dist < 130) {
            const alpha = (1 - dist/130) * .22;
            const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
            grad.addColorStop(0, `rgba(20,241,149,${alpha})`);
            grad.addColorStop(1, `rgba(153,69,255,${alpha})`);
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = grad; ctx.lineWidth = .8; ctx.stroke();
          }
        });
        const pulse = Math.sin(a.pulse) * .5 + .5;
        const r = a.r + pulse * 1.5;
        const alpha = .35 + pulse * .45;
        ctx.beginPath(); ctx.arc(a.x, a.y, r, 0, Math.PI * 2);
        ctx.fillStyle = a.color === "#14F195" ? `rgba(20,241,149,${alpha})` : `rgba(153,69,255,${alpha})`;
        ctx.fill();
        if (pulse > .85) {
          ctx.beginPath(); ctx.arc(a.x, a.y, r * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = a.color === "#14F195" ? `rgba(20,241,149,.06)` : `rgba(153,69,255,.06)`;
          ctx.fill();
        }
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:.55, pointerEvents:"none" }} />;
}

/* ── Particles ───────────────────────────────────────────────── */
function Particles() {
  const pts = useRef(Array.from({length:24},(_,i)=>({ id:i,left:Math.random()*100,size:Math.random()*2.2+.8,delay:Math.random()*14,dur:Math.random()*12+10,dx:(Math.random()-.5)*90,col:Math.random()>.5?"rgba(20,241,149,":"rgba(153,69,255,",op:Math.random()*.35+.12 }))).current;
  return (
    <div style={{position:"absolute",inset:0,pointerEvents:"none",overflow:"hidden"}}>
      {pts.map(p=>(
        <div key={p.id} style={{position:"absolute",bottom:"-10px",left:`${p.left}%`,width:p.size,height:p.size,borderRadius:"50%",background:`${p.col}${p.op})`,boxShadow:`0 0 ${p.size*3}px ${p.col}0.4)`,animation:`particleDrift ${p.dur}s ${p.delay}s ease-in infinite`,"--dx":`${p.dx}px`}} />
      ))}
    </div>
  );
}

/* ── Background ──────────────────────────────────────────────── */
function Background() {
  return (
    <div style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none",overflow:"hidden"}}>
      <div style={{position:"absolute",top:"-25%",left:"-15%",width:"70vw",height:"70vw",borderRadius:"50%",background:"radial-gradient(circle,rgba(153,69,255,.062) 0%,transparent 65%)",animation:"orbFloat 14s ease-in-out infinite"}} />
      <div style={{position:"absolute",top:"-10%",right:"-8%",width:"55vw",height:"55vw",borderRadius:"50%",background:"radial-gradient(circle,rgba(20,241,149,.042) 0%,transparent 65%)",animation:"orbFloat2 17s ease-in-out infinite"}} />
      <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:"80vw",height:"55vh",borderRadius:"50%",background:"radial-gradient(ellipse,rgba(153,69,255,.022) 0%,transparent 60%)"}} />
      <div style={{position:"absolute",bottom:"-15%",right:"15%",width:"45vw",height:"45vw",borderRadius:"50%",background:"radial-gradient(circle,rgba(20,241,149,.032) 0%,transparent 65%)",animation:"orbFloat 10s ease-in-out infinite reverse"}} />
      <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,rgba(255,255,255,.048) 1px,transparent 1px)",backgroundSize:"30px 30px",maskImage:"radial-gradient(ellipse 85% 85% at 50% 50%,black 20%,transparent 100%)",WebkitMaskImage:"radial-gradient(ellipse 85% 85% at 50% 50%,black 20%,transparent 100%)"}} />
      <div style={{position:"absolute",inset:0,opacity:.018,backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,backgroundSize:"128px 128px"}} />
    </div>
  );
}

/* ── CursorSpotlight ─────────────────────────────────────────── */
function CursorSpotlight() {
  const ref = useRef(null);
  useEffect(() => {
    const fn = e => { if (ref.current) { ref.current.style.left = e.clientX+"px"; ref.current.style.top = e.clientY+"px"; } };
    window.addEventListener("mousemove", fn, {passive:true});
    return () => window.removeEventListener("mousemove", fn);
  }, []);
  return <div ref={ref} className="cursor-spotlight" />;
}

/* ── ScrollProgress ──────────────────────────────────────────── */
function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const fn = () => { const el = document.documentElement; setPct((el.scrollTop/(el.scrollHeight-el.clientHeight))*100); };
    window.addEventListener("scroll", fn, {passive:true}); return () => window.removeEventListener("scroll", fn);
  }, []);
  return <div className="scroll-progress" style={{width:`${pct}%`}} />;
}

/* ── Section Indicator ───────────────────────────────────────── */
const SECTIONS = ["hero","features","courses","stats","leaderboard","cta"];
function SectionIndicator() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const fn = () => {
      const y = window.scrollY + window.innerHeight / 2;
      SECTIONS.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el && y >= el.offsetTop) setActive(i);
      });
    };
    window.addEventListener("scroll", fn, {passive:true}); return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <div className="section-indicator">
      {SECTIONS.map((id, i) => (
        <div key={id} className={`sec-dot ${active===i?"active":""}`}
          onClick={() => { SOUND.click(); document.getElementById(id)?.scrollIntoView({behavior:"smooth"}); }}
          title={id.charAt(0).toUpperCase()+id.slice(1)}
        />
      ))}
    </div>
  );
}

/* ── Live Network Stats ──────────────────────────────────────── */
function LiveNetworkStats() {
  const [stats, setStats] = useState({ tps:4218, slot:285_341_922, validators:1982 });
  useEffect(() => {
    const t = setInterval(() => setStats(s => ({
      tps: Math.max(3800, s.tps + Math.floor((Math.random()-.4)*180)),
      slot: s.slot + Math.floor(Math.random()*4+2),
      validators: Math.max(1950, s.validators + Math.floor((Math.random()-.5)*3)),
    })), 1200);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="glass" style={{borderRadius:14,padding:"12px 18px",display:"flex",gap:20,alignItems:"center",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,rgba(20,241,149,.12),transparent)"}} />
      <div style={{width:7,height:7,borderRadius:"50%",background:"#14F195",boxShadow:"0 0 8px #14F195",animation:"heartbeat 2s infinite",flexShrink:0}} />
      <div className="f-mono" style={{fontSize:10,color:"rgba(255,255,255,.25)",letterSpacing:".09em",textTransform:"uppercase",flexShrink:0}}>Solana Mainnet</div>
      {[
        {label:"TPS", val:stats.tps.toLocaleString()},
        {label:"Slot", val:stats.slot.toLocaleString()},
        {label:"Validators", val:stats.validators.toLocaleString()},
      ].map(s=>(
        <div key={s.label} className="net-stat">
          <span className="net-val">{s.val}</span>
          <span className="net-label">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

/* ── XP Mini-Game ────────────────────────────────────────────── */
function XPGame({ soundOn }) {
  const [xp, setXp] = useState(2450); const [cooldown, setCooldown] = useState(0); const [claimed, setClaimed] = useState(false);
  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => setCooldown(c => Math.max(0, c - 1)), 1000);
    return () => clearInterval(t);
  }, [cooldown]);
  const claim = (e) => {
    if (cooldown > 0) return;
    const gain = Math.floor(Math.random()*45+10);
    setXp(p => p + gain); setCooldown(10); setClaimed(true);
    if (soundOn) SOUND.xp();
    spawnConfetti(e.clientX, e.clientY);
    setTimeout(()=>setClaimed(false), 600);
  };
  const pct = Math.min(99, Math.round(xp / 25));
  return (
    <div className="glass" style={{borderRadius:16,padding:"18px 22px",position:"relative",overflow:"hidden",minWidth:290}}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,rgba(20,241,149,.1),transparent)"}} />
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <div>
          <div className="f-mono" style={{fontSize:10,color:"rgba(255,255,255,.22)",letterSpacing:".09em",textTransform:"uppercase",marginBottom:3}}>Your XP Balance</div>
          <div className="f-head" style={{fontSize:26,fontWeight:700,letterSpacing:"-.04em",color:"#14F195",transition:"all 300ms"}}>{xp.toLocaleString()} XP</div>
        </div>
        <div style={{textAlign:"right"}}>
          <div className="f-mono" style={{fontSize:9,color:"rgba(255,255,255,.2)",marginBottom:3,textTransform:"uppercase",letterSpacing:".08em"}}>Level</div>
          <div className="f-head" style={{fontSize:22,fontWeight:700,color:"#9945FF"}}>{Math.floor(Math.sqrt(xp/100))}</div>
        </div>
      </div>
      <div style={{marginBottom:14}}>
        <div style={{height:5,background:"rgba(255,255,255,.055)",borderRadius:99,overflow:"hidden"}}>
          <div style={{height:"100%",width:`${pct}%`,background:"linear-gradient(90deg,#9945FF,#14F195)",borderRadius:99,boxShadow:"0 0 12px rgba(20,241,149,.5)",transition:"width 600ms cubic-bezier(.16,1,.3,1)"}} />
        </div>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:6}}>
          <span className="f-mono" style={{fontSize:9,color:"rgba(255,255,255,.2)",letterSpacing:".07em",textTransform:"uppercase"}}>Progress to next level</span>
          <span className="f-mono" style={{fontSize:9,color:"rgba(20,241,149,.6)"}}>{pct}%</span>
        </div>
      </div>
      <button className={`xp-game-btn ${claimed?"claimed":""}`} disabled={cooldown>0} onClick={claim} style={{width:"100%",justifyContent:"center"}}>
        {cooldown > 0 ? `⏳ Next XP in ${cooldown}s` : "⚡ Claim Daily XP"}
      </button>
    </div>
  );
}

/* ── XP Terminal ─────────────────────────────────────────────── */
function XPTerminal() {
  const lines = [
    {text:"$ xp_token.balance(wallet)", color:"rgba(255,255,255,.36)"},
    {text:"> Fetching on-chain data...", color:"rgba(255,255,255,.22)", italic:true},
    {text:"> 2,450 XP confirmed ✓", color:"#14F195"},
    {text:"$ level.calculate(2450)", color:"rgba(255,255,255,.36)"},
    {text:"> Level = ⌊ √(2450 ÷ 100) ⌋", color:"rgba(255,255,255,.52)"},
    {text:"> Level 4 · Builder 🏗", color:"#14F195"},
  ];
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setShown(p => { if(p>=lines.length){clearInterval(t);return p;} return p+1; }), 750);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="glass" style={{borderRadius:18,padding:"20px 24px",position:"relative",overflow:"hidden"}}>
      <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:16}}>
        {["#ff5f57","#febc2e","#28c840"].map(c=><div key={c} style={{width:11,height:11,borderRadius:"50%",background:c,flexShrink:0}}/>)}
        <span className="f-mono" style={{fontSize:11,color:"rgba(255,255,255,.16)",marginLeft:8,letterSpacing:".08em"}}>xp_console — bash</span>
      </div>
      {lines.slice(0,shown).map((l,i)=>(
        <div key={i} className="f-mono" style={{fontSize:12.5,color:l.color,lineHeight:1.9,letterSpacing:".02em",fontStyle:l.italic?"italic":"normal"}}>
          {l.text}{i===shown-1&&shown<lines.length&&<span style={{animation:"blink 1s step-end infinite",color:"#14F195"}}>▌</span>}
        </div>
      ))}
      {shown>=lines.length&&<div className="f-mono" style={{fontSize:12.5,color:"rgba(255,255,255,.18)",marginTop:2}}><span style={{animation:"blink 1s step-end infinite",color:"#14F195"}}>█</span></div>}
      <div style={{position:"absolute",bottom:0,left:0,right:0,height:36,background:"linear-gradient(to top,rgba(6,6,8,.8),transparent)",pointerEvents:"none"}}/>
    </div>
  );
}

/* ── Magnetic Button wrapper ─────────────────────────────────── */
function MagneticBtn({ children, style, className, onClick }) {
  const ref = useRef(null);
  const onMove = e => {
    const el = ref.current as HTMLElement | null; if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width/2);
    const dy = e.clientY - (r.top + r.height/2);
    const dist = Math.sqrt(dx*dx+dy*dy);
    if (dist < 120) { el.style.transform = `translate(${dx*.22}px,${dy*.22}px) scale(1.04)`; }
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = "translate(0,0) scale(1)"; };
  useEffect(() => {
    window.addEventListener("mousemove", onMove, {passive:true});
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return <div ref={ref} style={{...style, transition:"transform 350ms cubic-bezier(.16,1,.3,1)", display:"inline-block"}} onMouseLeave={onLeave}><div className={className} onClick={onClick}>{children}</div></div>;
}

/* ── 3D Tilt Card ────────────────────────────────────────────── */
function TiltCard({ children, style, className }) {
  const ref = useRef(null);
  const onMove = e => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    el.style.transform = `perspective(800px) rotateX(${-y*10}deg) rotateY(${x*10}deg) scale3d(1.02,1.02,1.02)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = "perspective(800px) rotateX(0) rotateY(0) scale3d(1,1,1)"; };
  return (
    <div ref={ref} className={className} style={{...style, transition:"transform 500ms cubic-bezier(.16,1,.3,1)"}}
      onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </div>
  );
}

/* ── Course Modal ────────────────────────────────────────────── */
function CourseModal({ course, onClose }) {
  if (!course) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e=>e.stopPropagation()}>
        <button onClick={onClose} style={{position:"absolute",top:18,right:18,background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.1)",borderRadius:8,width:32,height:32,cursor:"pointer",color:"rgba(255,255,255,.5)",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
        <div style={{display:"flex",gap:12,alignItems:"center",marginBottom:24}}>
          <span style={{fontSize:36}}>{course.emoji}</span>
          <div>
            <span className="f-mono" style={{display:"inline-block",fontSize:10,letterSpacing:".1em",textTransform:"uppercase",color:course.accent,background:`${course.accent}14`,border:`1px solid ${course.accent}28`,padding:"2px 10px",borderRadius:4,marginBottom:6}}>{course.track}</span>
            <h3 className="f-head" style={{fontSize:22,fontWeight:700,letterSpacing:"-.04em",color:"#fff"}}>{course.title}</h3>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginBottom:24}}>
          {[{label:"Lessons",val:course.lessons},{label:"XP Reward",val:`${course.xp} XP`},{label:"Level",val:course.tag}].map(s=>(
            <div key={s.label} style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.07)",borderRadius:12,padding:"12px 14px",textAlign:"center"}}>
              <div className="f-head" style={{fontSize:16,fontWeight:700,color:course.accent,marginBottom:3}}>{s.val}</div>
              <div className="f-mono" style={{fontSize:10,color:"rgba(255,255,255,.2)",letterSpacing:".07em",textTransform:"uppercase"}}>{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{marginBottom:22}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:7}}>
            <span className="f-mono" style={{fontSize:10,color:"rgba(255,255,255,.22)",letterSpacing:".07em",textTransform:"uppercase"}}>Your Progress</span>
            <span className="f-mono" style={{fontSize:10,color:course.accent}}>{course.pct}%</span>
          </div>
          <div style={{height:6,background:"rgba(255,255,255,.055)",borderRadius:99,overflow:"hidden"}}>
            <div style={{height:"100%",width:`${course.pct}%`,background:`linear-gradient(90deg,${course.accent}88,${course.accent})`,borderRadius:99,boxShadow:`0 0 10px ${course.accent}88`,transition:"width 800ms cubic-bezier(.16,1,.3,1)"}}/>
          </div>
        </div>
        <p className="f-body" style={{fontSize:14,color:"rgba(255,255,255,.38)",lineHeight:1.72,marginBottom:22}}>
          Master {course.title} through hands-on projects, quizzes, and real deployments to Solana devnet. Earn {course.xp} non-transferable XP tokens upon completion — permanently recorded on-chain.
        </p>
        <div style={{display:"flex",gap:10}}>
          <button className="btn-primary ripple-container" style={{flex:1,justifyContent:"center",padding:"13px 0",borderRadius:12}}
            onClick={e=>{SOUND.xp();spawnConfetti(e.clientX,e.clientY);}}>
            {course.pct > 0 ? "Continue Course →" : "Start Course →"}
          </button>
          <button className="btn-secondary" style={{padding:"13px 16px",borderRadius:12,fontSize:13}} onClick={onClose}>Later</button>
        </div>
      </div>
    </div>
  );
}

/* ── Toast ───────────────────────────────────────────────────── */
const TOASTS = [
  {name:"SolanaRita",action:"earned 150 XP",emoji:"⚡"},
  {name:"0xAlpha",action:"completed Token-2022",emoji:"🏆"},
  {name:"devBruno",action:"reached Level 8",emoji:"🚀"},
  {name:"web3Maria",action:"earned Builder credential",emoji:"🎓"},
  {name:"CryptoVitor",action:"joined the Academy",emoji:"👋"},
  {name:"lucasdev",action:"submitted final project",emoji:"💻"},
];
function LiveToast() {
  const [toast, setToast] = useState(null); const [hiding, setHiding] = useState(false); const idx = useRef(0);
  useEffect(() => {
    const show = () => { setHiding(false); setToast(TOASTS[idx.current%TOASTS.length]); idx.current++; setTimeout(()=>setHiding(true),3400); setTimeout(()=>setToast(null),3900); };
    const t1 = setTimeout(show, 2800);
    const iv = setInterval(show, 7000);
    return () => { clearTimeout(t1); clearInterval(iv); };
  }, []);
  if (!toast) return null;
  return (
    <div className={`toast ${hiding?"hiding":""}`}>
      <div style={{width:36,height:36,borderRadius:10,background:"rgba(20,241,149,.1)",border:"1px solid rgba(20,241,149,.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>{toast.emoji}</div>
      <div><div className="f-head" style={{fontSize:13,fontWeight:600,color:"#fff",lineHeight:1.3}}>{toast.name}</div><div className="f-body" style={{fontSize:12,color:"rgba(255,255,255,.38)",lineHeight:1.3}}>{toast.action}</div></div>
    </div>
  );
}

/* ── Sound Toggle ────────────────────────────────────────────── */
function SoundToggle({ on, toggle }) {
  return (
    <button className="sound-toggle" onClick={()=>{SOUND.click();toggle();}} title={on?"Mute sounds":"Enable sounds"}>
      {on ? "🔊" : "🔇"}
    </button>
  );
}

/* ── Navbar ──────────────────────────────────────────────────── */
function Navbar({ soundOn }) {
  const [scrolled, setScrolled] = useState(false); const [drawer, setDrawer] = useState(false);
  useEffect(() => { const fn=()=>setScrolled(window.scrollY>30); window.addEventListener("scroll",fn,{passive:true}); return()=>window.removeEventListener("scroll",fn); }, []);
  const ripple = e => { const btn=e.currentTarget; const r=btn.getBoundingClientRect(); const el=document.createElement("span"); el.className="ripple-effect"; el.style.left=(e.clientX-r.left)+"px"; el.style.top=(e.clientY-r.top)+"px"; btn.appendChild(el); setTimeout(()=>el.remove(),700); if(soundOn)SOUND.click(); };
  return (
    <>
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,height:62,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 48px",background:scrolled?"rgba(6,6,8,.9)":"transparent",backdropFilter:scrolled?"blur(28px) saturate(1.6)":"none",borderBottom:scrolled?"1px solid rgba(255,255,255,.05)":"none",transition:"all 600ms cubic-bezier(.16,1,.3,1)"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}}>
          <div style={{width:34,height:34,borderRadius:9,background:"linear-gradient(135deg,#14F195,#9945FF)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 22px rgba(20,241,149,.38)",flexShrink:0}}>
            <span className="f-head" style={{fontSize:12,fontWeight:800,color:"#060608"}}>ST</span>
          </div>
          <span className="f-head" style={{fontSize:15,fontWeight:600,letterSpacing:"-.03em",color:"rgba(255,255,255,.9)"}}>Superteam<span style={{color:"rgba(255,255,255,.26)",fontWeight:300}}> Academy</span></span>
        </div>
        <div className="nav-links" style={{display:"flex",gap:30}}>
          {[["Courses","/courses"],["Leaderboard","/leaderboard"],["Dashboard","/dashboard"]].map(([l,h])=><a key={l} href={h} className="nav-link" onMouseEnter={()=>{if(soundOn)SOUND.hover();}}>{l}</a>)}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <WalletMultiButton className="nav-cta-desktop" style={{background:"#14F195",color:"#060608",fontFamily:"Space Grotesk,sans-serif",fontWeight:700,fontSize:13,borderRadius:10,padding:"9px 20px",height:"auto",lineHeight:"normal"}} />
          <button className="nav-hamburger" onClick={()=>{setDrawer(true);if(soundOn)SOUND.click();}} style={{display:"none",flexDirection:"column",gap:5,background:"none",border:"none",cursor:"pointer",padding:6}}>
            {[0,1,2].map(i=><div key={i} style={{width:22,height:2,background:"rgba(255,255,255,.55)",borderRadius:2}}/>)}
          </button>
        </div>
      </nav>
      {drawer&&(
        <>
          <div onClick={()=>setDrawer(false)} style={{position:"fixed",inset:0,zIndex:299,background:"rgba(0,0,0,.55)",backdropFilter:"blur(6px)"}}/>
          <div className="mobile-drawer">
            <button onClick={()=>setDrawer(false)} style={{position:"absolute",top:20,right:20,background:"none",border:"none",cursor:"pointer",color:"rgba(255,255,255,.45)",fontSize:22}}>✕</button>
            {["Courses","Leaderboard","Credentials","Docs"].map(l=><a key={l} href="#" className="nav-link" style={{fontSize:18,padding:"12px 0",borderBottom:"1px solid rgba(255,255,255,.05)"}}>{l}</a>)}
            <WalletMultiButton style={{width:"100%",justifyContent:"center",marginTop:24,background:"#14F195",color:"#060608",fontFamily:"Space Grotesk,sans-serif",fontWeight:700,borderRadius:12,height:"auto",padding:"12px 0"}} />
          </div>
        </>
      )}
    </>
  );
}

/* ── Hero ────────────────────────────────────────────────────── */
function Hero({ soundOn }) {
  const { display, phase } = useTypewriter(["credentials.","the future.","your proof.","your path."], 70, 2000);
  return (
    <section id="hero" style={{position:"relative",zIndex:10,minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",padding:"110px 48px 80px",maxWidth:1440,margin:"0 auto",overflow:"hidden"}} className="hero-pad">
      <NetworkCanvas />
      <div className="scanline-pan"/>
      <Particles/>

      {/* Live badge */}
      <div style={{animation:"fadeUp .7s cubic-bezier(.16,1,.3,1) both",animationDelay:".08s",marginBottom:30}}>
        <span className="f-mono float-badge" style={{display:"inline-flex",alignItems:"center",gap:9,padding:"6px 16px",borderRadius:99,background:"rgba(20,241,149,.05)",border:"1px solid rgba(20,241,149,.18)",fontSize:11,color:"rgba(20,241,149,.82)",letterSpacing:".1em",textTransform:"uppercase"}}>
          <span style={{width:7,height:7,borderRadius:"50%",background:"#14F195",boxShadow:"0 0 10px #14F195",animation:"heartbeat 2s infinite"}}/>
          Devnet Live · Token-2022 · Metaplex Core · Solana
        </span>
      </div>

      <div className="hero-grid" style={{display:"grid",gridTemplateColumns:"1fr auto",gap:56,alignItems:"center"}}>
        <div>
          <div style={{animation:"fadeUp .95s cubic-bezier(.16,1,.3,1) both",animationDelay:".18s"}}>
            <h1 className="f-head hero-h1" style={{fontSize:"clamp(3.6rem,8.8vw,8.2rem)",fontWeight:700,lineHeight:.88,letterSpacing:"-.05em",color:"#fff"}}>
              Learn Solana.
              <br/>
              <span style={{color:"transparent",WebkitTextStroke:"1.5px rgba(255,255,255,.15)",fontWeight:300}}>Own your</span>
              <br/>
              <span className="shimmer-text type-cursor">{display}</span>
            </h1>
          </div>

          <div style={{animation:"fadeUp 1s cubic-bezier(.16,1,.3,1) both",animationDelay:".32s",marginTop:30}}>
            <p className="f-body" style={{fontSize:17,fontWeight:300,color:"rgba(255,255,255,.38)",lineHeight:1.78,maxWidth:440,marginBottom:36}}>
              The only Web3 academy where your progress is{" "}
              <em style={{fontStyle:"normal",color:"rgba(255,255,255,.75)",fontWeight:500}}>soulbound on Solana.</em>{" "}
              XP tokens you own. Credentials that live forever on-chain.
            </p>
            <div style={{display:"flex",gap:12,flexWrap:"wrap",alignItems:"center"}}>
              <MagneticBtn>
                <button className="btn-primary ripple-container" onClick={e=>{const btn=e.currentTarget;const r=btn.getBoundingClientRect();const el=document.createElement("span");el.className="ripple-effect";el.style.left=(e.clientX-r.left)+"px";el.style.top=(e.clientY-r.top)+"px";btn.appendChild(el);setTimeout(()=>el.remove(),700);if(soundOn)SOUND.click();spawnConfetti(e.clientX,e.clientY);}}>
                  Start Learning →
                </button>
              </MagneticBtn>
              <button className="btn-secondary" onClick={()=>{if(soundOn)SOUND.click();}}>Browse Courses</button>
            </div>
            <div style={{display:"flex",gap:20,marginTop:28,flexWrap:"wrap"}}>
              {["283 tests passing","MIT licensed","Devnet live"].map(t=>(
                <span key={t} className="f-mono" style={{fontSize:11,color:"rgba(255,255,255,.18)",letterSpacing:".06em",display:"flex",alignItems:"center",gap:6}}>
                  <span style={{color:"#14F195",opacity:.55}}>✓</span>{t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div style={{animation:"fadeUp 1s cubic-bezier(.16,1,.3,1) both",animationDelay:".45s",display:"flex",flexDirection:"column",gap:12,minWidth:290}}>
          <LiveNetworkStats/>
          <XPGame soundOn={soundOn}/>
          <XPTerminal/>
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{animation:"fadeIn 1.5s ease both",animationDelay:"1.1s",position:"absolute",bottom:32,left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
        <span className="f-mono" style={{fontSize:9,color:"rgba(255,255,255,.1)",letterSpacing:".18em",textTransform:"uppercase"}}>Scroll</span>
        <div style={{width:1,height:44,background:"linear-gradient(to bottom,rgba(20,241,149,.28),transparent)"}}/>
        <div style={{width:5,height:5,borderRadius:"50%",background:"rgba(20,241,149,.28)",animation:"blink 1.5s ease-in-out infinite"}}/>
      </div>
    </section>
  );
}

/* ── Ticker ──────────────────────────────────────────────────── */
function Ticker() {
  const items = ["SOLANA","TOKEN-2022","METAPLEX CORE","ANCHOR","SOULBOUND XP","ON-CHAIN PDAs","HELIUS DAS","283 TESTS","DEVNET LIVE","VITEST · 90%","TYPESCRIPT STRICT","LATAM READY"];
  return (
    <div style={{position:"relative",zIndex:10,borderTop:"1px solid rgba(255,255,255,.042)",borderBottom:"1px solid rgba(255,255,255,.042)",padding:"13px 0",overflow:"hidden",margin:"0 0 8px"}}>
      <div className="ticker-track">
        {[...items,...items].map((item,i)=>(
          <span key={i} className="f-mono" style={{fontSize:11,color:"rgba(255,255,255,.15)",letterSpacing:".13em",textTransform:"uppercase",display:"inline-flex",alignItems:"center",gap:18}}>
            <span style={{color:"#14F195",opacity:.35,fontSize:8}}>◆</span>{item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Bento ───────────────────────────────────────────────────── */
function Bento() {
  const h = useReveal(0);
  const refs = [useReveal(0),useReveal(80),useReveal(160),useReveal(240),useReveal(320)];
  return (
    <section id="features" style={{position:"relative",zIndex:10,padding:"80px 48px",maxWidth:1440,margin:"0 auto"}} className="section-pad">
      <div ref={h} style={{marginBottom:52}}>
        <p className="f-mono" style={{fontSize:11,color:"rgba(20,241,149,.52)",letterSpacing:".13em",textTransform:"uppercase",marginBottom:14}}>//  Architecture</p>
        <h2 className="f-head" style={{fontSize:"clamp(2rem,4vw,3.6rem)",fontWeight:700,letterSpacing:"-.045em",color:"#fff",lineHeight:1.04}}>
          Built different.{" "}<span style={{color:"rgba(255,255,255,.17)",fontWeight:300}}>By design.</span>
        </h2>
      </div>
      <div className="bento-grid" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}}>

        {/* 2×2 XP Token */}
        <TiltCard ref={refs[0]} className="bento-card bento-green bento-span2" style={{gridColumn:"span 2",gridRow:"span 2",padding:36,minHeight:340}}>
          <div style={{position:"absolute",top:-80,right:-80,width:260,height:260,borderRadius:"50%",background:"radial-gradient(circle,rgba(20,241,149,.08) 0%,transparent 70%)",pointerEvents:"none"}}/>
          <span className="f-mono" style={{display:"inline-block",fontSize:10,letterSpacing:".1em",textTransform:"uppercase",color:"rgba(20,241,149,.7)",background:"rgba(20,241,149,.07)",border:"1px solid rgba(20,241,149,.15)",padding:"3px 12px",borderRadius:5,marginBottom:22}}>Token-2022</span>
          <h3 className="f-head" style={{fontSize:"clamp(1.5rem,2.8vw,2.2rem)",fontWeight:700,letterSpacing:"-.04em",color:"#fff",lineHeight:1.1,marginBottom:16}}>Soulbound<br/>XP Tokens</h3>
          <p className="f-body" style={{fontSize:14.5,fontWeight:300,color:"rgba(255,255,255,.38)",lineHeight:1.72,maxWidth:340,marginBottom:28}}>
            Your learning progress is a <em style={{fontStyle:"normal",color:"rgba(255,255,255,.68)"}}>NonTransferable</em> Token-2022 asset. Wallet balance = XP. Permanently, irreversibly yours.
          </p>
          <div style={{marginBottom:22}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:7}}>
              <span className="f-mono" style={{fontSize:10,color:"rgba(255,255,255,.2)",letterSpacing:".07em",textTransform:"uppercase"}}>Current XP</span>
              <span className="f-mono" style={{fontSize:11,color:"#14F195",fontWeight:500}}>2,450 / 2,500</span>
            </div>
            <div style={{height:5,background:"rgba(255,255,255,.05)",borderRadius:99,overflow:"hidden"}}>
              <div className="xp-bar-fill" style={{"--w":"98%",height:"100%",borderRadius:99,background:"linear-gradient(90deg,#9945FF,#14F195)",boxShadow:"0 0 12px rgba(20,241,149,.55)"}}/>
            </div>
          </div>
          <div style={{display:"inline-flex",alignItems:"center",gap:12,background:"rgba(0,0,0,.45)",border:"1px solid rgba(20,241,149,.14)",borderRadius:12,padding:"12px 18px"}}>
            <span style={{width:9,height:9,borderRadius:"50%",background:"#14F195",boxShadow:"0 0 10px #14F195",flexShrink:0}}/>
            <code className="f-mono" style={{fontSize:13.5,color:"rgba(255,255,255,.6)"}}>Level = ⌊ √(XP ÷ 100) ⌋</code>
          </div>
        </TiltCard>

        {/* Credentials */}
        <TiltCard ref={refs[1]} className="bento-card bento-purple" style={{gridColumn:"span 1",gridRow:"span 2",padding:26,display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
          <div style={{position:"absolute",bottom:-50,left:-40,width:180,height:180,borderRadius:"50%",background:"radial-gradient(circle,rgba(153,69,255,.1) 0%,transparent 70%)",pointerEvents:"none"}}/>
          <div>
            <span className="f-mono" style={{display:"inline-block",fontSize:10,letterSpacing:".1em",textTransform:"uppercase",color:"rgba(153,69,255,.8)",background:"rgba(153,69,255,.08)",border:"1px solid rgba(153,69,255,.16)",padding:"3px 12px",borderRadius:5,marginBottom:20}}>Metaplex Core</span>
            <div style={{width:"100%",aspectRatio:"1",maxWidth:160,margin:"0 auto 20px",borderRadius:20,background:"linear-gradient(135deg,rgba(153,69,255,.14),rgba(20,241,149,.04))",border:"1px solid rgba(255,255,255,.09)",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden"}}>
              <div style={{fontSize:48}}>🎓</div>
              <div style={{position:"absolute",bottom:0,left:0,right:0,height:"45%",background:"linear-gradient(to top,rgba(0,0,0,.75),transparent)"}}/>
              <div style={{position:"absolute",bottom:10,left:12}}>
                <div className="f-mono" style={{fontSize:8,color:"rgba(255,255,255,.32)",letterSpacing:".06em",textTransform:"uppercase"}}>Credential</div>
                <div className="f-head" style={{fontSize:12,fontWeight:600,color:"#fff"}}>Solana Builder</div>
              </div>
            </div>
            <h3 className="f-head" style={{fontSize:18,fontWeight:700,letterSpacing:"-.03em",color:"#fff",lineHeight:1.2,marginBottom:9}}>On-chain Credentials</h3>
            <p className="f-body" style={{fontSize:13,fontWeight:300,color:"rgba(255,255,255,.36)",lineHeight:1.68}}>Metaplex Core NFTs upgraded in-place. PermanentFreezeDelegate. Zero clutter.</p>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:7,marginTop:14}}>
            <span style={{width:7,height:7,borderRadius:"50%",background:"#9945FF",boxShadow:"0 0 8px #9945FF"}}/>
            <span className="f-mono" style={{fontSize:11,color:"rgba(255,255,255,.22)"}}>Soulbound forever</span>
          </div>
        </TiltCard>

        {/* Bitmap */}
        <TiltCard ref={refs[2]} className="bento-card bento-green" style={{padding:24}}>
          <div style={{position:"absolute",bottom:-20,right:-20,width:110,height:110,borderRadius:"50%",background:"radial-gradient(circle,rgba(20,241,149,.07) 0%,transparent 70%)",pointerEvents:"none"}}/>
          <span className="f-mono" style={{display:"inline-block",fontSize:10,letterSpacing:".1em",textTransform:"uppercase",color:"rgba(20,241,149,.6)",background:"rgba(20,241,149,.06)",border:"1px solid rgba(20,241,149,.12)",padding:"2px 10px",borderRadius:4,marginBottom:16}}>On-chain</span>
          <div style={{display:"flex",flexWrap:"wrap",gap:3.5,marginBottom:14}}>
            {Array.from({length:32}).map((_,i)=><div key={i} style={{width:8,height:8,borderRadius:2.5,background:i<22?(i<18?"rgba(20,241,149,.62)":"rgba(20,241,149,.3)"):"rgba(255,255,255,.052)"}}/>)}
          </div>
          <h3 className="f-head" style={{fontSize:17,fontWeight:700,letterSpacing:"-.035em",color:"#fff",marginBottom:5}}>256-bit Progress</h3>
          <p className="f-body" style={{fontSize:12.5,fontWeight:300,color:"rgba(255,255,255,.3)",lineHeight:1.65}}>Gas-efficient bitmap. Up to 256 lessons per course.</p>
        </TiltCard>

        {/* i18n */}
        <TiltCard ref={refs[3]} className="bento-card" style={{padding:24}}>
          <div style={{display:"flex",gap:7,flexWrap:"wrap",marginBottom:16}}>
            {[["EN","#14F195","#060608"],["PT-BR","rgba(255,255,255,.05)","rgba(255,255,255,.45)"],["ES","rgba(255,255,255,.05)","rgba(255,255,255,.45)"]].map(([l,bg,col])=>(
              <span key={l} className="f-mono" style={{fontSize:11,fontWeight:600,letterSpacing:".04em",padding:"3px 11px",borderRadius:99,background:bg,color:col,border:bg.startsWith("rgba(255")?"1px solid rgba(255,255,255,.09)":"none"}}>{l}</span>
            ))}
          </div>
          <h3 className="f-head" style={{fontSize:17,fontWeight:700,letterSpacing:"-.035em",color:"#fff",marginBottom:5}}>Built for LATAM</h3>
          <p className="f-body" style={{fontSize:12.5,fontWeight:300,color:"rgba(255,255,255,.3)",lineHeight:1.65}}>Full i18n — every string translated for EN · PT-BR · ES.</p>
        </TiltCard>

        {/* Helius */}
        <TiltCard ref={refs[4]} className="bento-card bento-span2" style={{gridColumn:"span 2",padding:"24px 30px",display:"flex",alignItems:"center",gap:24}}>
          <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at right,rgba(153,69,255,.05) 0%,transparent 60%)",pointerEvents:"none"}}/>
          <div style={{flexShrink:0,width:54,height:54,borderRadius:15,background:"rgba(153,69,255,.09)",border:"1px solid rgba(153,69,255,.17)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24}}>⚡</div>
          <div>
            <span className="f-mono" style={{display:"inline-block",fontSize:10,letterSpacing:".1em",textTransform:"uppercase",color:"rgba(153,69,255,.7)",background:"rgba(153,69,255,.07)",border:"1px solid rgba(153,69,255,.15)",padding:"2px 10px",borderRadius:4,marginBottom:8}}>Helius DAS</span>
            <h3 className="f-head" style={{fontSize:18,fontWeight:700,letterSpacing:"-.035em",color:"#fff",marginBottom:5}}>Off-chain Leaderboard</h3>
            <p className="f-body" style={{fontSize:13.5,fontWeight:300,color:"rgba(255,255,255,.34)",lineHeight:1.65}}>Helius DAS API indexes XP token balances globally. Real-time rankings, zero on-chain cost.</p>
          </div>
        </TiltCard>
      </div>
    </section>
  );
}

/* ── Courses ─────────────────────────────────────────────────── */
const COURSES = [
  {track:"Foundation",title:"Solana Foundations",lessons:12,xp:600,tag:"Beginner",pct:73,accent:"#14F195",emoji:"🟢"},
  {track:"Programs",title:"Anchor Development",lessons:18,xp:900,tag:"Intermediate",pct:41,accent:"#60a5fa",emoji:"⚓"},
  {track:"Tokens",title:"Token-2022 Extensions",lessons:14,xp:700,tag:"Advanced",pct:28,accent:"#9945FF",emoji:"🪙"},
  {track:"DeFi",title:"DeFi on Solana",lessons:20,xp:1000,tag:"Advanced",pct:15,accent:"#f59e0b",emoji:"💱"},
  {track:"Security",title:"Smart Contract Auditing",lessons:16,xp:800,tag:"Expert",pct:8,accent:"#f87171",emoji:"🔒"},
  {track:"NFTs",title:"Metaplex & NFT Programs",lessons:11,xp:550,tag:"Intermediate",pct:52,accent:"#a78bfa",emoji:"🎨"},
];

function Courses({ soundOn }) {
  const h = useReveal(0); const [modal, setModal] = useState(null);
  return (
    <>
      <section id="courses" style={{position:"relative",zIndex:10,padding:"64px 0 64px 48px",maxWidth:1440,margin:"0 auto"}}>
        <div ref={h} style={{marginBottom:30,paddingRight:48,display:"flex",alignItems:"flex-end",justifyContent:"space-between"}}>
          <div>
            <p className="f-mono" style={{fontSize:11,color:"rgba(153,69,255,.52)",letterSpacing:".13em",textTransform:"uppercase",marginBottom:10}}>//  Curriculum</p>
            <h2 className="f-head" style={{fontSize:"clamp(2rem,4vw,3.2rem)",fontWeight:700,letterSpacing:"-.045em",color:"#fff"}}>Pick your track</h2>
          </div>
          <a href="#" className="nav-link" style={{paddingRight:48,fontSize:14,display:"flex",alignItems:"center",gap:6}}>View all <span>→</span></a>
        </div>
        <div className="scroll-row" style={{paddingRight:48}}>
          {COURSES.map(c=>(
            <div key={c.title} className="course-card" onClick={()=>{setModal(c);if(soundOn)SOUND.click();}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
                <span className="f-mono" style={{fontSize:10,letterSpacing:".09em",textTransform:"uppercase",color:c.accent,background:`${c.accent}14`,border:`1px solid ${c.accent}28`,padding:"2px 9px",borderRadius:4}}>{c.track}</span>
                <span style={{fontSize:20}}>{c.emoji}</span>
              </div>
              <h3 className="f-head" style={{fontSize:17,fontWeight:700,letterSpacing:"-.03em",color:"#fff",lineHeight:1.25,marginBottom:14}}>{c.title}</h3>
              <div style={{marginBottom:14}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                  <span className="f-mono" style={{fontSize:10,color:"rgba(255,255,255,.2)",letterSpacing:".06em",textTransform:"uppercase"}}>Progress</span>
                  <span className="f-mono" style={{fontSize:10,color:c.accent,fontWeight:500}}>{c.pct}%</span>
                </div>
                <div style={{height:3,background:"rgba(255,255,255,.052)",borderRadius:99,overflow:"hidden"}}>
                  <div style={{height:"100%",width:`${c.pct}%`,background:`linear-gradient(90deg,${c.accent}88,${c.accent})`,borderRadius:99,boxShadow:`0 0 7px ${c.accent}88`}}/>
                </div>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",paddingTop:13,borderTop:"1px solid rgba(255,255,255,.048)"}}>
                <span className="f-body" style={{fontSize:12,color:"rgba(255,255,255,.25)"}}>{c.lessons} lessons</span>
                <span className="f-head" style={{fontSize:13,fontWeight:700,color:c.accent}}>{c.xp} XP</span>
              </div>
              <div className="quick-play" style={{marginTop:13}}>
                <button style={{width:"100%",padding:"10px 0",borderRadius:9,background:`${c.accent}16`,border:`1px solid ${c.accent}32`,fontFamily:"'Space Grotesk',sans-serif",fontSize:12,fontWeight:700,color:c.accent,cursor:"pointer"}}>▶ Open Course</button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <CourseModal course={modal} onClose={()=>setModal(null)}/>
    </>
  );
}

/* ── Stats ───────────────────────────────────────────────────── */
function Stats() {
  const ref = useReveal(0);
  return (
    <section id="stats" style={{position:"relative",zIndex:10,padding:"36px 48px",maxWidth:1440,margin:"0 auto"}} className="section-pad">
      <div ref={ref} className="glass" style={{borderRadius:26,padding:"44px 52px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 50% 0%,rgba(20,241,149,.038) 0%,transparent 65%)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,rgba(20,241,149,.14),transparent)"}}/>
        <div className="stats-grid" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:32,textAlign:"center"}}>
          {[
            {to:3241,suf:"+",label:"Active Learners",col:"#14F195"},
            {to:56929,suf:"+",label:"Lines Shipped",col:"#9945FF"},
            {to:90,suf:"%",label:"Code Coverage",col:"#fff"},
            {to:156,suf:"",label:"On-chain Lessons",col:"#60a5fa"},
          ].map(({to,suf,label,col},i)=>(
            <div key={label} style={{borderRight:i<3?"1px solid rgba(255,255,255,.045)":"none",paddingRight:i<3?32:0}}>
              <div className="f-head" style={{fontSize:"clamp(2rem,4vw,3.2rem)",fontWeight:700,letterSpacing:"-.05em",color:col}}><Counter to={to} suffix={suf}/></div>
              <div className="f-mono" style={{fontSize:11,color:"rgba(255,255,255,.18)",letterSpacing:".08em",textTransform:"uppercase",marginTop:7}}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Leaderboard ─────────────────────────────────────────────── */
function Leaderboard() {
  const h = useReveal(0);
  const rows = [
    {rank:1,name:"0xAlpha",wallet:"7xKp...3mRt",xp:12450,level:11,medal:"🥇",glow:"rgba(255,215,0,.16)"},
    {rank:2,name:"CryptoVitor",wallet:"9sWq...8nUv",xp:9820,level:9,medal:"🥈",glow:"rgba(192,192,192,.13)"},
    {rank:3,name:"SolanaRita",wallet:"4jBm...2pLx",xp:8610,level:9,medal:"🥉",glow:"rgba(205,127,50,.13)"},
    {rank:4,name:"devBruno",wallet:"3cNp...7kEs",xp:6240,level:7,medal:null,glow:null},
    {rank:5,name:"web3Maria",wallet:"6tFh...1wAz",xp:5180,level:7,medal:null,glow:null},
  ];
  return (
    <section id="leaderboard" style={{position:"relative",zIndex:10,padding:"64px 48px",maxWidth:1440,margin:"0 auto"}} className="section-pad">
      <div ref={h} style={{marginBottom:32}}>
        <p className="f-mono" style={{fontSize:11,color:"rgba(20,241,149,.52)",letterSpacing:".13em",textTransform:"uppercase",marginBottom:10}}>//  Global Rankings</p>
        <h2 className="f-head" style={{fontSize:"clamp(2rem,4vw,3.2rem)",fontWeight:700,letterSpacing:"-.045em",color:"#fff"}}>Leaderboard</h2>
      </div>
      <div className="glass" style={{borderRadius:24,overflow:"hidden",position:"relative"}}>
        <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,rgba(255,255,255,.07),transparent)"}}/>
        <div style={{display:"grid",gridTemplateColumns:"60px 1fr 1fr auto auto",padding:"13px 28px",borderBottom:"1px solid rgba(255,255,255,.042)"}}>
          {["Rank","Learner","Wallet","Level","XP"].map(col=><span key={col} className="f-mono" style={{fontSize:10,color:"rgba(255,255,255,.17)",letterSpacing:".12em",textTransform:"uppercase",textAlign:col==="XP"?"right":"left"}}>{col}</span>)}
        </div>
        {rows.map((r,i)=>(
          <div key={r.rank} className="rank-row" style={{display:"grid",gridTemplateColumns:"60px 1fr 1fr auto auto",padding:"17px 28px",borderBottom:i<rows.length-1?"1px solid rgba(255,255,255,.032)":"none",background:r.glow?`radial-gradient(ellipse at left,${r.glow} 0%,transparent 55%)`:"transparent",animationDelay:`${i*90}ms`}}>
            <div style={{display:"flex",alignItems:"center"}}>
              {r.medal?<span className={r.rank===1?"medal-1":""} style={{fontSize:22}}>{r.medal}</span>:<span className="f-mono" style={{fontSize:13,fontWeight:500,color:"rgba(255,255,255,.22)"}}>#{r.rank}</span>}
            </div>
            <span className="f-head" style={{fontSize:14,fontWeight:600,color:"#fff",display:"flex",alignItems:"center"}}>{r.name}</span>
            <span className="f-mono" style={{fontSize:12,color:"rgba(255,255,255,.22)",display:"flex",alignItems:"center"}}>{r.wallet}</span>
            <span style={{display:"flex",alignItems:"center"}}><span className="f-mono" style={{fontSize:12,color:"#9945FF",background:"rgba(153,69,255,.09)",border:"1px solid rgba(153,69,255,.17)",padding:"2px 11px",borderRadius:99}}>Lv.{r.level}</span></span>
            <span className="f-head" style={{fontSize:15,fontWeight:700,color:"#14F195",textAlign:"right",display:"flex",alignItems:"center",justifyContent:"flex-end"}}>{r.xp.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── CTA ─────────────────────────────────────────────────────── */
function CTA({ soundOn }) {
  const ref = useReveal(0);
  return (
    <section id="cta" style={{position:"relative",zIndex:10,padding:"80px 48px 110px",maxWidth:1440,margin:"0 auto",textAlign:"center"}} className="section-pad">
      <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",pointerEvents:"none"}}>
        <div style={{width:"75vw",height:"55vh",borderRadius:"50%",background:"radial-gradient(ellipse,rgba(153,69,255,.06) 0%,transparent 65%)"}}/>
      </div>
      <div style={{position:"absolute",inset:0,pointerEvents:"none",overflow:"hidden",opacity:.038}}>
        {[20,40,60,80].map(p=><div key={p} style={{position:"absolute",top:0,bottom:0,left:`${p}%`,width:1,background:"rgba(255,255,255,.5)"}}/>)}
        {[25,50,75].map(p=><div key={p} style={{position:"absolute",left:0,right:0,top:`${p}%`,height:1,background:"rgba(255,255,255,.5)"}}/>)}
      </div>
      <div ref={ref}>
        <span className="f-mono" style={{display:"inline-block",fontSize:11,color:"rgba(20,241,149,.5)",letterSpacing:".14em",textTransform:"uppercase",marginBottom:22}}>//  Start Now</span>
        <h2 className="f-head" style={{fontSize:"clamp(2.8rem,7vw,6rem)",fontWeight:700,letterSpacing:"-.048em",color:"#fff",lineHeight:.9,marginBottom:22}}>
          Start earning your<br/><span className="shimmer-text">credentials today.</span>
        </h2>
        <p className="f-body" style={{fontSize:17,fontWeight:300,color:"rgba(255,255,255,.33)",maxWidth:400,margin:"0 auto 40px",lineHeight:1.78}}>
          Connect your wallet. Learn at your pace. Every credential is yours forever, on-chain.
        </p>
        <div style={{display:"flex",flexWrap:"wrap",gap:14,justifyContent:"center",marginBottom:36}}>
          <MagneticBtn>
            <button className="btn-primary ripple-container" onClick={e=>{const btn=e.currentTarget;const r=btn.getBoundingClientRect();const el=document.createElement("span");el.className="ripple-effect";el.style.left=(e.clientX-r.left)+"px";el.style.top=(e.clientY-r.top)+"px";btn.appendChild(el);setTimeout(()=>el.remove(),700);if(soundOn)SOUND.click();spawnConfetti(e.clientX,e.clientY);}} style={{fontSize:16,padding:"16px 38px",borderRadius:15}}>
              Connect Wallet & Begin
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>
            </button>
          </MagneticBtn>
          <button className="btn-secondary" style={{fontSize:14}} onClick={()=>{if(soundOn)SOUND.click();}}>View live demo ↗</button>
        </div>
        <div style={{display:"flex",flexWrap:"wrap",gap:28,justifyContent:"center"}}>
          {["Open Source · MIT","Devnet Ready","EN · PT-BR · ES","TypeScript Strict","283 Tests Passing"].map(t=>(
            <span key={t} className="f-mono" style={{fontSize:11,color:"rgba(255,255,255,.14)",letterSpacing:".06em"}}>✓ {t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Footer ──────────────────────────────────────────────────── */
function Footer() {
  const [tick, setTick] = useState(true);
  useEffect(()=>{ const t=setInterval(()=>setTick(p=>!p),600); return()=>clearInterval(t); },[]);
  return (
    <footer style={{position:"relative",zIndex:10,borderTop:"1px solid rgba(255,255,255,.042)",padding:"26px 48px",maxWidth:1440,margin:"0 auto"}}>
      <div className="footer-inner" style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:14}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:30,height:30,borderRadius:8,background:"linear-gradient(135deg,rgba(20,241,149,.26),rgba(153,69,255,.26))",border:"1px solid rgba(255,255,255,.07)",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <span className="f-head" style={{fontSize:10,fontWeight:700,color:"rgba(255,255,255,.52)"}}>ST</span>
          </div>
          <span className="f-body" style={{fontSize:13,color:"rgba(255,255,255,.18)"}}>Superteam Academy · MIT · 2026</span>
          <span className="f-mono" style={{fontSize:12,color:"rgba(20,241,149,.32)",marginLeft:4}}>{"_ "}<span style={{opacity:tick?1:0,color:"#14F195"}}>█</span></span>
        </div>
        <div style={{display:"flex",gap:26}}>
          {["GitHub","Twitter","Docs","Solana"].map(l=><a key={l} href="#" className="nav-link" style={{fontSize:12,letterSpacing:".03em"}}>{l}</a>)}
        </div>
      </div>
    </footer>
  );
}

/* ── ROOT ────────────────────────────────────────────────────── */
function LandingApp() {
  const [soundOn, setSoundOn] = useState(false);
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: STYLES}} suppressHydrationWarning />
      <div className="crt" style={{position:"relative",background:"var(--bg, #060608)",minHeight:"100vh",overflowX:"hidden"}}>
        <ScrollProgress/>
        <CursorSpotlight/>
        <Background/>
        <LiveToast/>
        <SectionIndicator/>
        <SoundToggle on={soundOn} toggle={()=>setSoundOn(p=>!p)}/>
        <div style={{position:"relative",zIndex:10}}>
          <Navbar soundOn={soundOn}/>
          <Hero soundOn={soundOn}/>
          <Ticker/>
          <Bento/>
          <Courses soundOn={soundOn}/>
          <Stats/>
          <Leaderboard/>
          <CTA soundOn={soundOn}/>
          <Footer/>
        </div>
      </div>
    </>
  );
}

export default function Page() {
  return <LandingApp />;
}
