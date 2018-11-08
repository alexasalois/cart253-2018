// Snowflake
//

// Snowflake constructor
//
// Sets the properties with the provided arguments
function fireEnemySpawn(x,y,vx,vy,size,speed) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.speed = speed;
}

// update()
//
// Moves according to velocity, constrains y to be on screen,
// checks for bouncing on upper or lower edgs, checks for going
// off left or right side.
fireEnemySpawn.prototype.update = function () {
  // Update position with velocity
  this.x += this.vx;
  this.y += this.vy;

  // Constrain position to be on screen
  this.y = constrain(this.y,0,height-this.size);
  this.x = constrain(this.x,0,width-this.size);

  //make it bounce around
  if (this.y === 0 || this.y + this.size === height) {
  this.vy = -this.vy;
  }
  if(this.x === 0 || this.x + this.size === width){
  this.vx = -this.vx;
  }
}

fireEnemySpawn.prototype.display = function() {
  image(fireEnemy,this.x,this.y,this.size,this.size);
}


fireEnemySpawn.prototype.spawn = function() {
  if (gameOver == false) {
    if (fireEnemySpawnActive == true) {
      ;
      for (var i = 0; i < fireEnemySpawn.length; i++) {
        fireEnemySpawn[i].display();
        fireEnemySpawn[i].update();
        }
      }
    }
  }
