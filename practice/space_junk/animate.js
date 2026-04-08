let shipTimer = 0;
let junkTimer = 0;
let gameRunning = true;

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

// Start the game
animate();