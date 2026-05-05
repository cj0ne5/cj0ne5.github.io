let shipTimer = 0;
let junkTimer = 0;
let gameRunning = true;
let myMusic = new sound("music.wav");

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}
    
function animate() {
  if(gameRunning){
    shipTimer += 1;
    junkTimer += 1;

    // Update positions
    orbitShips();
    moveJunk()
    
    // Draw everything
    drawBackground();
    drawShipsAndJunk();

    //spawn new ships and junk
    if(shipTimer == 200){
      addNewShip();
      shipTimer = 0;
    }

    if(junkTimer == 100){
      addNewJunk();
      junkTimer = 0;
    }

    //check collisions
    checkCollisions()
  }
  requestAnimationFrame(animate);
}

myMusic.play();
// Start the game
animate();
