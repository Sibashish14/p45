var tank,angle=0,ground,rocket1Img,rocket2Img,rocket3Img,bombImg,rocket1,rocket2,rocket3,rocket1G,rocket2G,rocket3G;
var blastImg,blastAirImg,rocket1,rocket2,rocket3,state=0;
var start,startImg,rocket,rocketG,reset,score=0;
function preload(){
  bombImg=loadImage("bomb.png");
  rocket1Img=loadImage("rocket1.png");
  rocket2Img=loadImage("rocket2.png");
  rocket3Img=loadImage("rocket3.png");
  blastImg=loadImage("blast.png");
  blastAirImg=loadImage("burstAir.png");
  resetImg=loadImage("reset.png");
  startImg=loadImage("play.png");
}
function setup() {
  createCanvas(displayWidth,640);
  tank=createSprite(200,570,100,50);
  tank.shapeColor="green";
  ground=createSprite(displayWidth/2,590,displayWidth,100);
  ground.shapeColor="brown";
  start=createSprite(width/2,height/2);
  start.addImage(startImg);
  start.scale=0.25;
  rocket1G=new Group();
  rocket2G=new Group();
  rocket3G=new Group();
  rocketG=new Group();
  reset=createSprite(width/2+150,height/2);
  reset.addImage(resetImg);
  reset.scale=0.25;
  reset.visible=false;
  
}

function draw() {
  background(0); 
  tank.collide(ground);
  tank.velocityY=tank.velocityY+5;
  if(mousePressedOver(tank)&&state===0){
    var rand=Math.round(random(1,5));
    switch(rand){
    case 1:tank.shapeColor="blue";
    break;
    case 2:tank.shapeColor="yellow";
    break;
    case 3:tank.shapeColor="pink";
    break;
    case 4:tank.shapeColor="green";
    break;
    case 5:tank.shapeColor="orange";
    break;
    default:break;
    }
  }
  if(rocket1G.isTouching(tank)||rocket2G.isTouching(tank)||rocket3G.isTouching(tank)){
    state=2;

  }
  if(state===2){
    reset.visible=true;
    rocketG.destroyEach();
    rocket1G.setLifetimeEach(-1);
    rocket1G.setVelocityEach(0,0);
    rocket2G.setVelocityEach(0,0);
    rocket2G.setLifetimeEach(-1);
    rocket3G.setLifetimeEach(-1);
    rocket3G.setVelocityEach(0,0);
  }
  if(state===2&&mousePressedOver(reset)){
    state=0;
    angle=0;
    start.visible=true;
    rocket1G.destroyEach();
    rocket2G.destroyEach();
    rocket3G.destroyEach();
    tank.x=200;
    tank.y=570;
    reset.visible=false;
    score=0;
  }
  if(mousePressedOver(start)&&state===0){
    start.visible=false;
    state=1;
  }
  if(keyDown("down")&&state===1){
    angle+=5;
  }
  if(keyDown("up")&&state===1){
    angle-=5;
  }
  if(keyDown("right")&&state===1){
    tank.x+=5;
  }
  if(keyDown("left")&&state===1){
    tank.x-=5;
  }
  if(rocketG.isTouching(rocket1G)){
    rocket1.destroy();
    rocket.addImage(blastAirImg);
    rocket.setVelocity(0,0);
    rocket.scale=0.25;
    rocket.lifetime=2;
    score++;
  }
  if(rocketG.isTouching(rocket2G)){
    rocket2.destroy();
    rocket.addImage(blastAirImg);
    rocket.setVelocity(0,0);
    rocket.scale=0.25;
    rocket.lifetime=2;
    score++;
  }
  if(rocketG.isTouching(rocket3G)){
    rocket3.destroy();
    rocket.addImage(blastAirImg);
    rocket.setVelocity(0,0);
    rocket.scale=0.25;
    rocket.lifetime=2;
    score++;
  }
  if(rocket1G.isTouching(ground)){
     rocket1.addImage(blastImg);
     rocket1.scale=0.5;
     rocket1.setVelocity(0,0);
     rocket1.lifetime=1;
  }
  if(rocket2G.isTouching(ground)){
    rocket2.addImage(blastImg);
    rocket2.scale=0.5;
    rocket2.setVelocity(0,0);
    rocket2.lifetime=1;
 }
 if(rocket3G.isTouching(ground)){
  rocket3.addImage(blastImg);
  rocket3.scale=0.5;
  rocket3.setVelocity(0,0);
  rocket3.lifetime=1;
}
if(rocket1G.isTouching(rocket2G)){
  rocket2.destroy();
  rocket1.addImage(blastAirImg);
  rocket1.scale=0.25;
  rocket1.setVelocity(0,0);
  rocket1.lifetime=2;
}
if(rocket1G.isTouching(rocket3G)){
  rocket3.destroy();
  rocket1.addImage(blastAirImg);
  rocket1.scale=0.25;
  rocket1.setVelocity(0,0);
  rocket1.lifetime=2;
}
if(rocket2G.isTouching(rocket3G)){
  rocket3.destroy();
  rocket2.addImage(blastAirImg);
  rocket2.scale=0.25;
  rocket2.setVelocity(0,0);
  rocket2.lifetime=2;
}
   push(); 
  translate(tank.x,tank.y);
  rotate(angle);
  fill("red");
  rect(0,0,100,20);
  pop();
  if(state===1){
  spawnRocket1();
  spawnRocket2();
  spawnRocket3();
  }
  drawSprites();
  textSize(20);
  fill(255);
  text("Score:"+score,width/2+500,20);
}
function keyPressed(){
  if(keyCode === 32&&state===1){
   rocket=createSprite(tank.x,tank.y,20,10);
  rocket.addImage(bombImg);
  rocket.scale=0.0525;
  rocket.rotation=angle;
  rocket.setSpeedAndDirection(10,angle);
  rocketG.add(rocket);
  }
}
function spawnRocket1(){
  if(World.frameCount%259===0){
   rocket1=createSprite(random(0,displayWidth),0);
  rocket1.addImage(rocket1Img);
  rocket1.scale=0.125;
  rocket1.velocityY=3;
  rocket1.lifetime=200;
  rocket1G.add(rocket1);
  }
}
function spawnRocket2(){
  if(World.frameCount%411===0){
   rocket2=createSprite(random(0,displayWidth),0);
  rocket2.addImage(rocket2Img);
  rocket2.scale=0.125;
  rocket2.velocityY=3;
  rocket2.lifetime=200;
  rocket2G.add(rocket2);
  }
}
function spawnRocket3(){
  if(World.frameCount%371===0){
   rocket3=createSprite(random(0,displayWidth),0);
  rocket3.addImage(rocket3Img);
  rocket3.scale=0.125;
  rocket3.velocityY=3;
  rocket3.lifetime=200;
  rocket3G.add(rocket3);
  }
}