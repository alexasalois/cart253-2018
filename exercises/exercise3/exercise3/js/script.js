/******************************************************************************
Where's Sausage Dog?
by Pippin Barr

An algorithmic version of a Where's Wally searching game where you
need to click on the sausage dog you're searching for in amongst all
the visual noise of other animals.

Animal images from:
https://creativenerds.co.uk/freebies/80-free-wildlife-icons-the-best-ever-animal-icon-set/
******************************************************************************/

// Position and image of the sausage dog we're searching for...
var targetX;
var targetY;
var targetImage;
var fakeTarget;

// The ten decoy images
var decoyImage1;
var decoyImage2;
var decoyImage3;
var decoyImage4;
var decoyImage5;
var decoyImage6;
var decoyImage7;
var decoyImage8;
var decoyImage9;
var decoyImage10;

// The number of decoys to show on the screen, randomly
// chosen from the decoy images
var numDecoys = 100;

// Keep track of whether they've won
var gameOver = false;

// Add speed of moving dog when game is won
var dogSpeed = 15
var dogVX = 0
var dogVY = 0

var currentBackground = '#ff0000';

// preload()
//
// Loads the target and decoy images before the program starts
function preload() {
  targetImage = loadImage("assets/images/animals-target.png");

  decoyImage1 = loadImage("assets/images/animals-01.png");
  decoyImage2 = loadImage("assets/images/animals-02.png");
  decoyImage3 = loadImage("assets/images/animals-03.png");
  decoyImage4 = loadImage("assets/images/animals-04.png");
  decoyImage5 = loadImage("assets/images/animals-05.png");
  decoyImage6 = loadImage("assets/images/animals-06.png");
  decoyImage7 = loadImage("assets/images/animals-07.png");
  decoyImage8 = loadImage("assets/images/animals-08.png");
  decoyImage9 = loadImage("assets/images/animals-09.png");
  decoyImage10 = loadImage("assets/images/animals-10.png");

  // Adding the wanted poster for the dog
  fakeTarget = loadImage("assets/images/animals-target-poster.png");
}

// setup()
//
// Creates the canvas, sets basic modes, draws correct number
// of decoys in random positions, then the target
function setup() {
  createCanvas(windowWidth,windowHeight);
  background("#ffff00");
  imageMode(CENTER);

  // Use a for loop to draw as many decoys as we need
  for (var i = 0; i < numDecoys; i++) {
    // Choose a random location for this decoy
    var x = random(0,width);
    var y = random(0,height);
    // Generate a random number we can use for probability
    var r = random();
    // Use the random number to display one of the ten decoy
    // images, each with a 10% chance of being shown
    // We'll talk more about this nice quality of random soon enough
    if (r < 0.1) {
      image(decoyImage1,x,y,200,200);
    }
    else if (r < 0.2) {
      image(decoyImage2,x,y,75,75);
    }
    else if (r < 0.3) {
      image(decoyImage3,x,y,30,30);
    }
    else if (r < 0.4) {
      image(decoyImage4,x,y,400,400);
    }
    else if (r < 0.5) {
      image(decoyImage5,x,y,50,50);
    }
    else if (r < 0.6) {
      image(decoyImage6,x,y,90,90);
    }
    else if (r < 0.7) {
      image(decoyImage7,x,y,100,100);
    }
    else if (r < 0.8) {
      image(decoyImage8,x,y,65,65);
    }
    else if (r < 0.9) {
      image(decoyImage9,x,y,80,80);
    }
    else if (r < 1.0) {
      image(decoyImage10,x,y,75,75);
    }
  }

  // Once we've displayed all decoys, we choose a location for the target
  targetX = random(0,width);
  targetY = random(0,height);

  // Make sure the dog doesn't hide under the poster, if it does go to another location!
  while ((targetX > windowWidth-100) && (targetY > windowHeight/7)) {
  targetX = random(0,width);
  targetY = random(0,height);
  }

  // And draw it (this means it will always be on top)
  image(targetImage,targetX,targetY,70,70);

  // Loading and positioning the dog poster
  image(fakeTarget,windowWidth-100,windowHeight/7);

  // Preparing the dog speed when game is won
  dogVX = dogSpeed;
  dogVY = -dogSpeed;

}

function draw() {
  // Set up flashing police lights
  var policeRedLight = '#ff0000';
  var policeBlueLight = '#00ffff';


  if (gameOver) {

    // Give player a headache since sausage dog is mad about getting caught
    if (currentBackground === policeRedLight) {
    currentBackground = policeBlueLight;
    }
    else {
    currentBackground=policeRedLight;
    }

    background(currentBackground);


    // Prepare our typography
    textFont("Helvetica");
    textSize(65);
    textAlign(CENTER,CENTER);
    noStroke();
    fill(random(255));

    // Tell them they won! (Make it more agressive?)
    text("You're not getting away this time!",width/2,height/2);

    noFill();
    stroke(random(255));
    strokeWeight(10);
    ellipse(targetX,targetY,targetImage.width,targetImage.height);

    // Add panicking dog since he got caught! Make him bounce around
    targetX += dogVX;
    targetY += dogVY;
    image(targetImage,targetX,targetY);

    if (targetX > windowWidth || targetX < 0) {
      dogVX = -dogVX;
    }

    if (targetY > windowHeight || targetY < 0) {
      dogVY = -dogVY;
    }

  }
}

// mousePressed()
//
// Checks if the player clicked on the target and if so tells them they won
function mousePressed() {
  // Check if the mouse is in the x range of the target
  if (mouseX > targetX - targetImage.width/2 && mouseX < targetX + targetImage.width/2) {
    // Check if the mouse is also in the y range of the target
    if (mouseY > targetY - targetImage.height/2 && mouseY < targetY + targetImage.height/2) {
      gameOver = true;
    }
  }
}
