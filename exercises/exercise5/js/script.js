// Basic OO Pong - Modified
// by Pippin Barr & Alexandra Salois
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

/////////////// NEW ///////////////
var scoreRight = 0;
var scoreLeft = 0;
var speedChange = 6;
var boopSound;
var endSound;
var aliveSound;
/////////////// END ///////////////

function preload() {
  boopSound = new Audio("../assets/sounds/boop.wav");
  endSound = new Audio("../assets/sounds/end.wav");
  aliveSound = new Audio("../assets/sounds/alive.wav");
}

// setup()
//
// Creates the ball and paddles
function setup() {
  createCanvas(640,480);
  textFont("VT323");
  startX = width/2;
  startY = height/2;

  // Create a ball
  ball = new Ball(width/2,height/2,5,5,10,5);
  // Create the right paddle with UP and DOWN as controls

  ///////////////// NEW (just the color) //////////////////
  rightPaddle = new Paddle(width-10,height/2,10,60,10,DOWN_ARROW,UP_ARROW,color(255,0,0));
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  leftPaddle = new Paddle(0,height/2,10,60,10,83,87,color(0,255,0));
  //////////////// END ////////////////////
}

//////////////// NEW //////////////////
function displayScore() {
  text("You avoided help\n" + scoreRight + "\n times, please do something.",width/4,height/6);
}
/////////////// END /////////////////

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  background(0);

  ////////////// NEW //////////////
  displayScore();
  ////////////// END ////////////////

  leftPaddle.handleInput();
  rightPaddle.handleInput();

  ball.update();
  leftPaddle.update();
  rightPaddle.update();

  if (ball.isOffScreen()) {

    ///////////// NEW ////////////////
      if (ball.x + ball.size < 0) {
        scoreRight = scoreRight + 1;
        console.log(scoreRight);
        rightPaddle.h = rightPaddle.h - 10;
        ball.vx = -ball.vx;
        ball.vy = random(speedChange, -speedChange);
        ball.size = ball.size - 5;
      }

      if (ball.x > width) {
        scoreLeft = scoreLeft + 1;
        console.log(scoreLeft);
        leftPaddle.h = leftPaddle.h + 10;
        ball.vx = -ball.vx;
        ball.vy = random(speedChange,-speedChange);
        ball.size = ball.size + 15;

      }
    /////////////// END /////////////////

    ball.reset();
  }

  ball.handleCollision(leftPaddle);
  ball.handleCollision(rightPaddle);
  ball.display();

  if (leftPaddle.h > 130) {
    background(0);
    fill(255);
    textSize(40);
    text("We're so proud of you.",100,height/2);
    fill(255,0,0);
    textSize(35);
    text("It will get better: 1 866-277-3553", width/9,height-100);
    ball.vx = 0;
    ball.vy = 0;
    aliveSound.play();
  }


  leftPaddle.display();

  if (rightPaddle.h === 0) {
    background(0);
    fill(255);
    textSize(40);
    text("Why didn't you do anything?",100, height/2);
    fill(255,0,0);
    textSize(30);
    text("Please, we are here for you: 1 866-277-3553", width/9,height-100);
    ball.vx = 0;
    ball.vy = 0;
    endSound.play();
  }
    rightPaddle.display();
  }
