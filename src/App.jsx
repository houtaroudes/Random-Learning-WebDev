import React, { useEffect, useState, useRef } from "react";

/* =============================================================
   PIXEL ICON SYSTEM — hand-crafted pixel art SVGs
   ============================================================= */
const PIXEL_ART = {
  star     :{c:"#ffd166",w:12,h:12,p:[2,0,3,0,1,1,2,1,3,1,4,1,0,2,1,2,2,2,3,2,4,2,5,2,0,3,1,3,2,3,3,3,4,3,5,3,1,4,2,4,3,4,4,4,2,5,3,5]},
  palette  :{c:"#3fe6ff",w:12,h:10,p:[1,0,2,0,3,0,4,0,5,0,6,0,0,1,2,1,4,1,5,1,7,1,0,2,7,2,0,3,7,3,1,4,2,4,3,4,4,4,5,4,6,4,3,5,4,5,3,6,4,6,2,7,3,7,4,7,5,7]},
  sparkle  :{c:"#ff3f9c",w:14,h:14,p:[5,2,7,2,4,3,5,3,6,3,7,3,8,3,2,4,3,4,4,4,5,4,6,4,7,4,8,4,9,4,10,4,1,5,2,5,3,5,4,5,5,5,6,5,7,5,8,5,9,5,10,5,11,5,0,6,1,6,2,6,3,6,4,6,5,6,6,6,7,6,8,6,9,6,10,6,11,6,12,6,1,7,2,7,3,7,4,7,5,7,6,7,7,7,8,7,9,7,10,7,11,7,2,8,3,8,4,8,5,8,6,8,7,8,8,8,9,8,10,8,4,9,5,9,6,9,7,9,8,9,5,10,7,10]},
  bolt     :{c:"#a29bfe",w:10,h:12,p:[3,0,4,0,3,1,4,1,2,2,3,2,4,2,5,2,1,3,2,3,3,3,4,3,5,3,0,4,1,4,2,4,3,4,4,4,1,5,2,5,3,5,4,5,5,5,1,6,2,6,3,6,4,6,2,7,3,7,4,7,2,8,3,8]},
  sword    :{c:"#ff6b6b",w:10,h:12,p:[4,0,3,1,4,1,5,1,3,2,4,2,5,2,3,3,4,3,5,3,4,4,2,5,4,5,6,5,1,6,3,6,5,6,7,6,0,7,2,7,4,7,6,7,8,7]},
  trophy   :{c:"#ffd166",w:12,h:12,p:[1,0,2,0,3,0,4,0,5,0,6,0,7,0,8,0,9,0,0,1,10,1,0,2,3,2,4,2,5,2,6,2,10,2,0,3,10,3,0,4,10,4,1,5,2,5,3,5,4,5,5,5,6,5,7,5,8,5,9,5,3,6,4,6,5,6,6,6,7,6,4,7,5,7,6,7,4,8,5,8,6,8]},
  check    :{c:"#4ade80",w:12,h:10,p:[7,0,6,1,7,1,5,2,7,2,4,3,7,3,3,4,7,4,2,5,6,5,7,5,1,6,5,6,0,7,4,7,0,8,1,8,2,8]},
  wrench   :{c:"#ff9a56",w:12,h:12,p:[5,0,6,0,4,1,5,1,6,1,7,1,4,2,5,2,6,2,7,2,5,3,6,3,5,4,6,4,4,5,5,5,6,5,7,5,3,6,4,6,5,6,6,6,7,6,8,6,2,7,3,7,4,7,5,7,6,7,7,7,8,7,9,7,1,8,2,8,3,8,4,8,5,8,6,8,7,8,8,8,0,9,1,9,2,9,3,9,4,9,5,9,6,9,0,10,1,10,2,10]},
  file     :{c:"#8489bd",w:10,h:12,p:[1,0,2,0,3,0,4,0,5,0,6,0,0,1,7,1,0,2,7,2,0,3,7,3,0,4,7,4,0,5,3,5,7,5,0,6,3,6,7,6,0,7,3,7,7,7,0,8,7,8,0,9,7,9,0,10,7,10,1,11,2,11,3,11,4,11,5,11,6,11]},
  eye      :{c:"#3fe6ff",w:14,h:10,p:[0,3,1,3,2,3,3,3,4,3,5,3,6,3,7,3,8,3,9,3,10,3,11,3,12,3,13,3,1,4,2,4,3,4,4,4,5,4,6,4,7,4,8,4,9,4,10,4,11,4,12,4,2,5,3,5,4,5,5,5,6,5,7,5,8,5,9,5,10,5,11,5,1,6,2,6,3,6,4,6,5,6,6,6,7,6,8,6,9,6,10,6,11,6,12,6,0,7,1,7,2,7,3,7,4,7,5,7,6,7,7,7,8,7,9,7,10,7,11,7,12,7,13,7]},
  pencil   :{c:"#ffd166",w:8,h:12,p:[3,0,2,1,3,1,4,1,2,2,3,2,4,2,1,3,2,3,3,3,4,3,5,3,1,4,2,4,3,4,4,4,5,4,0,5,1,5,2,5,3,5,4,5,5,5,6,5,0,6,1,6,2,6,3,6,4,6,5,6,6,6,0,7,1,7,2,7,3,7,4,7,5,7,6,7,0,8,1,8,2,8,6,8,1,9,5,9,1,10,5,10,2,11,3,11,4,11]},
  bulb     :{c:"#ffd166",w:10,h:14,p:[1,0,2,0,3,0,4,0,5,0,6,0,7,0,0,1,1,1,2,1,3,1,4,1,5,1,6,1,7,1,8,1,0,2,1,2,2,2,3,2,4,2,5,2,6,2,7,2,8,2,0,3,1,3,2,3,3,3,4,3,5,3,6,3,7,3,8,3,1,4,2,4,3,4,4,4,5,4,6,4,7,4,2,5,3,5,4,5,5,5,6,5,2,6,3,6,4,6,5,6,6,6,2,7,3,7,4,7,5,7,6,7,3,8,4,8,5,8,3,9,4,9,5,9,4,10,4,11]},
  reset    :{c:"#3fe6ff",w:12,h:12,p:[6,0,7,0,5,1,6,1,7,1,8,1,4,2,5,2,8,2,9,2,3,3,4,3,9,3,10,3,3,4,10,4,3,5,9,5,4,6,8,6,4,7,5,7,6,7,7,7,8,7,5,8,6,8,7,8,7,9,6,10,5,11]},
  seedling :{c:"#4ade80",w:10,h:12,p:[3,0,4,0,5,0,2,1,3,1,4,1,5,1,6,1,1,2,2,2,4,2,5,2,6,2,7,2,2,3,3,3,4,3,5,3,6,3,3,4,4,4,5,4,4,5,4,6,3,7,4,7,5,7,3,8,4,8,5,8,3,9,4,9,5,9,2,10,3,10,4,10,5,10,6,10]},
  search   :{c:"#8489bd",w:12,h:12,p:[2,0,3,0,4,0,5,0,1,1,2,1,3,1,4,1,5,1,6,1,0,2,1,2,2,2,3,2,4,2,5,2,6,2,7,2,0,3,1,3,2,3,3,3,4,3,5,3,6,3,7,3,0,4,1,4,2,4,3,4,4,4,5,4,6,4,7,4,1,5,2,5,3,5,4,5,5,5,6,5,2,6,3,6,4,6,5,6,3,7,4,7,5,8,6,8,5,9,6,9,7,10,8,10,7,11,8,11]},
  close    :{c:"#8489bd",w:10,h:10,p:[1,0,7,0,0,1,2,1,6,1,8,1,0,2,3,2,5,2,8,2,0,3,4,3,2,4,2,5,1,6,4,6,0,7,3,7,5,7,8,7,0,8,2,8,6,8,8,8,1,9,7,9]},
  play     :{c:"#3fe6ff",w:10,h:12,p:[3,0,2,1,3,1,1,2,2,2,3,2,0,3,1,3,2,3,3,3,0,4,1,4,2,4,3,4,0,5,1,5,2,5,3,5,0,6,1,6,2,6,3,6,1,7,2,7,3,7,2,8,3,8,3,9]},
  link     :{c:"#3fe6ff",w:12,h:10,p:[4,0,5,0,6,0,7,0,3,1,4,1,5,1,6,1,7,1,8,1,2,2,3,2,4,2,5,2,6,2,7,2,8,2,9,2,1,3,2,3,3,3,4,3,5,3,6,3,7,3,8,3,9,3,10,3,0,4,1,4,10,4,0,5,1,5,10,5,1,6,2,6,9,6,2,7,3,7,8,7,3,8,4,8,5,8,6,8,7,8,2,9,3,9,4,9,5,9,6,9,7,9,8,9]},
  diamond  :{c:"#3fe6ff",w:10,h:10,p:[4,0,5,0,3,1,4,1,5,1,6,1,2,2,3,2,4,2,5,2,6,2,7,2,1,3,2,3,3,3,4,3,5,3,6,3,7,3,8,3,0,4,1,4,2,4,3,4,4,4,5,4,6,4,7,4,8,4,9,4,0,5,1,5,2,5,3,5,4,5,5,5,6,5,7,5,8,5,9,5,1,6,2,6,3,6,4,6,5,6,6,6,7,6,8,6,2,7,3,7,4,7,5,7,6,7,7,7,3,8,4,8,5,8,6,8,4,9,5,9]},
  flag     :{c:"#ff3f9c",w:10,h:12,p:[1,0,1,1,2,1,3,1,1,2,2,2,3,2,4,2,1,3,2,3,4,3,1,4,2,4,3,4,1,5,2,5,3,5,4,5,5,5,1,6,2,6,3,6,4,6,5,6,6,6,1,7,1,8,1,9,1,10,1,11]},
  note     :{c:"#ffd166",w:10,h:12,p:[2,0,3,0,4,0,1,1,2,1,3,1,4,1,5,1,0,2,1,2,2,2,3,2,4,2,5,2,6,2,0,3,1,3,2,3,3,3,5,3,0,4,1,4,2,4,3,4,5,4,0,5,1,5,2,5,3,5,4,5,1,6,2,6,3,6,4,6,2,7,3,7,2,8,3,8,2,9,3,9]},
  mountain :{c:"#4ade80",w:16,h:12,p:[0,9,1,8,9,10,10,9,2,7,3,6,8,8,9,7,10,8,4,5,5,4,6,5,7,6,8,7,3,5,7,5,2,6,8,6,0,10,1,9,2,8,3,7,4,6,5,5,6,6,7,7,8,8,9,9,10,10,11,9,12,8,13,7,14,6,15,5,11,8,12,7,13,6,14,5,15,4,11,9,12,8,13,7,14,6,15,5,14,4,15,3]},
  cloud    :{c:"#8489bd",w:16,h:10,p:[2,3,3,3,4,3,5,3,6,3,1,4,2,4,3,4,4,4,5,4,6,4,7,4,0,5,1,5,2,5,3,5,4,5,5,5,6,5,7,5,8,5,1,6,2,6,3,6,4,6,5,6,6,6,7,6,2,7,3,7,4,7,5,7,6,7,10,4,11,4,12,4,13,4,9,5,10,5,11,5,12,5,13,5,14,5,10,6,11,6,12,6,13,6,11,7,12,7]},
};

const PS = 2;
function PxIcon({name,size=18,color}) {
  const art=PIXEL_ART[name]; if(!art) return null;
  const vw=art.w*PS,vh=art.h*PS,c=color||art.c;
  const rects=[];
  for(let i=0;i<art.p.length;i+=2) rects.push(<rect key={i/2} x={art.p[i]*PS} y={art.p[i+1]*PS} width={PS} height={PS} fill={c} shapeRendering="crispEdges" />);
  return <svg width={size} height={size} viewBox={`0 0 ${vw} ${vh}`} style={{display:'inline-block',verticalAlign:'middle',flexShrink:0}} aria-hidden="true">{rects}</svg>;
}

/* =============================================================
   PIXEL BACKGROUND
   ============================================================= */
function PixelBackground() {
  const ref=useRef(null);
  useEffect(()=>{
    const canvas=ref.current; if(!canvas) return;
    const ctx=canvas.getContext('2d'); let anim,w,h,stars=[],clouds=[],offset=0;
    function resize(){w=canvas.width=window.innerWidth; h=canvas.height=window.innerHeight;}
    resize();
    function init(){
      stars=[]; for(let i=0;i<80;i++) stars.push({x:Math.random()*w,y:Math.random()*h*0.4,s:Math.random()*2+1,a:Math.random()*0.7+0.3,sp:Math.random()*0.3+0.05,phase:Math.random()*Math.PI*2});
      clouds=[]; for(let i=0;i<4;i++) clouds.push({x:Math.random()*w,y:40+Math.random()*(h*0.25),w2:60+Math.random()*120,h2:14+Math.random()*8,sp:0.15+Math.random()*0.3});
    }
    init();
    function drawMountain(ox,oy,mw,mh,color){ctx.fillStyle=color;ctx.beginPath();ctx.moveTo(ox,oy+mh);ctx.lineTo(ox+mw/2,oy);ctx.lineTo(ox+mw,oy+mh);ctx.closePath();ctx.fill();}
    function animate(time){
      ctx.clearRect(0,0,w,h);
      for(const s of stars){const tw=0.5+0.5*Math.sin(time*0.002+s.phase);ctx.globalAlpha=s.a*tw;ctx.fillStyle='#eef0ff';ctx.fillRect(Math.floor(s.x),Math.floor(s.y),s.s,s.s);s.y+=s.sp*0.1;if(s.y>h*0.4){s.y=0;s.x=Math.random()*w;}}
      ctx.globalAlpha=1;
      const mc=['#0f1535','#151b45','#1c2355']; for(let i=0;i<3;i++){const mw=w*0.8,mh=50+i*20,mx=(w-mw)/2+Math.sin(offset*0.005+i)*20;drawMountain(mx,h-80-i*15,mw,mh,mc[i]);drawMountain(mx-mw*0.3,h-80-i*15,mw*0.5,mh*0.6,mc[i]);drawMountain(mx+mw*0.5,h-80-i*15,mw*0.6,mh*0.7,mc[i]);}
      for(const c of clouds){ctx.fillStyle='rgba(132,137,189,0.12)';const cx=Math.floor(c.x),cy=Math.floor(c.y),cw=Math.floor(c.w2),ch=Math.floor(c.h2);ctx.fillRect(cx-cw/2,cy-ch/2,cw,ch);ctx.fillRect(cx-cw/2+10,cy-ch/2-4,cw-20,ch-2);ctx.fillRect(cx-cw/2+20,cy-ch/2-8,cw-40,ch-4);c.x+=c.sp;if(c.x>w+c.w2)c.x=-c.w2;}
      ctx.fillStyle='#070911';ctx.fillRect(0,h-16,w,16);ctx.fillStyle='rgba(63,230,255,0.03)';ctx.fillRect(0,h-16,w,1);
      offset++; anim=requestAnimationFrame(animate);
    }
    anim=requestAnimationFrame(animate);
    const onResize=()=>{resize();init();};
    window.addEventListener('resize',onResize);
    return ()=>{cancelAnimationFrame(anim);window.removeEventListener('resize',onResize);};
  },[]);
  return <canvas ref={ref} style={{position:'fixed',inset:0,zIndex:0,pointerEvents:'none',opacity:0.3}} aria-hidden="true" />;
}

/* =============================================================
   PIXEL RAIN
   ============================================================= */
function PixelRain() {
  const ref=useRef(null);
  useEffect(()=>{
    const c=ref.current; if(!c) return;
    const ctx=c.getContext("2d"); let a,p=[];
    function rs(){c.width=window.innerWidth;c.height=window.innerHeight;}
    rs();
    function init(){
      p=[]; const ct=Math.floor((c.width*c.height)/8000); const cl=["#3fe6ff","#ff3f9c","#ffd166","#a29bfe","#fff","#ff6b6b"];
      for(let j=0;j<ct;j++)p.push({x:Math.random()*c.width,y:Math.random()*c.height,s:Math.random()*2+0.5,sy:Math.random()*0.6+0.05,sx:(Math.random()-0.5)*0.3,cl:cl[Math.floor(Math.random()*cl.length)],op:Math.random()*0.4+0.1});
    }
    init();
    function anim(t){
      ctx.clearRect(0,0,c.width,c.height);
      for(const q of p){q.y+=q.sy;q.x+=q.sx;if(q.y>c.height){q.y=-q.s;q.x=Math.random()*c.width;}ctx.globalAlpha=q.op;ctx.fillStyle=q.cl;ctx.fillRect(q.x,q.y,q.s,q.s);}
      ctx.globalAlpha=1;a=requestAnimationFrame(anim);
    }
    a=requestAnimationFrame(anim);
    const w=()=>{rs();init();}; window.addEventListener("resize",w);
    return()=>{cancelAnimationFrame(a);window.removeEventListener("resize",w);};
  },[]);
  return <canvas ref={ref} style={{position:"fixed",inset:0,zIndex:1,pointerEvents:"none",opacity:0.2}} aria-hidden="true" />;
}

/* =============================================================
   DATA
   ============================================================= */
const categories = [
  {id:"all",label:"All Quests",icon:"star",color:"var(--gold)"},
  {id:"ui",label:"UI Components",icon:"palette",color:"var(--cyan)"},
  {id:"visuals",label:"Visual Effects",icon:"sparkle",color:"var(--magenta)"},
  {id:"logic",label:"Logic & Data",icon:"bolt",color:"#a29bfe"},
  {id:"challenges",label:"Code Challenges",icon:"sword",color:"#ff6b6b"},
  {id:"featured",label:"Featured",icon:"trophy",color:"var(--gold)"},
];

const exercises = [
  {id:1,category:"ui",title:"Dropdown Menu",desc:"Toggleable dropdown navigation with smooth open/close animation.",tags:["HTML","CSS"],repo:"Dropdown Menu.html",type:"UI"},
  {id:2,category:"ui",title:"AutoSuggest",desc:"Input field with autocomplete suggestions that filter as you type.",tags:["HTML","CSS"],repo:"AutoSuggest.html",type:"UI"},
  {id:3,category:"ui",title:"Floating Labels",desc:"Animated form labels that float above input fields on focus.",tags:["HTML","CSS"],repo:"Floating Input Ani.html",type:"UI"},
  {id:4,category:"ui",title:"OTP Input UI",desc:"One-time-password style input boxes with auto-advance.",tags:["HTML","CSS","JS"],repo:"OTP-UI.html",type:"UI"},
  {id:5,category:"ui",title:"Upload System",desc:"File upload interface with progress feedback and preview.",tags:["HTML","CSS","JS"],repo:"Upload System.html",type:"UI"},
  {id:6,category:"ui",title:"Password Generator",desc:"Randomized password generator with configurable options.",tags:["HTML","CSS"],repo:"Password Generator.html",type:"UI"},
  {id:7,category:"ui",title:"Smooth NavBar",desc:"Navigation bar with smooth hover and scroll animations.",tags:["HTML","CSS"],repo:"Smooth Ani NavBar.html",type:"UI"},
  {id:8,category:"ui",title:"Nav (TSX)",desc:"Navigation component written in TypeScript/React.",tags:["React","TSX"],repo:"Nav.tsx",type:"UI"},
  {id:9,category:"ui",title:"Input Text Field",desc:"Styled text input with animated underline effect.",tags:["HTML","CSS"],repo:"input text field.html",type:"UI"},
  {id:10,category:"visuals",title:"Animated Background",desc:"CSS-animated gradient background with shifting colors.",tags:["HTML","CSS"],repo:"Animated BG.html",type:"Visual"},
  {id:11,category:"visuals",title:"Animated Progress Bar",desc:"Progress bar with smooth fill animation and percentage display.",tags:["HTML","CSS"],repo:"Animated Progress bar.html",type:"Visual"},
  {id:12,category:"visuals",title:"Gradient Background",desc:"Exploring CSS linear and radial gradient combinations.",tags:["HTML","CSS"],repo:"Gradrient Background.html",type:"Visual"},
  {id:13,category:"visuals",title:"GlassMorphism",desc:"Frosted-glass UI style with backdrop blur and transparency.",tags:["HTML","CSS","JS"],repo:"GlassMorphism.html",type:"Visual"},
  {id:14,category:"visuals",title:"Glow Card",desc:"Card with dynamic glow/hover lighting effects.",tags:["HTML","CSS"],repo:"GlowCard.html",type:"Visual"},
  {id:15,category:"visuals",title:"Hover Cards",desc:"Interactive card hover effects with scale and shadow transitions.",tags:["HTML","CSS"],repo:"Hover Cards.html",type:"Visual"},
  {id:16,category:"visuals",title:"Rainbow Text",desc:"Animated rainbow color cycling effect on text.",tags:["HTML","CSS"],repo:"RainbowTxt.html",type:"Visual"},
  {id:17,category:"visuals",title:"Dynamic Text",desc:"Text that animates character by character on load.",tags:["HTML","CSS"],repo:"DynamicText.html",type:"Visual"},
  {id:18,category:"visuals",title:"GSAP Cursor Trail",desc:"Cursor trail effect using the GSAP animation library.",tags:["HTML","CSS","JS"],repo:"GSAP cursor trail.html",type:"Visual"},
  {id:19,category:"visuals",title:"Overlapping Scroll",desc:"Scroll-based overlapping and parallax layout effects.",tags:["HTML","CSS"],repo:"OverlappingScroll copy.html",type:"Visual"},
  {id:20,category:"visuals",title:"Box Model Practice",desc:"CSS box model exercises with margin, border, and padding.",tags:["HTML","CSS"],repo:"Box.html",type:"Visual"},
  {id:21,category:"visuals",title:"Hover Effects",desc:"Collection of various CSS hover effect experiments.",tags:["HTML","CSS"],repo:"Hover.html",type:"Visual"},
  {id:22,category:"visuals",title:"Color Playground",desc:"Color manipulation and generation experiments.",tags:["HTML","CSS","JS"],repo:"Color.html",type:"Visual"},
  {id:23,category:"logic",title:"Dark Mode + Storage",desc:"Theme toggling with localStorage persistence across sessions.",tags:["HTML","CSS","JS"],repo:"DarkMode and Local Storage.html",type:"Logic"},
  {id:24,category:"logic",title:"QR Code Generator",desc:"Generate QR codes from text input using a JS library.",tags:["HTML","JS"],repo:"QR Code.html",type:"Logic"},
  {id:25,category:"logic",title:"Realtime UI",desc:"UI that updates in real-time with dynamic data.",tags:["HTML","CSS","JS"],repo:"Realtime.html",type:"Logic"},
  {id:26,category:"featured",title:"Cafe POS System",desc:"A full Point-of-Sale prototype for a cafe themed menu, live cart, VAT calculation, receipt generation, and a demo login screen. My thesis project!",tags:["HTML","CSS","JS","POS"],repo:"houtarou_pos.html",type:"Featured",featured:true},
];

const challenges = [
  {id:"c1",title:"Make a Red Button",desc:"Create a red button with white text that changes to blue when hovered.",difficulty:"Easy",starter:`<!-- Red button with white text -->\n<button id="myBtn">Click Me</button>\n\n<style>/* Your CSS here */</style>`,solution:`#myBtn{background:#ff4444;color:white;border:none;padding:12px 24px;border-radius:8px;cursor:pointer;font-size:16px;transition:all .3s;}#myBtn:hover{background:#4488ff;transform:scale(1.05);}`},
  {id:"c2",title:"Gradient Card",desc:"Build a card with a gradient background, rounded corners, and a subtle shadow.",difficulty:"Easy",starter:`<div class="card"><h2>Hello!</h2><p>This is a gradient card.</p></div>\n\n<style>/* Your CSS here */</style>`,solution:`.card{background:linear-gradient(135deg,#6c5ce7,#a29bfe);border-radius:16px;padding:32px;color:white;box-shadow:0 8px 32px rgba(108,92,231,.3);max-width:300px;font-family:sans-serif;}`},
  {id:"c3",title:"Animated Loader",desc:"Create a spinning animation using only CSS (no JS).",difficulty:"Medium",starter:`<div class="loader"></div>\n\n<style>/* Use @keyframes! */</style>`,solution:`.loader{width:50px;height:50px;border:4px solid rgba(63,230,255,.1);border-top:4px solid #3fe6ff;border-radius:50%;animation:spin .8s linear infinite;}@keyframes spin{to{transform:rotate(360deg);}}`},
  {id:"c4",title:"Flexbox Layout",desc:"Use flexbox to create a horizontal row of 3 colored boxes that wrap on small screens.",difficulty:"Medium",starter:`<div class="container"><div class="box">1</div><div class="box">2</div><div class="box">3</div></div>\n\n<style>/* Your CSS here */</style>`,solution:`.container{display:flex;gap:16px;flex-wrap:wrap;}.box{background:#3fe6ff;color:#070911;padding:32px 48px;border-radius:12px;font-size:24px;font-weight:bold;font-family:sans-serif;flex:1;min-width:100px;text-align:center;}.box:nth-child(2){background:#ff3f9c;}.box:nth-child(3){background:#ffd166;}`},
  {id:"c5",title:"Typewriter Effect",desc:"Make text appear one character at a time like a typewriter.",difficulty:"Hard",starter:`<p id="text">Hello, World!</p>\n\n<style>/* Add cursor effect */</style>\n<script>// Your JavaScript</script>`,solution:`#text{font-family:monospace;font-size:24px;border-right:2px solid #3fe6ff;white-space:nowrap;overflow:hidden;width:0;animation:type 2s steps(13) forwards,blink .8s steps(1) infinite;}@keyframes type{to{width:13ch;}}@keyframes blink{50%{border-color:transparent;}}`},
];

const skills = [
  {name:"HTML5",icon:"diamond",color:"#e34f26"},{name:"CSS3",icon:"diamond",color:"#1572b6"},
  {name:"JavaScript",icon:"diamond",color:"#f7df1e"},{name:"React",icon:"diamond",color:"#61dafb"},
  {name:"TypeScript",icon:"diamond",color:"#3178c6"},{name:"GSAP",icon:"diamond",color:"#88ce02"},
  {name:"LocalStorage",icon:"diamond",color:"#ff9a56"},{name:"PHP",icon:"diamond",color:"#777bb3"},
];

const totalExercises = 26;

/* =============================================================
   HOOKS
   ============================================================= */
function useReveal(t=0.1){const r=useRef(null);const[v,s]=useState(false);useEffect(()=>{const e=r.current;if(!e)return;const o=new IntersectionObserver(([n])=>{if(n.isIntersecting){s(true);o.unobserve(e);}},{threshold:t});o.observe(e);return()=>o.disconnect();},[t]);return[r,v];}

/* RevealSection — supports variant prop: "up" | "left" | "right" | "scale" | "fade" */
function RevealSection({children,className="",variant="up",...p}){const[r,v]=useReveal(0.08);return <section ref={r} className={`reveal-section reveal-${variant} ${v?"revealed":""} ${className}`} {...p}>{children}</section>;}

/* useActiveSection — tracks which section id is in viewport for nav highlighting */
function useActiveSection(ids){
  const[active,setActive]=useState(ids[0]||"");
  useEffect(()=>{
    const obs=new IntersectionObserver((entries)=>{
      for(const e of entries){
        if(e.isIntersecting){setActive(e.target.id);break;}
      }
    },{rootMargin:"-40% 0px -55% 0px",threshold:0});
    ids.forEach(id=>{const el=document.getElementById(id);if(el)obs.observe(el);});
    return()=>obs.disconnect();
  },[ids]);
  return active;
}

function useTypewriter(t,s=35,d=600){const[o,set]=useState("");const[f,setF]=useState(false);useEffect(()=>{const x=setTimeout(()=>setF(true),d);return()=>clearTimeout(x);},[d]);useEffect(()=>{if(!f)return;let i=0;const iv=setInterval(()=>{i++;set(t.slice(0,i));if(i>=t.length)clearInterval(iv);},s);return()=>clearInterval(iv);},[f,t,s]);return o;}

/* =============================================================
   RANDOM CHALLENGE GENERATOR
   ============================================================= */
function useRandomChallenges(count=3) {
  const[randomChallenges,setRandomChallenges]=useState([]);
  const[loading,setLoading]=useState(true);
  useEffect(()=>{
    async function fetchRandom(){try{
      const htmlEx=exercises.filter(e=>e.repo.endsWith('.html')&&!e.featured);
      const shuffled=[...htmlEx].sort(()=>Math.random()-0.5).slice(0,count);
      const results=[];
      for(const ex of shuffled){try{
        const resp=await fetch(`/demos/${encodeURIComponent(ex.repo)}`);
        if(!resp.ok)continue;
        const code=await resp.text();
        results.push({id:`rand_${ex.id}`,title:ex.title,desc:`Recreate this ${ex.type.toLowerCase()} component from your exercise library!`,difficulty:['Easy','Easy','Medium','Medium','Hard'][Math.floor(Math.random()*5)],starter:code,solution:code});
      }catch{}}
      setRandomChallenges(results);
    }catch{}finally{setLoading(false);}}
    fetchRandom();
  },[count]);
  return {randomChallenges,loading};
}

/* =============================================================
   ANIMATED COUNTER
   ============================================================= */
function AnimatedCounter({value,duration=1500}) {
  const[count,setCount]=useState(0);
  const ref=useRef(null);
  useEffect(()=>{
    const el=ref.current; if(!el) return;
    let iv=null;
    const obs=new IntersectionObserver(([entry])=>{
      if(entry.isIntersecting){
        const num=parseInt(String(value).replace(/,/g,''));
        const step=Math.max(1,Math.ceil(num/(duration/16)));
        let cur=0;
        iv=setInterval(()=>{cur+=step;if(cur>=num){setCount(num);clearInterval(iv);}else setCount(cur);},16);
        obs.unobserve(el);
      }
    },{threshold:0.5});
    obs.observe(el);
    return()=>{obs.disconnect(); if(iv) clearInterval(iv);};
  },[value,duration]);
  return <span ref={ref}>{count.toLocaleString()}</span>;
}

/* =============================================================
   LIVE PREVIEW MODAL
   ============================================================= */
function LivePreview({exercise,onClose}) {
  const[html,setHtml]=useState("");
  const[loading,setLoading]=useState(true);
  const[error,setError]=useState(null);
  useEffect(()=>{
    if(!exercise) return;
    setLoading(true); setError(null);
    fetch(`/demos/${encodeURIComponent(exercise.repo)}`).then(r=>{if(!r.ok)throw Error();return r.text();}).then(setHtml).catch(()=>setError("Couldn't load preview.")).finally(()=>setLoading(false));
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
          {loading&&<div className="modal-loading"><div className="loader-spin" /><span>Loading preview...</span></div>}
          {error&&<div className="modal-error"><PxIcon name="search" size={16} /> {error}</div>}
          {!loading&&!error&&html&&<iframe className="preview-iframe" srcDoc={html} title={exercise.title} sandbox="allow-scripts allow-same-origin" />}
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
  const[code,setCode]=useState(challenge?.starter||"");
  const[showSolution,setShowSolution]=useState(false);
  const iframeRef=useRef(null);
  useEffect(()=>{setCode(challenge?.starter||"");setShowSolution(false);},[challenge]);
  useEffect(()=>{const doc=iframeRef.current?.contentDocument;if(doc){doc.open();doc.write(code);doc.close();}},[code]);
  if(!challenge) return <div className="playground" style={{padding:40,textAlign:'center',color:'var(--dim)'}}>No challenge selected.</div>;
  return (
    <div className="playground">
      <div className="playground-header">
        <div className="playground-info">
          <span className="playground-title">{challenge.title}</span>
          <span className={`difficulty-badge ${challenge.difficulty.toLowerCase()}`}>{challenge.difficulty}</span>
        </div>
        <div className="playground-actions">
          <button className="btn sm" onClick={()=>setShowSolution(!showSolution)}>
            {showSolution?<><PxIcon name="eye" size={14} /> Hide</>:<><PxIcon name="bulb" size={14} /> Show</>} Solution
          </button>
          <button className="btn sm primary" onClick={()=>setCode(challenge.starter)}><PxIcon name="reset" size={14} /> Reset</button>
        </div>
      </div>
      <p className="playground-desc">{challenge.desc}</p>
      <div className="playground-editor">
        <div className="editor-pane">
          <div className="editor-label"><PxIcon name="pencil" size={12} /> index.html</div>
          <textarea className="code-editor" value={code} onChange={e=>setCode(e.target.value)} spellCheck={false} />
          {showSolution&&<div className="solution-panel"><div className="solution-label"><PxIcon name="bulb" size={12} /> Solution</div><pre className="solution-code">{challenge.solution}</pre></div>}
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
   PIXEL DIVIDER — with traveling glow
   ============================================================= */
function PixelDivider(){return <div className="pixel-divider" aria-hidden="true"><div className="divider-glow-track"><span className="divider-glow-dot" /></div><span>+</span><span>+</span><span>+</span><span>+</span><span>+</span></div>;}

/* =============================================================
   SCROLL TO TOP BUTTON
   ============================================================= */
function ScrollToTop() {
  const[visible,setVisible]=useState(false);
  useEffect(()=>{
    const h=()=>setVisible(window.scrollY>400);
    window.addEventListener('scroll',h,{passive:true});
    return()=>window.removeEventListener('scroll',h);
  },[]);
  return (
    <button className={`scroll-top-btn ${visible?'visible':''}`} onClick={()=>window.scrollTo({top:0,behavior:'smooth'})} aria-label="Scroll to top">
      <PxIcon name="star" size={16} />
    </button>
  );
}

/* =============================================================
   TIMELINE DATA
   ============================================================= */
const timelineItems = [
  {period:"Week 1-2",title:"Getting Started",desc:"HTML basics, dropdown menus, autocomplete inputs",icon:"seedling"},
  {period:"Week 3-4",title:"UI Components",desc:"Floating labels, OTP inputs, upload systems, password generators",icon:"palette"},
  {period:"Week 5-6",title:"Visual Effects",desc:"Animated backgrounds, progress bars, glassmorphism, glow cards",icon:"sparkle"},
  {period:"Week 7-8",title:"Logic & Data",desc:"Dark mode, QR codes, realtime UI, local storage",icon:"bolt"},
  {period:"Week 9+",title:"Full Projects",desc:"Cafe POS system, code challenges, exercise catalog",icon:"trophy"},
];

/* =============================================================
   MAIN COMPONENT
   ============================================================= */
export default function LearningHub() {
  const[activeCategory,setActiveCategory]=useState("all");
  const[scrolled,setScrolled]=useState(false);
  const[hoveredCard,setHoveredCard]=useState(null);
  const[previewExercise,setPreviewExercise]=useState(null);
  const[activeChallenge,setActiveChallenge]=useState(challenges[0]);
  const[showRandomChallenge,setShowRandomChallenge]=useState(false);
  const{randomChallenges,loading:randLoading}=useRandomChallenges(3);
  const[searchQuery,setSearchQuery]=useState("");
  const[darkMode,setDarkMode]=useState(()=>localStorage.getItem("theme")!=="light");
  const[completedEx,setCompletedEx]=useState(()=>JSON.parse(localStorage.getItem("completed")||"[]"));
  const activeSection=useActiveSection(["hero","quests","challenges","featured","timeline","skills"]);

  /* Dark mode effect */
  useEffect(()=>{document.documentElement.setAttribute("data-theme",darkMode?"dark":"light");localStorage.setItem("theme",darkMode?"dark":"light");},[darkMode]);

  /* Completion persistence */
  useEffect(()=>{localStorage.setItem("completed",JSON.stringify(completedEx));},[completedEx]);

  /* Scroll events */
  useEffect(()=>{const o=()=>setScrolled(window.scrollY>50);window.addEventListener("scroll",o,{passive:true});return()=>window.removeEventListener("scroll",o);},[]);

  const typedSubtitle=useTypewriter("Interactive exercises, live previews, and code challenges learn by doing!",28,900);

  /* Filters */
  const filtered=activeCategory==="all"?exercises:exercises.filter(e=>e.category===activeCategory);
  const searched=searchQuery.trim()?filtered.filter(e=>e.title.toLowerCase().includes(searchQuery.toLowerCase())||e.desc.toLowerCase().includes(searchQuery.toLowerCase())||e.tags.some(t=>t.toLowerCase().includes(searchQuery.toLowerCase()))):filtered;
  const featuredEx=exercises.find(e=>e.featured);
  const displayChallenges=showRandomChallenge&&randomChallenges.length>0?randomChallenges:challenges;

  /* Completion */
  const completedCount=completedEx.length;
  const toggleComplete=(id)=>{setCompletedEx(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]);};
  const xpPercent=Math.min(100,Math.round((completedCount/totalExercises)*100));

  return (
    <>
      <style>{CSS}</style>
      <div id="app" className={darkMode?"dark":"light"}>
        <PixelBackground />
        <PixelRain />
        <div className="vignette" aria-hidden="true" />
        <div className="scanlines" aria-hidden="true" />

        {/* NAV */}
        <nav className={scrolled?"scrolled":""}>
          <div className="nav-inner">
            <a href="#" className="logo"><PxIcon name="seedling" size={20} /><span className="logo-text">Dev<span className="accent">Journey</span></span></a>
            <div className="nav-links">
              {[
                {id:"quests",label:"Quests"},
                {id:"challenges",label:"Challenges"},
                {id:"skills",label:"Skills"},
                {id:"timeline",label:"Timeline"},
              ].map(n=><a key={n.id} href={`#${n.id}`} className={activeSection===n.id?"nav-active":""}>{n.label}</a>)}
            </div>
            {/* Dark Mode Toggle */}
            <button className="theme-toggle-btn" onClick={()=>setDarkMode(!darkMode)} title={darkMode?"Light Mode":"Dark Mode"}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{display:'block'}}>
                {darkMode
                  ? <><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></>
                  : <><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></>}
              </svg>
            </button>
          </div>
        </nav>

        {/* HERO — with staggered entrance */}
        <header className="hero" id="hero">
          <div className="hero-scan" aria-hidden="true" />
          <div className="hero-content">
            <div className="hero-stagger" style={{'--stagger-i':0}}><div className="hero-badge"><PxIcon name="flag" size={14} /> Learning Adventure</div></div>
            <div className="hero-stagger" style={{'--stagger-i':1}}><h1 className="hero-title">Random Learning <span className="gradient-text">WebDev</span></h1></div>
            <div className="hero-stagger" style={{'--stagger-i':2}}><p className="hero-sub">{typedSubtitle}<span className="cursor-blink">|</span></p></div>
            <div className="hero-stagger" style={{'--stagger-i':3}}>
              <div className="hero-stats">
                {[
                  {label:"Quests Done",value:"26",icon:"check"},
                  {label:"Challenges",value:"5",icon:"sword"},
                  {label:"Tech Used",value:"8",icon:"wrench"},
                  {label:"XP Earned",value:"2,840",icon:"star"},
                ].map(s=><div className="hero-stat" key={s.label}><PxIcon name={s.icon} size={22} /><div><div className="hero-stat-value"><AnimatedCounter value={s.value} /></div><div className="hero-stat-label">{s.label}</div></div></div>)}
              </div>
            </div>
            <div className="hero-stagger" style={{'--stagger-i':4}}>
              <div className="hero-actions">
                <a href="#quests" className="btn primary">Start Exploring</a>
                <a href="https://github.com/houtaroudes/Random-Learning-WebDev" target="_blank" rel="noopener" className="btn"><PxIcon name="link" size={14} /> View on GitHub</a>
              </div>
            </div>
          </div>
          <div className="scroll-hint" aria-hidden="true"><span>SCROLL</span></div>
        </header>

        {/* XP BAR */}
        <div className="xp-bar">
          <div className="xp-inner">
            <div className="xp-info">
              <span className="xp-level">Lv.{Math.floor(completedCount/5)+1}</span>
              <span className="xp-label">{completedCount}/{totalExercises} Complete</span>
            </div>
            <div className="xp-track"><div className="xp-fill" style={{width:`${xpPercent}%`}}/><span className="xp-text">{completedCount} / {totalExercises} quests</span></div>
          </div>
        </div>

        <PixelDivider />

        {/* QUESTS */}
        <RevealSection className="section" id="quests" variant="up">
          <div className="section-head">
            <div className="eyebrow"><PxIcon name="note" size={14} /> Quest Log</div>
            <h2 className="section-title">Exercise <span className="accent">Catalog</span></h2>
            <p className="section-desc">{totalExercises} mini-projects + {challenges.length} code challenges. Filter or search below.</p>
          </div>
          {/* Search Bar */}
          <div className="search-bar">
            <input type="text" className="search-input" placeholder="Search exercises by name, description, or tag..." value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} />
            {searchQuery&&<button className="search-clear" onClick={()=>setSearchQuery("")}>x</button>}
          </div>
          <div className="filter-bar">
            {categories.map(cat=>(
              <button key={cat.id} className={`filter-btn ${activeCategory===cat.id?"active":""}`} onClick={()=>setActiveCategory(cat.id)}
                style={activeCategory===cat.id?{borderColor:cat.color,color:cat.color}:{}}>
                <PxIcon name={cat.icon} size={16} /><span>{cat.label} {activeCategory===cat.id&&`(${searched.length})`}</span>
              </button>
            ))}
          </div>
          <div className="exercise-grid stagger-children">
            {searched.map((ex,i)=>(
              <article className={`exercise-card ${ex.featured?"featured":""} ${completedEx.includes(ex.id)?"completed":""}`} key={ex.id}
                style={{'--stagger-i':i}}
                onMouseEnter={()=>setHoveredCard(ex.id)} onMouseLeave={()=>setHoveredCard(null)}>
                <div className="card-glow" style={{opacity:hoveredCard===ex.id?1:0,
                  background:`radial-gradient(400px circle at 50% 50%,${ex.featured?"rgba(255,209,102,0.08)":"rgba(63,230,255,0.06)"},transparent)`}} />
                <div className="card-type-badge" style={{background:ex.featured?"var(--gold)":"var(--cyan)",color:"var(--void)"}}>
                  {completedEx.includes(ex.id)&&<span className="complete-check">*</span>} {ex.type}
                </div>
                <h3 className="card-title">{ex.title}</h3>
                <p className="card-desc">{ex.desc}</p>
                <div className="card-tags">{ex.tags.map(t=><span className="tag" key={t}>{t}</span>)}</div>
                <div className="card-actions">
                  <button className="card-link complete-btn" onClick={()=>toggleComplete(ex.id)}
                    style={{color:completedEx.includes(ex.id)?"var(--gold)":"var(--dimmer)"}}>
                    <PxIcon name="check" size={14} /> {completedEx.includes(ex.id)?"Done":"Mark Done"}
                  </button>
                  {ex.repo.endsWith(".html")&&<button className="card-link demo-btn" onClick={()=>setPreviewExercise(ex)}><PxIcon name="play" size={14} /> Live Demo</button>}
                  <a href={`https://github.com/houtaroudes/Random-Learning-WebDev/blob/main/public/demos/${encodeURIComponent(ex.repo)}`} target="_blank" rel="noopener" className="card-link"><PxIcon name="file" size={14} /> Code</a>
                </div>
              </article>
            ))}
          </div>
          {searched.length===0&&<div className="empty-state"><PxIcon name="search" size={32} /><p>{searchQuery?"No matches for that search.":"No quests in this category yet."}</p></div>}
        </RevealSection>

        <PixelDivider />

        {/* CHALLENGES */}
        <RevealSection className="section" id="challenges" variant="left">
          <div className="section-head">
            <div className="eyebrow"><PxIcon name="sword" size={14} /> Training Grounds</div>
            <h2 className="section-title">Code <span className="accent">Challenges</span></h2>
            <p className="section-desc">Try these interactive coding exercises. Edit the code and see the result live!</p>
          </div>
          <div style={{display:'flex',gap:8,justifyContent:'center',marginBottom:16}}>
            <button className={`btn sm ${!showRandomChallenge?'primary':''}`} onClick={()=>{setShowRandomChallenge(false);setActiveChallenge(challenges[0]);}}>Default Challenges</button>
            <button className={`btn sm ${showRandomChallenge?'primary':''}`} onClick={()=>{setShowRandomChallenge(true);if(randomChallenges.length)setActiveChallenge(randomChallenges[0]);}} disabled={randLoading}>{randLoading?'Loading...':'Random from Library'}</button>
          </div>
          <div className="challenge-tabs">
            {displayChallenges.map(c=>(
              <button key={c.id} className={`challenge-tab ${activeChallenge.id===c.id?"active":""}`} onClick={()=>setActiveChallenge(c)}>
                <span className={`diff-dot ${c.difficulty.toLowerCase()}`} /><span>{c.title}</span>
              </button>
            ))}
          </div>
          <CodePlayground challenge={activeChallenge} key={activeChallenge.id} />
        </RevealSection>

        <PixelDivider />

        {/* FEATURED */}
        {featuredEx&&(
          <RevealSection className="section featured-section" id="featured" variant="scale">
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
              <div className="featured-actions" style={{display:"flex",gap:12,marginTop:24,flexWrap:"wrap",justifyContent:"center",position:"relative",zIndex:1}}>
                <button className="btn primary" onClick={()=>setPreviewExercise(featuredEx)}><PxIcon name="play" size={14} /> Live Preview</button>
                <a href={`https://github.com/houtaroudes/Random-Learning-WebDev/blob/main/${encodeURIComponent(featuredEx.repo)}`} target="_blank" rel="noopener" className="btn"><PxIcon name="file" size={14} /> View Source</a>
              </div>
            </div>
          </RevealSection>
        )}

        <PixelDivider />

        {/* TIMELINE */}
        <RevealSection className="section" id="timeline" variant="right">
          <div className="section-head">
            <div className="eyebrow"><PxIcon name="flag" size={14} /> Learning Path</div>
            <h2 className="section-title">Progress <span className="accent">Timeline</span></h2>
            <p className="section-desc">My web development learning journey so far. Each week brought new concepts and projects.</p>
          </div>
          <div className="timeline stagger-children">
            {timelineItems.map((item,i)=>(
              <div className="timeline-item" key={i} style={{'--stagger-i':i}}>
                <div className="timeline-dot"><PxIcon name={item.icon} size={14} /></div>
                <div className="timeline-content">
                  <div className="timeline-period">{item.period}</div>
                  <h3 className="timeline-title">{item.title}</h3>
                  <p className="timeline-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </RevealSection>

        <PixelDivider />

        {/* SKILLS */}
        <RevealSection className="section" id="skills" variant="up">
          <div className="section-head"><div className="eyebrow"><PxIcon name="wrench" size={14} /> Equipment</div><h2 className="section-title">Skills & <span className="accent">Tools</span></h2><p className="section-desc">Technologies I've practiced with.</p></div>
          <div className="skills-grid stagger-children">{skills.map((s,i)=><div className="skill-badge" key={s.name} style={{'--stagger-i':i,"--badge-color":s.color}}><PxIcon name={s.icon} size={16} color={s.color} /><span className="skill-name">{s.name}</span></div>)}</div>
        </RevealSection>

        {/* FOOTER */}
        <footer>
          <div className="footer-inner">
            <div className="pixel-footer-art" aria-hidden="true"><PxIcon name="star" size={10} /><PxIcon name="star" size={10} /><PxIcon name="star" size={10} /></div>
            <p className="footer-credits"><strong>Random Learning WebDev</strong> -- Built by HoutarouDes &copy; 2026</p>
            <p className="footer-sub">{totalExercises} exercises &middot; {challenges.length} challenges &middot; {completedCount} completed &middot; infinity curiosity</p>
          </div>
        </footer>
      </div>

      {previewExercise&&<LivePreview exercise={previewExercise} onClose={()=>setPreviewExercise(null)} />}
      <ScrollToTop />
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
--ease-out:cubic-bezier(0.22,1,0.36,1); --ease-in-out:cubic-bezier(0.65,0,0.35,1);
background:var(--void); color:var(--text); font-family:var(--font-body); line-height:1.6; overflow-x:hidden; position:relative; min-height:100vh;
}
[data-theme="light"] #app{
--void:#f4f4f8; --panel:#ffffff; --panel-2:#e8ecf4; --border:rgba(0,0,0,0.08);
--cyan:#0891b2; --cyan-dim:rgba(8,145,178,0.2); --magenta:#db2777; --gold:#d97706;
--text:#1e293b; --dim:#64748b; --dimmer:#94a3b8;
}
[data-theme="light"] #app .hero-scan{display:none}
[data-theme="light"] #app .scanlines{opacity:0.1}

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}::selection{background:var(--cyan);color:var(--void)}
a{color:inherit;text-decoration:none}

/* Theme Toggle */
.theme-toggle-btn{background:rgba(255,255,255,0.06);border:none;color:var(--dim);width:36px;height:36px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .3s var(--ease-out);flex-shrink:0;margin-left:12px}
.theme-toggle-btn:hover{background:rgba(255,255,255,0.12);color:var(--cyan);transform:rotate(15deg)}
[data-theme="light"] .theme-toggle-btn{background:rgba(0,0,0,0.04);color:var(--dim)}
[data-theme="light"] .theme-toggle-btn:hover{background:rgba(0,0,0,0.08);color:var(--cyan)}

/* Search Bar */
.search-bar{position:relative;max-width:480px;margin:0 auto 20px}
.search-input{width:100%;padding:12px 40px 12px 16px;background:var(--panel);border:1px solid var(--border);border-radius:12px;color:var(--text);font-size:.9rem;outline:none;font-family:var(--font-body);transition:border-color .3s var(--ease-out),box-shadow .3s var(--ease-out)}
.search-input:focus{border-color:var(--cyan);box-shadow:0 0 0 2px var(--cyan-dim)}
.search-input::placeholder{color:var(--dimmer)}
.search-clear{position:absolute;right:10px;top:50%;transform:translateY(-50%);background:none;border:none;color:var(--dimmer);cursor:pointer;font-size:.85rem}

/* ===== REVEAL / STAGGER SYSTEM ===== */
.reveal-section{opacity:0;transition:opacity .8s var(--ease-out),transform .8s var(--ease-out);will-change:opacity,transform}
.reveal-up{transform:translateY(40px)}
.reveal-left{transform:translateX(-40px)}
.reveal-right{transform:translateX(40px)}
.reveal-scale{transform:scale(0.92)}
.reveal-fade{transform:none}
.reveal-section.revealed{opacity:1;transform:translate(0) scale(1)}

/* Staggered children — each child animates in with delay based on --stagger-i */
.stagger-children > *{opacity:0;transform:translateY(20px);transition:opacity .6s var(--ease-out),transform .6s var(--ease-out);transition-delay:calc(var(--stagger-i,0) * 0.07s)}
.revealed .stagger-children > *,
.reveal-section.revealed .stagger-children > *,
.stagger-children > *.revealed{opacity:1;transform:translateY(0)}

/* Hero stagger */
.hero-stagger{opacity:0;transform:translateY(30px);transition:opacity .7s var(--ease-out),transform .7s var(--ease-out);transition-delay:calc(var(--stagger-i,0) * 0.12s)}



/* Fallback: hero stagger starts visible because hero is in viewport on load */
.hero .hero-stagger{opacity:1;transform:translateY(0);transition-delay:calc(var(--stagger-i,0) * 0.12s)}
/* On first load, apply stagger from the start */
.hero-stagger{animation:heroStaggerIn .7s var(--ease-out) both;animation-delay:calc(var(--stagger-i,0) * 0.12s + 0.2s)}

:root{--wobble:cubic-bezier(0.34,1.56,0.64,1)}
@keyframes heroStaggerIn{0%{opacity:0;transform:translateY(30px) scale(0.97)}100%{opacity:1;transform:translateY(0) scale(1)}}

/* ===== ACTIVE NAV LINK ===== */
.nav-links a{position:relative;transition:color .3s var(--ease-out)}
.nav-links a::after{content:'';position:absolute;bottom:-4px;left:50%;width:0;height:2px;background:var(--cyan);border-radius:2px;transition:all .3s var(--ease-out);transform:translateX(-50%)}
.nav-links a:hover::after,.nav-links a.nav-active::after{width:80%}
.nav-links a.nav-active{color:var(--cyan)}

/* ===== ENHANCED DIVIDER ===== */
.pixel-divider{display:flex;align-items:center;justify-content:center;gap:12px;padding:20px 16px;position:relative;overflow:hidden}
.pixel-divider>span{color:var(--cyan);font-size:14px;font-family:var(--font-mono);opacity:0.3;animation:pulse 2s var(--ease-in-out) infinite;animation-delay:calc(var(--i,0)*0.3s)}
.pixel-divider>span:nth-child(2){--i:0}
.pixel-divider>span:nth-child(3){--i:1;animation-delay:0.15s}
.pixel-divider>span:nth-child(4){--i:2;animation-delay:0.3s}
.pixel-divider>span:nth-child(5){--i:3;animation-delay:0.45s}
.pixel-divider>span:nth-child(6){--i:4;animation-delay:0.6s}

/* Traveling glow dot */
.divider-glow-track{position:absolute;inset:0;pointer-events:none}
.divider-glow-dot{position:absolute;left:-4px;top:50%;width:8px;height:8px;border-radius:50%;background:var(--cyan);box-shadow:0 0 12px var(--cyan),0 0 24px rgba(63,230,255,0.4);animation:dividerGlide 3s var(--ease-in-out) infinite}
@keyframes dividerGlide{0%{left:-4px;opacity:0}10%{opacity:1}90%{opacity:1}100%{left:calc(100% + 4px);opacity:0}}

@keyframes pulse{0%,100%{opacity:0.3}50%{opacity:1}}

/* ===== SECTION LAYOUT ===== */
.section{padding:80px 24px;max-width:1100px;margin:0 auto;position:relative;z-index:2}
.section-head{text-align:center;margin-bottom:48px}
.eyebrow{display:inline-flex;align-items:center;gap:6px;font-family:var(--font-display);font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--dim);margin-bottom:12px;padding:6px 14px;border:1px solid var(--border);border-radius:100px}
.section-title{font-family:var(--font-display);font-size:22px;letter-spacing:-0.5px;margin-bottom:8px;line-height:1.3;text-transform:uppercase}
.accent{color:var(--cyan)}
.section-desc{color:var(--dim);font-size:.9rem;max-width:560px;margin:0 auto}

/* Filter Bar */
.filter-bar{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-bottom:32px}
.filter-btn{display:inline-flex;align-items:center;gap:6px;padding:10px 18px;border-radius:10px;border:1px solid var(--border);background:var(--panel);color:var(--dim);cursor:pointer;font-family:var(--font-body);font-size:.8rem;transition:all .3s var(--ease-out)}
.filter-btn:hover{border-color:var(--cyan);color:var(--cyan);transform:translateY(-2px)}
.filter-btn.active{background:rgba(63,230,255,0.08)}

/* Exercise Grid */
.exercise-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px;margin-top:8px}
.exercise-card{background:var(--panel);border:1px solid var(--border);border-radius:16px;padding:24px;position:relative;overflow:hidden;transition:all .4s var(--ease-out);animation:cardIn .6s var(--ease-out) both;animation-delay:calc(var(--stagger-i,0) * 0.07s)}
.exercise-card:hover{border-color:var(--cyan);transform:translateY(-4px);box-shadow:0 8px 32px rgba(63,230,255,0.1)}
.exercise-card.featured:hover{border-color:var(--gold);box-shadow:0 8px 32px rgba(255,209,102,0.1)}
.exercise-card.completed{border-color:rgba(74,222,128,0.3);opacity:0.85}
.exercise-card.completed:hover{opacity:1}
.card-glow{position:absolute;top:50%;left:50%;width:100%;height:100%;transform:translate(-50%,-50%);border-radius:50%;pointer-events:none;transition:opacity .5s var(--ease-out)}
.card-type-badge{display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border-radius:6px;font-family:var(--font-display);font-size:7px;letter-spacing:1px;text-transform:uppercase;margin-bottom:12px}
.complete-check{color:var(--void);font-weight:bold;font-size:8px}
.card-title{font-family:var(--font-display);font-size:13px;margin-bottom:8px;line-height:1.4}
.card-desc{font-size:.85rem;color:var(--dim);line-height:1.5;margin-bottom:16px;flex:1}
.card-tags{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px}
.tag{padding:3px 10px;border-radius:6px;background:rgba(255,255,255,0.04);border:1px solid var(--border);font-size:.75rem;color:var(--dimmer);font-family:var(--font-mono)}
.card-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:auto}
.card-link{display:inline-flex;align-items:center;gap:6px;font-size:.8rem;color:var(--dim);cursor:pointer;background:none;border:none;font-family:var(--font-body);padding:0;transition:color .3s var(--ease-out)}
.card-link:hover{color:var(--cyan)}
.complete-btn:hover{color:var(--gold)!important}
.demo-btn{color:var(--cyan)!important;font-weight:500}

/* Empty state */
.empty-state{text-align:center;padding:48px 24px;color:var(--dimmer);display:flex;flex-direction:column;align-items:center;gap:12px}
.empty-state p{font-size:.9rem}

/* Challenge Tabs */
.challenge-tabs{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-bottom:20px}
.challenge-tab{display:inline-flex;align-items:center;gap:8px;padding:10px 18px;border-radius:10px;border:1px solid var(--border);background:var(--panel);color:var(--dim);cursor:pointer;font-family:var(--font-body);font-size:.8rem;transition:all .3s var(--ease-out)}
.challenge-tab:hover{border-color:var(--cyan);color:var(--text)}
.challenge-tab.active{background:rgba(63,230,255,0.08);border-color:var(--cyan);color:var(--cyan)}
.diff-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
.diff-dot.easy{background:#4ade80}
.diff-dot.medium{background:#ffd166}
.diff-dot.hard{background:#ff6b6b}

/* Difficulty Badge */
.difficulty-badge{padding:2px 10px;border-radius:6px;font-family:var(--font-display);font-size:8px;letter-spacing:1px;text-transform:uppercase}
.difficulty-badge.easy{background:rgba(74,222,128,0.15);color:#4ade80}
.difficulty-badge.medium{background:rgba(255,209,102,0.15);color:#ffd166}
.difficulty-badge.hard{background:rgba(255,107,107,0.15);color:#ff6b6b}

/* Playground */
.playground{background:var(--panel);border:1px solid var(--border);border-radius:16px;overflow:hidden}
.playground-header{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;padding:20px;flex-wrap:wrap;border-bottom:1px solid var(--border)}
.playground-info{display:flex;align-items:center;gap:12px}
.playground-title{font-family:var(--font-display);font-size:11px}
.playground-actions{display:flex;gap:8px;flex-wrap:wrap}
.playground-desc{padding:12px 20px;color:var(--dim);font-size:.85rem;border-bottom:1px solid var(--border)}
.playground-editor{display:grid;grid-template-columns:1fr 1fr;min-height:300px}
@media(max-width:768px){.playground-editor{grid-template-columns:1fr}}
.editor-pane{position:relative;border-right:1px solid var(--border);display:flex;flex-direction:column}
@media(max-width:768px){.editor-pane{border-right:none;border-bottom:1px solid var(--border)}}
.editor-label{padding:8px 16px;font-family:var(--font-mono);font-size:.75rem;color:var(--dimmer);background:rgba(0,0,0,0.15);display:flex;align-items:center;gap:6px}
.code-editor{width:100%;flex:1;min-height:280px;background:rgba(0,0,0,0.25);color:var(--text);border:none;padding:16px;font-family:var(--font-mono);font-size:.85rem;line-height:1.6;resize:vertical;outline:none;tab-size:2}
.code-editor:focus{box-shadow:inset 0 0 0 1px var(--cyan-dim)}
.solution-panel{border-top:2px solid var(--gold);background:rgba(255,209,102,0.03)}
.solution-label{padding:8px 16px;font-family:var(--font-mono);font-size:.75rem;color:var(--gold);display:flex;align-items:center;gap:6px}
.solution-code{padding:16px;color:var(--text);font-family:var(--font-mono);font-size:.82rem;line-height:1.6;overflow-x:auto;white-space:pre-wrap}
.preview-pane{background:var(--void)}
@media(max-width:768px){.preview-pane{min-height:200px}}
.playground-preview{width:100%;height:100%;min-height:280px;border:none;display:block;background:var(--void)}

/* Featured Section */
.featured-section{padding-top:80px}
.featured-card{text-align:center;padding:48px 32px;background:var(--panel);border:1px solid rgba(255,209,102,0.2);border-radius:24px;position:relative;overflow:hidden}
.featured-glow{position:absolute;top:50%;left:50%;width:600px;height:600px;transform:translate(-50%,-50%);background:radial-gradient(circle,rgba(255,209,102,0.06),transparent 70%);pointer-events:none}
.featured-badge{display:inline-flex;align-items:center;gap:8px;padding:6px 20px;border-radius:100px;background:rgba(255,209,102,0.1);border:1px solid rgba(255,209,102,0.3);color:var(--gold);font-family:var(--font-display);font-size:9px;letter-spacing:2px;margin-bottom:20px}
.featured-title{font-family:var(--font-display);font-size:20px;margin-bottom:12px;position:relative;z-index:1}
.featured-desc{color:var(--dim);max-width:500px;margin:0 auto 20px;font-size:.9rem;line-height:1.6;position:relative;z-index:1}
.featured-tags{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;position:relative;z-index:1}
.featured-tag{border-color:rgba(255,209,102,0.2);color:var(--gold)}

/* Timeline */
.timeline{position:relative;max-width:600px;margin:0 auto;padding-left:40px}
.timeline::before{content:'';position:absolute;left:15px;top:0;bottom:0;width:2px;background:linear-gradient(to bottom,var(--cyan),var(--magenta),var(--gold));opacity:0.3;border-radius:2px}
.timeline-item{position:relative;padding-bottom:36px;opacity:0;transform:translateX(-20px);transition:opacity .6s var(--ease-out),transform .6s var(--ease-out);transition-delay:calc(var(--stagger-i,0) * 0.15s)}
.revealed .timeline-item,
.reveal-section.revealed .timeline-item{opacity:1;transform:translateX(0)}
.timeline-item:last-child{padding-bottom:0}
.timeline-dot{position:absolute;left:-32px;top:2px;width:32px;height:32px;border-radius:50%;background:var(--panel);border:2px solid var(--border);display:flex;align-items:center;justify-content:center;z-index:1;transition:border-color .4s var(--ease-out)}
.timeline-item:hover .timeline-dot{border-color:var(--cyan);box-shadow:0 0 16px var(--cyan-dim)}
.timeline-period{font-family:var(--font-display);font-size:8px;letter-spacing:1px;color:var(--cyan);margin-bottom:4px}
.timeline-title{font-family:var(--font-display);font-size:12px;margin-bottom:4px}
.timeline-desc{font-size:.85rem;color:var(--dim);line-height:1.5}

/* Skills */
.skills-grid{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
.skill-badge{display:inline-flex;align-items:center;gap:8px;padding:12px 20px;background:var(--panel);border:1px solid var(--border);border-radius:12px;transition:all .4s var(--ease-out);transform:translateY(0)}
.skill-badge:hover{transform:translateY(-4px);border-color:var(--badge-color,var(--cyan));box-shadow:0 4px 20px rgba(0,0,0,0.2)}
.skill-name{font-weight:600;font-size:.9rem}

/* Nav */
nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:16px 24px;transition:all .4s var(--ease-out)}
nav.scrolled{background:rgba(7,9,17,0.85);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);padding:12px 24px;border-bottom:1px solid var(--border)}
[data-theme="light"] nav.scrolled{background:rgba(244,244,248,0.9);border-color:var(--border)}
.nav-inner{max-width:1100px;margin:0 auto;display:flex;align-items:center;gap:24px}
.logo{display:flex;align-items:center;gap:10px;flex-shrink:0}
.logo-text{font-family:var(--font-display);font-size:13px;letter-spacing:-0.5px}
.nav-links{display:flex;gap:4px;flex:1;justify-content:center}
.nav-links a{padding:6px 14px;border-radius:8px;color:var(--dim);font-size:.85rem;transition:color .3s var(--ease-out),background .3s var(--ease-out)}
.nav-links a:hover{color:var(--text);background:rgba(255,255,255,0.04)}
@media(max-width:640px){.nav-links a{padding:6px 10px;font-size:.8rem}.nav-links{gap:0}}

/* Buttons */
.btn{display:inline-flex;align-items:center;gap:8px;padding:12px 24px;border-radius:12px;border:1px solid var(--border);background:var(--panel);color:var(--text);cursor:pointer;font-family:var(--font-body);font-size:.85rem;transition:all .3s var(--ease-out)}
.btn:hover{border-color:var(--cyan);transform:translateY(-2px);box-shadow:0 4px 20px rgba(63,230,255,0.1)}
.btn.sm{padding:8px 16px;font-size:.8rem;border-radius:8px}
.btn.primary{background:var(--cyan);color:var(--void);border-color:var(--cyan);font-weight:600}
.btn.primary:hover{background:#5cedff;box-shadow:0 4px 24px rgba(63,230,255,0.3);transform:translateY(-2px)}

/* Hero */
.hero{min-height:100vh;display:flex;align-items:center;justify-content:center;position:relative;z-index:2;padding:120px 24px 80px;text-align:center;overflow:hidden}
.hero-scan{position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--cyan),transparent);opacity:0;animation:scanIn 4s var(--ease-in-out) infinite;pointer-events:none}
.hero-content{position:relative;z-index:2;max-width:720px}
.hero-badge{display:inline-flex;align-items:center;gap:6px;padding:6px 16px;border-radius:100px;background:rgba(63,230,255,0.08);border:1px solid rgba(63,230,255,0.2);color:var(--cyan);font-family:var(--font-display);font-size:9px;letter-spacing:1px;margin-bottom:20px}
.hero-title{font-family:var(--font-display);font-size:clamp(28px,5vw,48px);line-height:1.2;margin-bottom:16px;letter-spacing:-1px}
.gradient-text{background:linear-gradient(135deg,var(--cyan),var(--magenta));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hero-sub{font-size:1.05rem;color:var(--dim);max-width:520px;margin:0 auto 32px;line-height:1.6;min-height:2.8em}
.cursor-blink{color:var(--cyan);animation:blink .8s steps(1) infinite}
.hero-stats{display:flex;gap:24px;justify-content:center;flex-wrap:wrap;margin-bottom:32px}
.hero-stat{display:flex;align-items:center;gap:10px;padding:12px 20px;background:var(--panel);border:1px solid var(--border);border-radius:12px;min-width:130px;transition:all .3s var(--ease-out)}
.hero-stat:hover{border-color:var(--cyan);transform:translateY(-2px);box-shadow:0 4px 16px rgba(63,230,255,0.06)}
.hero-stat-value{font-family:var(--font-display);font-size:18px;letter-spacing:1px}
.hero-stat-label{font-size:.75rem;color:var(--dimmer);margin-top:2px}
.hero-actions{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.scroll-hint{position:absolute;bottom:32px;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:6px;color:var(--dimmer);font-family:var(--font-display);font-size:8px;letter-spacing:2px;animation:blink 2s steps(1) infinite;opacity:0.4}

/* XP Bar */
.xp-bar{padding:0 24px 24px;position:relative;z-index:2}
.xp-inner{max-width:600px;margin:0 auto}
.xp-info{display:flex;justify-content:space-between;margin-bottom:8px}
.xp-level{font-family:var(--font-display);font-size:10px;color:var(--gold)}
.xp-label{font-size:.8rem;color:var(--dim)}
.xp-track{position:relative;height:16px;background:var(--panel);border-radius:100px;border:1px solid var(--border);overflow:hidden}
.xp-fill{height:100%;background:linear-gradient(90deg,var(--cyan),var(--gold));border-radius:100px;transition:width .8s var(--ease-out);position:relative}
.xp-fill::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent);animation:shimmer 2s infinite}
.xp-text{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-family:var(--font-display);font-size:7px;letter-spacing:1px;color:var(--void);white-space:nowrap;mix-blend-mode:difference;filter:brightness(2)}

/* Footer */
footer{padding:40px 24px;text-align:center;position:relative;z-index:2}
.footer-inner{max-width:600px;margin:0 auto}
.pixel-footer-art{display:flex;gap:12px;justify-content:center;margin-bottom:16px}
.footer-credits{font-size:.85rem;color:var(--dim);margin-bottom:4px}
.footer-sub{font-size:.75rem;color:var(--dimmer)}

/* Background effects */
.vignette{position:fixed;inset:0;pointer-events:none;z-index:1;
background:radial-gradient(ellipse at center,transparent 50%,rgba(7,9,17,0.6) 100%)}
[data-theme="light"] .vignette{background:radial-gradient(ellipse at center,transparent 50%,rgba(0,0,0,0.04) 100%)}
.scanlines{position:fixed;inset:0;pointer-events:none;z-index:2;
background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.03) 2px,rgba(0,0,0,0.03) 4px)}
[data-theme="light"] .scanlines{opacity:0.3}

/* Modal */
.modal-overlay{position:fixed;inset:0;z-index:200;background:rgba(7,9,17,0.8);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:24px}
.modal-content{background:var(--panel);border:1px solid var(--border);border-radius:20px;width:100%;max-width:800px;max-height:90vh;display:flex;flex-direction:column;overflow:hidden;animation:modalIn .35s var(--ease-out)}
@keyframes modalIn{0%{opacity:0;transform:scale(0.95) translateY(10px)}100%{opacity:1;transform:scale(1) translateY(0)}}
.modal-header{display:flex;justify-content:space-between;align-items:center;padding:16px 20px;border-bottom:1px solid var(--border)}
.modal-title{display:flex;align-items:center;gap:8px;font-family:var(--font-display);font-size:11px}
.modal-close{background:none;border:none;color:var(--dim);cursor:pointer;padding:4px;border-radius:6px;transition:all .2s var(--ease-out)}
.modal-close:hover{color:var(--text);background:rgba(255,255,255,0.06)}
.modal-body{flex:1;overflow:hidden;position:relative;min-height:300px}
.modal-loading{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;color:var(--dim)}
.modal-error{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;color:var(--magenta)}
.preview-iframe{width:100%;height:100%;border:none;display:block;min-height:400px}
.modal-footer{padding:12px 20px;display:flex;justify-content:flex-end;border-top:1px solid var(--border)}

/* Scroll to top */
.scroll-top-btn{position:fixed;bottom:24px;right:24px;z-index:50;width:44px;height:44px;border-radius:50%;border:1px solid var(--border);background:var(--panel);color:var(--dim);cursor:pointer;display:flex;align-items:center;justify-content:center;
transition:all .4s var(--wobble);transform:translateY(80px);opacity:0;box-shadow:0 4px 16px rgba(0,0,0,0.3)}
.scroll-top-btn.visible{transform:translateY(0);opacity:1}
.scroll-top-btn:hover{border-color:var(--cyan);color:var(--cyan);transform:translateY(-4px);box-shadow:0 4px 24px rgba(63,230,255,0.15)}

/* Loader */
.loader-spin{width:24px;height:24px;border:2px solid var(--border);border-top:2px solid var(--cyan);border-radius:50%;animation:spin .7s linear infinite}

/* Keyframes */
@keyframes scanIn{0%{top:0;opacity:0}10%{opacity:1}50%{top:60%;opacity:0.6}90%{opacity:1}100%{top:100%;opacity:0}}
@keyframes blink{50%{opacity:0}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}
@keyframes cardIn{0%{opacity:0;transform:translateY(16px) scale(0.98)}100%{opacity:1;transform:translateY(0) scale(1)}}
@keyframes fadeIn{0%{opacity:0}100%{opacity:1}}

/* Reduced motion */
@media(prefers-reduced-motion:reduce){
*,*::before,*::after{animation-duration:0s!important;animation-delay:0s!important;transition-duration:0s!important}
.hero-stagger{animation:none!important;opacity:1!important;transform:none!important}
.reveal-section{opacity:1!important;transform:none!important}
.stagger-children>*,.timeline-item{opacity:1!important;transform:none!important}
}

/* Responsive */
@media(max-width:768px){
.exercise-grid{grid-template-columns:1fr}
.hero-stats{gap:12px}
.hero-stat{min-width:100px;padding:10px 16px}
.section{padding:48px 16px}
}
`;
