//////////////////////////

// Objects: Targets
// The targets being randomly shot at the avatar...

//////////////////////////

// define contraints of the moving target
function Target(x,y,w,h,color) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.color = color;
}

// display the target as a rotating square
Target.prototype.display = function() {
  push();
  translate(this.x,this.y);
  rotate(angle);
  rectMode(CENTER);
  noStroke();
  fill(this.color);
  rect(0,0,this.w,this.h);
  pop();
}

// make the target move accross the screen all weird
Target.prototype.moveTarget = function() {
  angle += -0.1;
  this.x += 1;
  this.y += random(-25,25);
}

// Check if the target is off screen, yes or no
Target.prototype.isOffScreen = function() {
  if ((this.x + this.w/2) > width || this.y + this.h/2 > height || this.y - this.w/2 < 0) {
    return true;
  }
  else {
    return false;
  }
}

// if the target is off screen reset it back to the left, and with a random colour
Target.prototype.reset = function() {
  this.x = 0;
  this.y = random(0,height);
  angle = 0;
  r = random(0,255);
  g = random(0,255);
  b = random(0,255);
  this.color = color(r,g,b);
}
