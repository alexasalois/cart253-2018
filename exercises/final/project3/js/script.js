//////////////////////////

//Project 3: Part 2
//by Alexandra Salois

//A shooter-style concept...

///////////////////////////

// Setting up the variables
var angle = 0;
var scoreAvatar = 0;
var lifeAvatar = 5;

var projectiles = [];
var enemy = [];

var objectX = 150;
var objectY =  100;
var zone1X = 80;
var zone1Y = 20;
var zone2X = 45;
var zone2Y = 200;

var gameOver = false;
var gameStarting = false;
var gameState = 0;
var enemyActive = true;

// player input
var nameInput;
var friendInput;
var foodInput;

var button1;
var button2;
var button3;
var button4;

var nameValue;
var friendValue;
var foodValue;

var r,g,b;
var avatarShooting;
var avatarResting;
var avatarEvilResting;
var avatarEvilShooting;
var computerBackground;
var firstBackground;
var darkBackground;

var once = true;

function preload() {
  // loading the images
  computerBackground = loadImage("assets/images/firstBackground.jpg");
  firstBackgroundImage = loadImage("assets/images/pinkbg.png");
  avatarShooting = loadImage("assets/images/cuteavatarshooting.png");
  avatarResting = loadImage("assets/images/cuteavatar.png");
  avatarEvilResting = loadImage("assets/images/angryavatar.png");
  avatarEvilShooting = loadImage("assets/images/angryavatarshooting.png");
  darkBackground = loadImage("assets/images/darkbg.png");
}



function setup() {
  // creating the canvas, setting up the starting color for the target (randomized)
  createCanvas(1100,700);
  r = random(0,255);
  g = random(0,255);
  b = random(0,255);

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

            if(enemyActive==true){
                spawnEnemy();
            }

            for (var i = 0; i < enemy.length; i++) {
              enemy[i].display();
              enemy[i].updateEnemy();
              enemy[i].handleCollision(avatar);
              enemy[i].isOffScreen();
            }

        // cute character talks to you
            if (scoreAvatar > 3 && scoreAvatar < 4) {
              avatarFirstQuestion();
            }

            if (scoreAvatar > 4 && scoreAvatar < 5) {
              avatarSecondQuestion();
            }

            if (scoreAvatar > 5 && scoreAvatar < 10) {
              avatarThirdQuestion();
            }

            if (scoreAvatar > 10 && scoreAvatar < 12) {
              avatarFourthQuestion();
            }

            if (scoreAvatar > 12) {
              enemy.speed = enemy.speed+2;
              avatarFifthQuestion();
            }




            break;
          }
        }

        else {
        endScreen();
        gameOver = true;
      }
    }

      // Warn the player with text on mouse
      function drawText() {
        var warningText = "DON'T PRESS ITDON'T DON'T DON'T DON'T DON'T DON'T TRUST IT DON'T TOUCH IT DON'T TRUST IT DONB PRNES IT DONT TRSUT IT TRSUT STRU TRUSH TRUSUT TRSUT TRUST ME";
        textSize(25);
        fill(255);
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

        // // Check which avatar the player clicks when facing the decision
        // var d2 = dist(mouseX, mouseY, 250,600);
        // var d3 = dist(mouseX, mouseY, 800,600);
        //
        // if (d2 < avatar.w/2 || avatar.h/2) {
        //   endScreen();
        // }
        //
        // if (d3 < avatar.w/2 || avatar.h/2) {
        //   nextScreen();
        // }
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

        if (scoreAvatar < 15) {
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

      // drop the enemies near the avatar
      function spawnEnemy() {
        enemy.push(new Enemy(random(avatar.x - 100, avatar.x + 100),0,50,9,-5));
        enemyActive=false;
      }

      // avatar talks to you for the first time
      function avatarFirstQuestion() {
        fill(255);
        textSize(30);
        text((nameValue)+" is such a pretty name!^-^",avatar.x-20,avatar.y-50);
      }

      // avatar asks a second question...
      function avatarSecondQuestion() {
        fill(255);
        textSize(30);
        text((foodValue)+" sounds so good! We should eat some together soon.",avatar.x-40,avatar.y-50);
      }

      function avatarThirdQuestion() {
        fill(255);
        textSize(30);
        text("I'm glad you're hanging out with me and not "+(friendValue)+".",avatar.x-60,avatar.y-90);
        text("They don't appreciate you like I do.",avatar.x-40,avatar.y-50);
        avatar.setImage(avatarEvilResting);
      }

      function avatarFourthQuestion() {
        fill(0);
        textSize(40);
        textAlign(CENTER);
        text("I THINK Y$U SHOULD S7AY H3ERE WTH ME."+(nameValue),width/2,height/2);
        avatar.setImage(avatarEvilResting);
      }

      function avatarFifthQuestion() {
        fill(0);
        textSize(40);
        textAlign(CENTER);
        text("Stop shooting at my gum drops!!!", width/2,height/3);
        textSize(20);
        text("Eat your dumb "+(foodValue)+" instead. Rude.",width/2,200);
        avatar.setImage(avatarEvilResting);
      }



      // function avatarDecision() {
      //   console.log("avatar decision");
      //   // make the avatar creepily spin too fast, buggy...
      //   push();
      //   imageMode(CENTER);
      //   image(avatarResting,width/2,height/2,avatar.w,avatar.h);
      //   pop();
      //
      //   // Display text, avatar wants to be with you
      //   // push();
      //   textSize(40);
      //   fill(255);
      //   textAlign(CENTER);
      //   text((nameValue)+", I feel like we have so much in common...",width/2,height/2);
      //   textSize(30);
      //   text((nameValue)+")(*0)(*) "+(nameValue)+" %%$#%^"+(nameValue)+" 5t"+(nameValue)+" __)(8r6754)"+(nameValue)+"$#%6 "+(nameValue)+" %&**&)0"+(nameValue)+" @@@#@#!"+(nameValue)+"^%&)(L) "+(nameValue),width/2,50);
      //   text("Who even is "+(friendValue)+"? We could be so happy together.",width/2,300);
      //   text("I'll make you "+(foodValue)+" every day.",width/2,height-200);
      //   fill(0);
      //   textSize(60);
      //   text("STAY HERE WITH ME FOREVER? (-:",width/2,height-250);
      //   // pop();
      //
      //   // target stays on the left side of the screen, stuck at x=0. laggy / buggy effect
      //   target.x = 0;
      //   target.y = 0;
      //   target.vx = 0;


      // player needs to choose
        // console.log("player yes or no");
        // button2 = createButton('yes');
        // button2.position(500,500);
        // button2.mousePressed(endScreen);
        //
        // button3 = createButton('no');
        // button3.position(800,500);
        // button3.mousePressed(nextScreen);
  //  }



      // game ends, you are bff with the avatar
      function endScreen() {
        imageMode(CORNER);
        background(darkBackground);
        fill(255);
        textSize(50);
        text("YOU ARE MY BEST FRIEND <3",175,height/2);
        textSize(40);
        text("NOW WE WILL BE TOGETHER FOREVER",160,height-250);

        imageMode(CENTER);
        image(avatarEvilResting,width/2,100);
        avatarShooting = avatarEvilShooting;
        // angle += 0.1;
        // rotate(angle);
        //
        // button4 = createButton('ok');
        // button4.position(width/2,500);
        // button4.mousePressed(closeGame);
      }

      // game officially ends
      function closeGame() {
        window.alert("Please close the browser page. Together forever, "+(nameValue)+".");
      }
        // button5 = createButton('Sorry...');
        // button5.position(width/2,250);
        // button5.mousePressed('keepPlaying');
      //  }
      //
      // function endingTrigger() {
      //   fill(255,0,0);
      //   noStroke();
      //   ellipse(250,600,avatar.w,avatar.h);
      // }
      //
      // function advanceGame() {
      //   fill(255,0,0);
      //   noStroke();
      //   ellipse(800,600,avatar.w,avatar.h);
      // }
