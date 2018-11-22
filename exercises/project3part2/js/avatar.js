//////////////////////////////

// Avatar shooter
// The player who will try to take down the targets.

//////////////////////////////

function Avatar(x,y,w,h,vx,leftArrow,rightArrow,speed) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.vx = 0;
  this.leftArrow = leftArrow;
  this.rightArrow = rightArrow;
  this.speed = speed;
}

Avatar.prototype.display = function() {
  fill(0);
  rectMode(CENTER);
  rect(this.x,this.y,this.w,this.h)
  console.log("display")
}

Avatar.prototype.handleInput = function() {
  if (keyIsDown(this.leftArrow)) {
    this.vx = -this.speed;
  }
  else if (keyIsDown(this.rightArrow)) {
    this.vx = this.speed;
  }
  else {
    this.vx = 0;
  }
}

Avatar.prototype.moveAvatar = function() {
  this.x += this.vx;
  this.x = constrain(this.x,0,width-this.w);
}
