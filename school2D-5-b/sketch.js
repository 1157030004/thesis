// Define global variable
const flock = [];
var obstacle = [];
const fr = 15;
const cvx = 480;
const cvy = 480;
var slider1, slider2;
var input1, input2;
var taIn, taOut, caOut;
var btLoad, btRead, btStart, btStop;
var handle = true;

function setup() {
  let cnv = createCanvas(cvx, cvy);
  cnv.id("canvas");
  frameRate(fr);

  // input1 = createInput()
}

function buttonClick() {
  var id = event.target.id;
  switch (id) {
    case "Load":
      loadParams();
      break;
    case "Read":
      break;
    case "Start":
      for (var i = 0; i < 1; i++) {
        flock.push(new Boid());
      }

      for (var i = 0; i < 100; i++) {
        obstacle.push(new Obstacle());
      }

      break;
    case "Stop":
      noLoop();
      break;
    case "Rerun":
      loop();
  }
}

function draw() {
  background(51);

  for (var i = 0; i < obstacle.length; i++) {
    obstacle[i].show();
  }

  for (let boid of flock) {
    boid.eat(obstacle);
    boid.flocks(flock);
    boid.update();
    boid.show();
  }

  // Showing data to textarea
  for (var i = 0; i < flock.length; i++) {
    var xx = flock[0].position.x;
    var yy = flock[i].position.y;
    var x = parseFloat(Math.round(xx * 100) / 100).toFixed(3);
    var y = parseFloat(Math.round(yy * 100) / 100).toFixed(3);
    var text = x + " " + y + "\n";
    document.getElementById("taOut").value = text;
  }
}

// function newObstacle() {
//   // A obstacle is a series of connected points

//   // obstacle = new Obstacle();
//   // obstacle.addPoint(4, 4);
// }
