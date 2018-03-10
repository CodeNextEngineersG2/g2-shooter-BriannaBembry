// UI Variables
var canvas;
var gameScreen;
var scoreDisplay;

// Game Variables
var gameRunning;
var shipShooting;
var alienShooting;
var score;

// Ship Variables
var shipDiameter;
var shipX;
var shipY;
var shipSpeed;
var shipColor;

// Bullet Variables
var bulletDiameter;
var bulletX;
var bulletY;
var bulletSpeed;

// Alien Variables
var alienDiameter;
var alienX;
var alienY;
var alienVelocity;

// Alien Bullet Variables
var alienBulletDiameter;
var alienBulletX;
var alienBulletY;

function setup() {
	canvas = createCanvas(500,400);
	background(27,39,102); 
	gameScreen = select('#game-screen'); 
	canvas.parent(gameScreen);
	//	shipColor = fill(42,187,51) --> do I need this here? my code still runs when its just in function drawShip()
	shipDiamater = 100;
	shipSpeed = 5; 
	shipX = 250; 
	shipY = 350; 
	bulletDiameter = 25; 
	bulletSpeed = 10;
	shipShooting = false; 
	alienDiameter = 50;
	alienVelocity = 7;
	alienX = 30;
	alienY = 30;
}

function draw() {
	background(27,39,102);
	drawShip();
	if(shipShooting == true){
		drawBullet();
	}
	drawAlien();
}

function drawShip() {
	shipColor = fill(42,187,51); 
	ellipse(shipX,shipY,100,100);
	if(keyIsDown(LEFT_ARROW) && shipX > 50) {
		shipX -= shipSpeed;
	}
	if(keyIsDown(RIGHT_ARROW) && shipX < 450){
		shipX += shipSpeed;
	}
}

function keyPressed() {
	if(keyCode === 32 && shipShooting == false) {
		bulletX = shipX;
		bulletY = shipY;
		shipShooting = true; 
	}
}

function drawBullet() {
	if(bulletY > 0){
		fill(171,174,171);
		ellipse(bulletX,bulletY,bulletDiameter,bulletDiameter);
		bulletY -= bulletSpeed;
	}
	else {
		shipShooting = false;
	}
}

function drawAlien() {
	alienX += alienVelocity; 
	if(alienX >= 475 || alienX <= 0){
		alienVelocity*= -1;
	}
	fill(255,78,34);
	ellipse(alienX,alienY,alienDiameter,alienDiameter);
}                                                  




/*
 * setup()
 * This function is called once. Sets up the canvas, accesses HTML elements with
 * select(), and adds event listeners to those elements. Sets initial values of
 * variables by calling resetGame().
 */


/*
 * gameOver()
 * This function stops the game from running and shows an alert telling the
 * player what their final score is. Finally it resets the game by calling
 * resetGame()
 */


/*
 * resetGame()
 * This function "resets the game" by initializing ship, alien, and game
 * variables.
 */


/*
 * draw()
 * This function animates the ship, alien, and both kinds of bullets, but only
 * if the game is running.
 */


/*
 * drawShip()
 * This function draws the player's ship. It also controls the ship's
 * x value by checking if the player is holding down the left or right keys.
 */


/*
 * keyPressed()
 * This function runs automatically when the player presses the spacebar
 * (keyCode === 32). If they do, and a bullet is not currently being fired
 * ("shipShooting" variable is false), it positions the bullet relative to the
 * ship. Then it sets the "shipShooting" variable to "true", indicating a ship
 * bullet is currently being fired.
 */


/*
 * drawBullet()
 * This function draws a bullet. It also checks to see if the bullet has hit
 * the alien. If it has, the alien is reset to the top-left of the screen
 * and the player earns a point. The alien aslo becomes faster (i.e., harder
 * to hit) each time it is hit by a bullet.
 */


/*
 * drawAlien()
 * This function draws an alien. It also checks to see if the alien has touched
 * the player's ship. If it has, the function calls gameOver().
 */


/*
 * drawAlienBullet()
 * This function behaves much like drawBullet(), only it fires from the alien
 * and not the player's ship. If the bullet hits the player, it's game over.
 */


/*
 * resetAlien()
 * This function sets the alien to its original position at the top-left of
 * the screen. It also sets its velocity to its absolute value (so, if the
 * velocity was negative when it died, it becomes positive upon reset, making
 * it always start by moving to the right).
 */


/*
 * checkCollision(aX, aY, aD, bX, bY, bD)
 * This function first calculates the distance between two circles based on
 * their X and Y values. Based on the distance value, the function returns
 * "true" if the circles are touching, and false otherwise.
 * Circles are considered touching if
 * (distance <= (circle1Diameter + circle2Diameter) / 2)
 */
