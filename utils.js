function checkForDead(...characters) {
    for (const character of characters) {
        if (character.currentHealth <= 0)
        
        //draw death animation
        return character
    }
}

function detectForCollsion(attacker, target) {
    if (attacker.hasOwnProperty("attackBox")){

        if (attacker.position.x < target.position.x &&
            attacker.attackBox.x + attacker.attackBox.width > target.position.x &&
            attacker.attackBox.y >= target.position.y)
            {
                target.currentHealth -= 10;
                console.log("hit!")
                console.log(target.currentHealth)
                console.log(target.initialHealth)
                target.healthBar.style.width = target.currentHealth / target.initialHealth *100 + "%";
                console.log(target.healthBar.style.width)
            }
        if (attacker.position.x > target.position.x &&
            attacker.attackBox.x < target.position.x + target.width 
            && attacker.attackBox.y >= target.position.y
            ) {
                target.currentHealth -= 10;
                target.healthBar.style.width = target.currentHealth / target.initialHealth *100 + "%";
                console.log("hit!")
            }   
        delete attacker.attackBox
    }
}

window.addEventListener('keydown', ({key}) => {
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

