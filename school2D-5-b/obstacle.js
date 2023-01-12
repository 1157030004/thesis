class Obstacle {
  constructor() {
    this.position = createVector(random(0, 8), random(0, 8));
    this.pos = createVector(0, 0);
    this.r = 5;
    this.points = [];
  }

  show() {
    var XMAX = cvx * 2;
    var YMAX = cvy * 2;
    this.pos.x = map(this.position.x, 0, 8, 0, XMAX);
    this.pos.y = map(this.position.y, 0, 8, YMAX, 0);

    push();
    fill(255, 0, 0);
    noStroke();
    translate(this.pos.x / 2, this.pos.y / 2);
    ellipse(0, 0, this.r);
    pop();
  }
}
