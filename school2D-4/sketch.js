// Define global variable
const flock = [];
const fr = 15;
const cvx = 480;
const cvy = 480;
var button;
var taIn, taOut, caOut;
var btLoad, btRead, btStart, btStop;
var handle = true;

function setup() {
  let cnv = createCanvas(cvx, cvy);
  cnv.id("canvas");
  frameRate(fr);

  // button = createButton("Go");
  // button.position(cvx, cvy);
  // button.mouseClicked(c);
  // output = select("#output");
}

function buttonClick() {
  var id = event.target.id;
  switch (id) {
    case "Load":
      break;
    case "Read":
      break;
    case "Start":
      for (var i = 0; i < 100; i++) {
        flock.push(new Boid());
      }
      loadOutput();
      break;
    case "Stop":
      noLoop();
      break;
    case "Rerun":
      loop();
  }
}

function loadOutput() {}

function draw() {
  background(51);

  for (let boid of flock) {
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
