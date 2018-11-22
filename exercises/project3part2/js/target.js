//////////////////////////

// Objects: Targets
// The targets being randomly shot at the avatar...

//////////////////////////

function Target(x,y,w,h,color) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.color = color;
}

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

Target.prototype.moveTarget = function() {
  // push();
  angle += -0.1;
  this.x += 1;
  this.y += random(-25,25);
  // pop();
}

Target.prototype.isOffScreen = function() {
  if ((this.x + this.w/2) > width || this.y + this.h/2 > height || this.y - this.w/2 < 0) {
    return true;
  }
  else {
    return false;
  }
}

Target.prototype.reset = function() {
  this.x = 0;
  this.y = random(0,height);
  angle = 0;
  r = random(0,255);
  g = random(0,255);
  b = random(0,255);
  this.color = color(r,g,b);
  // translate(originx,originy);
}
