//////////////////////////////

// Enemy bombs
// The little bombs the player has to avoid (or death...).

//////////////////////////////

// setting up the enemy characteristics
function Enemy(x,y,size,vy,speed) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.vy = 0;
  this.speed = speed;
}

Enemy.prototype.display = function() {
  fill(255);
  noStroke();
  ellipse(this.x,this.y,this.size,this.size)
}

Enemy.prototype.updateEnemy = function() {
  this.y += this.vy;
}

Enemy.prototype.isOffScreen = function() {
  if ( this.y < 0 ) {
    this.vy = 0;
    this.size = 0;
    this.x = 0;
    this.y = 0;
  }
}

// Check if the enemy is touching the avatar, if so lose a life
Enemy.prototype.handleCollision = function(avatar) {
  var d = dist(this.x,this.y,avatar.x,avatar.y)

  if (this.active === false) {
        return;
        }

  // calculate the space between the enemy and the avatar to see when they touch, therefore loses a life
  if (d < this.size/2 + avatar.w/2) {
    lifeAvatar = lifeAvatar - 1;
    this.x = 0;
    this.y = 0;
    console.log("avatar death")
    console.log(lifeAvatar)
  }
}

// Enemy.prototype.spawn = function(avatar) {
//   this.x = random(avatar.x-20,avatar.x+20);
//   this.y = 0;
//   this.vy = 5;
//   this.speed = 10;
//   console.log("spawn")
