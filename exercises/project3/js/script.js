/******************************************************

Game Prototype 1 - Testing moving avatar and triggers
Alexandra Salois

A character moving around, triggering various situation depending on location.

Physics-based movement, keyboard controls, random movement / text spawn, screen wrap.

******************************************************/

// Setting up the variables

var playerX;
var playerY;
var playerVX = 0;
var playerVY = 0;
var playerSpeed = 6;
var playerRadius = 20;

///////////////////////////////////

// Setting up canvas and design of location

function preload() {
  // No images at the moment
}

///////////////////////////////////

function setup() {
  createCanvas(600,600);
  noStroke();
  loadBackground();
  loadAvatar();
}

///////////////////////////////////

function draw() {
  moveAvatar();
  updateAvatar();
  drawAvatar();
}

///////////////////////////////////
// Defining all the functions in "Draw"
///////////////////////////////////

function loadAvatar() {
// Position the avatar
  playerX = width/2;
  playerY = height-100;
}

////////////////////////////////////

function drawAvatar() {
// Draw the avatar
  fill(255);
  noStroke();
  ellipseMode(RADIUS);
  ellipse(playerX,playerY,playerRadius,playerRadius);
}

/////////////////////////////////////

function loadBackground() {
// Draw the background
  background(0);

  // make some stars!
  for (var i = 0; i < 2000; i++) {
    var starX = random(0,600);
    var starY = random(0,300);
    noStroke();
    fill(255);
    ellipse(starX, starY, 2, 2);
  }

  // create a nice city
  fill(20);
  rect(0,140,60,300);
  rect(60,200,80,300);
  rect(140,250,50,300);
  rect(190,125,75,300);
  rect(265,190,100,300);
  rect(365,120,50,300);
  rect(415,155,60,300);
  rect(475,125,95,300);
  rect(570,150,30,300);
  fill(0);
  rect(0,300,width,300);
}

/////////////////////////////////////////

function moveAvatar() {
// make the avatar move using the arrow keys.

// vertical
  if (keyIsDown(UP_ARROW)) {
    playerVY = -playerSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    playerVY = playerSpeed;
  }
  else {
    playerVY = 0;
  }

// horizontal
  if (keyIsDown(LEFT_ARROW)) {
    playerVX = -playerSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    playerVX = playerSpeed;
  }
  else {
    playerVX = 0;
  }
}

//////////////////////////////////////////

function updateAvatar() {
  playerX = playerX + playerVX;
  playerY = playerY + playerVY;
}
