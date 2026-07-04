const password = document.getElementById
("password")
const toggle = document.getElementById
("toggle")
toggle.addEventListener("click",()=> {
    if(password.type=="password"){
        password.type="text";
        toggle.textContent="Hide"
    }
    else{
        password.type="password";
        toggle.textContent="Show"
    }
})
