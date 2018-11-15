/******************************************************

Game Prototype 1
Alexandra Salois

******************************************************/

// Setting up the variables

var playerX;
var playerY;
var playerVX = 0;
var playerVY = 0;
var playerSpeed = 6;
var playerRadius = 20;
var gameOver = false;
var gameStarting = false;
var gameState = 0;
var objectX = 300;
var objectY =  300;
///////////////////////////////////

// Setting up canvas and design of location

function preload() {
  firstBackgroundImage = loadImage("assets/images/firstBackground.jpg")
}

///////////////////////////////////

function setup() {
  createCanvas(600,600);
  noStroke();

//  loadAvatar();
//  drawObject();
}

///////////////////////////////////

function draw() {

  if (gameOver == false) {
//  background(firstBackground);

switch(gameState) {
  case 0:
  loadBackground();
  objectTrigger();
  drawText();
  break;
  case 1:
  firstBackground();
  break;

}



  console.log("hello? is anyone there?");

//  moveAvatar();
//  updateAvatar();
//  drawAvatar();
//  drawObject();
  }

  else {
    gameOver = true;
  }
}

///////////////////////////////////


// Defining all the functions in "Draw"
///////////////////////////////////

//function loadAvatar() {
// Position the avatar
//  playerX = width/2;
//  playerY = height-100;
//}

////////////////////////////////////

//function drawAvatar() {
// Draw the avatar
//  push();
//  fill(255);
//  noStroke();
//  ellipseMode(RADIUS);
//  ellipse(playerX,playerY,playerRadius,playerRadius);
//  pop();
//}

/////////////////////////////////////

function loadBackground() {
// Draw the background
  background(0);

  // make some stars!
  for (var i = 0; i < 500; i++) {
    var starX = random(0,600);
    var starY = random(0,600);
    noStroke();
    fill(255);
    ellipse(starX, starY, 2, 2);
  }

  // create a nice city
//  fill(0);
//  rect(0,140,60,200);
//  rect(60,200,80,140);
//  rect(140,250,50,90);
//  rect(190,125,75,215);
//  rect(265,190,100,150);
//  rect(365,120,50,220);
//  rect(415,155,60,185);
//  rect(475,125,95,215);
//  rect(570,150,30,190);
}

/////////////////////////////////////////

function objectTrigger() {
  fill(255,0,0);
  ellipse(objectX,objectY,50,50);
}

/////////////////////////////////////////

function drawText() {
  var warningText = "DON'T PRESS ITDON'T DON'T DON'T DON'T DON'T DON'T TRUST IT DON'T TOUCH IT DON'T TRUST IT DONB PRNES IT DONT TRSUT IT TRSUT STRU TRUSH TRUSUT TRSUT TRUST ME";
  textSize(25);
  text(warningText,mouseX,mouseY,300,500);
}

/////////////////////////////////////////

function mousePressed() {
  console.log("mousepressed");
  // Check if mouse is inside the circle
  var d = dist(mouseX, mouseY, objectX, objectY);

  if (d < 25) {
    gameStarting = true;
    gameState++;
    }
  }


function firstBackground() {
  background(255);
  fill(0);
  textSize(20);
  console.log("background");
  text("HI! WELCOME TO MY GAME :D", width/6,height/2);
  text("What's your name?",width/3,height-270);
}
/////////////////////////////////////////

//function moveAvatar() {
// make the avatar move using the arrow keys.

// vertical
//  if (playerY === 300 - playerRadius/2) {
//    playerVY = 0;
//  }
//  else if (keyIsDown(UP_ARROW)) {
//    playerVY = -playerSpeed;
//  }
//  else if (keyIsDown(DOWN_ARROW)) {
//    playerVY = playerSpeed;
//  }
//  else {
//    playerVY = 0;
//  }

// horizontal
//  if (keyIsDown(LEFT_ARROW)) {
//    playerVX = -playerSpeed;
//  }
//  else if (keyIsDown(RIGHT_ARROW)) {
//    playerVX = playerSpeed;
//  }
//  else {
//    playerVX = 0;
//  }
//}

//////////////////////////////////////////

//function updateAvatar() {
  // update its position based on the velocity
//  playerX = playerX + playerVX;
//  playerY = playerY + playerVY;
//}

//////////////////////////////////////////

//function drawObject(redball) {
  // draw the red object,check if they are touching each other
//  var objectX = random(0,width);
//  var objectY = random(height/2,height);
//  var d = dist(playerX,playerY,objectX,objectY);

//  if (d < playerRadius*2) {
//  fill(255,0,0);
//  ellipse(objectX,objectY,playerRadius,playerRadius);
//  }
//}

////////////////////////////////////////////
