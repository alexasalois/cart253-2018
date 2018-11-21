//////////////////////////

//Project 3: Part 2
//by Alexandra Salois

//A shooter-style concept...

///////////////////////////

var angle = 0;
var rectx = 0;
var recty = 0;

function setup() {
  createCanvas(500,500);
  recty = height/2;
}


function draw() {
  background(255);
  fill(0);
  translate(width/2,height/2);
  rotate(angle);
  rectMode(CENTER);
  rect(rectx,recty,20,20);
  angle += -0.01;
  rectx += 1.5;
  recty += -0.5;
}
