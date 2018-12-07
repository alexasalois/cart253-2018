///////////////////////////

// The projectile that comes out of the avatar
// Destroy the target!

///////////////////////////

// define the constraints of the projectile
function Projectile(x,y,vy,size,speed) {
  this.x = x;
  this.y = y;
  this.vy = vy;
  this.size = size;
  this.speed = speed;
}

// Update the position of the projectile depending on the velocity
Projectile.prototype.moveProjectile = function () {
  this.y += this.vy;
}

// display the projectile as a little square
Projectile.prototype.display = function() {
  fill(255);
  rectMode(CENTER);
  noStroke();
  rect(this.x,this.y,this.size,this.size);
}

// check if the projectile is off screen, if so "delete" it
Projectile.prototype.isOffScreen = function() {
  if (this.x > width || this.y < 0 || this.x < 0) {
    this.vy = 0;
    this.size = 0;
    this.x = 0;
    this.y = 0;
  }
}

// Check if the projectile has collided with the target, if so avatar scores one point per collision
Projectile.prototype.handleCollision = function(target) {
  var d = dist(this.x,this.y,target.x,target.y)

  if (this.active === false) {
        return;
        }

  // calculate the space between the target and the projectile to see when they touch, therefore scores and plays sound
  if (d < this.size/2 + target.w/2) {
    targetCollision.play(currentTime = 0);
    scoreAvatar = scoreAvatar + 1;
    this.x = 0;
    this.y = 0;
  }
}
