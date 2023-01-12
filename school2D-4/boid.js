class Boid {
  constructor() {
    this.position = createVector(random(0, 8), random(0, 8));
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(random(0.01, 0.05));
    this.acceleration = createVector();
    this.r = 5;
    this.pos = createVector(0, 0);
    this.perceptionRadius = 0.5;
    this.perceptionAngle = PI / 2;
  }

  align(boids) {
    let steering = createVector();
    let total = 0;
    let angleTwo;

    for (let other of boids) {
      // Knowing distance between two vectors
      let d = dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      );

      // Knowing angle between two vectors
      // var dp = this.position.dot(other.position);
      // peripheral = acos(dp / (this.position.mag() * other.position.mag()));

      // A fast way to know angle between two vectors
      angleTwo = this.position.angleBetween(other.position);

      // Set a peripheral
      if (
        other != this &&
        d < this.perceptionRadius &&
        angleTwo < this.perceptionAngle
      ) {
        steering.add(other.velocity);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.sub(this.velocity);
    }
    return steering;
  }

  flocks(boids) {
    let alignment = this.align(boids);
    this.acceleration = alignment;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
  }

  show() {
    let theta = -1 * this.velocity.heading() + PI / 2;

    var XMAX = cvx * 2;
    var YMAX = cvy * 2;
    this.pos.x = map(this.position.x, 0, 8, 0, XMAX);
    this.pos.y = map(this.position.y, 0, 8, YMAX, 0);

    push();
    fill(255, 90, 110);
    strokeWeight(1);
    stroke(50);
    translate(this.pos.x / 2, this.pos.y / 2);
    rotate(theta);
    beginShape();
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape(CLOSE);

    pop();
  }
}
