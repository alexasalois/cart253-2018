/*********************************************************

Exercise 2 - The Artful Dodger
Pippin Barr

Starter code for exercise 2.

*********************************************************/

// The position and size of our avatar circle
var avatarX;
var avatarY;
var avatarSize = 50;

// The speed and velocity of our avatar circle
var avatarSpeed = 10;
var avatarVX = 0;
var avatarVY = 0;

// The position and size of the enemy circle
var enemyX;
var enemyY;
var enemySize = 50;
// How much bigger the enemy circle gets with each successful dodge
var enemySizeIncrease = 5;

// The speed and velocity of our enemy circle
var enemySpeed = 5;
var enemyVX = 5;
// How much bigger the enemy circle gets with each successful dodge
var enemySpeedIncrease = 0.5;

// How many dodges the player has made
var dodges = 0;

// setup()
//
// Make the canvas, position the avatar and anemy
function setup() {
  // Create our playing area
  createCanvas(500,500);

  // Put the avatar in the centre
  avatarX = width/2;
  avatarY = height/2;

  // Put the enemy to the left at a random y coordinate within the canvas
  enemyX = 0;
  enemyY = random(0,height);

  // No stroke so it looks cleaner
  noStroke();
  }

// draw()
//
// Handle moving the avatar and enemy and checking for dodges and
// game over situations.
function draw() {
  //changing the background

  // Blue sky
  background(25,25,112);

  // Creating some skyscrapers
  fill(50);
  rect(0,200,100,300);
  rect(220,70,90,440);
  fill(25);
  rect(100,100,100,400);
  rect(300,200,200,300);
  fill(75);
  rect(175,150,100,350);
  rect(420,100,100,400);

  // inserting text & counter
  fill(255);
  textSize(45);
  textAlign(CENTER);
  text(dodges, width/2,50);

  // Default the avatar's velocity to 0 in case no key is pressed this frame
  avatarVX = 0;
  avatarVY = 0;

  // Check which keys are down and set the avatar's velocity based on its
  // speed appropriately

  // Left and right
  if (keyIsDown(LEFT_ARROW)) {
    avatarVX = -avatarSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    avatarVX = avatarSpeed;
  }

  // Up and down (separate if-statements so you can move vertically and
  // horizontally at the same time)
  if (keyIsDown(UP_ARROW)) {
    avatarVY = -avatarSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    avatarVY = avatarSpeed;
  }

  // Move the avatar according to its calculated velocity
  avatarX = avatarX + avatarVX;
  avatarY = avatarY + avatarVY;

  // The enemy always moves at enemySpeed (which increases)
  enemyVX = enemySpeed;
  // Update the enemy's position based on its velocity
  enemyX = enemyX + enemyVX;

  // Check if the enemy and avatar overlap - if they do the player loses
  // We do this by checking if the distance between the centre of the enemy
  // and the centre of the avatar is less that their combined radii
  if (dist(enemyX,enemyY,avatarX,avatarY) < enemySize/2 + avatarSize/2) {
    // Tell the player they lost
    console.log("YOU LOSE!");
    // Reset the enemy's position
    enemyX = 0;
    enemyY = random(0,height);
    // Reset the enemy's size and speed
    enemySize = 50;
    enemySpeed = 5;
    // Reset the avatar's position
    avatarX = width/2;
    avatarY = height/2;
    // Reset the dodge counter
    dodges = 0;

  }

  // Check if the avatar has gone off the screen (cheating!)
  if (avatarX < 0 || avatarX > width || avatarY < 0 || avatarY > height) {
    // If they went off the screen they lose in the same way as above.
    console.log("YOU LOSE!");
    enemyX = 0;
    enemyY = random(0,height);
    enemySize = 50;
    enemySpeed = 5;
    avatarX = width/2;
    avatarY = height/2;
    dodges = 0;
  }

  // Check if the enemy has moved all the way across the screen
  if (enemyX > width) {
    // This means the player dodged so update its dodge statistic
    dodges = dodges + 1;
    // Tell them how many dodges they have made
    console.log(dodges + " DODGES!");
    // Reset the enemy's position to the left at a random height
    enemyX = 0;
    enemyY = random(0,height);
    // Increase the enemy's speed and size to make the game harder
    enemySpeed = enemySpeed + enemySpeedIncrease;
    enemySize = enemySize + enemySizeIncrease;

    // Make the player change size and speed after every dodge
    avatarSize = random(20,200);
    avatarSpeed = random(1,40);

    }

    //////////////////////// Make the player change size and speed randomly after each dodge
   //if (dodges + 1) {

    //}

  // if (dodges > 5) {
  // Tried to do a random start point y, going in waves: did not work... (enemyY) = 25*sin(enemyX);}


  // Display the current number of successful in the console
  console.log(dodges);

  // The player is *now* beige
  fill(255,218,185);
  // Draw the player as a circle
  ellipse(avatarX,avatarY,avatarSize,avatarSize);

  // add a little party hat. Party time!
  fill(255,20,147);
  triangle(avatarX-20, avatarY - 20, avatarX, avatarY - 60, avatarX + 20,  avatarY - 20);
  fill(127,255,0);
  ellipse(avatarX, avatarY - 60, 15,15);

  // Give a face to the poor guy
  fill(0);
  ellipse(avatarX - 10, avatarY, 10,10);
  ellipse(avatarX + 10, avatarY, 10,10);

  // Bonus if scenario: adding facial feature / trying to do the enemy change... (IT WORKS!!!!)
  // enemy set up:
  var resp = "Responsibilities!";
  var what = "WHAT ARE YOU DOING";

  if (dodges > 5) {
    fill(105,0,0);
    ellipse(avatarX, avatarY + 15, 15,15);
    resp = what;
}

  // making the enemy
  fill(255);
  textSize(25);
  text(resp, enemyX,enemyY);
}
