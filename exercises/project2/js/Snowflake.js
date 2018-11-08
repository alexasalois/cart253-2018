// Snowflake
//

// Snowflake constructor
//
// Sets the properties with the provided arguments
function Snowflake(x,y,vx,size,speed) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.size = size;
  this.speed = speed;
}

// update()
//
// Moves according to velocity, constrains y to be on screen,
// checks for bouncing on upper or lower edgs, checks for going
// off left or right side.
Snowflake.prototype.update = function () {
  // Update position with velocity
  this.x += this.vx;

  // Constrain position to be on screen
  //this.x = constrain(this.x,0,width-this.size);
}

Snowflake.prototype.display = function() {
  image(snowflake,this.x,this.y,this.size,this.size);
}

Snowflake.prototype.handleCollision = function() {
  console.log("handlecollision")
  var d = dist(this.x,this.y,ball.x,ball.y)
  if (d < ball.size/2 + this.size/2) {
    ball.vx = ball.vx/1.5;
    console.log("speed?");
  }
}
