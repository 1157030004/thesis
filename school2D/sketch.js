var particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (var i = 0; i < 3; i++) {
    particles.push(
      new Particle(random(0, 100), random(0, 100), random(0.5), random(0.5))
    );
  }
}
function draw() {
  background(0);
  for (var i = 0; i < particles.length; i++) {
    particles[i].interaction();
    particles[i].rungeKutta();
    particles[i].convertCor();
    particles[i].move();
    particles[i].display();
  }
}

class Particle {
  constructor(x, y, vx, vy) {
    this.position = createVector(x, y);
    this.velocity = createVector(vx, vy);
    this.acceleration = createVector(0, 0);
    this.autonomous = createVector(0.1, 0.1);
    this.gamma = 1.5;
    this.dt = 0.5;
    this.gminL;
    this.gminI;
    this.gplusI;
    this.gplusT;
    this.x0;
    this.y0;
    this.x1;
    this.y1;
    this.x2;
    this.y2;
  }

  interaction() {
    this.gminL =
      0.5 * exp((-particles[1].position.x - particles[0].position.x) / 50) -
      2 * exp((-particles[1].position.x - particles[0].position.x) / 1);
    this.gplusI =
      0.5 * exp((-particles[0].position.x - particles[1].position.x) / 50) -
      2 * exp((-particles[0].position.x - particles[1].position.x) / 1);
    this.gminI =
      0.5 * exp((-particles[2].position.x - particles[1].position.x) / 50) -
      2 * exp((-particles[2].position.x - particles[1].position.x) / 1);
    this.gplusT =
      0.5 * exp((-particles[1].position.x - particles[2].position.x) / 50) -
      2 * exp((-particles[1].position.x - particles[2].position.x) / 1);
  }

  rungeKutta() {
    var j1, j2, j3, j4, k1, k2, k3, k4;
    var m1, m2, m3, m4, n1, n2, n3, n4;
    // Leader
    for (var i = 0; i < particles.length; i++) {
      if (this.gminL != 0 && false) {
        j1 = this.dt * particles[0].velocity.x;
        k1 =
          this.dt *
          (this.autonomous.x -
            this.gamma * particles[0].velocity.x -
            this.gminL * (particles[1].position.x - particles[0].position.x));
        j2 = this.dt * (particles[0].velocity.x + k1 / 2);
        k2 =
          this.dt *
          (this.autonomous.x -
            this.gamma * (particles[0].velocity.x + k1 / 2) -
            this.gminL * (particles[1].position.x - particles[0].position.x));
        j3 = this.dt * (particles[0].velocity.x + k2 / 2);
        k3 =
          this.dt *
          (this.autonomous.x -
            this.gamma * (particles[0].velocity.x + k2 / 2) -
            this.gminL * (particles[1].position.x - particles[0].position.x));
        j4 = this.dt * (particles[0].velocity.x + k3);
        k4 =
          this.dt *
          (this.autonomous.x -
            this.gamma * (particles[0].velocity.x + k3) -
            this.gminL * (particles[1].position.x - particles[0].position.x));

        m1 = this.dt * particles[0].velocity.y;
        n1 =
          this.dt *
          (this.autonomous.y -
            this.gamma * particles[0].velocity.y -
            this.gminL * (particles[1].position.y - particles[0].position.y));
        m2 = this.dt * (particles[0].velocity.y + n1 / 2);
        n2 =
          this.dt *
          (this.autonomous.y -
            this.gamma * (particles[0].velocity.y + n1 / 2) -
            this.gminL * (particles[1].position.y - particles[0].position.y));
        m3 = this.dt * (particles[0].velocity.y + n2 / 2);
        n3 =
          this.dt *
          (this.autonomous.y -
            this.gamma * (particles[0].velocity.y + n2 / 2) -
            this.gminL * (particles[1].position.y - particles[0].position.y));
        m4 = this.dt * (particles[0].velocity.y + n3);
        n4 =
          this.dt *
          (this.autonomous.y -
            this.gamma * (particles[0].velocity.y + n3) -
            this.gminL * (particles[1].position.y - particles[0].position.y));

        //
        particles[0].acceleration.x = (k1 + 2 * k2 + 2 * k3 + k4) / 6;
        particles[0].velocity.x = (j1 + 2 * j2 + 2 * j3 + j4) / 6;
        particles[0].acceleration.y = (n1 + 2 * n2 + 2 * n3 + n4) / 6;
        particles[0].velocity.y = (m1 + 2 * m2 + 2 * m3 + m4) / 6;
      }
      if (this.gplusI != 0) {
        j1 = this.dt * particles[1].velocity.x;
        k1 =
          this.dt *
          (this.autonomous.x -
            this.gamma * particles[1].velocity.x +
            this.gplusI * (particles[0].position.x - particles[1].position.x) -
            this.gminI * (particles[1].position.x - particles[0].position.x));
        j2 = this.dt * (particles[1].velocity.x + k1 / 2);
        k2 =
          this.dt *
          (this.autonomous.x -
            this.gamma * (particles[1].velocity.x + k1 / 2) +
            this.gplusI * (particles[0].position.x - particles[1].position.x) -
            this.gminI * (particles[1].position.x - particles[0].position.x));
        j3 = this.dt * (particles[1].velocity.x + k2 / 2);
        k3 =
          this.dt *
          (this.autonomous.x -
            this.gamma * (particles[1].velocity.x + k2 / 2) +
            this.gplusI * (particles[0].position.x - particles[1].position.x) -
            this.gminI * (particles[1].position.x - particles[0].position.x));
        j4 = this.dt * (particles[1].velocity.x + k3);
        k4 =
          this.dt *
          (this.autonomous.x -
            this.gamma * (particles[1].velocity.x + k3) +
            this.gplusI * (particles[0].position.x - particles[1].position.x) -
            this.gminI * (particles[1].position.x - particles[0].position.x));

        m1 = this.dt * particles[1].velocity.y;
        n1 =
          this.dt *
          (this.autonomous.y -
            this.gamma * particles[1].velocity.y +
            this.gplusI * (particles[0].position.y - particles[1].position.y) -
            this.gminI * (particles[1].position.y - particles[0].position.y));
        m2 = this.dt * (particles[1].velocity.y + n1 / 2);
        n2 =
          this.dt *
          (this.autonomous.y -
            this.gamma * (particles[1].velocity.y + n1 / 2) +
            this.gplusI * (particles[0].position.y - particles[1].position.y) -
            this.gminI * (particles[1].position.y - particles[0].position.y));
        m3 = this.dt * (particles[1].velocity.y + n2 / 2);
        n3 =
          this.dt *
          (this.autonomous.y -
            this.gamma * (particles[1].velocity.y + n2 / 2) +
            this.gplusI * (particles[0].position.y - particles[1].position.y) -
            this.gminI * (particles[1].position.y - particles[0].position.y));
        m4 = this.dt * (particles[1].velocity.y + n3);
        n4 =
          this.dt *
          (this.autonomous.y -
            this.gamma * (particles[1].velocity.y + n3) +
            this.gplusI * (particles[0].position.y - particles[1].position.y) -
            this.gminI * (particles[1].position.y - particles[0].position.y));

        //
        particles[1].acceleration.x = (k1 + 2 * k2 + 2 * k3 + k4) / 6;
        particles[1].velocity.x = (j1 + 2 * j2 + 2 * j3 + j4) / 6;
        particles[1].acceleration.y = (n1 + 2 * n2 + 2 * n3 + n4) / 6;
        particles[1].velocity.y = (m1 + 2 * m2 + 2 * m3 + m4) / 6;
      }
      if (this.gplusT != 0) {
        j1 = this.dt * particles[2].velocity.x;
        k1 =
          this.dt *
          (this.autonomous.x -
            this.gamma * particles[2].velocity.x +
            this.gplusT * (particles[1].position.x - particles[2].position.x));
        j2 = this.dt * (particles[2].velocity.x + k1 / 2);
        k2 =
          this.dt *
          (this.autonomous.x -
            this.gamma * (particles[2].velocity.x + k1 / 2) +
            this.gplusT * (particles[1].position.x - particles[2].position.x));
        j3 = this.dt * (particles[2].velocity.x + k2 / 2);
        k3 =
          this.dt *
          (this.autonomous.x -
            this.gamma * (particles[2].velocity.x + k2 / 2) +
            this.gplusT * (particles[1].position.x - particles[2].position.x));
        j4 = this.dt * (particles[2].velocity.x + k3);
        k4 =
          this.dt *
          (this.autonomous.x -
            this.gamma * (particles[2].velocity.x + k3) +
            this.gplusT * (particles[1].position.x - particles[2].position.x));

        m1 = this.dt * particles[2].velocity.y;
        n1 =
          this.dt *
          (this.autonomous.y -
            this.gamma * particles[2].velocity.y +
            this.gplusT * (particles[1].position.y - particles[2].position.y));
        m2 = this.dt * (particles[2].velocity.y + n1 / 2);
        n2 =
          this.dt *
          (this.autonomous.y -
            this.gamma * (particles[2].velocity.y + n1 / 2) +
            this.gplusT * (particles[1].position.y - particles[2].position.y));
        m3 = this.dt * (particles[2].velocity.y + n2 / 2);
        n3 =
          this.dt *
          (this.autonomous.y -
            this.gamma * (particles[2].velocity.y + n2 / 2) +
            this.gplusT * (particles[1].position.y - particles[2].position.y));
        m4 = this.dt * (particles[2].velocity.y + n3);
        n4 =
          this.dt *
          (this.autonomous.y -
            this.gamma * (particles[2].velocity.y + n3) +
            this.gplusT * (particles[1].position.y - particles[2].position.y));

        //
        particles[2].acceleration.x = (k1 + 2 * k2 + 2 * k3 + k4) / 6;
        particles[2].velocity.x = (j1 + 2 * j2 + 2 * j3 + j4) / 6;
        particles[2].acceleration.y = (n1 + 2 * n2 + 2 * n3 + n4) / 6;
        particles[2].velocity.y = (m1 + 2 * m2 + 2 * m3 + m4) / 6;
      }
    }
  }

  convertCor() {
    // Convert Canvas coordinate to real coordinate
    for (var i = 0; i < particles.length; i++) {
      this.x0 = map(particles[0].position.x, 0, windowWidth, 0, 20);
      this.y0 = map(particles[0].position.y, 0, windowHeight, 0, 10);
      this.x1 = map(particles[1].position.x, 0, windowWidth, 0, 20);
      this.y1 = map(particles[1].position.y, 0, windowHeight, 0, 10);
      this.x2 = map(particles[2].position.x, 0, windowWidth, 0, 20);
      this.y2 = map(particles[2].position.y, 0, windowHeight, 0, 10);
      console.log(particles[0].position.x, this.x0);
    }
  }

  move() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
  }
  display() {
    for (var i = 0; i < particles.length; i++) {
      push();
      fill(255, 0, 0);
      ellipse(particles[0].position.x, particles[0].position.y, 10);
      pop();
      push();
      fill(0, 255, 0);
      ellipse(particles[1].position.x, particles[1].position.y, 10);
      pop();
      push();
      fill(0, 0, 255);
      ellipse(particles[2].position.x, particles[2].position.y, 10);
      pop();
    }
  }
}
