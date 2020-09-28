//Create variables here
var dog, happyDog;
var database, foodCount;
var foodS;
var foodStock;
var addFood, feed;
var fedTime, lastFed;
var foodObj;
var changeGameState, readGameState;
var bedroomImage, gardenImage, washroomImage;

function preload(){
  //load images here
  dog = loadImage("images/dog.png");
  happyDog = loadImage("images/happydog.png");
  bedroomImage = loadImage("images/bedRoom.png");
  gardenImage = loadImage("images/Garden.png");
  washroomImage = loadImage("images/washRoom.png");
}

function setup() {
  database = firebase.database();
  createCanvas(800,400);
  dogSprite = createSprite(650,250,10,10);
  dogSprite.addImage(dog);
  dogSprite.scale = 0.2;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  food1 = new Food();

  feed = createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

//read game state from database
readGameState=database.ref('gameState').on("value", (data)=>{
  gameState = data.val();
});

}

function draw() {  
  background(46, 139, 87);
  food1.display();
  var currentTime = hour();
    if(currentTime == (lastFed+1)){
        update("Playing");
        food1.garden();
    }
    else if(currentTime == (lastFed+2)){
        update("Sleeping");
        food1.bedroom();
    }
    else if(currentTime >(lastFed+2) && currentTime<=(lastFed +4)){
        update("Bathing");
        food1.washroom();
    }
    else{
        update("Hungry");
        food1.display();
    }
  if(gameState!="Hungry"){
    feed.hide();
    addFood.hide();
 //   dogSprite.remove();
  }
  else{
    feed.show();
    addFood.show();
    dogSprite.addImage(dog)
  }
  drawSprites();
}

//To read values
function readStock(data){
  foodS = data.val();
  food1.foodStock = foodS;
}

//To write values
function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    Food : x,
  })
}

function feedDog (){
  dogSprite.addImage(happyDog);
  food1.getFoodStock();
 // console.log(foodCount);
  food1.updateFoodStock(foodCount - 1);
  FeedTime : hour();
  
}

function addFoods(){
  food1.getFoodStock();
  foodS++ ;
  database.ref('/').update({
    Food : foodS,
  })
}

function update(state){
  database.ref('/').update({
    gameState : state,
  });
}



