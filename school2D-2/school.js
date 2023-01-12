var xL = [];
var vL = [];
var xT = [];
var vT = [];
var a = 0;
var gamma = 0.2;
var t = 0;
var tmax = 100;
var h = 0.01;
var gplus = 1;
var gmin = 1;
var leader = [];
var interval;
var j1, j2, j3, j4, k1, k2, k3, k4;
function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
}
function draw() {
  background(0);
  for (var i = 0; i < 20; i++) {
    leader[i] = 0;
  }
  goFunction();
}

function goFunction() {
  interval = setInterval(rk4, 50);
}

// Runge-Kutta 4th order
function rk4() {
  // for leader particle
  for (var i = 1; i < leader.length; i++) {
    j1 = h * vL[i];
    k1 = h * (-gamma * vL[i] + gmin * (xT[i + 1] - xL[i]));
    j2 = h * (vL[i] + k1 / 2);
    k2 = h * (-gamma * vL[i] + gmin * (xT[i + 1] - xL[i]) + j1 / 2);
    j3 = h * (vL[i] + k2 / 2);
    k3 = h * (-gamma * vL[i] + gmin * (xT[i + 1] - xL[i]) + j2 / 2);
    j4 = h * (vL[i] + k3);
    k4 = h * (-gamma * vL[i] + gmin * (xT[i + 1] - xL[i]) + j3);

    xL[i + 1] = xL[i] + (1 / 6) * (j1 + 2 * j2 + 2 * j3 + j4);
    vL[i + 1] = vL[i] + (1 / 6) * (k1 + 2 * k2 + 2 * k3 + k4);
  }
  t = t + h;
  // console.log(j1);
}
