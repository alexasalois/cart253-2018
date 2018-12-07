//////////////////////////////

// Enemy bombs
// The little bombs the player has to avoid (or death...).

//////////////////////////////

// setting up the enemy characteristics
function Enemy(x,y,size,vy,speed) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.vy = vy;
  this.speed = speed;
}

// display as a little circle
Enemy.prototype.display = function() {
  fill(255);
  noStroke();
  ellipse(this.x,this.y,this.size,this.size)
}

// update its position
Enemy.prototype.updateEnemy = function() {

  this.y += this.vy;
}

// check if it's offscreen, if so "delete" it
Enemy.prototype.isOffScreen = function() {
  if ( this.y > 700 ) {

    this.vy = 0;
    this.size = 0;
    this.x = -this.size;
    this.y = -this.size;
    enemyActive=true;
  }
}

// Check if the enemy is touching the avatar, if so lose a life
Enemy.prototype.handleCollision = function(avatar) {
  var d = dist(this.x,this.y,avatar.x,avatar.y)

  // calculate the space between the enemy and the avatar to see when they touch, therefore loses a life
  if (d < this.size/2 + avatar.w/2) {
    avatarDeath.play();
    lifeAvatar = lifeAvatar - 1;
    this.x = 0-this.size;
    this.y = 0-this.size;
  }
}
