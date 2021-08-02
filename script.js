// Be sure to name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, 
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke, 
          keyCode, push, pop, drawSprites, httpGet, keyIsDown, max, min, textFont, textAlign, CENTER, UP_ARROW, 
          sqrt, noFill, collideRectRect, LEFT_ARROW, frameRate, RIGHT_ARROW, DOWN_ARROW, textSize, round */

          let backgroundColor, player, enemy, score, hit, isAlive;

          // Create objects for bad guys
          // create object for main character
          // Start Position
          // Create move functions
          // Create collision detection
          // make main character able to shoot
          // make there a entrance to new room
          
          // Main Class
          // Enemy Class
          // Projectile ?
          // Enemy: Rectangle  - bigger than the player
          // MC: Square
          
          function setup() 
		  {
            // Canvas & color settings
            createCanvas(600, 600);
            colorMode(HSB, 360, 100, 100);
            backgroundColor = 95;
            player = new Player();
			
			enemies = [];
			for(var i = 0; i < 3; i++)
			{
				enemies.push(new Enemy());
			}
            score = 0;
            isAlive = true;
          }
          
          function draw() 
		  {
            background(backgroundColor);
            if (isAlive == false) 
			{
              text("Game Over", 20, 100);
            }
			else 
			{
              player.movePlayer();
              player.showPlayer();
			  for(var i = 0; i < enemies.length; i++)
			  {
				enemies[i].showEnemy();
				enemies[i].moveEnemy();
			  }
              player.collidePlayer();
            }
          }
          
          //Class for the main character
          class Player 
		  {
            constructor() 
			{
              this.x = width * 0.1;
              this.y = height / 2;
              this.playerWidth = 25;
              this.playerHeight = 25;
              this.velocity = 3;
            }
          
            // Move function
          
            movePlayer() 
			{
              if (keyIsDown(UP_ARROW) || keyIsDown(87)) 
			  {
                this.y -= this.velocity;
              }
              if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) 
			  {
                this.y += this.velocity;
              }
              if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) 
			  {
                this.x -= this.velocity;
              }
              if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) 
			  {
                this.x += this.velocity;
              }
            }
          
            showPlayer() 
			{
              // draw the dot
              fill(200, 80, 70);
              noStroke();
              rect(this.x, this.y, this.playerWidth, this.playerHeight);
            }
          
            collidePlayer() 
			{
              //Collision with wall
              if (this.x < 0) 
			  {
                this.x = 0;
              }
              if (this.x > width-this.playerWidth) 
			  {
                this.x = width-this.playerWidth;
              }
              if (this.y < 0) 
			  {
                this.y = 0;
              }
              if (this.y > height-this.playerHeight) 
			  {
                this.y = height-this.playerHeight;
              }
          
              //Collision between Player and Enemy
              // collideRectRect = function (x, y, w, h, x2, y2, w2, h2) - USE A FOR LOOP FOR MULTIPLE ENEMIES
              hit = collideRectRect(
                this.x,
                this.y,
                this.playerWidth,
                this.playerHeight,
                Enemy.enemyX,
                Enemy.enemyY,
                Enemy.enemyWidth,
                Enemy.enemyHeight
              );
          
              if (hit) 
			  {
                isAlive = false;
              }
            }
          }
          
          //Class for the enemy/minions
          class Enemy 
		  {
            constructor() 
			{
              this.enemyX = random(200, 400);
              this.enemyY = random(200, 400);
              this.enemyWidth = 35;
              this.enemyHeight = 35;
              this.velocity = 2;
            }
            // Move function
          
            moveEnemy() 
			{
              var directionX = player.x - this.enemyX;
              var directionY = player.y - this.enemyY;
              var hypotenuse = sqrt(directionX ** 2 + directionY ** 2);
          
              directionX /= hypotenuse;
              directionY /= hypotenuse;
			  
              this.enemyX += directionX * this.velocity;
              this.enemyY += directionY * this.velocity;
            }
          
            // Show Self function
            showEnemy() 
			{
              stroke(360, 100, 50);
              fill(360, 100, 50);
              rect(this.enemyX, this.enemyY, this.enemyWidth, this.enemyHeight);
            }
            // Collision function
            // isAlive function
          }
          
          //Class for projectiles/bullets
          class Projectile 
		  {
            constructor() 
			{
				
			}
            // Key Pressed
            // Collision function
            // Fire function
            // Show Self
          }
          