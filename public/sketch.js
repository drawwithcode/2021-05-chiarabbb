var socket;
let myColor = "blue";

socket.on("color", setColor);

function setColor(assignedColor) {
  myColor = assignedColor;
}

function preload() {
  myImage1 = loadImage("carta.jpeg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);


  socket = io.connect("http://localhost:3000")
  socket.on("mouse", newDrawing);
  
  imageMode(CENTER);
  push();
  image(myImage1, width / 2, height / 2, windowWidth, windowHeight);
  pop();
}


function newDrawing() {

  pop();
  stroke(data.color);
  strokeWeight(3);
  fill(255, 0, 100);
  line(data.x, data.y, data.x2, data.y2);
  
}

function mouseDragged(){
  push();
  stroke(myColor);
  strokeWeight(3);
  line(pmouseX, pmouseY, mouseX, mouseY);
  pop();

  let message = {
    x: mouseX,
    y: mouseY,
    x2: pmouseX,
    y2: pmouseY,
    color: myColor,
  };

  socket.emit("mouse", message);
}
