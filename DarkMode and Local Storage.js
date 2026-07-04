const btn = document.getElementById('toggle');

if(localStorage.getItem('theme') === 'enabled'){
    document.body.classList.add('dark');
}
/*
btn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'enabled' : 'disabled');
});
*/
btn.onclick = () => {
    document.body.classList.toggle('dark');
   
    if(document.body.classList.contains('dark')){
        localStorage.setItem('theme', '');
    }
    else{
        localStorage.setItem('theme', 'white');
    }
}