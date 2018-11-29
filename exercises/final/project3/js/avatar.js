//////////////////////////////

// Avatar shooter
// The player who will try to take down the targets.

//////////////////////////////

// setting up the avatar characteristics
function Avatar(x,y,w,h,vx,leftArrow,rightArrow,upArrow,speed) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.vx = 0;
  this.leftArrow = leftArrow;
  this.rightArrow = rightArrow;
  this.upArrow = upArrow;
  this.speed = speed;
  this.image = avatarResting;
}

// display the avatar as a cute little guy
Avatar.prototype.display = function() {
  fill(0);
  imageMode(CENTER);
  image(this.image,this.x,this.y,this.w,this.h);
}

// you can now control the avatar with the arrow keys, on an x-axis only
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

Avatar.prototype.setImage = function(image) {
  this.image = image;
}

// update the position of the avatar and make sure it doesn't go off screen
Avatar.prototype.moveAvatar = function() {
  this.x += this.vx;
  this.x = constrain(this.x,0,width);
}
