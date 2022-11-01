//handle mobile
window.addEventListener('resize', () => {
    if ( window.innerWidth < window.innerHeight) {
        alert("Flip you phone :)")
    }
})


//project initialization
const canvas = document.getElementById("canvas1")
const c = canvas.getContext('2d')
canvas.width = RESOLUTION.WIDTH;
canvas.height = RESOLUTION.HEIGHT;


const background = new Sprite({position: { x: 0, y: 0 }, spriteSource:"./images/background.jpg"})
const player = new Player(CHARACTERS.Musashi);
const enemy = new Opponent(CHARACTERS.Kojiro);

document.getElementById("player-name").innerText = player.name;
document.getElementById("opponent-name").innerText = enemy.name;


function animate() {
    background.draw();
    player.update();
    enemy.update();
    window.requestAnimationFrame(animate)
    detectForCollsion(player, enemy)
    detectForCollsion(enemy, player)
    checkForDead(enemy, player)
}

animate();

