// Basic OO Pong
// by Pippin Barr
//
// A primitive implementation of Pong with no scoring system
// just the ability to play the game with the keyboard.
//
// Arrow keys control the right hand paddle, W and S control
// the left hand paddle.
//
// Written with JavaScript OOP.

// Variable to contain the objects representing our ball and paddles
var ball;
var leftPaddle;
var rightPaddle;

/////////////////// NEW //////////////////////
var scoreLeft = 0;
var scoreRight = 0;
var potatoBall;
var ovenBg;
var handPaddle;
var fireEnemy;
var coldHelp;
var welcomeText = "HOT POTATO PONG";
var instructionsText = "Don't let the potato fall! Or someone gets hurt...";
var startText = "Press spacebar to begin!";


// preload()
//
function preload() {
  ovenBg = loadImage("assets/images/oven.png");
  potatoBall = loadImage("assets/images/potato.png");
  handPaddle = loadImage("assets/images/hand.png");
  fireEnemy = loadImage("assets/images/fire.png");
  coldHelp = loadImage("assets/images/cold.png");
}
////////////////// END ////////////////////


// setup()
//
// Creates the ball and paddles
function setup() {
  createCanvas(640,480);
  // Create a ball
  ball = new Ball(width/2,height/2,5,5,50,5);
  // Create the right paddle with UP and DOWN as controls
  rightPaddle = new Paddle(width-10,height/2,10,60,10,DOWN_ARROW,UP_ARROW);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  leftPaddle = new Paddle(0,height/2,10,60,10,83,87);
}

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {

  //////////////// NEW /////////////////
  background(ovenBg);

  //displayBeginning();
  /////////////// END //////////////////

  leftPaddle.handleInput();
  rightPaddle.handleInput();

  ball.update();
  leftPaddle.update();
  rightPaddle.update();

  if (ball.isOffScreen()) {

    ///////////////////// NEW /////////////////////
    if (ball.isOffScreenRight()) {
      ball.updateScoreLeft();
    }

    else if (ball.isOffScreenLeft()) {
      ball.updateScoreRight();
    }
    //////////////////// END //////////////////////

    ball.reset();
  }

  ball.handleCollision(leftPaddle);
  ball.handleCollision(rightPaddle);

  ///////////////////// NEW ///////////////////////
  ball.displayScore();
  //////////////////// END ////////////////////////

  ball.display();
  leftPaddle.display();
  rightPaddle.display();
}

//function displayBeginning() {
//  background(ovenBg);
//  fill(255);
//  textSize(50);
//  text(welcomeText,width/12,height/2);
//  textSize(20);
//  text(instructionsText,width/20,height-200);
//  textSize(30);
//  text(startText,width/6,height-100);

//  if (keyIsDown(32)) {
//    displayBeginning() = false;
//  }
//}
