// Be sure to name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, 
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke, 
          keyCode, push, pop, drawSprites, httpGet, keyIsDown, max, min, textFont, textAlign, CENTER, UP_ARROW, 
          sqrt, noFill, collideRectRect, LEFT_ARROW, frameRate, RIGHT_ARROW, DOWN_ARROW, textSize, round, mouseClicked, 
          keyPressed */

let backgroundColor, player, enemy, score, hit, isAlive, enemies, projectile, projectiles, enemyIncrement, level, spawnInterval;
                    
function setup() {
    // Canvas & color settings
    createCanvas(600, 600);
    colorMode(HSB, 360, 100, 100);
    backgroundColor = 95;
    player = new Player();
    score = 0;
    level = 0;
    isAlive = true;
    enemies = [];
    enemyIncrement = 1;
    projectiles = [];
    spawnInterval = setInterval(() => spawnEnemies(), 3000);
}
//shift tab to shift back tabs        
function draw() {
    background(backgroundColor);
    console.log(`Enemy Increment: ${enemyIncrement}`);

    if (isAlive == false) {
        push();
        textFont("Impact");
        fill(360, 100, 100);
        textSize(50);
        text("Game Over", width/3.5, height/2);
        textSize(15);
        text("Press SPACE to try again!", width/3, height/3*2)
        displayScoreboard();
        pop();
    } 
    else {
        displayScoreboard();

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
                    
    // Player move function       
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
    
    //Display player
    showPlayer() {
        // draw the dot
        push();
        fill(200, 80, 70);
        rect(this.playerX, this.playerY, this.playerWidth, this.playerHeight);
        pop();
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
        this.enemyWidth = 30;
        this.enemyHeight = 30;
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
        push();
        stroke(360, 100, 50);
        fill(360, 100, 50);
        rect(this.enemyX, this.enemyY, this.enemyWidth, this.enemyHeight);
        pop();
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
        push();
        fill(200, 80, 70);
        ellipse(this.x, this.y, this.diameter);
        pop();

        this.x += this.directionX * this.projectileVelocity;
        this.y += this.directionY * this.projectileVelocity;
    }
           
    collideProjectileEnemy() {
        // collideRectCircle(x1, y1, width1, height1, cx, cy, diameter)
        for(var i = 0; i < enemies.length; i++) {
            if (collideRectCircle(enemies[i].enemyX, enemies[i].enemyY, enemies[i].enemyWidth, enemies[i].enemyHeight, this.x, this.y, this.diameter)) {
                    enemies.splice(i, 1);
                    score++;
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

function keyPressed() {
    if(keyCode == 32) {
        clearInterval(spawnInterval);
        player = new Player();
        score = 0;
        level = 0;
        isAlive = true;
        enemies = [];
        enemyIncrement = 1;
        projectiles = [];
        spawnInterval = setInterval(() => spawnEnemies(), 3000);
    }
}
function spawnEnemies() {
    if(isAlive) {
        for(var i = 0; i < enemyIncrement; i++) {
            enemies.push(new Enemy());
        }
        level++;
        enemyIncrement++;
    }
}

function displayScoreboard() {
    push();
    textFont("Courier");
    textSize(15);
    stroke(10);
    fill(360, 0, 0);
    text(`Level: ${level}`, 20, 20);
    text(`Score: ${score}`, 20, 40);
    pop();
}
