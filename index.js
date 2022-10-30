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

const background = new Image()
background.src = "./background.jpg";

background.onload = drawBackground();

function drawBackground() {
    c.drawImage(background, 0, 0);
}

console.log(background.height)


//sprite

class Sprite {
    constructor({position, velocity, color}) {
        this.position = position;
        this.velocity = velocity;
        color ? this.color = color : this.color = 'orange';
        this.height = 0;
        this.width = 0;
    }
    draw() {
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

class Character extends Sprite {
    constructor(settings) {
        super(settings);
        this.height = 150;
        this.width = 40;
        this.lastKey;
        settings.direction ? this.direction = settings.direction : this.direction = "right";

        this.controls = {
            right: { pressed: false },
            left: { pressed: false },
            up: { pressed: false },
            down: { pressed: false },
            quickAttack: { pressed: false },
            parry: { pressed: false },
        }
    }
    attack() {

        this.attackBox = {
            y: this.position.y + 10,
            width: 100,
            height: 40
        } 
        if (this.direction === "right") {
            this.attackBox.x = this.position.x + this.width/2;
        } else {
            this.attackBox.x = this.position.x - (90 - this.width/2);
        }
        c.fillStyle = 'blue'
        c.fillRect(this.attackBox.x, this.attackBox.y, this.attackBox.width, this.attackBox.height)
    }
    parry() {
        this.parryBox = {
            x: this.position.x + this.width/2,
            y: this.position.y,
            width: 20,
            height: 90
        }
        c.fillStyle = 'green'
        c.fillRect(this.parryBox.x, this.parryBox.y, this.parryBox.width, this.parryBox.height)
    }
    
    update() {
        this.draw()
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
        

        if (this.position.y + this.height + this.velocity.y >= canvas.height)
            this.velocity.y = 0;
        else 
            this.velocity.y += GRAVITY;

        this.velocity.x = 0;
        
        if (this.controls.right.pressed && this.lastKey === "right") {
            this.velocity.x = 5;
            this.direction = "right"
        } else if (this.controls.left.pressed && this.lastKey === "left") {
            this.velocity.x = -5;
            this.direction = "left"
        } 
        if (this.controls.up.pressed && this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = -15;
        }
        if (this.controls.quickAttack.pressed) this.attack();
        if (this.controls.parry.pressed) this.parry();
    }
}

class Player extends Character {
    constructor(settings) {
        settings.color = 'blue'
        super(settings);
    }
}

class Opponent extends Character {
    constructor(settings) {
        settings.color = 'red'
        super(settings);
    }
}

const player = new Player({position: { x: 0, y: 0 }, velocity: {x: 0, y: 0}});
const enemy = new Opponent({position: { x: canvas.width - 33, y:0 }, velocity: {x: 0, y: 0}});

function animate() {
    drawBackground();
    player.update();
    enemy.update();
    
    

    window.requestAnimationFrame(animate)
}

animate();

window.addEventListener('keydown', ({key}) => {
    console.log(key)
    switch(key) {
        case "a":
            player.controls.left.pressed = true;
            player.lastKey = 'left';
            break;
        case "d": 
            player.controls.right.pressed = true;
            player.lastKey = 'right';
            break;
        case "w": 
            player.controls.up.pressed = true;
            break;
        case " ": 
            player.controls.quickAttack.pressed = true;
            break;
        case "Shift": 
            player.controls.parry.pressed = true;
            break;
        case "ArrowLeft":
            enemy.controls.left.pressed = true;
            enemy.lastKey = 'left';
            break;
        case "ArrowRight": 
            enemy.controls.right.pressed = true;
            enemy.lastKey = 'right';
            break;
        case "ArrowUp": 
            enemy.controls.up.pressed = true;
            break;
    }
})

window.addEventListener('keyup', (e) => {
    console.log(e)
    switch(e.key) {
        case "a":
            player.controls.left.pressed = false;
            break;
        case "d": 
            player.controls.right.pressed = false;
            break;
        case "w":
            player.controls.up.pressed = false;
            break;
        case " ":
            player.controls.quickAttack.pressed = false;
            break;
        case "Shift": 
            player.controls.parry.pressed = false;
            break;
        case "ArrowLeft":
            enemy.controls.left.pressed = false;
            break;
        case "ArrowRight": 
            enemy.controls.right.pressed = false;
            break;
        case "ArrowUp":
            enemy.controls.up.pressed = false;
            break;
        }

})