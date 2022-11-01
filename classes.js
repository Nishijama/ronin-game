
class Sprite {
    constructor({position, color, spriteSource}) {
        this.position = position;
        color ? this.color = color : this.color = 'orange';
        this.height = 0;
        this.width = 0;
        this.image = new Image()
        this.image.src = spriteSource
        this.image.width = 50
        this.image.height= 150
        
    }
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y);
    }
}



class Character extends Sprite {
    constructor(settings) {
        super(settings); 
        // size
        this.velocity = {x: 0, y: 0};
        this.height = 150;
        this.width = 40;

        //controls
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
        this.initialHealth = settings.health;
        this.currentHealth = this.initialHealth;
    }

    draw() {
        c.fillStyle = "orange"
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    attack() {
        // create an attack-box 
        this.attackBox = {
            x: this.position.x + this.width/2,
            y: this.position.y + 10,
            width: 100,
            height: 40
        } 
        // define attack direction
        if (this.direction === "right") {
            this.attackBox.x = this.position.x + this.width/2;
        } else {
            this.attackBox.x = this.position.x - (90 - this.width/2)
        }
        // show the attack
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

        if(this.currentHealth > 0) this.draw()
        
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
        this.controls.quickAttack.pressed = false;
        if (this.controls.parry.pressed) this.parry();
    }
}

class Player extends Character {
    constructor(settings) {
        super(settings);
        this.position = { x: 100, y: 100 }

        //game
        this.name = settings.name
        this.healthBar = document.getElementById('player-health-bar')
        this.healthBar.style.width = this.health+"%";
    }
}

class Opponent extends Character {
    constructor(settings) {
        super(settings);
        this.position = { x: (canvas.width-33)-100, y: 200 };

        this.name = settings.name
        this.healthBar = document.getElementById('enemy-health-bar')
        this.healthBar.style.width = this.health+"%";
    }
}