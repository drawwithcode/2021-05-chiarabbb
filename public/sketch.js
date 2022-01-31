
var scribble = new Scribble();

let clientSocket = io();
let nPlayers = 0;
clientSocket.on("connect", newConnection);
clientSocket.on("mouseBroadcast", newBroadcast);
clientSocket.on("number", newNumber);
clientSocket.on("playerBroadcast", (data) => {
  nPlayers = data;
  console.log("nPlayers:", nPlayers);
});

function newConnection() {
  console.log(clientSocket.id);
}


function newBroadcast(data) {
  console.log(data);

  stroke(color(data.hue, 130, 140));

  scribble.scribbleLine(data.px, data.py, data.x, data.y);
}

let n;
let index = 0;
let gotNumber = false;

function newNumber(data) {
  n = data;
  console.log("data:", data);

  switch (n % 3) {
    case 0:
      index = 3;
      break;
    case 1:
      index = 1;
      break;
    case 2:
      index = 2;
      break;
    default:
      index = 0;
  }
  if (index != 0) gotNumber = true;

  preload();
}

let img;
let font;
let song;

function preload() {
  console.log("preload!");
  font = loadFont("./assets/fonts/BogartSemibold.otf");

  if (gotNumber) img = loadImage("./assets/img/" + index + ".jpeg");
}

let hue;
let strokeColor;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#b0d7c4");
  strokeWeight(3);
  imageMode(CENTER);

  image(
    img,
    (width / 3) * 2,
    height / 2,
    (img.width / img.height) * height,
    height
  );

  colorMode(HSB);
  hue = random(360);
  strokeColor = color(hue, 100, 100);
  textFont(font);
  rectMode(CENTER);
  textAlign(CENTER);
}

function draw() {

  push();
  noStroke();
  textSize(35);
  translate(width / 5, 100);
  text("I don't want to talk with you, just leave me a message", 0, 0, width / 3);
  textSize(20);
  text(
    "It's not that hard",
    0,
    100,
    width / 3
  );
  pop();
}

function mouseDragged() {
  stroke(strokeColor);
  strokeCap(ROUND);
  scribble.scribbleLine(pmouseX, pmouseY, mouseX, mouseY);
  // line(pmouseX, pmouseY, mouseX, mouseY);

  let message = {
    x: mouseX,
    y: mouseY,
    px: pmouseX,
    py: pmouseY,
    hue: hue,
  };
  clientSocket.emit("mouse", message);

  //  Play the song when I'm drawing
  if (!song.isPlaying()) {
    console.log("PLAY");
    song.loop();
  }
}

//  Pause the song when I release the mouse
function mouseReleased() {
  console.log("PAUSE");
  song.pause();
}
