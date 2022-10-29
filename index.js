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

const GRAVITY = 0.6;

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
        this.position.x += this.velocity.x;

        if (this.position.y + this.height + this.velocity.y >= canvas.height)
        this.velocity.y = 0;
        else this.velocity.y += GRAVITY;
    }
}

const player = new Sprite({position: { x: 0, y: 0 }, velocity: {x: 0, y: 0}});
const enemy = new Sprite({position: { x: canvas.width - 33, y:0 }, velocity: {x: 0, y: 0}});

let lastKey;
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    }
} 

function animate() {
    c.fillStyle = "black"
    c.fillRect(0,0,canvas.width,canvas.height)
    player.update();
    enemy.update();

    player.velocity.x = 0;
    
    if (keys.d.pressed && lastKey === 'd') {
        player.velocity.x = 5;
    } else if (keys.a.pressed && lastKey === 'a') {
        player.velocity.x = -5;
    }

    window.requestAnimationFrame(animate)
}

animate();

window.addEventListener('keydown', (e) => {
    console.log(e.key)
    switch(e.key) {
        case "a":
            keys.a.pressed = true;
            lastKey = 'a';
            break;
        case "d": 
            keys.d.pressed = true;
            lastKey = 'd';
            break;
        case "w": 
            player.velocity.y = -15;
            break;
    }
})

window.addEventListener('keyup', ({key}) => {
    keys[key].pressed = false;
})