var gameState = "play";

var tower,towerImg
var door ,doorImg,doorGroup;
var climber,climberImg,climberGroup;
var ghost ,ghost_standing ,ghost_jumping;

var spookySound;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghost_standing = loadImage("ghost-standing.png");
  ghost_jumping = loadImage("ghost-jumping.png");
  
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  
  spookySound.loop();
  
  tower = createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghost_standing);
  ghost.scale = 0.3;
  ghost.velocityY = 7;
  
  doorGroup = new Group();
  climberGroup = new Group();
  invisible_group = new Group();
}

function draw(){
  background(0);
  if(gameState === "play"){

  if(tower.y > 400){
    tower.y = 300;
  }
  if(keyDown("left")){
    ghost.x = ghost.x-4;
  }
  if(keyDown("right")){
    ghost.x = ghost.x+4;
  }
  if(keyDown("space")){
    ghost.velocityY = -5;    
  }
  
  ghost.velocityY = ghost.velocityY+0.5;
  
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  if(invisible_group.isTouching(ghost)||ghost.y > 600){
    ghost.destroy();
    gameState = "end";
  }
  spawn_doors();
  
  drawSprites();
  }
  if(gameState === "end"){
    stroke("red");
    fill("red");
    textSize(25);
    text("GAME_OVER",200,200);
  }
}

function spawn_doors(){
  if(frameCount%250 === 0){
    
    var door = createSprite(200,-60);
    door.addImage(doorImg);
    door.x = Math.round(random(120,400));
    
    var climber = createSprite(200,10);
    climber.addImage(climberImg);
    climber.x = door.x;
    

    
    door.lifetime = 750;
    climber.lifetime = 750;

    
    door.velocityY = 10;
    climber.velocityY = 10 ;
    
    ghost.depth = door.depth;
    ghost.depth += 1;
    
    doorGroup.add(door);
    climberGroup.add(climber);
  }
}
