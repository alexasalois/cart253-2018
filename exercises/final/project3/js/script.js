//////////////////////////

//Project 3: Part 2
//by Alexandra Salois

//A shooter-style concept...

///////////////////////////

// Setting up the variables
var angle = 0;
var scoreAvatar = 0;
var projectiles = [];
var objectX = 150;
var objectY =  100;
var zone1X = 80;
var zone1Y = 20;
var zone2X = 45;
var zone2Y = 200;

var gameOver = false;
var gameStarting = false;
var gameState = 0;

// player input
var nameInput;
var friendInput;
var foodInput;
var button1;

var nameValue;
var friendValue;
var foodValue;

var r,g,b;
var avatarShooting;
var avatarResting;
var computerBackground;
var firstBackground;

var once = true;

function preload() {
  // loading the images
  computerBackground = loadImage("assets/images/firstBackground.jpg");
  firstBackgroundImage = loadImage("assets/images/pinkbg.png")
  avatarShooting = loadImage("assets/images/cuteavatarshooting.png");
  avatarResting = loadImage("assets/images/cuteavatar.png");
}



function setup() {
  // creating the canvas, setting up the starting color for the target (randomized)
  createCanvas(1100,700);
  r = random(0,255);
  g = random(0,255);
  b = random(0,255);
//  setupNameInput();



  //spawn the target and the avatar
  target = new Target(0,75,20,20,color(r,g,b));
  avatar = new Avatar(width/2,height-35,45,75,10,LEFT_ARROW,RIGHT_ARROW,UP_ARROW,10);
 }

function draw() {
  if (gameOver == false) {

    switch(gameState) {
        case 0:
        loadBackground();
        objectTrigger();
        drawText();
        checkMouseClick();
        break;

        case 1:
        firstBackground();
        if(once){
          setupNameInput();
          once=false;
        }

        break;

        case 2:
        secondBackground();
        avatar.handleInput();
        target.moveTarget();
        avatar.moveAvatar();

        // reset the target to the left of the screen if it goes off screen
          if (target.isOffScreen() == true) {
              target.reset();
              }

                // display the target and avatar
                target.display();
                avatar.display();

                // spawn the projectiles using array, store all the "shots" inside
                for (var i = 0; i < projectiles.length; i++) {
                  projectiles[i].display();
                  projectiles[i].moveProjectile();
                  projectiles[i].handleCollision(target);
                  }
                }
            }

        else {
        gameOver = true;
      }
    }

      // Warn the player with text on mouse
      function drawText() {
        var warningText = "DON'T PRESS ITDON'T DON'T DON'T DON'T DON'T DON'T TRUST IT DON'T TOUCH IT DON'T TRUST IT DONB PRNES IT DONT TRSUT IT TRSUT STRU TRUSH TRUSUT TRSUT TRUST ME";
        textSize(25);
        text(warningText,mouseX,mouseY,300,500);
      }

      // Show the computer desktop
      function loadBackground() {
        background(computerBackground);
      }

      // Show the first background with the pink clouds. Make player enter their info
      function firstBackground() {
        push();
        background(firstBackgroundImage);
        fill(255);
        textFont('Fascinate Inline')
        textAlign(CENTER,CENTER)
        textSize(150);
        text("Hello!", width/2,height/4);
        textSize(80);
        text("WELCOME TO MY GAME", width/2,height/2.5);
        textSize(60);
        text("Let's get to know each other!",width/2,height-300);
        textSize(30);
        text("Tell me your name, bestfriend, and most awesome food!", width/2,height-250)
        pop();
      }

      // Define the zone that will start the game if clicked
      function objectTrigger() {
        fill(255,0,0,0.1);
        noStroke();
        ellipse(objectX,objectY,50,50);
      }

      // Define the zones that will send alert message
      function checkMouseClick() {
        fill(255,0,0,0.1);
        rectMode(CENTER);
        noStroke();
        rect(zone1X,zone1Y,200,50);
        rect(zone2X,zone2Y,65,300);
      }

      function mousePressed() {
        // Check if mouse is inside the circle
        var d = dist(mouseX, mouseY, objectX, objectY);
        if (d < 25) {
          gameStarting = true;
          gameState++;
        }

        // Check if the mouse is clicking the other apps, if so BLOCKED
        var conditionZone1 = (mouseX > 0 && mouseX < 200 && mouseY > 0 && mouseY < 50);
        var conditionZone2 = (mouseX > 0 && mouseX < 65 && mouseY > 0 && mouseY < 300);

        if (conditionZone1 === true) {
          window.alert("Action Blocked!")
        }

        if (conditionZone2 === true) {
          window.alert("Action Blocked!")
        }
      }

      // Set up the player's personal info
      function setupNameInput() {
      //  textAlign(CENTER,CENTER);
        textSize(12);
        textFont('Maven Pro')
        fill(0);

          nameInput = createInput();
          nameInput.position(width/2,550);

          friendInput = createInput();
          friendInput.position(width/2,580);

          foodInput = createInput();
          foodInput.position(width/2,610);

          // make the button to save the info
          button1 = createButton('submit');
          button1.position(width/2, 640);
          button1.mousePressed(sub);
      }

      // info now saved in variable
      function sub() {
          nameValue = nameInput.value();
          friendValue = friendInput.value();
          foodValue = foodInput.value();
          console.log(nameValue);
          gameState++;

          // Remove the input slots for the mini game
          nameInput.remove();
          friendInput.remove();
          foodInput.remove();
          button1.remove();
      }


      // Make the second screen of the game, prepare mini game
      function secondBackground() {
        imageMode(CORNER);
        fill(255);
        background(firstBackgroundImage);
        textFont('Fascinate Inline');
        textSize(50);
        text("Nice to meet you "+(nameValue)+"!",20,60);
        textSize(30);
        text("Just shoot the gumdrops to collect candy pieces!",40,90);
        textSize(35);
        text("Don't get hit!",250,140);
        push();
        textSize(100);
        textAlign(RIGHT);
        text(scoreAvatar,width-10,height-630)
        pop();
      }

      //shoot the projectile if the up arrow is pressed
      function keyPressed() {
        if (keyCode == 38) {
          projectiles.push(new Projectile(avatar.x,avatar.y,-5,15,5));
          avatar.setImage(avatarShooting);
          }

        else {
        avatar.setImage(avatarResting);
        }
      }



  // draw grey background
//   background(100);
//
//   // make the avatar and the target move, update their position
//   avatar.handleInput();
//   target.moveTarget();
//   avatar.moveAvatar();
//
//   // reset the target to the left of the screen if it goes off screen
//   if (target.isOffScreen() == true) {
//       target.reset();
//     }
//
//     // display the target and avatar
//     target.display();
//     avatar.display();
//
//   // spawn the projectiles using array, store all the "shots" inside
//   for (var i = 0; i < projectiles.length; i++) {
//       projectiles[i].display();
//       projectiles[i].moveProjectile();
//       projectiles[i].handleCollision(target);
//       }
//     }
//
// // shoot the projectile if the up arrow is pressed
// function keyPressed() {
//   if (keyCode == 38) {
//     projectiles.push(new Projectile(avatar.x,avatar.y,-5,15,5));
//     avatarResting = avatarShooting;
//     }
//     else {
//     avatarShooting = avatarResting;
//     }
// }
