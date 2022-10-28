const canvas = document.getElementById("canvas1")

const c = canvas.getContext('2d')

canvas.width = 1024;
canvas.height = 576;

window.addEventListener('resize', () => {
    if ( window.width < window.height) {
        alert("Flip you phone :)")
    }
})

c.fillRect(0,0,canvas.width, canvas.height)