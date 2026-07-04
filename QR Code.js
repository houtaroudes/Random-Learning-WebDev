const qrcode = new QRCode(document,
    getElementByID("qrcode"),{
        text:"https//www.facebook.com",
        width:120,
        height:120,
        correctLevel:QRCode.CorrectLevel.H
        
})