var cloudMan, cloudManImg, cloudend, cloudendImg;
var cloud, cloudImg, cloudGroup;
var cliff, cliffImg;
var bird, birdImg, birdGroup;
var PLAY = 1;
var END = 2
gameState = PLAY;
score = 0;

function preload() {
    cloudManImg = loadImage("cloud.png");
    cloudImg = loadImage("cloud5.png");
    cliffImg = loadImage("hills.png");
    birdImg = loadAnimation("bitd1.png","bird2.png","bird3.png");
    cloudendImg = loadImage("endcloud.png");
}

function setup() {
    createCanvas(800,400);
    cliff = createSprite(-375,350);
    cliff.addImage(cliffImg);
    

    cloudMan = createSprite(165,60);
    cloudMan.addImage(cloudManImg);
    cloudMan.scale = 0.8;
    cloudMan.debug = true;
    cloudMan.setCollider("rectangle",10,30,125,200);

    birdGroup = new Group();
    cloudGroup = new Group();

}

function draw() {
    background("lightblue");
    if(gameState === PLAY) {
        cliff.scale = 2;
        cliff.velocityX = -3;
        cliff.lifeTime = 50;
        cliff.debug = true;
        cliff.setCollider("rectangle",0,0,300,50);

        

        if(frameCount%50 === 0) {
            score = score+1;
        }
        if(keyDown("space")) {
            cloudMan.velocityY = -4;
        }
        
        if(cloudMan.collide(cliff)) {
            cloudMan.velocityY = 0;
        }
        if(cloudMan.collide(birdGroup) ||
           cloudMan.y > 410) {
            background("blue");
            gameState = END;
        }
        if(cloudMan.y < 0) {
            cloudMan.y = 0;
        }
        if(keyDown("down_arrow")) {
            cloudMan.scale -= 0.1;
        }
        else if(keyDown("up_arrow")) {
            cloudMan.scale += 0.1;
        }
        cloudMan.velocityY += 0.2;
        spawnClouds();   
        spawnBirds(100);
        fill("black");
        drawSprites();
        text("Score: " + score, 725,62);
        }
        if(gameState === END) {
        cloudGroup.setVelocityXEach(0);
        cloudGroup.setLifetimeEach(0);
        birdGroup.setLifetimeEach(0);
        fill("blue");
        stroke("white");
        strokeWeight(4);
        textSize(21);
        text("Score: " + 000000+score, 370,60); 
        cloudend = createSprite(400,200);
        cloudend.addImage(cloudendImg);
        cloudend.scale = 0.5;
        drawSprites();
    }
}
   
       
    

function spawnBirds(fr) {
    if(score%5 === 0) {
        fr = fr-10;
    }
    if(frameCount%fr===0) {
        bird = createSprite(850,Math.round(random(50,400)));
        bird.addAnimation("bird", birdImg);
        bird.scale = 0.4;
        bird.velocityX = -3;
        birdGroup.add(bird);
        bird.debug = true;
        bird.setCollider("rectangle",0,0,200,80)
    }
    birdGroup.setLifetimeEach(266);
}

function spawnClouds() {
    if(frameCount%100 === 0) {
        cloud = createSprite(850,Math.round(random(1,100)));
        cloud.addImage(cloudImg);
        cloud.scale = random(0.2,0.7);
        cloud.velocityX = -3;
        cloud.density = cloudMan.density;
        cloudMan.density += 1;
        cloudGroup.add(cloud);
    } 
}