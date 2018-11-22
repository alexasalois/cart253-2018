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
  helloy = height/2;

  target = new Target(0,75,20,20);

}


function draw() {
  background(255);
  target.moveTarget();

  console.log(target.isOffScreen())
  if (target.isOffScreen() == true) {
      // target = new Target(0,75,20,20);
      console.log("new target?")
      target.reset();
  }



  target.display();
  console.log("wasup");
}
