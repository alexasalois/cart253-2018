//////////////////////////

//Project 3
//by Alexandra Salois

//A shooter-style concept...

///////////////////////////

// Setting up the variables
var angle = 0;
var scoreAvatar = 0;
var lifeAvatar = 5;

// arrays
var projectiles = [];
var enemy = [];

// starting points
var objectX = 150;
var objectY =  100;
var zone1X = 80;
var zone1Y = 20;
var zone2X = 45;
var zone2Y = 200;

// game running variables
var gameOver = false;
var gameStarting = false;
var gameState = 0;
var enemyActive = true;

// player input
var nameInput;
var friendInput;
var foodInput;

// the game's buttons
var button1;
var button2;
var button3;
var button4;

// input variables
var nameValue;
var friendValue;
var foodValue;

// images var and color for the target
var r,g,b;
var avatarShooting;
var avatarResting;
var avatarEvilResting;
var avatarEvilShooting;
var computerBackground;
var firstBackground;
var darkBackground;

// sound variables
var avatarDeath;
var targetCollision;
var projectileShot;
var cuteMusic;
var spookyMusic;

// for the input option
var once = true;

function preload() {
  // loading the images and sound
  computerBackground = loadImage("assets/images/firstBackground.jpg");
  firstBackgroundImage = loadImage("assets/images/pinkbg.png");
  avatarShooting = loadImage("assets/images/cuteavatarshooting.png");
  avatarResting = loadImage("assets/images/cuteavatar.png");
  avatarEvilResting = loadImage("assets/images/angryavatar.png");
  avatarEvilShooting = loadImage("assets/images/angryavatarshooting.png");
  darkBackground = loadImage("assets/images/darkbg.png");
  avatarDeath = new Audio("assets/sounds/avatarcollision.wav");
  targetCollision = new Audio("assets/sounds/targetcollision.wav");
  projectileShot = new Audio("assets/sounds/projectileshoot.wav");
  cuteMusic = new Audio("assets/sounds/cute.mp3");
  spookyMusic = new Audio("assets/sounds/creepy.mp3");
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
        cuteMusic.play();
        cuteMusic.loop = true;

        firstBackground();
        if(once){
          setupNameInput();
          once=false;

          // always show score of player and lives left no matter the game state
          push();
          textSize(100);
          textAlign(RIGHT);
          text(scoreAvatar,width-10,height-630);
          textAlign(LEFT);
          text(lifeAvatar,10,200);
          pop();
          }
          break;

        case 2:
        cuteMusic.play();
        cuteMusic.loop = true;

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

        // cute character talks to you, gets progressively evil
            if (scoreAvatar > 3 && scoreAvatar < 5) {
              avatarFirstQuestion();
            }

            if (scoreAvatar > 4 && scoreAvatar < 6) {
              avatarSecondQuestion();
            }

            if (scoreAvatar > 5 && scoreAvatar < 10) {
              avatarThirdQuestion();
            }

            if (scoreAvatar > 10 && scoreAvatar < 21) {
              avatarFourthQuestion();
              cuteMusic.pause();
              spookyMusic.play();
              spookyMusic.loop = true;
            }

            if (scoreAvatar > 12 && scoreAvatar < 21) {
              avatarFifthQuestion();
            }

            if (scoreAvatar > 15 && scoreAvatar < 21) {
              imageMode(CENTER);
              firstBackgroundImage = darkBackground;
              avatarSixthQuestion();
            }

            if (scoreAvatar > 20) {
              lastBackground();
              reset();
            }

            // always show score of player and lives left no matter the game state
            push();
            textSize(100);
            textAlign(RIGHT);
            text(scoreAvatar,width-10,height-630);
            textAlign(LEFT);
            text(lifeAvatar,10,200);
            pop();
            break;
          }

          // when you lose, regular ending
          if (lifeAvatar == 0) {
            gameOver = true;
          }

        }

        // if the game is over, reset and show the ending. (not the angry one)
        else {
        reset();
        endScreen();
        gameOver = true;
      }
    }

      // Warn the player with text on mouse
      function drawText() {
        textSize(25);
        fill(255);
        text("Hey friend! I found this random game in our downloads, 'Cart 253'. Seems pretty buggy and boring. AI is really dumb lol. Will delete later, you can try it out before I do if you want.",mouseX,mouseY,300,500);
      }

      // Show the computer desktop
      function loadBackground() {
        background(computerBackground);
        console.log("DONT TRUST IT DONT TRUST IT DONT TRUST IT DONT TRUST IT DONT TRUST IT DONT TRUSNIT IT SODNBT DRUST ITN DONT DTURS T IT")
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
        text("Just shoot the gumdrops with the up arrow to collect candy pieces!",40,90);
        textSize(35);
        text("Don't get hit by the gum drops!",250,140);
        }
      }

      //shoot the projectile if the up arrow is pressed
      function keyPressed() {
        if (keyCode == 38) {
          projectiles.push(new Projectile(avatar.x,avatar.y,-5,15,5));
          projectileShot.play();
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

      // avatar gives hints of being evil
      function avatarThirdQuestion() {
        fill(255);
        textSize(30);
        text("I'm glad you're hanging out with me and not "+(friendValue)+".",avatar.x-60,avatar.y-90);
        text("They don't appreciate you like I do.",avatar.x-40,avatar.y-50);
        avatar.setImage(avatarEvilResting);
        avatarShooting = avatarEvilShooting;
      }

      // avatar becomes fully "evil"
      function avatarFourthQuestion() {
        fill(0);
        textSize(50);
        textAlign(CENTER);
        text("I THINK Y$U SHOULD S7AY H3ERE WTH ME."+(nameValue),width/2,height/2);
        avatar.setImage(avatarEvilResting);
        avatarShooting = avatarEvilShooting;
      }

      // avatar complains
      function avatarFifthQuestion() {
        fill(0);
        textSize(40);
        textAlign(CENTER);
        text("Stop shooting at my gum drops!!!", width/2,height/3);
        textSize(20);
        text("Eat your dumb "+(foodValue)+" instead. Rude.",width/2,280);
        avatar.setImage(avatarEvilResting);
        avatarShooting = avatarEvilShooting;
      }

      // avatar getting sassy
      function avatarSixthQuestion() {
        enemy.vy = enemy.vy + 10;
        fill(0);
        textAlign(CENTER);
        textSize(50);
        text("FINE. I guess we CAN'T be friends.", 500,500);
        avatar.setImage(avatarEvilResting);
        avatarShooting = avatarEvilShooting;
      }

      // avatar is not pleased when he loses
      function lastBackground() {
        textAlign(CENTER);
        fill(255);
        textSize(60);
        text("You know what? YOU WIN.",width/2,450);
        textSize(30);
        text("Now go eat your nasty "+(foodValue)+".", width/3,520);
        textSize(40);
        text("I bet "+(friendValue)+" thinks you suck anyways.",350,590);
        textSize(30);
        text("Wanna play again?",100,450);

        button3 = createButton('oh wait');
        button3.position(300,200);
        button3.mousePressed(angryEnd);

        button4 = createButton('nobody cares');
        button4.position(600,200);
        button4.mousePressed(angryEnd);
      }

      // angry avatar message when you win
      function angryEnd() {
        window.alert((nameValue)+" is an ugly name. Now leave me alone.");
      }

      // game ends, you are bff with the avatar
      function endScreen() {
        cuteMusic.pause();
        spookyMusic.play();

        imageMode(CORNER);
        background(darkBackground);
        fill(0);
        textSize(80);
        textAlign(CENTER);
        text("GOT YOU!!!1!!11",500,height/2);
        textSize(40);
        text("NOW WE WILL BE TOGETHER FOREVER.",width/2,height-250);
        textSize(25);
        text("I'm gonna forgive you for shooting "+(scoreAvatar)+" gumdrops.",width/2,500);

        button2 = createButton('ok');
        button2.position(width/2,350);
        button2.mousePressed(closeGame);

        angle+= 0.05;
        translate(width/2, height/2);
        rotate(angle);
      	image(avatarEvilResting,0,0);
      }

      // game officially ends
      function closeGame() {
        window.alert("Please close the browser page. Together forever, "+(nameValue)+".");
      }

      function reset() {
        enemyActive = false;
        gameStarting = false;
        target.x = 0-target.w;
        target.y = 0-target.h;
        avatar.x = 0-avatar.w;
        avatar.y = 0-avatar.h;
      }
