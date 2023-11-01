 //var de estados   
 var PLAY = 1;
 var END = 0;
 var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
// pontuação
var score;
//7. Atribua as variáveis e carregue as imagens para gameover (fim de jogo) e restart(reiniciar)
var gameOver, restart;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  //7 imagens no game over e restart preLOad
gameOverImg = loadImage("gameOver.png");
restartImg = loadImage("restart.png");
 
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;

  //7 criar  imagens e scale game over e restart

gameOver = createSprite(300,100);
gameOver.addImage(gameOverImg);

restart = createSprite(300,140);
restart.addImage(restartImg);

gameOver.scale = 0.5;
restart.scale = 0.5; 

  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  //1 criar grupos de obstaculos e nuvens
  cloudsGroup = new Group();
  obstaclesGroup = new Group();


  //imprimindo uma string concatenada
  console.log("ola " + 5);
  //score
  score=0;
  
}

function draw() {
  background(180);
  // exibindo o texto da pontuação e concatenando
  text("Pontuação: "+ score, 500,50);
 

 // condição de estado
  if(gameState===PLAY){
//mover o solo
     ground.velocityX= -4;  
 
    score = score + Math.round(frameCount/60);  
  
    if (ground.x < 0){
     ground.x = ground.width/2;
    }
  
    if(keyDown("space")&& trex.y >= 100) {
    trex.velocityY = -13;
    }
  
  trex.velocityY = trex.velocityY + 0.8
   
     //gerar as nuvens
  spawnClouds();
  
  //gerar obstáculos no chão
  spawnObstacles();
  //4. Adicione o código isTouching
   if(obstaclesGroup.isTouching(trex)){
    gameState = END;
}

  }
  else  if(gameState===END){
  //mover o solo
  ground.velocityX= 0;

  //7 game over e restart visivel verdadeiro
 
  gameOver.visible = true;
  restart.visible = true;


  //5. Dê velocidade zero a todos os obstáculos e nuvens usando setVelocityXEach()
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);



  }  
  
  trex.collide(invisibleGround);
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX = -6;

   
    //gerar obstáculos aleatórios
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //atribua dimensão e tempo de vida aos obstáculos         
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //2. Adicione obstacle (obstáculo) ao grupo
    obstaclesGroup.add(obstacle);

 }
}
function spawnClouds() {
  //escreva o código aqui para gerar as nuvens
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //atribua tempo de vida à variável
    cloud.lifetime = 200;
    
    //ajustar a profundidade
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
   // 3. Adicione cloud (nuvem) ao grupo
   cloudsGroup.add(cloud);
  }
  
}