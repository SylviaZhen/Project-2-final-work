let lines = [];

function setup() {
  let c = createCanvas(windowWidth, windowHeight);
  c.style('position', 'fixed');
  c.style('top', '0');
  c.style('left', '0');
  c.style('z-index', '5');
  c.style('pointer-events', 'none');
  clear();
}

function draw() {
  clear();

  for (let l of lines) {
    l.update();
    l.display();
  }

  lines = lines.filter(l => l.life > 0);
}

function mouseMoved() {
  lines.push(new LineSystem(mouseX, mouseY));
}

function mouseDragged() {
  lines.push(new LineSystem(mouseX, mouseY));
}

class LineSystem {
  constructor(x, y) {
    this.points = [];
    this.baseX = x;
    this.baseY = y;
    this.t = random(1000);
    this.life = 180;
    this.seedX = random(1000);
    this.seedY = random(2000);
  }

  update() {
    this.t += 0.03;
    this.life -= 1.4;

    let x = this.baseX + sin(this.t * 2) * 120 + map(noise(this.seedX + this.t), 0, 1, -80, 80);
    let y = this.baseY + cos(this.t * 3) * 120 + map(noise(this.seedY + this.t), 0, 1, -80, 80);

    this.points.push(createVector(x, y));

    if (this.points.length > 36) {
      this.points.shift();
    }
  }

  display() {
    noFill();
    stroke(180, 0, 0, this.life);
    strokeWeight(0.8);

    beginShape();
    for (let p of this.points) {
      curveVertex(p.x, p.y);
    }
    endShape();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}