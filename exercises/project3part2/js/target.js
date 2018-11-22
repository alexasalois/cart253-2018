//////////////////////////

// Objects: Targets
// The targets being randomly shot at the avatar...

//////////////////////////

function Target(x,y,w,h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
}

Target.prototype.display = function() {
  push();
  translate(originx,originy);
  rotate(angle);
  fill(0);
  rectMode(CENTER);
  rect(0,75,20,20);
  pop();
}

Target.prototype.moveTarget = function() {
  push();
  angle += -0.1;
  originx += 1;
  originy += random(-10,10);
  pop();
}

Target.prototype.isOffScreen = function() {
  if ((originx + this.y + this.w/2) > width) {
    return true;
  }
  else {
    return false;
  }
}

Target.prototype.reset = function() {
  originx = 0;
  originy = height/2;
  angle = 0;
  translate(originx,originy);
}
