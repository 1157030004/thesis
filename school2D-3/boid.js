var particle1;

function setup() {
  createCanvas(400, 400);
  particle1 = new Particle(50, 50, 0.5, 0.5);
  particle2 = new Particle(55, 55, 0.5, 0.5);
  particle3 = new Particle(60, 60, 0.5, 0.5);
}
function draw() {
  background(0);

    particle1.rungeKutta();
    particle1.display();
    particle1.move();

    particle2.rungeKutta();
    particle2.display();
    particle2.move();

    particle3.rungeKutta();
    particle3.display();
    particle3.move();
  
}

class Particle {
  constructor(x, y, vx, vy) {
    this.position = createVector(x, y);
    this.velocity = p5.Vector.random2D();
    this.acceleration = createVector(0, 0);
    this.autonomous = 0.9;
    this.gamma = 1.5;
    this.dt = 0.5;
    this.gminL = 0.16;
  }
  rungeKutta() {
    var j1, j2, j3, j4, k1, k2, k3, k4;
    var m1, m2, m3, m4, n1, n2, n3, n4;
    // Leader
    j1 = this.dt * this.velocity.x;
    k1 =
      this.dt *
      (this.autonomous -
        this.gamma * this.velocity.x -
        this.gminL * (this.position.x - this.position.x));
    j2 = this.dt * (this.velocity.x + k1 / 2);
    k2 = this.dt * (this.autonomous - this.gamma * (this.velocity.x + k1 / 2));
    j3 = this.dt * (this.velocity.x + k2 / 2);
    k3 = this.dt * (this.autonomous - this.gamma * (this.velocity.x + k2 / 2));
    j4 = this.dt * (this.velocity.x + k3);
    k4 = this.dt * (this.autonomous - this.gamma * (this.velocity.x + k3));

    m1 = this.dt * this.velocity.y;
    n1 = this.dt * (this.autonomous - this.gamma * this.velocity.y);
    m2 = this.dt * (this.velocity.y + n1 / 2);
    n2 = this.dt * (this.autonomous - this.gamma * (this.velocity.y + n1 / 2));
    m3 = this.dt * (this.velocity.x + n2 / 2);
    n3 = this.dt * (this.autonomous - this.gamma * (this.velocity.y + n2 / 2));
    m4 = this.dt * (this.velocity.y + n3);
    n4 = this.dt * (this.autonomous - this.gamma * (this.velocity.y + n3));

    this.acceleration.x = (k1 + 2 * k2 + 2 * k3 + k4) / 6;
    this.velocity.x = (j1 + 2 * j2 + 2 * j3 + j4) / 6;
    this.acceleration.y = (n1 + 2 * n2 + 2 * n3 + n4) / 6;
    this.velocity.y = (m1 + 2 * m2 + 2 * m3 + m4) / 6;
  }
  move() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
  }
  display() {
    ellipse(this.position.x, this.position.y, 10);
  }
}
