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

function setup() {
  createCanvas(600,600);
  noStroke();
  loadBackground();
}

function draw() {
  loadAvatar();

}

function loadAvatar() {
  playerX = width/2;
  playerY = height-100;
  fill(255);
  noStroke();
  ellipseMode(RADIUS);
  ellipse(playerX,playerY,playerRadius,playerRadius);
}

function loadBackground() {
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
