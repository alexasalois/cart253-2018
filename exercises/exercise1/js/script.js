// Exercise 1 - Moving pictures
// Pippin Barr
//
// Starter code for exercise 1.
// It moves two pictures around on the canvas.
// One moves linearly down the screen.
// One moves toward the mouse cursor.


var x;
var y;
var vx;
var vy;
var maxSpeed = 2;
var tx;
var ty;

function setup() {
  createCanvas(500,500);
  tx = random(0,1000);
  ty = random(0,1000);
  x = width/2;
  y = height/2;
}

function draw() {
  background(255);

  vx = map(noise(tx),0,1,-maxSpeed,maxSpeed);
  vy = map(noise(ty),0,1,-maxSpeed,maxSpeed);

  x += vx;
  y += vy;

  if (x < 0) {
    x += width;
  }
  else if (x > width) {
    x -= width;
  }

  if (y < 0) {
    y += height;
  }
  else if (y > height) {
    y -= height;
  }

  tx += 0.01;
  ty += 0.01;

  ellipse(x,y,10,10);
}
