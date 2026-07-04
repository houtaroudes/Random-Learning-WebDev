document.addEventListener("mousemove", (e)=> {
    const trail = document.createElement("div");   
    trail.className="trail";
    trail.textContent="Follow Me";

    trail.style.left= e.clientX + "px";
    trail.style.top= e.clientY + "px";

    document.body.appendChild(trail);

    gsap.to(trail, {
        scale:2,
        opacity:0,
        duration:1,
        onComplete: ()=> trail.remove()
    })
})