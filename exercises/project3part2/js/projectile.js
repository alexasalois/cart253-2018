///////////////////////////

// The projectile that comes out of the avatar
// Destroy the target!

///////////////////////////

function Projectile(x,y,vx,vy,size,speed) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.speed = speed;
}

Projectile.prototype.moveProjectile = function () {
  this.x += this.vx;
  this.y += this.vy;
}

Projectile.prototype.display = function() {
  fill(255);
  rectMode(CENTER);
  rect(this.x,this.y,this.size,this.size);
  console.log("display")
}
