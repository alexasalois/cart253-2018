//////////////////////////

//Project 3: Part 2
//by Alexandra Salois

//A shooter-style concept...

///////////////////////////

// Setting up the variables
var angle = 0;
//var originx = 0;
//var originy = 0;
var scoreAvatar = 0;
var projectiles = [];
var r,g,b;
var avatarShooting;
var avatarResting;

function preload() {
  // loading the images (2 avatars)
  avatarShooting = loadImage("assets/images/cuteavatarshooting.png");
  avatarResting = loadImage("assets/images/cuteavatar.png");
}



function setup() {
  // creating the canvas, setting up the starting color for the target (randomized)
  createCanvas(500,500);
  r = random(0,255);
  g = random(0,255);
  b = random(0,255);

  // spawn the target and the avatar
  target = new Target(0,75,20,20,color(r,g,b));
  avatar = new Avatar(width/2,height-35,45,75,10,LEFT_ARROW,RIGHT_ARROW,UP_ARROW,10);
}

function draw() {
  // draw grey background
  background(100);

  // make the avatar and the target move, update their position
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

// shoot the projectile if the up arrow is pressed
function keyPressed() {
  if (keyCode == 38) {
    projectiles.push(new Projectile(avatar.x,avatar.y,-5,15,5));
    avatarResting = avatarShooting;
    }
    else {
    avatarShooting = avatarResting;
    }
}
