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
/////////////// END ///////////////

// setup()
//
// Creates the ball and paddles
function setup() {
  createCanvas(640,480);
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

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  background(0);

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
      }

      if (ball.x > width) {
        scoreLeft = scoreLeft + 1;
        console.log(scoreLeft);
      }
    ///////////// END ///////////////

    ball.reset();
  }

  ball.handleCollision(leftPaddle);
  ball.handleCollision(rightPaddle);

  ball.display();
  leftPaddle.display();
  rightPaddle.display();
}
