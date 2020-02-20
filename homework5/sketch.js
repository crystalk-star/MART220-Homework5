var cat;
var pics = [];
var shoot = [];
var i = 0;
var x = 0,
    y = 280;
var j = 0;
var hit = false;
let result = [];
var direction;
var isShooting = false;
var isJumping = false;
var speed = -5;
var obs1, obs2, obs3;
var obstacleArray = [];


function addImages(data) {

    for (var i = 0; i < data.length; i++) {
        cat = loadImage(data[i]);
        console.log('assets/' + data[i])
        pics[i] = cat;
    }
}

function addShoot(data) {

    for (var i = 0; i < data.length; i++) {
        cat = loadImage(data[i]);
        console.log('assets/' + data[i])
        shoot[i] = cat;
    }
}

function preload() {
    loadStrings('assets/Idle.txt', addImages);
    loadStrings('assets/shoot.txt', addShoot);
}

function setup() {
    createCanvas(900, 900);
    image(cat, 0, 0);
    obs1 = new obstacle(0, 0, 60, 25, "/assets/rock.jpg");
    obs2 = new obstacle(500, 100, 0, 0, "/assets/rock.jpg");
    obs3 = new obstacle(400, 300, 163, 125, "/assets/rock.jpg");
    obstacleArray[0] = obs1;
    obstacleArray[1] = obs2;
    // obstacleArray[2] = obs3;
}


function draw() {
    background(120);

    for (var i = 0; i < obstacleArray.length; i++) {
        obstacleArray[i].display();

    }

    //obs1.display();
    //obs2.display();
    // shoot[j].resize(320, 271);
    ///////////////////////////////////////
    // shoot key...
    if (keyIsDown(32)) {
        image(shoot[j], x, y);
        isShooting = true;

    } else {
        image(pics[i], x, y); // idle
    }

    if (keyIsDown(88)) {
        isJumping = true;
    }

    if (isJumping) {
        y += speed;
        //x += 13;
        if (y <= 20) {

            speed *= -1;
            //  x -= 13;

        } else if (y > 95) {
            y = 95;
            isJumping = false;
            speed *= -1;
        }


        //  image(pics[j], x, y); -- this is where the jumping animation would be
    }

    image(pics[i], x, y);
    i += 1;

    if (keyIsDown(LEFT_ARROW)) {
        direction = "left";
        // if (hit == true) {
        x -= 5;
        //} else {
        // x -= 5;
        // }
    } else if (keyIsDown(RIGHT_ARROW)) {

        direction = "right";
        //if (hit == true) {

        //   x -= 5;
        // } else {
        x += 5;
        //  }

    } else if (keyIsDown(UP_ARROW)) {
        direction = "up";
        //  if (hit == true) {
        //     y += 5;
        //  } else {
        y -= 5;
        //  }
    } else if (keyIsDown(DOWN_ARROW)) {
        direction = "down";
        // if (hit == true) {
        //     y -= 5;
        //  } else {
        y += 5;
        //  }
    }

    // x++;
    //print(i)
    if (i >= pics.length) {
        i = 0;
    }
    j++;
    if (j >= shoot.length) {
        j = 0;
    }
    //}
    //var isHit = obs1.collision(x, y, pics[i].width, pics[i].height);
    //var isHit2 = obs2.collision(x, y, pics[i].width, pics[i].height);
    for (var i = 0; i < obstacleArray.length; i++) {
        var isHit = obstacleArray[i].collision(x, y, pics[i].width, pics[i].height);
        print("Am I hit? " + isHit + ":" + i + ":" + obstacleArray[i].getXvar() + ":" +
            obstacleArray[i].getYvar() + ":" + obstacleArray[i].getW() + ":" + obstacleArray[i].getH());
        if (isHit) {
            if (direction == "right") {
                x -= 5;
            } else if (direction == "left") {
                x += 5;
            } else if (direction == "up") {
                y += 5;
            } else if (direction == "down") {
                y -= 5;
            }

        }
    }

}

class obstacle {

    constructor(x, y, w, h, imagePath) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.imagePath = imagePath;
        this.rock = loadImage(imagePath);
    }

    display() {
        image(this.rock, this.x, this.y);
        this.rock.resize(50, 50);
    }

    collision(playerX, playerY, playerW, playerH) {
        var hit = collideRectRect(playerX, playerY, playerW, playerH, this.x, this.y, this.w, this.h);
        return hit;
        //print(hit);
    }

    getXvar() {
        return this.x;
    }
    getYvar() {
        return this.y;
    }

    getW() {
        return this.w;
    }

    getH() {
        return this.h;
    }

}