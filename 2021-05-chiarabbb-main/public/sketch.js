let clientSocket = io();
let stockArray = [];

clientSocket.on("connect", newConnection);
clientSocket.on("mouseBroadcast", newBroadcast);

function preload() {

  myImage1 = loadImage("carta.jpeg");
} 

function newConnection() {
  console.log(clientSocket.id);
}

function newBroadcast(data) {
  console.log(data);
  stroke('black');
  strokeWeight(3);
  line(data.x, data.y, data.x2, data.y2);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
  frameRate(100);
  textFont('IBM Plex Mono');
  textSize(20);
  textAlign(CENTER);
  text("I don't want to talk with you, leave your message and go", width / 2, height / 9);
  

  imageMode(CENTER);
  push();
  image(myImage1, width / 2, height / 2, windowWidth, windowHeight);
  pop();
}

function draw() {  
}

function mouseDragged() {

push();
  stroke('blue');
  strokeWeight(3);
  line(pmouseX, pmouseY, mouseX, mouseY);
pop();

 let message ={
   x:mouseX,
   y:mouseY,
   x2: pmouseX,
   y2: pmouseY
   
 }; 

 clientSocket.emit("mouse", message);
}