/******************************************************

Game - Chaser
Pippin Barr

A simple game of cat and mouse.

Physics-based movement, keyboard controls, health/stamina,
sprinting, random movement, screen wrap.

******************************************************/

// Track whether the game is over
var gameOver = false;

// Player position, size, velocity
var playerX;
var playerY;
var playerRadius = 25;
var playerVX = 0;
var playerVY = 0;
var playerMaxSpeed = 2;
// Player health
var playerHealth;
var playerMaxHealth = 255;
// Player fill color
var playerFill = 50;

// Prey position, size, velocity
var preyX;
var preyY;
var preyRadius = 25;
var preyVX;
var preyVY;
////////////// Made the prey a bit faster ////////////
var preyMaxSpeed = 6;
// Prey health
var preyHealth;
var preyMaxHealth = 100;
// Prey fill color
var preyFill = 200;

// Amount of health obtained per frame of "eating" the prey
var eatHealth = 10;
// Number of prey eaten during the game
var preyEaten = 0;

// Adding the new speed for the sprint option
var playerSprint = 8;

// Preparing the noise variables
var tx;
var ty;

/////////////////////////// New images for the player and prey, and background //////////////////
var preyGhost;
var playerHunter;
var forestBG;

// setup()
//
// Sets up the basic elements of the game
/////////////////////////// Load the images for the game /////////////////////////
function preload() {
  preyGhost = loadImage("assets/images/ghost.png");
  playerHunter = loadImage("assets/images/ghosthunter.png");
  forestBG = loadImage("assets/images/forest.png");
}


function setup() {
  createCanvas(500,500);

  noStroke();

  setupPrey();
  setupPlayer();

  ///////////////// Setting up the noise for the prey ////////////////////
  tx = random(0,1000);
  ty = random(0,1000);
}
  /////////////////// END NEW //////////////////////

// setupPrey()
//
// Initialises prey's position, velocity, and health
function setupPrey() {
  preyX = width/5;
  preyY = height/2;
  preyVX = -preyMaxSpeed;
  preyVY = preyMaxSpeed;
  preyHealth = preyMaxHealth;
}

// setupPlayer()
//
// Initialises player position and health
function setupPlayer() {
  playerX = 4*width/5;
  playerY = height/2;
  playerHealth = playerMaxHealth;
}

// draw()
//
// While the game is active, checks input
// updates positions of prey and player,
// checks health (dying), checks eating (overlaps)
// displays the two agents.
// When the game is over, shows the game over screen.

///////////////////// Add text on what to do... //////////////////////
function draw() {
  var findProof
  findProof = "Find evidence! Prove everyone wrong! Use the flashlight..."

  background(forestBG);
  fill(255);
  textSize(15);
  textAlign(LEFT);
  text(findProof, width-490, height-480);

  ////////////// Adding a counter ///////////
  fill(255);
  textSize(50);
  textAlign(RIGHT);
  text(preyEaten, width-20, height-450);

  if (!gameOver) {
    handleInput();

    movePlayer();
    movePrey();

    updateHealth();
    checkEating();

    drawPrey();
    drawPlayer();
  }
  else {
    showGameOver();
  }
}

// handleInput()
//
// Checks arrow keys and adjusts player velocity accordingly
function handleInput() {
  // Making the player move

  /////////////// Add the sprint option (vertical) ///////////////////
  if ((keyIsDown(SHIFT)) && (keyIsDown(UP_ARROW))) {
    playerVY = -playerSprint;
  }
  else if ((keyIsDown(SHIFT)) && (keyIsDown(DOWN_ARROW))) {
    playerVY = playerSprint;
  }
  else if (keyIsDown(UP_ARROW)) {
    playerVY = -playerMaxSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    playerVY = playerMaxSpeed;
  }
  else {
    playerVY = 0;
  }

///////////// Add the sprint option (horizontal)//////////////////
  if ((keyIsDown(SHIFT)) && (keyIsDown(LEFT_ARROW))) {
    playerVX = -playerSprint;
  }
  else if ((keyIsDown(SHIFT)) && (keyIsDown(RIGHT_ARROW))) {
    playerVX = playerSprint;
  }
  else if (keyIsDown(LEFT_ARROW)) {
      playerVX = -playerMaxSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
      playerVX = playerMaxSpeed;
  }
  else {
      playerVX = 0;
  }
  ///////////// END NEW /////////////////
 }

// movePlayer()
//
// Updates player position based on velocity,
// wraps around the edges.
function movePlayer() {
  // Update position
  playerX += playerVX;
  playerY += playerVY;

  // Wrap when player goes off the canvas
  if (playerX < 0) {
    playerX += width;
  }
  else if (playerX > width) {
    playerX -= width;
  }

  if (playerY < 0) {
    playerY += height;
  }
  else if (playerY > height) {
    playerY -= height;
  }
}

// updateHealth()
//
// Reduce the player's health (every frame)
// Check if the player is dead
function updateHealth() {
  // Reduce player health, constrain to reasonable range, add faster decreasing health when sprinting

  ////////////// NEW ///////////////
  if (keyIsDown(SHIFT)) {
    playerHealth = constrain(playerHealth - 2,0,playerMaxHealth);
  }

  else playerHealth = constrain(playerHealth - 0.5,0,playerMaxHealth);
  ////////////// END NEW ///////////////

  // Check if the player is dead
  if (playerHealth === 0) {
    // If so, the game is over
    gameOver = true;
  }
}

// checkEating()
//
// Check if the player overlaps the prey and updates health of both
function checkEating() {
  // Get distance of player to prey
  var d = dist(playerX,playerY,preyX,preyY);
  // Check if it's an overlap
  if (d < playerRadius + preyRadius) {
    // Increase the player health
    playerHealth = constrain(playerHealth + eatHealth,0,playerMaxHealth);
    // Reduce the prey health
    preyHealth = constrain(preyHealth - eatHealth,0,preyMaxHealth);

    // Check if the prey died
    if (preyHealth === 0) {
      // Move the "new" prey to a random position
      preyX = random(0,width);
      preyY = random(0,height);
      // Give it full health
      preyHealth = preyMaxHealth;
      // Track how many prey were eaten
      preyEaten++;
    }
  }
}

// movePrey()
//
// Moves the prey based on random velocity changes --> Changing random to noise
function movePrey() {
  // Change the prey's velocity at random intervals

    /////////// NEW /////////////
    preyVX = map(noise(tx),0,1,-preyMaxSpeed,preyMaxSpeed);
    preyVY = map(noise(ty),0,1,-preyMaxSpeed,preyMaxSpeed);

    tx += 0.05;
    ty += 0.05;

    //////////// END NEW /////////////

  // Update prey position based on velocity
  preyX += preyVX;
  preyY += preyVY;

  // Screen wrapping
  if (preyX < 0) {
    preyX += width;
  }
  else if (preyX > width) {
    preyX -= width;
  }

  if (preyY < 0) {
    preyY += height;
  }
  else if (preyY > height) {
    preyY -= height;
  }
}

// drawPrey()
//
////////////////////// Draw the prey as a cute ghost //////////////////////
function drawPrey() {
  tint(255,preyHealth);
  image(preyGhost,preyX,preyY,preyRadius*2, preyRadius*2);

}


// drawPlayer()
//
/////////////////// Draw the player as a cute ghost hunter ////////////////////////
function drawPlayer() {
  tint(255,playerHealth);
  image(playerHunter,playerX,playerY,playerRadius*5, playerRadius*5);
}

// showGameOver()
//
// Display text about the game being over!
function showGameOver() {
  textSize(32);
  textAlign(CENTER,CENTER);
  fill(255);
  var gameOverText = "GAME OVER\n";
  gameOverText += "You found " + preyEaten + " ghosts\n";
  gameOverText += "before you got scared to death."
  text(gameOverText,width/2,height/2);
}
