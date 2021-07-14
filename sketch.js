var dog, dogImg, happyDog, happyDogImg;
var foodS, foodStock;
var database;

function preload(){
	dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500,500);

  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value",readStock);
  foodStock.set(20);

  dog = createSprite(250,350,10,60);
  dog.addImage(dogImg);
  dog.scale = 0.2;
}

function draw() {  
  background("green");
  if(foodS!==undefined){
     textSize(20);
     fill(225);
     text("Press the Up Arrow to feed the Dog",50,50);
     text("Food Remaining: ",foodS,150,150);
  }

  if(keyWentDown(Up_Arrow)){
    writeStock(foodS);
    dog.addImage(dogHappyImg);
  }

  if(keyWentUp(Up_Arrow)){
    dog.addImage(dogImg);
  }

  if(foodS === 0){
    foodS = 20;
  }

  drawSprites();
}

function writeStock(x){
   if(x<=0){
     x = 0;
   }
   else{
     x = x+1;
   }
   database.ref("/").update({
     Food:x
   });
}

function readStock(data){
  foodS = data.val();
}



