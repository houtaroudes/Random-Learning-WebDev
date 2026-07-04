file.onchange = () => {
    img.src = URL.createObjectURL(file.files[0]);
    img.style.display ="block";
}