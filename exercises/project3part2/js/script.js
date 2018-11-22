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
var targety = 0;

function setup() {
  createCanvas(500,500);
  originy = height/2;

  target = new Target(0,75,20,20);
  avatar = new Avatar(width/2,height-25,20,50,10,LEFT_ARROW,RIGHT_ARROW,UP_ARROW,10);
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
      projectiles[i].handleCollision();
      }
    }

function keyPressed() {
  if (keyCode == 38) {
    projectiles.push(new Projectile(avatar.x,avatar.y,-5,15,5));
    }
  }
