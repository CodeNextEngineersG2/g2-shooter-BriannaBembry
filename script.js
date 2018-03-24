// UI Variables
var canvas;
var gameScreen;
var scoreDisplay;

// Game Variables
var gameRunning;
var shipShooting;
var alienShooting;
var score;
var pause; 

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
	scoreDisplay = select("#score-display"); 
	resetGame(); 
}

function draw() {
	if (gameRunning == true) {
	background(111,203,159);
	drawShip();
	if(shipShooting == true){
		drawBullet();
	}
	drawAlien();
	if (alienShooting == true) {
		drawAlienBullet(); 
	}
	if(pause == true){
		gameRunning = false; 
	}
	}
}

function drawShip() {
	noStroke();
	fill(211, 232, 234);
	ellipse(shipX,shipY-25,75,75);
	shipColor = fill(9, 173, 9); 
	ellipse(shipX,shipY,shipDiameter,45);
	if(keyIsDown(LEFT_ARROW) && shipX > 75) {
		shipX -= shipSpeed;
	}
	if(keyIsDown(RIGHT_ARROW) && shipX < 425){
		shipX += shipSpeed;
	}
}

function keyPressed() {
	if(keyCode === 32 && shipShooting == false && gameRunning == true) {
		bulletX = shipX;
		bulletY = shipY - 75;
		shipShooting = true; 
	}
	if(keyCode === 80 && gameRunning == true){
		gamePaused(); 
	}
	else {
		gameRunning = true; 
		pause = false; 
	}
}

function drawBullet() {
	var hitAlien = checkCollision(alienX, alienY, alienDiameter, bulletX, bulletY, bulletDiameter);
	if(bulletY > 0 && !hitAlien) {
		fill(171,174,171);
		ellipse(bulletX,bulletY,bulletDiameter,bulletDiameter);
		bulletY -= bulletSpeed; 
	}
	else if(hitAlien){
		resetAlien();
		alienVelocity++;
		shipShooting = false;
		score++;
		scoreDisplay.html(score);
	}
	else {
		shipShooting = false;
	}
}

function drawAlien() {
	alienX += alienVelocity; 
	if(alienX >= 475 || alienX <= 10){
		alienVelocity*= -1;
	}
	fill(251,46,1);
	ellipse(alienX,alienY,alienDiameter,alienDiameter)
	if(random(4) <1 && !alienShooting) {
		alienBulletX = alienX;
		alienBulletY = alienY + 20; 
		alienShooting = true; 
	}
	if(alienX >= 475){
		alienY += 10; 
	}
}   

function drawAlienBullet() {
	var hitShip = checkCollision(alienBulletX, alienBulletY, alienBulletDiameter, shipX, shipY, shipDiameter);
	if(alienBulletY < 400 && !hitShip) {
		fill(125, 40, 155);
		ellipse(alienBulletX, alienBulletY, alienBulletDiameter, alienBulletDiameter);
		alienBulletY += 10; 
	}
	else if(hitShip == true) {
		gameOver();
	}

	else {
		alienShooting = false; 
	}
}            

function checkCollision(alienBulletX, alienBulletY, alienBulletDiameter, shipX, shipY, shipDiameter) {
	var distance = dist(alienBulletX, alienBulletY, shipX, shipY); 
	if((alienBulletDiameter/2) + (37) >= distance) {
		return true; 
	}
	else {
		return false; 
	}
}     

function resetAlien() {
	alienVelocity = abs(alienVelocity);
	alienX = 30;
	alienY = 30; 
}

function gameOver() {
	gameRunning = false; 
	window.alert("Game Over! Your final score is: " + score);
	resetGame();
}

function gamePaused() {
	gameRunning = false; 
	pause = true; 
}

function resetGame() {
	shipColor = fill(42,187,51); 
	shipDiameter = 150;
	shipSpeed = 5; 
	shipX = 250; 
	shipY = 360; 
	bulletDiameter = 25; 
	bulletSpeed = 10;
	shipShooting = false; 
	alienDiameter = 50;
	alienVelocity = 5;
	alienX = 30;
	alienY = 30;
	alienBulletDiameter = 25;
	alienShooting = false; 
	score = 0; 
	scoreDisplay.html(score);
	gameRunning = true; 
	pause = true; 
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
