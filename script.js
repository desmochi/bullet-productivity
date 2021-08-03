// Be sure to name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, 
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke, 
          keyCode, push, pop, drawSprites, httpGet, keyIsDown, max, min, textFont, textAlign, CENTER, UP_ARROW, 
          sqrt, noFill, collideRectRect, LEFT_ARROW, frameRate, RIGHT_ARROW, DOWN_ARROW, textSize, round, mouseClicked, keyPressed */

          let backgroundColor, player, enemy, score, hit, isAlive, enemies, projectile, projectiles;

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
                    
          function setup() {
              // Canvas & color settings
              createCanvas(600, 600);
              colorMode(HSB, 360, 100, 100);
              backgroundColor = 95;
              player = new Player();
              score = 0;
              isAlive = true;
              enemies = [];
              projectiles = [];
              for(var i = 0; i < 3; i++) {
                  enemies.push(new Enemy());
              }
          }
                    
          function draw() {
              background(backgroundColor);
              if (isAlive == false) {
                  text("Game Over", width/2, height/2);
              } 
              else {
                  player.collidePlayer();
                  player.movePlayer();
                  player.showPlayer();

                  for(var i = 0; i < projectiles.length; i++) {
                      projectiles[i].shoot();
                      projectiles[i].collideProjectileEnemy();
                  }
                  
                  for(var i = 0; i < enemies.length; i++) {
                    enemies[i].showEnemy();
                    enemies[i].moveEnemy();
                    enemies[i].collideEnemyWall();
                    enemies[i].collideEnemyEnemy();
                  }

              }
          }
                    
          //Class for the main character
          class Player {
              constructor() {
                  this.playerX = width * 0.1;
                  this.playerY = height / 2;
                  this.playerWidth = 25;
                  this.playerHeight = 25;
                  this.playerVelocity = 3;
          }
                    
              // Move function
                    
              movePlayer() {
                  if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
                  this.playerY -= this.playerVelocity;
                  }
                  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
                  this.playerY += this.playerVelocity;
                  }
                  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
                  this.playerX -= this.playerVelocity;
                  }
                  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
                  this.playerX += this.playerVelocity;
                  }
              }
                    
              showPlayer() {
                  // draw the dot
                  fill(200, 80, 70);
                  noStroke();
                  rect(this.playerX, this.playerY, this.playerWidth, this.playerHeight);
              }
                    
              collidePlayer() {
                  //Collision with wall
                  if (this.playerX < 0) {
                      this.playerX = 0;
                  }
                  if (this.playerX > width - this.playerWidth) {
                      this.playerX = width - this.playerWidth;
                  }
                  if (this.playerY < 0) {
                      this.playerY = 0;
                  }
                  if (this.playerY > height - this.playerHeight) {
                      this.playerY = height - this.playerHeight;
                  }
                    
                  //Collision between Player and Enemy
                  // collideRectRect = function (x, y, w, h, x2, y2, w2, h2) - USE A FOR LOOP FOR MULTIPLE ENEMIES
                  for(var i = 0; i < enemies.length; i++) {
                      if (collideRectRect(this.playerX, this.playerY, this.playerWidth, this.playerHeight, enemies[i].enemyX,
                        enemies[i].enemyY, enemies[i].enemyWidth, enemies[i].enemyHeight)){
                        isAlive = false
                      }
                  }    
              }
          }
              
          //Class for the enemy/minions
          class Enemy 
          {
              constructor() 
              {
                  this.enemyX = random(100, 500);
                  this.enemyY = random(100, 500);
                  this.enemyWidth = 35;
                  this.enemyHeight = 35;
                  this.enemyVelocity = 2
              }

              // Move function      
              moveEnemy() {  
                  var directionX = player.playerX - this.enemyX;
                  var directionY = player.playerY - this.enemyY;
                  var hypotenuse = sqrt(directionX ** 2 + directionY ** 2);

                  directionX /= hypotenuse;
                  directionY /= hypotenuse;
                        
                  this.enemyX += directionX * this.enemyVelocity;
                  this.enemyY += directionY * this.enemyVelocity;
              }
                    
              // Show Self function
              showEnemy() {
                  stroke(360, 100, 50);
                  fill(360, 100, 50);
                  rect(this.enemyX, this.enemyY, this.enemyWidth, this.enemyHeight);
              }
              // Collision function
              
              collideEnemyWall() {
                  if (this.enemyX < 0) {
                      this.inverseVelocity();
                  }
                  if (this.enemyX > width - this.enemyWidth) {
                      this.inverseVelocity();
                  }
                  if (this.enemyY < 0) {
                      this.inverseVelocity();
                  }
                  if (this.enemyY > height - this.enemyHeight) {
                      this.inverseVelocity();
                  }
              }
              collideEnemyEnemy() {
                  for(var i = 0; i < enemies.length; i++) {
                      if(this == enemies[i]) {
                          continue;
                      }

                      if (collideRectRect(this.enemyX, this.enemyY, this.enemyWidth, this.enemyHeight, enemies[i].enemyX, enemies[i].enemyY, enemies[i].enemyWidth, enemies[i].enemyHeight)) { 
                          this.inverseVelocity();
                          setTimeout(() => this.inverseVelocity(), 700);
                      }
                  }   
              }

              inverseVelocity() {
                  this.enemyVelocity *= -1;
              }
          }
                    
          // Class for projectiles/bullets
          class Projectile {
              constructor(mouseX, mouseY) {
                  this.x = player.playerX;
                  this.y = player.playerY;
                  this.mouseX = mouseX;
                  this.mouseY = mouseY;
                  this.projectileVelocity = 5;
                  this.diameter = 10;

                  //Projectile velocity and shenanigans
                  this.directionX = this.mouseX - this.x;
                  this.directionY = this.mouseY - this.y;

                  var hypotenuse = sqrt(this.directionX ** 2 + this.directionY ** 2);
                
                  this.directionX /= hypotenuse;
                  this.directionY /= hypotenuse;
              }
              
            shoot() {
                ellipse(this.x, this.y, this.diameter);

                this.x += this.directionX * this.projectileVelocity;
                this.y += this.directionY * this.projectileVelocity;
            }
           
            collideProjectileEnemy() {
                // collideRectCircle(x1, y1, width1, height1, cx, cy, diameter)
              for(var i = 0; i < enemies.length; i++) {
                    if (collideRectCircle(enemies[i].enemyX, enemies[i].enemyY, enemies[i].enemyWidth, enemies[i].enemyHeight, this.x, this.y, this.diameter)) {
                         enemies.splice(i, 1);
                         for (var x = 0; x < projectiles.length; x++) {
                             projectiles.splice(x-3, 1);
                         } 
                    }
              }
            }
          }

          function mousePressed() {
              projectiles.push(new Projectile(mouseX, mouseY));
          }
          // For loop enemies - Enemies class
          // Enemies can't collide
          // Collision of player and enemies results in game over. 
          
          // Projectile
          // - left click or space to fire bullet 
          // Collision w/ enemy enemy disappears 
          // Show Self - small circle 
          