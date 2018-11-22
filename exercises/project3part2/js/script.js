//////////////////////////

//Project 3: Part 2
//by Alexandra Salois

//A shooter-style concept...

///////////////////////////

var angle = 0;
var originx = 0;
var originy = 0;
var scoreAvatar = 0;
var projectiles = [];
var r,g,b;
var avatarShooting;

function preload() {
  avatarShooting = loadImage("../assets/images/cuteavatarshooting.png");
  avatarResting = loadImage("../assets/images/cuteavatar.png");
}



function setup() {
  createCanvas(500,500);
  originy = height/2;
  r = random(0,255);
  g = random(0,255);
  b = random(0,255);

  target = new Target(0,75,20,20,color(r,g,b));
  avatar = new Avatar(width/2,height-35,45,75,10,LEFT_ARROW,RIGHT_ARROW,UP_ARROW,10);
}

function draw() {
  background(100);
  avatar.handleInput();
  target.moveTarget();
  avatar.moveAvatar();

  if (target.isOffScreen() == true) {
      target.reset();
    }

    target.display();
    avatar.display();

  for (var i = 0; i < projectiles.length; i++) {
      projectiles[i].display();
      projectiles[i].moveProjectile();
      projectiles[i].handleCollision(target);
      }
    }

function keyPressed() {
  if (keyCode == 38) {
    projectiles.push(new Projectile(avatar.x,avatar.y,-5,15,5));
    avatarResting = avatarShooting;
    }
    else {
    avatarShooting = avatarResting;
    }
}
