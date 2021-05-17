var bg, bg2;
var aladdin, aladdinImg;
var jasmine, jasmineImg;
var genie, genieImg;
var carpet, carpetImg;
var playButton, playButtonImg;
var rock, rock1Img, rock2, rock2Img, rockGroup, rock2Group;
var coin, coinImg, coinGroup;
var gameOver, gameOverImg;
var reset, resetImg;
var jafar, jafarImg;
var fire, fireImg, fireGroup;
var confetti, confettiImg;
var congrats, congratsImg;
var edges;
var coinSound, dieSound, fireSound, jumpSound, resetSound, winSound;

var score=0;
var lives=3;

function preload(){
  bgImg=loadImage("Images/bg0.jpg");
  bgImg2=loadImage("Images/bg1.jpg");
  bgImg3=loadImage("Images/bg2.jpg");
  aladdinImg=loadImage("Images/aladdin.png");
  genieImg=loadImage("Images/genie.png");
  carpetImg=loadImage("Images/Carpet.png");
  playButtonImg=loadImage("Images/PlayButton.png");
  rock1Img=loadImage("Images/rock1.png");
  rock2Img=loadImage("Images/rock2.png");
  coinImg=loadImage("Images/coin.png");
  gameOverImg=loadImage("Images/gameOver.png");
  resetImg=loadImage("Images/reset.png");
  jafarImg=loadImage("Images/Jafar.png");
  fireImg=loadImage("Images/fire.png");
  jasmineImg=loadImage("Images/Jasmine.png");
  confettiImg=loadImage("Images/star.png");
  congratsImg=loadImage("Images/congrats.png");

  coinSound=loadSound("Sounds/coin.mp3");
  dieSound=loadSound("Sounds/die.mp3");
  fireSound=loadSound("Sounds/fire.mp3");
  jumpSound=loadSound("Sounds/jump.mp3");
  resetSound=loadSound("Sounds/reset.mp3");
  winSound=loadSound("Sounds/win.mp3");
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  edges=createEdgeSprites();

  //Start
  setStart();

  //Level 1
  setLevelOne();

  //Level 2
  setLevelTwo();

  //End
  setEnd();
}

function draw(){
  background("blue");
  drawSprites();

  if(gameState==="start"){
    startState();
  }

  if(gameState==="LevelOne"){
    playLevelOne();
  }

  if(gameState==="LevelTwo"){
    playLevelTwo();
  }

  if(gameState==="End"){
    endState();
  }

  if(gameState==="End2"){
    end2State();
  }

  if(gameState==="Win"){
    Win();
  }

}

function startState(){
  textSize(24);
  fill("yellow");
  stroke("orange");
  text("Welcome \n 1. Press the arrow keys to move Aladdin \n 2. Avoid the obstacles coming in your way");

  bg.visible=true;
  carpet.visible=true;
  genie.visible=true;
  aladdin.visible=true;
  playButton.visible=true;

  if(mousePressedOver(playButton)){
    resetSound.play();
    clear();
    gameState="LevelOne";
  }
}

function setStart(){
  bg=createSprite(width/2,height/2,width,height);
  bg.addImage(bgImg);
  bg.visible=false;

  carpet=createSprite(width/2-400,height/2+250);
  carpet.addImage(carpetImg);
  carpet.scale=0.8;
  carpet.visible=false;

  genie=createSprite(width/2+400,height/2);
  genie.addImage(genieImg);
  genie.scale=0.8;
  genie.visible=false;

  playButton=createSprite(width/2,height/2+125);
  playButton.addImage(playButtonImg);
  playButton.scale=0.8;
  playButton.visible=false;

  aladdin=createSprite(width/2-425,height/2);
  aladdin.addImage(aladdinImg);
  aladdin.scale=0.8;
  aladdin.visible=false;
}

function setLevelOne(){
  bg2=createSprite(width/2,height/2-350,width,height);
  bg2.addImage(bgImg2);
  bg2.scale=3.5;
  bg2.visible=false;

  carpet2=createSprite(width/2-650,height-50);
  carpet2.addImage(carpetImg);
  carpet2.scale=0.8;
  carpet.setCollider("rectangle",0,-30,carpet.width-100,carpet.height-300)
  carpet2.visible=false;

  aladdin2=createSprite(width/2-650,height-100);
  aladdin2.addImage(aladdinImg);
  aladdin2.scale=0.8;
  aladdin2.visible=false;

  invisibleGround=createSprite(width/2,height-30,width,30);
  invisibleGround.visible=false;

  rockGroup=new Group();
  rock2Group=new Group();
  coinGroup=new Group();
  }

  function playLevelOne(){
    bg2.visible=true;
    carpet2.visible=true;
    aladdin2.visible=true;

    textSize(25);
    textStyle(BOLD);
    fill(0);
    text("Score: "+score,width-200,100);
    text("level 1",width/2,50);
    
    if(keyDown(UP_ARROW)){
      aladdin2.velocityY=-10;
      carpet2.velocityY=-10;
    }
    if(keyDown(LEFT_ARROW)){
      aladdin2.x=aladdin2.x-5;
      carpet2.x=carpet2.x-5;
    }
   if(keyDown(RIGHT_ARROW)){
      aladdin2.x=aladdin2.x+5;
      carpet2.x=carpet2.x+5;
    }
    aladdin2.velocityY=aladdin2.velocityY+0.5;
    carpet2.velocityY=aladdin2.velocityY;

    carpet2.collide(edges);
    aladdin2.collide(edges);
    carpet2.collide(invisibleGround);
    aladdin2.collide(carpet2);

    if(score===1000){
      clear();
      rockGroup.destroyEach();
      rock2Group.destroyEach();
      coinGroup.destroyEach();
      gameState="LevelTwo";
    }
    for(var i=0; i<coinGroup.length; i++){
      if(coinGroup.get(i).isTouching(aladdin2))
      coinSound.play();
      coinGroup.get(i).remove();
      score=score+100
    }
 
 if(rockGroup.isTouching(aladdin2) || rock2Group.isTouching(aladdin2)){
   dieSound.play();
   gameState="End";
 }
 rocks();
 createCoins();
}
function rocks(){
  if(frameCount%100===0){

  r=createSprite(width,Math.round(random(50,height-350)),20,20);
    r.addImage(rock1Img);
    r.scale=0.1;
    r.velocityX=-5;
    r.lifetime=300;

    r1=createSprite(-50,Math.round(random(50,height-350)),20,20);
    r1.addImage(rock2Img);
    r1.scale=0.4;
    r1.velocityX=5;
    r1.lifetime=300;

    rockGroup.add(r);
    rock2Group.add(r1);

  }
}

function coins(){
  if(frameCount%100===0){

    c=createSprite(Math.round(random(50,width-100)),-50,20,20);
      c.addImage(coinImg);
      c.scale=0.1;
      c.velocityY=3;
      c.lifetime=200;

      coinGroup.add(c);
  }
}

function setLevelTwo(){
  bg3=createSprite(width/2,height/2-350,width,height);
  bg3.addImage(bgImg3);
  bg3.scale=3;
  bg3.visible=false;

  carpet3=createSprite(width/2-650,height-50);
  carpet3.addImage(carpetImg);
  carpet3.scale=0.8;
  carpet3.setCollider("rectangle",0,-30,carpet.width-100,carpet.height-300)
  carpet3.visible=false;

  aladdin3=createSprite(width/2-650,height-100);
  aladdin3.addImage(aladdinImg);
  aladdin3.scale=0.8;
  aladdin3.visible=false;

  invisibleGround=createSprite(width/2,height-30,width,30);
  invisibleGround.visible=false;

  jafar=createSprite(width-150,height/2,50,50);
  jafar.addImage(jafarImg);
  jafar.scale=0.5;
  jafar.visible=false;

  jasmine.createSprite(width-300,height-100,50,50);
  jasmine.addImage(jasmineImg);
  jasmine.scale=0.2;
  jasmine.visible=false;

  fireGroup=new Group();
  }

  function playLevelTwo(){
    bg3.visible=true;
    carpet3.visible=true;
    aladdin3.visible=true;
    jafar.visible=true;
    jasmine.visible=true;

    jafar.bounceOff(invisibleGround2)
    jafar.velocityY=4;

    textSize(25);
    textStyle(BOLD);
    fill(255);
    text("Lives: "+ lives,width/2-700,100);
    text("LevelTwo",width/2,50);

    if(keyDown(UP_ARROW)){
      aladdin3.velocityY=-10;
      carpet3.velocityY=-10;
    }
    if(keyDown(LEFT_ARROW)){
      aladdin3.x=aladdin3.x-5;
      carpet3.x=carpet3.x-5;
    }
   if(keyDown(RIGHT_ARROW)){
      aladdin3.x=aladdin3.x+5;
      carpet3.x=carpet3.x+5;
    }
    aladdin3.velocityY=aladdin3.velocityY+0.5;
    carpet3.velocityY=aladdin3.velocityY;

    carpet3.collide(edges);
    carpet3.collide(invisibleGround2);
    aladdin3.collide(edges);
    aladdin3.collide(carpet3);

    if(lives===0){
      dieSound.play();
      gameState="End2";
    }
    for(i=0; i<fireGroup.length; i++){
      if(fireGroup.get(i).isTouching(aladdin3)){
        dieSound.play();
        fireGroup.get(i).remove();
        lives--;
      }
    }
    if(carpet3.isTouching(jasmine)){
      winSound.play();
      gameState="Win";
    }
    createFire();

  }

function createFire(){
  if(frameCount%100===0){
    
    f=createSprite(Math.round(random(50,width-100)),-50,20,20);
      f.addImage(fireImg);
      f.scale=0.3;
      f.velocityY=3;
      f.lifetime=100;

      fireGroup.add(f);
  }
}