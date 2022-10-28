//handle mobile
window.addEventListener('resize', () => {
    if ( window.innerWidth < window.innerHeight) {
        alert("Flip you phone :)")
    }
})


//project initialization


const canvas = document.getElementById("canvas1")

const c = canvas.getContext('2d')

canvas.width = 1024;
canvas.height = 576;

const GRAVITY = 0.2;

c.fillRect(0,0,canvas.width, canvas.height)

//sprite


class Sprite {
    constructor({position, velocity}) {
        this.position = position;
        this.velocity = velocity;
        this.height = 100;
        this.width = 33;
    }
    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    update() {
        this.draw()
        this.position.y += this.velocity.y;

        if (this.position.y + this.height + this.velocity.y >= canvas.height)
        this.velocity.y = 0;
            
        else this.velocity.y += GRAVITY;
    }
}

const player = new Sprite({position: { x: 0, y: 0 }, velocity: {x: 0, y: 0}});
const enemy = new Sprite({position: { x: canvas.width - 33, y:0 }, velocity: {x: 0, y: 0}});


function animate() {
    c.fillStyle = "black"
    c.fillRect(0,0,canvas.width,canvas.height)
    player.update();
    enemy.update();

    window.requestAnimationFrame(animate)
}

animate();