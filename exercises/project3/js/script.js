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
}

function draw() {
  background(0);
  loadAvatar();
}

function loadAvatar() {
  playerX = width/2;
  playerY = height-200;
  fill(255);
  noStroke();
  ellipseMode(RADIUS);
  ellipse(playerX,playerY,playerRadius,playerRadius);
}
