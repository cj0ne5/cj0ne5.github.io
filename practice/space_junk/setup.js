// Canvas setup
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');


// Planet center and radius
const planet = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 200
};

// Sample game objects (replace with your arrays)
const ships = [];

const junk = [];

function addNewShip(){
    ships.push(
        {
            x: 0,
            y: 0,
            angle: 3*Math.PI/2,
            orbitRadius: Math.random()*150 + 250,
            orbitSpeed: Math.random() / 100,
            size: Math.random() + 0.7,
            alive:true
        }
    )
}

function addNewJunk(){
    junk.push(
        {
            x: 800,
            y: Math.random()*800,
            dx: -1,
            dy: Math.random()*2-1,
            size: Math.random()*2 + 2,
            alive:true
        }
    )
}

function orbitShips(){
  ships.forEach(ship => {
    ship.angle += ship.orbitSpeed;
    ship.x = planet.x + Math.cos(ship.angle) * ship.orbitRadius;
    ship.y = planet.y + Math.sin(ship.angle) * ship.orbitRadius;
  });
}

function moveJunk(){
    junk.forEach(j => {
        j.x += j.dx;
        j.y += j.dy;
    });
}

function drawShipsAndJunk(){
    ships.forEach(ship => {
        if (ship.alive){
            drawShip(ship.x, ship.y, ship.angle + Math.PI/2, ship.size);
        }
    });
    
    junk.forEach(j => {
        if(j.alive){
            drawJunk(j.x, j.y, j.rotation, j.size);
        }
    });
}

//press p to pause
function handleKeyDown(e){
    if(e.key === 'p' || e.key === 'P') {
        gameRunning = !gameRunning;
    }
}

document.addEventListener('keydown', handleKeyDown);