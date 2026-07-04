const Color = document.querySelectorAll(",color");

for(let i = 0 i<Color.length; i++){
    color[i].onclick=function(){
        const code = this.innerText.trim();
        navigator.clipboard.writeText(code);
        alert("Copied" + code);
    }
}