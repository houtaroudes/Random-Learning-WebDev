import React, { useEffect, useState, useRef } from "react";

/* =============================================================
   PIXEL ICON SYSTEM — hand-crafted pixel art SVGs
   ============================================================= */
const PIXEL_ART = {
  star:     { c:"#ffd166", w:12, h:12, p:[2,0,3,0,1,1,2,1,3,1,4,1,0,2,1,2,2,2,3,2,4,2,5,2,0,3,1,3,2,3,3,3,4,3,5,3,1,4,2,4,3,4,4,4,2,5,3,5] },
  palette:  { c:"#3fe6ff", w:12, h:10, p:[1,0,2,0,3,0,4,0,5,0,6,0,0,1,2,1,4,1,5,1,7,1,0,2,7,2,0,3,7,3,1,4,2,4,3,4,4,4,5,4,6,4,3,5,4,5,3,6,4,6,2,7,3,7,4,7,5,7] },
  sparkle:  { c:"#ff3f9c", w:14, h:14, p:[5,2,7,2,4,3,5,3,6,3,7,3,8,3,2,4,3,4,4,4,5,4,6,4,7,4,8,4,9,4,10,4,1,5,2,5,3,5,4,5,5,5,6,5,7,5,8,5,9,5,10,5,11,5,0,6,1,6,2,6,3,6,4,6,5,6,6,6,7,6,8,6,9,6,10,6,11,6,12,6,1,7,2,7,3,7,4,7,5,7,6,7,7,7,8,7,9,7,10,7,11,7,2,8,3,8,4,8,5,8,6,8,7,8,8,8,9,8,10,8,4,9,5,9,6,9,7,9,8,9,5,10,7,10] },
  bolt:     { c:"#a29bfe", w:10, h:12, p:[3,0,4,0,3,1,4,1,2,2,3,2,4,2,5,2,1,3,2,3,3,3,4,3,5,3,0,4,1,4,2,4,3,4,4,4,1,5,2,5,3,5,4,5,5,5,1,6,2,6,3,6,4,6,2,7,3,7,4,7,2,8,3,8] },
  sword:    { c:"#ff6b6b", w:10, h:12, p:[4,0,3,1,4,1,5,1,3,2,4,2,5,2,3,3,4,3,5,3,4,4,2,5,4,5,6,5,1,6,3,6,5,6,7,6,0,7,2,7,4,7,6,7,8,7] },
  trophy:   { c:"#ffd166", w:12, h:12, p:[1,0,2,0,3,0,4,0,5,0,6,0,7,0,8,0,9,0,0,1,10,1,0,2,3,2,4,2,5,2,6,2,10,2,0,3,10,3,0,4,10,4,1,5,2,5,3,5,4,5,5,5,6,5,7,5,8,5,9,5,3,6,4,6,5,6,6,6,7,6,4,7,5,7,6,7,4,8,5,8,6,8] },
  check:    { c:"#4ade80", w:12, h:10, p:[7,0,6,1,7,1,5,2,7,2,4,3,7,3,3,4,7,4,2,5,6,5,7,5,1,6,5,6,0,7,4,7,0,8,1,8,2,8] },
  wrench:   { c:"#ff9a56", w:12, h:12, p:[5,0,6,0,4,1,5,1,6,1,7,1,4,2,5,2,6,2,7,2,5,3,6,3,5,4,6,4,4,5,5,5,6,5,7,5,3,6,4,6,5,6,6,6,7,6,8,6,2,7,3,7,4,7,5,7,6,7,7,7,8,7,9,7,1,8,2,8,3,8,4,8,5,8,6,8,7,8,8,8,0,9,1,9,2,9,3,9,4,9,5,9,6,9,0,10,1,10,2,10] },
  file:     { c:"#8489bd", w:10, h:12, p:[1,0,2,0,3,0,4,0,5,0,6,0,0,1,7,1,0,2,7,2,0,3,7,3,0,4,7,4,0,5,3,5,7,5,0,6,3,6,7,6,0,7,3,7,7,7,0,8,7,8,0,9,7,9,0,10,7,10,1,11,2,11,3,11,4,11,5,11,6,11] },
  eye:      { c:"#3fe6ff", w:14, h:10, p:[0,3,1,3,2,3,3,3,4,3,5,3,6,3,7,3,8,3,9,3,10,3,11,3,12,3,13,3,1,4,2,4,3,4,4,4,5,4,6,4,7,4,8,4,9,4,10,4,11,4,12,4,2,5,3,5,4,5,5,5,6,5,7,5,8,5,9,5,10,5,11,5,1,6,2,6,3,6,4,6,5,6,6,6,7,6,8,6,9,6,10,6,11,6,12,6,0,7,1,7,2,7,3,7,4,7,5,7,6,7,7,7,8,7,9,7,10,7,11,7,12,7,13,7] },
  pencil:   { c:"#ffd166", w:8, h:12, p:[3,0,2,1,3,1,4,1,2,2,3,2,4,2,1,3,2,3,3,3,4,3,5,3,1,4,2,4,3,4,4,4,5,4,0,5,1,5,2,5,3,5,4,5,5,5,6,5,0,6,1,6,2,6,3,6,4,6,5,6,6,6,0,7,1,7,2,7,3,7,4,7,5,7,6,7,0,8,1,8,2,8,6,8,1,9,5,9,1,10,5,10,2,11,3,11,4,11] },
  bulb:     { c:"#ffd166", w:10, h:14, p:[1,0,2,0,3,0,4,0,5,0,6,0,7,0,0,1,1,1,2,1,3,1,4,1,5,1,6,1,7,1,8,1,0,2,1,2,2,2,3,2,4,2,5,2,6,2,7,2,8,2,0,3,1,3,2,3,3,3,4,3,5,3,6,3,7,3,8,3,1,4,2,4,3,4,4,4,5,4,6,4,7,4,2,5,3,5,4,5,5,5,6,5,2,6,3,6,4,6,5,6,6,6,2,7,3,7,4,7,5,7,6,7,3,8,4,8,5,8,3,9,4,9,5,9,4,10,4,11] },
  reset:    { c:"#3fe6ff", w:12, h:12, p:[6,0,7,0,5,1,6,1,7,1,8,1,4,2,5,2,8,2,9,2,3,3,4,3,9,3,10,3,3,4,10,4,3,5,9,5,4,6,8,6,4,7,5,7,6,7,7,7,8,7,5,8,6,8,7,8,7,9,6,10,5,11] },
  seedling: { c:"#4ade80", w:10, h:12, p:[3,0,4,0,5,0,2,1,3,1,4,1,5,1,6,1,1,2,2,2,4,2,5,2,6,2,7,2,2,3,3,3,4,3,5,3,6,3,3,4,4,4,5,4,4,5,4,6,3,7,4,7,5,7,3,8,4,8,5,8,3,9,4,9,5,9,2,10,3,10,4,10,5,10,6,10] },
  search:   { c:"#8489bd", w:12, h:12, p:[2,0,3,0,4,0,5,0,1,1,2,1,3,1,4,1,5,1,6,1,0,2,1,2,2,2,3,2,4,2,5,2,6,2,7,2,0,3,1,3,2,3,3,3,4,3,5,3,6,3,7,3,0,4,1,4,2,4,3,4,4,4,5,4,6,4,7,4,1,5,2,5,3,5,4,5,5,5,6,5,2,6,3,6,4,6,5,6,3,7,4,7,5,8,6,8,5,9,6,9,7,10,8,10,7,11,8,11] },
  close:    { c:"#8489bd", w:10, h:10, p:[1,0,7,0,0,1,2,1,6,1,8,1,0,2,3,2,5,2,8,2,1,3,4,3,2,4,2,5,1,6,4,6,0,7,3,7,5,7,8,7,0,8,2,8,6,8,8,8,1,9,7,9] },
  play:     { c:"#3fe6ff", w:10, h:12, p:[3,0,2,1,3,1,1,2,2,2,3,2,0,3,1,3,2,3,3,3,0,4,1,4,2,4,3,4,0,5,1,5,2,5,3,5,0,6,1,6,2,6,3,6,1,7,2,7,3,7,2,8,3,8,3,9] },
  link:     { c:"#3fe6ff", w:12, h:10, p:[4,0,5,0,6,0,7,0,3,1,4,1,5,1,6,1,7,1,8,1,2,2,3,2,4,2,5,2,6,2,7,2,8,2,9,2,1,3,2,3,3,3,4,3,5,3,6,3,7,3,8,3,9,3,10,3,0,4,1,4,10,4,0,5,1,5,10,5,1,6,2,6,9,6,2,7,3,7,8,7,3,8,4,8,5,8,6,8,7,8,2,9,3,9,4,9,5,9,6,9,7,9,8,9] },
  diamond:  { c:"#3fe6ff", w:10, h:10, p:[4,0,5,0,3,1,4,1,5,1,6,1,2,2,3,2,4,2,5,2,6,2,7,2,1,3,2,3,3,3,4,3,5,3,6,3,7,3,8,3,0,4,1,4,2,4,3,4,4,4,5,4,6,4,7,4,8,4,9,4,0,5,1,5,2,5,3,5,4,5,5,5,6,5,7,5,8,5,9,5,1,6,2,6,3,6,4,6,5,6,6,6,7,6,8,6,2,7,3,7,4,7,5,7,6,7,7,7,3,8,4,8,5,8,6,8,4,9,5,9] },
  flag:     { c:"#ff3f9c", w:10, h:12, p:[1,0,1,1,2,1,3,1,1,2,2,2,3,2,4,2,1,3,2,3,4,3,1,4,2,4,3,4,1,5,2,5,3,5,4,5,5,5,1,6,2,6,3,6,4,6,5,6,6,6,1,7,1,8,1,9,1,10,1,11] },
  note:     { c:"#ffd166", w:10, h:12, p:[2,0,3,0,4,0,1,1,2,1,3,1,4,1,5,1,0,2,1,2,2,2,3,2,4,2,5,2,6,2,0,3,1,3,2,3,3,3,5,3,0,4,1,4,2,4,3,4,5,4,0,5,1,5,2,5,3,5,4,5,1,6,2,6,3,6,4,6,2,7,3,7,2,8,3,8,2,9,3,9] },
  mountain: { c:"#4ade80", w:16, h:12, p:[0,9,1,8,9,10,10,9,2,7,3,6,8,8,9,7,10,8,4,5,5,4,6,5,7,6,8,7,3,5,7,5,2,6,8,6,0,10,1,9,2,8,3,7,4,6,5,5,6,6,7,7,8,8,9,9,10,10,11,9,12,8,13,7,14,6,15,5,11,8,12,7,13,6,14,5,15,4,11,9,12,8,13,7,14,6,15,5,14,4,15,3] },
  cloud:    { c:"#8489bd", w:16, h:10, p:[2,3,3,3,4,3,5,3,6,3,1,4,2,4,3,4,4,4,5,4,6,4,7,4,0,5,1,5,2,5,3,5,4,5,5,5,6,5,7,5,8,5,1,6,2,6,3,6,4,6,5,6,6,6,7,6,2,7,3,7,4,7,5,7,6,7,10,4,11,4,12,4,13,4,9,5,10,5,11,5,12,5,13,5,14,5,10,6,11,6,12,6,13,6,11,7,12,7] },
};

const PS = 2;

function PxIcon({ name, size=18, color }) {
  const art = PIXEL_ART[name];
  if (!art) return null;
  const vw = art.w * PS, vh = art.h * PS;
  const c = color || art.c;
  const rects = [];
  for (let i = 0; i < art.p.length; i += 2)
    rects.push(<rect key={i/2} x={art.p[i]*PS} y={art.p[i+1]*PS} width={PS} height={PS} fill={c} shapeRendering="crispEdges" />);
  return <svg width={size} height={size} viewBox={`0 0 ${vw} ${vh}`} style={{display:'inline-block',verticalAlign:'middle',flexShrink:0}} aria-hidden="true">{rects}</svg>;
}

/* =============================================================
   PIXEL BACKGROUND — animated retro pixel scenery
   ============================================================= */
function PixelBackground() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let anim, w, h, stars = [], clouds = [], offset = 0;
    function resize() { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }
    resize();
    function init() {
      stars = [];
      for (let i = 0; i < 80; i++) stars.push({
        x: Math.random() * w, y: Math.random() * h * 0.4,
        s: Math.random() * 2 + 1, a: Math.random() * 0.7 + 0.3,
        sp: Math.random() * 0.3 + 0.05, phase: Math.random() * Math.PI * 2
      });
      clouds = [];
      for (let i = 0; i < 4; i++) clouds.push({
        x: Math.random() * w, y: 40 + Math.random() * (h * 0.25),
        w2: 60 + Math.random() * 120, h2: 14 + Math.random() * 8, sp: 0.15 + Math.random() * 0.3
      });
    }
    init();
    function drawMountain(ox, oy, mw, mh, color) {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(ox, oy + mh);
      ctx.lineTo(ox + mw/2, oy);
      ctx.lineTo(ox + mw, oy + mh);
      ctx.closePath();
      ctx.fill();
    }
    function animate(time) {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        const twinkle = 0.5 + 0.5 * Math.sin(time * 0.002 + s.phase);
        ctx.globalAlpha = s.a * twinkle;
        ctx.fillStyle = '#eef0ff';
        ctx.fillRect(Math.floor(s.x), Math.floor(s.y), s.s, s.s);
        s.y += s.sp * 0.1;
        if (s.y > h * 0.4) { s.y = 0; s.x = Math.random() * w; }
      }
      ctx.globalAlpha = 1;
      const mColors = ['#0f1535', '#151b45', '#1c2355'];
      for (let i = 0; i < 3; i++) {
        const mw = w * 0.8, mh = 50 + i * 20, mx = (w - mw) / 2 + Math.sin(offset * 0.005 + i) * 20;
        drawMountain(mx, h - 80 - i * 15, mw, mh, mColors[i]);
        drawMountain(mx - mw * 0.3, h - 80 - i * 15, mw * 0.5, mh * 0.6, mColors[i]);
        drawMountain(mx + mw * 0.5, h - 80 - i * 15, mw * 0.6, mh * 0.7, mColors[i]);
      }
      for (const c of clouds) {
        ctx.fillStyle = 'rgba(132,137,189,0.12)';
        const cx = Math.floor(c.x), cy = Math.floor(c.y);
        const cw = Math.floor(c.w2), ch = Math.floor(c.h2);
        ctx.fillRect(cx - cw/2, cy - ch/2, cw, ch);
        ctx.fillRect(cx - cw/2 + 10, cy - ch/2 - 4, cw - 20, ch - 2);
        ctx.fillRect(cx - cw/2 + 20, cy - ch/2 - 8, cw - 40, ch - 4);
        c.x += c.sp;
        if (c.x > w + c.w2) c.x = -c.w2;
      }
      ctx.fillStyle = '#070911';
      ctx.fillRect(0, h - 16, w, 16);
      ctx.fillStyle = 'rgba(63,230,255,0.03)';
      ctx.fillRect(0, h - 16, w, 1);
      offset++;
      anim = requestAnimationFrame(animate);
    }
    anim = requestAnimationFrame(animate);
    const onResize = () => { resize(); init(); };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(anim); window.removeEventListener('resize', onResize); };
  }, []);
  return <canvas ref={ref} style={{position:'fixed',inset:0,zIndex:0,pointerEvents:'none',opacity:0.3}} aria-hidden="true" />;
}

/* =============================================================
   PIXEL RAIN — particle rain overlay
   ============================================================= */
function PixelRain() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); let a, p = [];
    function rs() { c.width = window.innerWidth; c.height = window.innerHeight; }
    rs();
    function init() {
      p = []; const ct = Math.floor((c.width*c.height)/8000);
      const cl = ["#3fe6ff","#ff3f9c","#ffd166","#a29bfe","#fff","#ff6b6b"];
      for (let j=0;j<ct;j++) p.push({x:Math.random()*c.width,y:Math.random()*c.height,s:Math.random()*2+0.5,sy:Math.random()*0.6+0.05,sx:(Math.random()-0.5)*0.3,cl:cl[Math.floor(Math.random()*cl.length)],op:Math.random()*0.4+0.1});
    }
    init();
    function anim(t) {
      ctx.clearRect(0,0,c.width,c.height);
      for (const q of p) { q.y+=q.sy; q.x+=q.sx; if (q.y>c.height) { q.y=-q.s; q.x=Math.random()*c.width; }
        ctx.globalAlpha=q.op; ctx.fillStyle=q.cl; ctx.fillRect(q.x,q.y,q.s,q.s); }
      ctx.globalAlpha=1; a=requestAnimationFrame(anim);
    }
    a=requestAnimationFrame(anim);
    const w=()=>{rs();init();}; window.addEventListener("resize",w);
    return ()=>{cancelAnimationFrame(a);window.removeEventListener("resize",w);};
  },[]);
  return <canvas ref={ref} style={{position:"fixed",inset:0,zIndex:1,pointerEvents:"none",opacity:0.2}} aria-hidden="true" />;
}

/* =============================================================
   DATA
   ============================================================= */
const categories = [
  { id:"all", label:"All Quests", icon:"star", color:"var(--gold)" },
  { id:"ui", label:"UI Components", icon:"palette", color:"var(--cyan)" },
  { id:"visuals", label:"Visual Effects", icon:"sparkle", color:"var(--magenta)" },
  { id:"logic", label:"Logic & Data", icon:"bolt", color:"#a29bfe" },
  { id:"challenges", label:"Code Challenges", icon:"sword", color:"#ff6b6b" },
  { id:"featured", label:"Featured", icon:"trophy", color:"var(--gold)" },
];

const exercises = [
  { id:1, category:"ui", title:"Dropdown Menu", desc:"Toggleable dropdown navigation with smooth open/close animation.", tags:["HTML","CSS"], repo:"Dropdown Menu.html", type:"UI" },
  { id:2, category:"ui", title:"AutoSuggest", desc:"Input field with autocomplete suggestions that filter as you type.", tags:["HTML","CSS"], repo:"AutoSuggest.html", type:"UI" },
  { id:3, category:"ui", title:"Floating Labels", desc:"Animated form labels that float above input fields on focus.", tags:["HTML","CSS"], repo:"Floating Input Ani.html", type:"UI" },
  { id:4, category:"ui", title:"OTP Input UI", desc:"One-time-password style input boxes with auto-advance.", tags:["HTML","CSS","JS"], repo:"OTP-UI.html", type:"UI" },
  { id:5, category:"ui", title:"Upload System", desc:"File upload interface with progress feedback and preview.", tags:["HTML","CSS","JS"], repo:"Upload System.html", type:"UI" },
  { id:6, category:"ui", title:"Password Generator", desc:"Randomized password generator with configurable options.", tags:["HTML","CSS"], repo:"Password Generator.html", type:"UI" },
  { id:7, category:"ui", title:"Smooth NavBar", desc:"Navigation bar with smooth hover and scroll animations.", tags:["HTML","CSS"], repo:"Smooth Ani NavBar.html", type:"UI" },
  { id:8, category:"ui", title:"Nav (TSX)", desc:"Navigation component written in TypeScript/React.", tags:["React","TSX"], repo:"Nav.tsx", type:"UI" },
  { id:9, category:"ui", title:"Input Text Field", desc:"Styled text input with animated underline effect.", tags:["HTML","CSS"], repo:"input text field.html", type:"UI" },
  { id:10, category:"visuals", title:"Animated Background", desc:"CSS-animated gradient background with shifting colors.", tags:["HTML","CSS"], repo:"Animated BG.html", type:"Visual" },
  { id:11, category:"visuals", title:"Animated Progress Bar", desc:"Progress bar with smooth fill animation and percentage display.", tags:["HTML","CSS"], repo:"Animated Progress bar.html", type:"Visual" },
  { id:12, category:"visuals", title:"Gradient Background", desc:"Exploring CSS linear and radial gradient combinations.", tags:["HTML","CSS"], repo:"Gradrient Background.html", type:"Visual" },
  { id:13, category:"visuals", title:"GlassMorphism", desc:"Frosted-glass UI style with backdrop blur and transparency.", tags:["HTML","CSS","JS"], repo:"GlassMorphism.html", type:"Visual" },
  { id:14, category:"visuals", title:"Glow Card", desc:"Card with dynamic glow/hover lighting effects.", tags:["HTML","CSS"], repo:"GlowCard.html", type:"Visual" },
  { id:15, category:"visuals", title:"Hover Cards", desc:"Interactive card hover effects with scale and shadow transitions.", tags:["HTML","CSS"], repo:"Hover Cards.html", type:"Visual" },
  { id:16, category:"visuals", title:"Rainbow Text", desc:"Animated rainbow color cycling effect on text.", tags:["HTML","CSS"], repo:"RainbowTxt.html", type:"Visual" },
  { id:17, category:"visuals", title:"Dynamic Text", desc:"Text that animates character by character on load.", tags:["HTML","CSS"], repo:"DynamicText.html", type:"Visual" },
  { id:18, category:"visuals", title:"GSAP Cursor Trail", desc:"Cursor trail effect using the GSAP animation library.", tags:["HTML","CSS","JS"], repo:"GSAP cursor trail.html", type:"Visual" },
  { id:19, category:"visuals", title:"Overlapping Scroll", desc:"Scroll-based overlapping and parallax layout effects.", tags:["HTML","CSS"], repo:"OverlappingScroll copy.html", type:"Visual" },
  { id:20, category:"visuals", title:"Box Model Practice", desc:"CSS box model exercises with margin, border, and padding.", tags:["HTML","CSS"], repo:"Box.html", type:"Visual" },
  { id:21, category:"visuals", title:"Hover Effects", desc:"Collection of various CSS hover effect experiments.", tags:["HTML","CSS"], repo:"Hover.html", type:"Visual" },
  { id:22, category:"visuals", title:"Color Playground", desc:"Color manipulation and generation experiments.", tags:["HTML","CSS","JS"], repo:"Color.html", type:"Visual" },
  { id:23, category:"logic", title:"Dark Mode + Storage", desc:"Theme toggling with localStorage persistence across sessions.", tags:["HTML","CSS","JS"], repo:"DarkMode and Local Storage.html", type:"Logic" },
  { id:24, category:"logic", title:"QR Code Generator", desc:"Generate QR codes from text input using a JS library.", tags:["HTML","JS"], repo:"QR Code.html", type:"Logic" },
  { id:25, category:"logic", title:"Realtime UI", desc:"UI that updates in real-time with dynamic data.", tags:["HTML","CSS","JS"], repo:"Realtime.html", type:"Logic" },
  { id:26, category:"featured", title:"Café POS System", desc:"A full Point-of-Sale prototype for a café themed menu, live cart, VAT calculation, receipt generation, and a demo login screen. My thesis project!", tags:["HTML","CSS","JS","POS"], repo:"houtarou_pos.html", type:"Featured", featured:true },
];

const challenges = [
  { id:"c1", title:"Make a Red Button", desc:"Create a red button with white text that changes to blue when hovered.", difficulty:"Easy",
    starter:`<!-- Red button with white text, turns blue on hover -->\n<button id="myBtn">Click Me</button>\n\n<style>/* Your CSS here */</style>`,
    solution:`#myBtn { background:#ff4444; color:white; border:none; padding:12px 24px; border-radius:8px; cursor:pointer; font-size:16px; transition:all .3s; }\n#myBtn:hover { background:#4488ff; transform:scale(1.05); }` },
  { id:"c2", title:"Gradient Card", desc:"Build a card with a gradient background, rounded corners, and a subtle shadow.", difficulty:"Easy",
    starter:`<div class="card"><h2>Hello!</h2><p>This is a gradient card.</p></div>\n\n<style>/* Your CSS here */</style>`,
    solution:`.card { background:linear-gradient(135deg,#6c5ce7,#a29bfe); border-radius:16px; padding:32px; color:white; box-shadow:0 8px 32px rgba(108,92,231,.3); max-width:300px; font-family:sans-serif; }` },
  { id:"c3", title:"Animated Loader", desc:"Create a spinning animation using only CSS (no JS).", difficulty:"Medium",
    starter:`<div class="loader"></div>\n\n<style>/* Use @keyframes! */</style>`,
    solution:`.loader { width:50px; height:50px; border:4px solid rgba(63,230,255,.1); border-top:4px solid #3fe6ff; border-radius:50%; animation:spin .8s linear infinite; }\n@keyframes spin { to { transform:rotate(360deg); } }` },
  { id:"c4", title:"Flexbox Layout", desc:"Use flexbox to create a horizontal row of 3 colored boxes that wrap on small screens.", difficulty:"Medium",
    starter:`<div class="container"><div class="box">1</div><div class="box">2</div><div class="box">3</div></div>\n\n<style>/* Your CSS here */</style>`,
    solution:`.container { display:flex; gap:16px; flex-wrap:wrap; }\n.box { background:#3fe6ff; color:#070911; padding:32px 48px; border-radius:12px; font-size:24px; font-weight:bold; font-family:sans-serif; flex:1; min-width:100px; text-align:center; }\n.box:nth-child(2) { background:#ff3f9c; }\n.box:nth-child(3) { background:#ffd166; }` },
  { id:"c5", title:"Typewriter Effect", desc:"Make text appear one character at a time like a typewriter.", difficulty:"Hard",
    starter:`<p id="text">Hello, World!</p>\n\n<style>/* Add cursor effect */</style>\n<script>// Your JavaScript</script>`,
    solution:`#text { font-family:monospace; font-size:24px; border-right:2px solid #3fe6ff; white-space:nowrap; overflow:hidden; width:0; animation:type 2s steps(13) forwards, blink .8s steps(1) infinite; }\n@keyframes type { to { width:13ch; } }\n@keyframes blink { 50% { border-color:transparent; } }` },
];

const skills = [
  { name:"HTML5", icon:"diamond", color:"#e34f26" },{ name:"CSS3", icon:"diamond", color:"#1572b6" },
  { name:"JavaScript", icon:"diamond", color:"#f7df1e" },{ name:"React", icon:"diamond", color:"#61dafb" },
  { name:"TypeScript", icon:"diamond", color:"#3178c6" },{ name:"GSAP", icon:"diamond", color:"#88ce02" },
  { name:"LocalStorage", icon:"diamond", color:"#ff9a56" },{ name:"PHP", icon:"diamond", color:"#777bb3" },
];

const questStats = [
  { label:"Quests Done", value:"26", icon:"check" },{ label:"Challenges", value:"5", icon:"sword" },
  { label:"Tech Used", value:"8", icon:"wrench" },{ label:"XP Earned", value:"2,840", icon:"star" },
];
const totalExercises = 26;

/* =============================================================
   HOOKS
   ============================================================= */
function useReveal(t=0.1){const r=useRef(null);const[v,s]=useState(false);useEffect(()=>{const e=r.current;if(!e)return;const o=new IntersectionObserver(([n])=>{if(n.isIntersecting){s(true);o.unobserve(e);}},{threshold:t});o.observe(e);return ()=>o.disconnect();},[t]);return[r,v];}
function RevealSection({children,className="",...p}){const[r,v]=useReveal(0.08);return <section ref={r} className={`reveal-section ${v?"revealed":""} ${className}`} {...p}>{children}</section>;}
function useTypewriter(t,s=35,d=600){const[o,set]=useState("");const[f,setF]=useState(false);useEffect(()=>{const x=setTimeout(()=>setF(true),d);return ()=>clearTimeout(x);},[d]);useEffect(()=>{if(!f)return;let i=0;const iv=setInterval(()=>{i++;set(t.slice(0,i));if(i>=t.length)clearInterval(iv);},s);return ()=>clearInterval(iv);},[f,t,s]);return o;}

/* =============================================================
   RANDOM CHALLENGE GENERATOR
   ============================================================= */
function useRandomChallenges(count=3) {
  const [randomChallenges, setRandomChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchRandom() {
      try {
        const htmlEx = exercises.filter(e => e.repo.endsWith('.html') && !e.featured);
        const shuffled = [...htmlEx].sort(() => Math.random() - 0.5);
        const picked = shuffled.slice(0, count);
        const results = [];
        for (const ex of picked) {
          try {
            const url = `/demos/${encodeURIComponent(ex.repo)}`;
            const resp = await fetch(url);
            if (!resp.ok) continue;
            const code = await resp.text();
            results.push({
              id: `rand_${ex.id}`, title: ex.title,
              desc: `Recreate this ${ex.type.toLowerCase()} component from your exercise library!`,
              difficulty: ['Easy','Easy','Medium','Medium','Hard'][Math.floor(Math.random()*5)],
              starter: code, solution: code,
            });
          } catch {}
        }
        setRandomChallenges(results);
      } catch {} finally { setLoading(false); }
    }
    fetchRandom();
  }, [count]);
  return { randomChallenges, loading };
}

/* =============================================================
   LIVE PREVIEW MODAL
   ============================================================= */
function LivePreview({exercise,onClose}) {
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(()=>{
    if(!exercise) return;
    const demoUrl = `/demos/${encodeURIComponent(exercise.repo)}`;
    setLoading(true); setError(null);
    fetch(demoUrl).then(r=>{if(!r.ok)throw new Error();return r.text();}).then(setHtml).catch(()=>setError("Couldn't load preview.")).finally(()=>setLoading(false));
  },[exercise]);
  if(!exercise) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e=>e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title"><PxIcon name="play" size={16} /> {exercise.title}</span>
          <button className="modal-close" onClick={onClose}><PxIcon name="close" size={14} /></button>
        </div>
        <div className="modal-body">
          {loading && <div className="modal-loading"><div className="loader-spin" /><span>Loading preview...</span></div>}
          {error && <div className="modal-error"><PxIcon name="search" size={16} /> {error}</div>}
          {!loading && !error && html && <iframe className="preview-iframe" srcDoc={html} title={exercise.title} sandbox="allow-scripts allow-same-origin" />}
        </div>
        <div className="modal-footer">
          <a href={`https://github.com/houtaroudes/Random-Learning-WebDev/blob/main/public/demos/${encodeURIComponent(exercise.repo)}`} target="_blank" rel="noopener" className="btn sm"><PxIcon name="file" size={14} /> View Source</a>
        </div>
      </div>
    </div>
  );
}

/* =============================================================
   CODE PLAYGROUND
   ============================================================= */
function CodePlayground({challenge}) {
  const [code, setCode] = useState(challenge?.starter || "");
  const [showSolution, setShowSolution] = useState(false);
  const iframeRef = useRef(null);
  useEffect(() => { setCode(challenge?.starter || ""); setShowSolution(false); }, [challenge]);
  useEffect(() => { const doc = iframeRef.current?.contentDocument; if (doc) { doc.open(); doc.write(code); doc.close(); } }, [code]);
  if (!challenge) return <div className="playground" style={{padding:40,textAlign:'center',color:'var(--dim)'}}>No challenge selected.</div>;
  return (
    <div className="playground">
      <div className="playground-header">
        <div className="playground-info">
          <span className="playground-title">{challenge.title}</span>
          <span className={`difficulty-badge ${challenge.difficulty.toLowerCase()}`}>{challenge.difficulty}</span>
        </div>
        <div className="playground-actions">
          <button className="btn sm" onClick={()=>setShowSolution(!showSolution)}>
            {showSolution ? <><PxIcon name="eye" size={14} /> Hide</> : <><PxIcon name="bulb" size={14} /> Show</>} Solution
          </button>
          <button className="btn sm primary" onClick={()=>setCode(challenge.starter)}><PxIcon name="reset" size={14} /> Reset</button>
        </div>
      </div>
      <p className="playground-desc">{challenge.desc}</p>
      <div className="playground-editor">
        <div className="editor-pane">
          <div className="editor-label"><PxIcon name="pencil" size={12} /> index.html</div>
          <textarea className="code-editor" value={code} onChange={e=>setCode(e.target.value)} spellCheck={false} />
          {showSolution && (
            <div className="solution-panel">
              <div className="solution-label"><PxIcon name="bulb" size={12} /> Solution</div>
              <pre className="solution-code">{challenge.solution}</pre>
            </div>
          )}
        </div>
        <div className="preview-pane">
          <div className="editor-label"><PxIcon name="eye" size={12} /> Preview</div>
          <iframe ref={iframeRef} className="playground-preview" title="output" sandbox="allow-scripts" />
        </div>
      </div>
    </div>
  );
}

/* =============================================================
   PIXEL DIVIDER
   ============================================================= */
function PixelDivider() {
  return <div className="pixel-divider" aria-hidden="true"><span>+</span><span>+</span><span>+</span><span>+</span><span>+</span></div>;
}

/* =============================================================
   MAIN COMPONENT
   ============================================================= */
export default function LearningHub() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [scrolled, setScrolled] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [previewExercise, setPreviewExercise] = useState(null);
  const [activeChallenge, setActiveChallenge] = useState(challenges[0]);
  const [showRandomChallenge, setShowRandomChallenge] = useState(false);
  const { randomChallenges, loading: randLoading } = useRandomChallenges(3);

  useEffect(()=>{const o=()=>setScrolled(window.scrollY>50);window.addEventListener("scroll",o,{passive:true});return ()=>window.removeEventListener("scroll",o);},[]);
  const typedSubtitle = useTypewriter("Interactive exercises, live previews, and code challenges learn by doing!",28,900);

  const filtered = activeCategory === "all" ? exercises : exercises.filter(e=>e.category===activeCategory);
  const featuredEx = exercises.find(e=>e.featured);
  const displayChallenges = showRandomChallenge && randomChallenges.length > 0 ? randomChallenges : challenges;

  return (
    <>
      <style>{CSS}</style>
      <div id="app">
        <PixelBackground />
        <PixelRain />
        <div className="vignette" aria-hidden="true" />
        <div className="scanlines" aria-hidden="true" />

        {/* NAV */}
        <nav className={scrolled?"scrolled":""}>
          <div className="nav-inner">
            <a href="#" className="logo"><PxIcon name="seedling" size={20} /><span className="logo-text">Dev<span className="accent">Journey</span></span></a>
            <div className="nav-links">
              <a href="#quests">Quests</a>
              <a href="#challenges">Challenges</a>
              <a href="#skills">Skills</a>
            </div>
          </div>
        </nav>

        {/* HERO */}
        <header className="hero">
          <div className="hero-scan" aria-hidden="true" />
          <div className="hero-content">
            <div className="hero-badge"><PxIcon name="flag" size={14} /> Learning Adventure</div>
            <h1 className="hero-title">Random Learning <span className="gradient-text">WebDev</span></h1>
            <p className="hero-sub">{typedSubtitle}<span className="cursor-blink">|</span></p>
            <div className="hero-stats">
              {questStats.map(s=><div className="hero-stat" key={s.label}><PxIcon name={s.icon} size={22} /><div><div className="hero-stat-value">{s.value}</div><div className="hero-stat-label">{s.label}</div></div></div>)}
            </div>
            <div className="hero-actions">
              <a href="#quests" className="btn primary">Start Exploring</a>
              <a href="https://github.com/houtaroudes/Random-Learning-WebDev" target="_blank" rel="noopener" className="btn"><PxIcon name="link" size={14} /> View on GitHub</a>
            </div>
          </div>
          <div className="scroll-hint" aria-hidden="true"><span>▸ SCROLL ▸</span></div>
        </header>

        {/* XP BAR */}
        <div className="xp-bar">
          <div className="xp-inner">
            <div className="xp-info"><span className="xp-level">Lv. 5</span><span className="xp-label">Code Adventurer</span></div>
            <div className="xp-track"><div className="xp-fill" style={{width:"78%"}}/><span className="xp-text">2,840 / 3,500 XP</span></div>
          </div>
        </div>

        <PixelDivider />

        {/* QUESTS */}
        <RevealSection className="section" id="quests">
          <div className="section-head">
            <div className="eyebrow"><PxIcon name="note" size={14} /> Quest Log</div>
            <h2 className="section-title">Exercise <span className="accent">Catalog</span></h2>
            <p className="section-desc">{totalExercises} mini-projects + {challenges.length} code challenges. Filter below to browse specific skills.</p>
          </div>
          <div className="filter-bar">
            {categories.map(cat=>(
              <button key={cat.id} className={`filter-btn ${activeCategory===cat.id?"active":""}`} onClick={()=>setActiveCategory(cat.id)}
                style={activeCategory===cat.id?{borderColor:cat.color,color:cat.color}:{}}>
                <PxIcon name={cat.icon} size={16} /><span>{cat.label}</span>
              </button>
            ))}
          </div>
          <div className="exercise-grid">
            {filtered.map((ex,i)=>(
              <article className={`exercise-card ${ex.featured?"featured":""}`} key={ex.id}
                style={{animationDelay:`${i*0.05}s`}}
                onMouseEnter={()=>setHoveredCard(ex.id)} onMouseLeave={()=>setHoveredCard(null)}>
                <div className="card-glow" style={{opacity:hoveredCard===ex.id?1:0,
                  background:`radial-gradient(400px circle at 50% 50%,${ex.featured?"rgba(255,209,102,0.08)":"rgba(63,230,255,0.06)"},transparent)`}} />
                <div className="card-type-badge" style={{background:ex.featured?"var(--gold)":"var(--cyan)",color:"var(--void)"}}>{ex.type}</div>
                <h3 className="card-title">{ex.title}</h3>
                <p className="card-desc">{ex.desc}</p>
                <div className="card-tags">{ex.tags.map(t=><span className="tag" key={t}>{t}</span>)}</div>
                <div className="card-actions">
                  {ex.repo.endsWith(".html") && <button className="card-link demo-btn" onClick={()=>setPreviewExercise(ex)}><PxIcon name="play" size={14} /> Live Demo</button>}
                  <a href={`https://github.com/houtaroudes/Random-Learning-WebDev/blob/main/public/demos/${encodeURIComponent(ex.repo)}`} target="_blank" rel="noopener" className="card-link"><PxIcon name="file" size={14} /> View Code</a>
                </div>
              </article>
            ))}
          </div>
          {filtered.length===0&&<div className="empty-state"><PxIcon name="search" size={32} /><p>No quests in this category yet.</p></div>}
        </RevealSection>

        <PixelDivider />

        {/* CHALLENGES */}
        <RevealSection className="section" id="challenges">
          <div className="section-head">
            <div className="eyebrow"><PxIcon name="sword" size={14} /> Training Grounds</div>
            <h2 className="section-title">Code <span className="accent">Challenges</span></h2>
            <p className="section-desc">Try these interactive coding exercises. Edit the code and see the result live!</p>
          </div>
          <div style={{display:'flex',gap:8,justifyContent:'center',marginBottom:16}}>
            <button className={`btn sm ${!showRandomChallenge?'primary':''}`} onClick={()=>{setShowRandomChallenge(false);setActiveChallenge(challenges[0]);}}>
              Default Challenges
            </button>
            <button className={`btn sm ${showRandomChallenge?'primary':''}`} onClick={()=>{setShowRandomChallenge(true);if(randomChallenges.length)setActiveChallenge(randomChallenges[0]);}} disabled={randLoading}>
              {randLoading ? 'Loading...' : 'Random from Library'}
            </button>
          </div>
          <div className="challenge-tabs">
            {displayChallenges.map(c=>(
              <button key={c.id} className={`challenge-tab ${activeChallenge.id===c.id?"active":""}`}
                onClick={()=>setActiveChallenge(c)}>
                <span className={`diff-dot ${c.difficulty.toLowerCase()}`} /><span>{c.title}</span>
              </button>
            ))}
          </div>
          <CodePlayground challenge={activeChallenge} key={activeChallenge.id} />
        </RevealSection>

        <PixelDivider />

        {/* FEATURED */}
        {featuredEx && (
          <RevealSection className="section featured-section" id="featured">
            <div className="section-head">
              <div className="eyebrow"><PxIcon name="trophy" size={14} /> Legendary Quest</div>
              <h2 className="section-title">Featured <span className="accent">Project</span></h2>
            </div>
            <div className="featured-card">
              <div className="featured-glow" />
              <div className="featured-badge"><PxIcon name="star" size={12} /> MAIN QUEST <PxIcon name="star" size={12} /></div>
              <h3 className="featured-title">{featuredEx.title}</h3>
              <p className="featured-desc">{featuredEx.desc}</p>
              <div className="featured-tags">{featuredEx.tags.map(t=><span className="tag featured-tag" key={t}>{t}</span>)}</div>
              <div className="featured-stats">
                <div className="featured-stat"><span className="featured-stat-value">Thesis Project</span><span className="featured-stat-label">Type</span></div>
                <div className="featured-stat"><span className="featured-stat-value">Single File</span><span className="featured-stat-label">Architecture</span></div>
                <div className="featured-stat"><span className="featured-stat-value">PHP</span><span className="featured-stat-label">Currency</span></div>
              </div>
              <div className="featured-actions" style={{display:"flex",gap:12,marginTop:24,flexWrap:"wrap",justifyContent:"center",position:"relative",zIndex:1}}>
                <button className="btn primary" onClick={()=>setPreviewExercise(featuredEx)}><PxIcon name="play" size={14} /> Live Preview</button>
                <a href={`https://github.com/houtaroudes/Random-Learning-WebDev/blob/main/${encodeURIComponent(featuredEx.repo)}`} target="_blank" rel="noopener" className="btn"><PxIcon name="file" size={14} /> View Source</a>
              </div>
            </div>
          </RevealSection>
        )}

        <PixelDivider />

        {/* SKILLS */}
        <RevealSection className="section" id="skills">
          <div className="section-head"><div className="eyebrow"><PxIcon name="wrench" size={14} /> Equipment</div><h2 className="section-title">Skills & <span className="accent">Tools</span></h2><p className="section-desc">Technologies I've practiced with.</p></div>
          <div className="skills-grid">{skills.map(s=><div className="skill-badge" key={s.name} style={{"--badge-color":s.color}}><PxIcon name={s.icon} size={16} color={s.color} /><span className="skill-name">{s.name}</span></div>)}</div>
        </RevealSection>

        {/* FOOTER */}
        <footer>
          <div className="footer-inner">
            <div className="pixel-footer-art" aria-hidden="true"><PxIcon name="star" size={10} /><PxIcon name="star" size={10} /><PxIcon name="star" size={10} /></div>
            <p className="footer-credits"><strong>Random Learning WebDev</strong> — Built by HoutarouDes &copy; 2026</p>
            <p className="footer-sub">{totalExercises} exercises &middot; {challenges.length} challenges &middot; infinity curiosity</p>
          </div>
        </footer>
      </div>

      {previewExercise && <LivePreview exercise={previewExercise} onClose={()=>setPreviewExercise(null)} />}
    </>
  );
}

/* =============================================================
   CSS
   ============================================================= */
const CSS = `
#app{
  --void:#070911; --panel:#10142e; --panel-2:#171c40; --border:rgba(80,225,255,0.2);
  --cyan:#3fe6ff; --cyan-dim:rgba(63,230,255,0.3); --magenta:#ff3f9c; --gold:#ffd166;
  --text:#eef0ff; --dim:#8489bd; --dimmer:#5a5f8c;
  --font-display:'Press Start 2P',monospace; --font-body:'Space Grotesk',sans-serif; --font-mono:'JetBrains Mono',monospace;
  background:var(--void); color:var(--text); font-family:var(--font-body); line-height:1.6; overflow-x:hidden; position:relative; min-height:100vh;
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}::selection{background:var(--cyan);color:var(--void)}
a{color:inherit;text-decoration:none}
.vignette{position:fixed;inset:0;z-index:2;pointer-events:none;background:radial-gradient(120% 90% at 50% 40%,transparent 50%,rgba(3,4,12,0.85) 100%)}
.scanlines{position:fixed;inset:0;z-index:50;pointer-events:none;background:repeating-linear-gradient(0deg,rgba(255,255,255,0.02) 0px,rgba(255,255,255,0.02) 1px,transparent 1px,transparent 3px);opacity:0.6}
.reveal-section{opacity:0;transform:translateY(30px);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1);position:relative;z-index:3}
.reveal-section.revealed{opacity:1;transform:translateY(0)}@media(prefers-reduced-motion:reduce){.reveal-section{opacity:1;transform:none;transition:none}.hero-scan{display:none}}
.pixel-divider{display:flex;justify-content:center;gap:8px;padding:24px 0;position:relative;z-index:3;opacity:0.3}
.pixel-divider span{font-family:var(--font-mono);font-size:10px;color:var(--cyan);letter-spacing:2px;animation:pulse 2s ease infinite}
.pixel-divider span:nth-child(2){animation-delay:0.3s;color:var(--magenta)}
.pixel-divider span:nth-child(3){animation-delay:0.6s;color:var(--gold)}
.pixel-divider span:nth-child(4){animation-delay:0.9s;color:var(--magenta)}
.pixel-divider span:nth-child(5){animation-delay:1.2s;color:var(--cyan)}
@keyframes pulse{0%,100%{opacity:0.3}50%{opacity:1}}
nav{position:fixed;top:0;left:0;right:0;z-index:30;transition:background .3s;padding:0 24px}
nav.scrolled{background:rgba(7,9,17,0.92);backdrop-filter:blur(12px);box-shadow:0 1px 0 var(--border)}
.nav-inner{max-width:1100px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;height:60px}
.logo{display:flex;align-items:center;gap:10px;font-weight:700;font-size:1.05rem}
.logo-text{font-family:var(--font-display);font-size:.7rem;letter-spacing:.02em}.logo-text .accent{color:var(--magenta)}
.nav-links{display:flex;gap:24px}.nav-links a{font-family:var(--font-mono);font-size:.8rem;color:var(--dim);transition:color .2s;position:relative}
.nav-links a::after{content:'';position:absolute;bottom:-2px;left:0;right:0;height:2px;background:var(--cyan);transform:scaleX(0);transition:transform .2s}
.nav-links a:hover{color:var(--cyan)}.nav-links a:hover::after{transform:scaleX(1)}@media(max-width:640px){.nav-links{display:none}}
.hero{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:120px 24px 80px;position:relative;overflow:hidden;z-index:3}
.hero-scan{position:absolute;inset:0;z-index:0;background:linear-gradient(to bottom,transparent 0%,var(--cyan) 50%,transparent 100%);opacity:0;animation:scanIn 1.2s ease-out forwards;pointer-events:none;mix-blend-mode:overlay}
@keyframes scanIn{0%{opacity:.6;transform:translateY(-100%)}60%{opacity:.3;transform:translateY(20%)}100%{opacity:0;transform:translateY(0%)}}
.hero-content{max-width:720px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:20px;position:relative;z-index:1}
.hero-badge{font-family:var(--font-mono);font-size:.75rem;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);border:1px solid rgba(255,209,102,0.3);background:rgba(255,209,102,0.06);padding:6px 16px;border-radius:100px;display:inline-flex;align-items:center;gap:6px;animation:fadeSlide .8s ease .2s both}
.hero-title{font-family:var(--font-display);font-size:clamp(1.3rem,4.5vw,2.8rem);line-height:1.5;letter-spacing:.01em;animation:fadeSlide .8s ease .4s both;text-shadow:0 0 14px var(--cyan-dim),0 0 40px rgba(255,63,156,0.15)}
.gradient-text{background:linear-gradient(135deg,var(--cyan),var(--magenta));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
@keyframes fadeSlide{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
.hero-sub{font-family:var(--font-mono);font-size:clamp(.85rem,1.6vw,1rem);color:var(--dim);max-width:520px;min-height:3rem;animation:fadeSlide .8s ease .6s both}
.cursor-blink{animation:blink .8s steps(2) infinite;color:var(--cyan);margin-left:2px}@keyframes blink{50%{opacity:0}}
.hero-stats{display:flex;gap:16px;flex-wrap:wrap;justify-content:center;animation:fadeSlide .8s ease .8s both;margin-top:4px}
.hero-stat{display:flex;align-items:center;gap:10px;padding:10px 16px;background:var(--panel);border:1px solid var(--border);border-radius:10px;transition:all .2s}
.hero-stat:hover{border-color:var(--gold);transform:translateY(-2px)}
.hero-stat-value{font-family:var(--font-display);font-size:.8rem;color:var(--gold)}.hero-stat-label{font-family:var(--font-mono);font-size:.6rem;color:var(--dimmer);text-transform:uppercase;letter-spacing:.08em}
.hero-actions{display:flex;gap:12px;flex-wrap:wrap;justify-content:center;animation:fadeSlide .8s ease 1s both;margin-top:4px}
.btn{display:inline-flex;align-items:center;gap:8px;padding:12px 24px;border-radius:10px;font-family:var(--font-mono);font-size:.8rem;font-weight:700;border:2px solid var(--cyan);background:transparent;color:var(--cyan);text-transform:uppercase;letter-spacing:.03em;cursor:pointer;transition:all .18s ease}
.btn:hover{background:var(--cyan);color:var(--void);box-shadow:0 0 22px var(--cyan-dim);transform:translateY(-2px)}
.btn.primary{background:var(--magenta);border-color:var(--magenta);color:var(--void);box-shadow:0 0 18px rgba(255,63,156,0.3)}
.btn.primary:hover{background:transparent;color:var(--magenta);box-shadow:0 0 22px rgba(255,63,156,0.3)}
.btn.sm{padding:8px 14px;font-size:.7rem}
.btn:disabled{opacity:0.5;cursor:not-allowed;transform:none!important}
.scroll-hint{position:absolute;bottom:32px;font-family:var(--font-mono);font-size:.65rem;color:var(--dimmer);animation:blink 1.4s steps(2) infinite;letter-spacing:.15em}
.xp-bar{position:relative;z-index:3;max-width:960px;margin:-20px auto 0;padding:0 24px}
.xp-inner{background:var(--panel);border:1px solid var(--border);border-radius:12px;padding:16px 20px;display:flex;align-items:center;gap:16px;flex-wrap:wrap}
.xp-info{display:flex;align-items:center;gap:10px}
.xp-level{font-family:var(--font-display);font-size:.7rem;color:var(--gold)}.xp-label{font-family:var(--font-mono);font-size:.72rem;color:var(--dim)}
.xp-track{flex:1;min-width:160px;height:20px;background:var(--void);border:1px solid var(--border);border-radius:10px;position:relative;overflow:hidden}
.xp-fill{height:100%;background:linear-gradient(90deg,var(--cyan),var(--magenta));border-radius:10px;transition:width .8s ease;position:relative}
.xp-fill::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent);animation:shimmer 2s ease infinite}
@keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}
.xp-text{font-family:var(--font-mono);font-size:.6rem;color:var(--text);position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);white-space:nowrap}
.section{padding:80px 24px;max-width:1100px;margin:0 auto}
.section-head{text-align:center;margin-bottom:40px}
.eyebrow{font-family:var(--font-mono);font-size:.7rem;letter-spacing:.18em;text-transform:uppercase;color:var(--cyan);opacity:.85;margin-bottom:12px;display:inline-flex;align-items:center;gap:6px}
.section-title{font-family:var(--font-display);font-size:clamp(1rem,2.4vw,1.5rem);margin-bottom:12px;line-height:1.4}
.section-title .accent{color:var(--cyan)}.section-desc{color:var(--dim);max-width:520px;margin:0 auto;font-size:.92rem}
.filter-bar{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-bottom:28px}
.filter-btn{display:flex;align-items:center;gap:6px;padding:8px 14px;border-radius:8px;font-family:var(--font-mono);font-size:.72rem;border:1px solid var(--border);background:var(--panel);color:var(--dim);cursor:pointer;transition:all .2s}
.filter-btn:hover{border-color:var(--cyan);color:var(--cyan)}.filter-btn.active{background:rgba(63,230,255,0.06)}
.exercise-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px}@media(max-width:400px){.exercise-grid{grid-template-columns:1fr}}
.exercise-card{background:var(--panel);border:1px solid var(--border);border-radius:14px;padding:22px 20px 18px;position:relative;overflow:hidden;transition:all .25s ease;animation:cardIn .5s ease both}
.exercise-card.featured{border-color:rgba(255,209,102,0.25);background:linear-gradient(160deg,var(--panel) 0%,#14102a 100%)}
@keyframes cardIn{from{opacity:0;transform:translateY(16px) scale(.98)}to{opacity:1;transform:none}}
.exercise-card:hover{transform:translateY(-4px);border-color:var(--cyan);box-shadow:0 8px 30px rgba(63,230,255,0.08)}
.exercise-card.featured:hover{border-color:var(--gold);box-shadow:0 8px 30px rgba(255,209,102,0.1)}
.card-glow{position:absolute;inset:0;border-radius:14px;transition:opacity .3s;pointer-events:none}
.card-type-badge{display:inline-block;font-family:var(--font-mono);font-size:.55rem;font-weight:700;padding:2px 10px;border-radius:6px;text-transform:uppercase;letter-spacing:.08em;margin-bottom:12px}
.card-title{font-family:var(--font-display);font-size:.78rem;margin-bottom:10px;line-height:1.4}
.card-desc{color:var(--dim);font-size:.85rem;line-height:1.6;margin-bottom:14px}
.card-tags{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:16px}
.tag{font-family:var(--font-mono);font-size:.6rem;padding:3px 8px;border-radius:5px;background:rgba(63,230,255,0.07);color:var(--cyan);border:1px solid rgba(63,230,255,0.12)}
.card-actions{display:flex;gap:10px;flex-wrap:wrap;align-items:center}
.card-link{display:inline-flex;align-items:center;gap:5px;font-family:var(--font-mono);font-size:.7rem;color:var(--dimmer);transition:color .2s;background:none;border:none;cursor:pointer;padding:0}
.card-link:hover{color:var(--cyan)}.demo-btn{color:var(--gold)!important}.demo-btn:hover{color:#fff!important}
.empty-state{text-align:center;padding:60px 20px;color:var(--dimmer);display:flex;flex-direction:column;align-items:center;gap:8px}
.challenge-tabs{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-bottom:24px}
.challenge-tab{display:flex;align-items:center;gap:6px;padding:8px 14px;border-radius:8px;font-family:var(--font-mono);font-size:.7rem;border:1px solid var(--border);background:var(--panel);color:var(--dim);cursor:pointer;transition:all .2s}
.challenge-tab:hover{border-color:var(--magenta)}.challenge-tab.active{border-color:var(--magenta);color:var(--magenta);background:rgba(255,63,156,0.06)}
.diff-dot{width:8px;height:8px;border-radius:50%;display:inline-block}.diff-dot.easy{background:#4ade80}.diff-dot.medium{background:#fbbf24}.diff-dot.hard{background:#ff6b6b}
.playground{background:var(--panel);border:1px solid var(--border);border-radius:16px;overflow:hidden}
.playground-header{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;padding:16px 20px;border-bottom:1px solid var(--border)}
.playground-info{display:flex;align-items:center;gap:10px}
.playground-title{font-family:var(--font-display);font-size:.65rem}
.difficulty-badge{font-family:var(--font-mono);font-size:.6rem;padding:3px 8px;border-radius:6px;text-transform:uppercase}.difficulty-badge.easy{background:rgba(74,222,128,0.15);color:#4ade80}.difficulty-badge.medium{background:rgba(251,191,36,0.15);color:#fbbf24}.difficulty-badge.hard{background:rgba(255,107,107,0.15);color:#ff6b6b}
.playground-actions{display:flex;gap:8px}
.playground-desc{padding:12px 20px;color:var(--dim);font-size:.85rem;border-bottom:1px solid var(--border)}
.playground-editor{display:grid;grid-template-columns:1fr 1fr;height:400px}@media(max-width:768px){.playground-editor{grid-template-columns:1fr;height:auto}}
.editor-pane{position:relative;border-right:1px solid var(--border);overflow-y:auto}@media(max-width:768px){.editor-pane{border-right:none;border-bottom:1px solid var(--border)}}
.editor-label{padding:8px 14px;font-family:var(--font-mono);font-size:.65rem;color:var(--dimmer);background:var(--void);border-bottom:1px solid var(--border);display:flex;align-items:center;gap:4px;position:sticky;top:0;z-index:1}
.code-editor{width:100%;min-height:200px;background:var(--void);color:var(--text);font-family:var(--font-mono);font-size:.82rem;padding:14px;border:none;resize:none;outline:none;tab-size:2;line-height:1.5;display:block}
.code-editor:focus{box-shadow:inset 0 0 0 1px var(--cyan)}
.preview-pane{background:#fff;position:relative}.preview-pane .editor-label{background:var(--panel);color:var(--dim)}
.playground-preview{width:100%;height:calc(100% - 34px);border:none;background:#fff;display:block}
.solution-panel{border-top:1px solid var(--border);max-height:200px;overflow-y:auto;background:var(--void)}
.solution-label{padding:8px 14px;font-family:var(--font-mono);font-size:.65rem;color:var(--gold);background:rgba(255,209,102,0.06);border-bottom:1px solid var(--border);display:flex;align-items:center;gap:4px;position:sticky;top:0;z-index:1}
.solution-code{padding:12px 14px;font-family:var(--font-mono);font-size:.75rem;color:var(--dim);white-space:pre-wrap;line-height:1.6}
.modal-overlay{position:fixed;inset:0;z-index:100;background:rgba(7,9,17,0.85);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:20px;animation:fadeIn .2s ease}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
.modal-content{background:var(--panel);border:1px solid var(--border);border-radius:16px;width:100%;max-width:900px;max-height:90vh;display:flex;flex-direction:column;overflow:hidden;animation:slideUp .3s ease}
@keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
.modal-header{display:flex;justify-content:space-between;align-items:center;padding:16px 20px;border-bottom:1px solid var(--border)}
.modal-title{font-family:var(--font-display);font-size:.7rem;display:flex;align-items:center;gap:8px}
.modal-close{background:none;border:none;color:var(--dim);cursor:pointer;padding:4px 8px;border-radius:6px;transition:all .2s;display:flex;align-items:center}
.modal-close:hover{color:var(--text);background:var(--panel-2)}
.modal-body{flex:1;min-height:400px;display:flex;align-items:center;justify-content:center}
.preview-iframe{width:100%;height:500px;border:none;background:#fff;border-radius:0 0 0 16px}
.modal-footer{padding:12px 20px;border-top:1px solid var(--border);display:flex;justify-content:flex-end}
.modal-loading,.modal-error{padding:40px;text-align:center;color:var(--dim)}
.modal-loading{display:flex;flex-direction:column;align-items:center;gap:12px}
.modal-error{display:flex;flex-direction:column;align-items:center;gap:8px}
.loader-spin{width:30px;height:30px;border:3px solid var(--border);border-top-color:var(--cyan);border-radius:50%;animation:spin .6s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.featured-section{padding-top:40px}
.featured-card{position:relative;overflow:hidden;background:linear-gradient(160deg,#14102a 0%,var(--panel) 100%);border:1px solid rgba(255,209,102,0.25);border-radius:20px;padding:48px 36px;text-align:center;display:flex;flex-direction:column;align-items:center}
.featured-glow{position:absolute;inset:0;background:radial-gradient(800px circle at 50% 50%,rgba(255,209,102,0.06),transparent);pointer-events:none}
.featured-badge{font-family:var(--font-display);font-size:.6rem;color:var(--gold);letter-spacing:.12em;border:1px solid rgba(255,209,102,0.3);background:rgba(255,209,102,0.06);padding:6px 18px;border-radius:100px;margin-bottom:16px;position:relative;z-index:1;display:inline-flex;align-items:center;gap:8px}
.featured-title{font-family:var(--font-display);font-size:clamp(1rem,2vw,1.3rem);margin-bottom:12px;position:relative;z-index:1}
.featured-desc{color:var(--dim);max-width:560px;font-size:.9rem;margin-bottom:20px;position:relative;z-index:1}
.featured-tags{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;position:relative;z-index:1}
.featured-tag{background:rgba(255,209,102,0.08);color:var(--gold);border-color:rgba(255,209,102,0.2)}
.featured-stats{display:flex;gap:24px;margin-top:20px;flex-wrap:wrap;justify-content:center;position:relative;z-index:1}
.featured-stat{text-align:center}.featured-stat-value{font-family:var(--font-display);font-size:.7rem;color:var(--gold);display:block}.featured-stat-label{font-family:var(--font-mono);font-size:.6rem;color:var(--dimmer);text-transform:uppercase;letter-spacing:.08em}
.skills-grid{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
.skill-badge{display:flex;align-items:center;gap:8px;padding:10px 18px;border-radius:10px;background:var(--panel);border:1px solid var(--border);transition:all .2s}
.skill-badge:hover{border-color:var(--badge-color,var(--cyan));transform:translateY(-2px);box-shadow:0 4px 16px color-mix(in srgb,var(--badge-color,var(--cyan)) 20%,transparent)}
.skill-name{font-family:var(--font-mono);font-size:.8rem;font-weight:500}
footer{position:relative;z-index:3;padding:40px 24px;border-top:1px solid var(--border);margin-top:40px}
.footer-inner{max-width:1100px;margin:0 auto;text-align:center}
.pixel-footer-art{display:flex;justify-content:center;gap:6px;margin-bottom:16px;opacity:0.5}
.footer-credits{font-family:var(--font-mono);font-size:.72rem;color:var(--dimmer)}.footer-credits strong{color:var(--text)}
.footer-sub{font-family:var(--font-mono);font-size:.6rem;color:var(--dimmer);margin-top:8px;opacity:.6}
:focus-visible{outline:2px solid var(--gold);outline-offset:3px}
`;
