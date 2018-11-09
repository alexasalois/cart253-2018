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
// scores of the paddles
var scoreLeft = 0;
var scoreRight = 0;

// var of the images used
var potatoBall;
var ovenBg;
var handPaddle;
var fireEnemy;
var snowflake;

// var for the texts of titlescreens
var welcomeText = "HOT  POTATO  PONG";
var instructionsText = "Don't let the potato fall! Or someone gets hurt...";
var controlsText = "E or left arrow to shoot!";
var startText = "Press spacebar to begin!";
var endText = "OUCH!";
var endTextRestart= "Press spacebar to try again!";

// var for functionning title screens
var gameOver;
var showTitleScreen= true;
var showEndScreen= false;

// var for snowflake arrays
var snowflakeLeft = [];
var snowflakeRight = [];
var rightSnowflakeActive = false;
var leftSnowflakeActive = false;

// var for fire array
var fires = [];
var fireEnemySpawnActive = false;

// var for SFX
var paddleHit;
var fireSFX;
var snowflakeSFX;

// preload()
//
function preload() {
  ovenBg = loadImage("assets/images/oven.png");
  potatoBall = loadImage("assets/images/potato.png");
  handPaddle = loadImage("assets/images/hand.png");
  fireEnemy = loadImage("assets/images/fire.png");
  snowflake = loadImage("assets/images/coldResized.png");
  paddleHit = new Audio("assets/sounds/paddleHit.wav");
  fireSFX = new Audio("assets/sounds/fireSFX.wav");
  snowflakeSFX = new Audio("assets/sounds/snowflakeSFX.wav");
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

  if (gameOver == false) {
    checkScore();
    if (rightSnowflakeActive == true) {

      for (var i = 0; i < snowflakeRight.length; i++) {
        snowflakeRight[i].display();
        snowflakeRight[i].update();
        snowflakeRight[i].handleCollision();
        }
      }

    if (leftSnowflakeActive == true) {

      for (var i = 0; i < snowflakeLeft.length; i++) {
        snowflakeLeft[i].display();
        snowflakeLeft[i].update();
      }
    }
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
        if (scoreLeft % 2 == 0) {
          fires.push(new fireEnemySpawn(random(width),random(height),5,5,65,10))
        }
      }

      else if (ball.isOffScreenLeft()) {
      ball.updateScoreRight();
        if (scoreRight % 2 == 0) {
          fires.push(new fireEnemySpawn(random(width),random(height),5,5,65,10))
        }
      }
      //////////////////// END //////////////////////

      ball.reset();
      }

      ball.handleCollision(leftPaddle);
      ball.handleCollision(rightPaddle);

      ///////////////////// NEW ///////////////////////
      // score is displayed on screen
      ball.displayScore();
      //////////////////// END ////////////////////////

      ball.display();
      leftPaddle.display();
      rightPaddle.display();

      for (var i = 0; i < fires.length; i++) {
        fires[i].display();
        fires[i].update();
        fires[i].handleCollision();
        }
      }

  //////////////////// NEW /////////////////////////
    else if (showTitleScreen == true) {
    displayBeginning();
    }

  else {
  displayEnding();
  }
}

// beginning text
function displayBeginning() {
  background(ovenBg);
  textFont("Monoton");
  fill(255);
  textSize(50);
  text(welcomeText,width/12,height/2);
  textSize(20);
  text(instructionsText,width/20,height-200);
  textSize(30);
  text(startText,width/6,height-100);
  text(controlsText,width/6,height-50);
  gameOver = true;
  showTitleScreen = true;
}

// ending text
function displayEnding() {
  ball.vx = 0;
  ball.vy = 0;
  background(ovenBg);
  fill(255);
  textSize(50);
  text(endText,width/3,height/2);
  textSize(20);
  text("You dropped it "+(scoreLeft+scoreRight)+" times before it exploded.",width/10,height-200);
  textSize(30);
  text(endTextRestart,width/10,height-100);
  gameOver = true;
}

// for the title screen --> start the game
function keyPressed() {
  if (showTitleScreen == true) {
    if (keyCode == 32) {
      gameOver = false;
      showEndScreen = false;
      showTitleScreen = false;
    }
  }

  // for the end screen --> restart the game
  if (showEndScreen == true) {
    if (keyCode == 32) {
      reset();
    }
  }

  // for shooting the snowflakes (array)
  if (gameOver == false) {
    if (keyCode == 37) {
      rightSnowflakeActive = true;
      snowflakeRight.push(new Snowflake(rightPaddle.x,rightPaddle.y,-5,25,6));
      snowflakeSFX.play();
    }
    if (keyCode == 69) {
      leftSnowflakeActive = true;
      snowflakeLeft.push(new Snowflake(leftPaddle.x,leftPaddle.y,5,25,6));
      snowflakeSFX.play();
    }
  }

}

// when the game restarts, put everything back to zero.
function reset() {
  ball.vx = 5;
  ball.vy = 5;
  snowflakeRight = [];
  snowflakeLeft = [];
  fires = [];
  gameOver = false;
  showEndScreen = false;
  showTitleScreen = false;
  leftPaddle.y = height/2;
  rightPaddle.y = height/2;
  scoreLeft = 0;
  scoreRight = 0;
}

// To set up the game over and end screen conditions
function checkScore() {
  if (scoreLeft > 10 || scoreRight > 10) {
    gameOver = true;
    showEndScreen = true;
  }
}
//////////////////// END /////////////////////
