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

Target.prototype.display = function(){
  fill(0);
  rectMode(CENTER);
  rect(0,75,20,20);
}

Target.prototype.moveTarget = function() {
  translate(hellox,helloy);
  rotate(angle);
  angle += -0.1;
  hellox += 1;
  helloy += random(-10,10);
  console.log(hellox);
}

Target.prototype.isOffScreen = function() {
  console.log("TARGET y "+ this.y)
  if ((hellox + this.y + this.w/2) > width) {
    return true;
  }
  else {
    return false;
  }
}

Target.prototype.reset = function() {
  hellox = 0;
  helloy = height/2;
  angle = 0;
  translate(hellox,helloy);


}
