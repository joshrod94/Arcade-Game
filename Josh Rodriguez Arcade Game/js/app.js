//decided to use es6 classes for faster and cleaner code.
//the enemy and player classes will share the same properties and functions as the Icon class.
class Icons {
	constructor () {
		this.sprite = 'images/';
	}
	//the render function will generate the icons on the board. I'm using *101 and *83 for positioning as
	//these numbers were used to create the board and allow for 1 to 1 ratio ( x=0 y=0 will be the first row and column box 1)
	render () {
		ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83);
	}
}

// changed the provided enemy code to es6 classes
class Enemy extends Icons {
	constructor(x, y) {
		super();
		this.sprite += 'enemy-bug.png';
		this.x = x;
		this.y = y;
	} 
	//bug movement
	update(dt) {
		this.offScreenX = this.x > 5;
		const randomNumber = Math.floor(Math.random() * 5) + 1;
		//condition so that once the bug goes offscreen to the right, it gets a random placement on the outside left.
		if (this.offScreenX) {
			//adding a random spawn point for the bug once it goes off screen
			this.x = -randomNumber;
		} 
		//as long as the bug hasn't gone off screen on the right, the position will increase by the dt.
		//the dt causes issues for the collision conditions but it is resolved. see checkCollosions() in engine js for more info
		else {
			this.x += dt;
		}
	}
}
// creating 6 enemy bugs. chose 6 so that the board feels like there are always bugs.
const enemyOne = new Enemy (-1,1);
const enemyTwo = new Enemy (-3,2);
const enemyThree = new Enemy (-2,3);
const enemyFour = new Enemy (-4,1);
const enemyFive = new Enemy (-7,2);
const enemySix = new Enemy (-5,3);
//adding the 6 enemies into te allEnemies array
const allEnemies = [enemyOne, enemyTwo, enemyThree,enemyFour, enemyFive,enemySix];

// player class code
class Player extends Icons {
	constructor () {
		super ();
		this.sprite += 'char-boy.png';
		this.x = 2;
		this.y = 5;
		//this is used so that the alert() doesnt go into an infinate loop
		this.win = false;
	}
	//check if player won
	update (dt) {
		if (this.y === 0 && !this.win) {
			//timer is set to .2 seconds so that it gives enough time for the player sprite to update into the water
			setTimeout(function(){ alert('Congratulations, you have won!'); reset();}, 200);
			//this triggers the alert to stop looping
			this.win = true;
		}
	}
	// player movement that keeps the player inside of the board
	handleInput(input) {
		 switch (input) {
			 case 'up':
				 if (this.y > 0){
					 this.y -= 1;
				 }
				 break;
			 case 'down':
				 if (this.y < 5){
					 this.y += 1;
				 }
				 break;
			 case 'left':
				 if (this.x > 0){
					 this.x -= 1;
				 }
				 break;
			 case 'right':
				 if (this.x < 4){
					 this.x += 1;
				 }
				 break;
		 }
	 }
}
//creating the player
const player = new Player();

//had to add the reset function here since i could not get it to work on the engine js file
function reset() {
		//moves the player to starting position
        player.x = 2;
		player.y = 5;
		//this is so that once you hit the water again, the alert apears again.
		player.win = false;
    }

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
