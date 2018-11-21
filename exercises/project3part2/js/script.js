//////////////////////////

//Project 3: Part 2
//by Alexandra Salois

//A shooter-style concept...

///////////////////////////

var angle = 0;
var hellox = 0;
var helloy = 0;

function setup() {
  createCanvas(500,500);
  recty = 5;
  helloy = height/2;
}


function draw() {
  //background(255);
  fill(0);
  translate(hellox,helloy);
  rotate(angle);
  rectMode(CENTER);
  rect(0,75,20,20);

  angle += -0.1;
  hellox += 1;
  helloy += random(-10,10);
  //recty += -0.5;
}
