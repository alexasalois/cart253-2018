///////////////////////////

// The projectile that comes out of the avatar
// Destroy the target!

///////////////////////////

function Projectile(x,y,vy,size,speed) {
  this.x = x;
  this.y = y;
  this.vy = vy;
  this.size = size;
  this.speed = speed;
}

Projectile.prototype.moveProjectile = function () {
  this.y += this.vy;
}

Projectile.prototype.display = function() {
  fill(255);
  rectMode(CENTER);
  noStroke();
  rect(this.x,this.y,this.size,this.size);
}

Projectile.prototype.isOffScreen = function() {
  if (this.x > width || this.y < 0 || this.x < 0) {
    this.vy = 0;
    this.size = 0;
    this.x = 0;
    this.y = 0;
  }
}
