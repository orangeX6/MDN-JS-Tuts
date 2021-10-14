// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const para = document.querySelector('p');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
let count = 0;


// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

function Shape(x, y, velX, velY, exists) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.exists = exists;
}


function Ball(x, y, velX, velY, color, size, exists) {
  Shape.call(this, x, y, velX, velY, exists);
  this.color = color;
  this.size = size;
}

Ball.prototype = Object.create(Shape.prototype);
Ball.prototype.constructor = Ball;

Ball.prototype.draw = function () {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
}

Ball.prototype.update = function () {
  if ((this.x + this.size) > width + 1) {
    this.velX = -(this.velX);
  }

  if ((this.x - this.size) < -1) {
    this.velX = -(this.velX);
  }

  if ((this.y + this.size) > height + 1) {
    this.velY = -(this.velY);
  }

  if ((this.y - this.size) < -1) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
}

Ball.prototype.collisionDetect = function () {
  for (let j = 0; j < balls.length; j++) {

    if (!(this === balls[j]) && balls[j].exists) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
      }
    }
  }
}


//EVIL CIRCLE
function EvilCircle(x, y, exists) {
  Shape.call(this, x, y, 20, 20, exists);
  this.color = 'ghostwhite';
  this.size = 10;
}

EvilCircle.prototype = Object.create(Shape.prototype);
EvilCircle.prototype.constructor = EvilCircle;

EvilCircle.prototype.draw = function () {
  ctx.beginPath();
  ctx.strokeStyle = this.color;
  ctx.lineWidth = 3;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.stroke();
}



EvilCircle.prototype.checkBounds = function () {
  if ((this.x + this.size) > width + 1) {
    this.x = this.width - this.size;
  }

  if ((this.x - this.size) < -1) {
    this.x = this.size;
  }

  if ((this.y + this.size) > height + 1) {
    this.y = this.height - this.y
  }

  if ((this.y - this.size) < -1) {
    this.y = this.size;
  }
}

EvilCircle.prototype.collisionDetect = function () {
  for (let j = 0; j < balls.length; j++) {

    if (balls[j].exists) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].exists = false;
        count--;
        para.textContent = `ball count: ${count}`;
      }
    }
  }
}

EvilCircle.prototype.setControls = function () {
  let _this = this;
  window.onkeydown = function (e) {
    if (e.key === 'a') {
      _this.x -= _this.velX;
    } else if (e.key === 'd') {
      _this.x += _this.velX;
    } else if (e.key === 'w') {
      _this.y -= _this.velY;
    } else if (e.key === 's') {
      _this.y += _this.velY;
    }
  }
}

//DECLARING OBJECTS 

let balls = [];
while (balls.length < 69) {
  let size = random(6, 9);
  let ball = new Ball(
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
    size,
    true
  );

  balls.push(ball);
  count++;
  para.textContent = `ball count: ${count}`
  para.append();
}


let blackHole = new EvilCircle(
  random(10, width - 10)
  , random(10, height - 10)
  , true);



function loop() {
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0, 0, width, height);
  blackHole.draw();

  for (let i = 0; i < balls.length; i++) {
    if (balls[i].exists) {
      balls[i].draw();
      balls[i].update();
      balls[i].collisionDetect();
    }
  }

  blackHole.setControls();
  blackHole.checkBounds();
  blackHole.collisionDetect();

  requestAnimationFrame(loop);
}

loop();