class Food{
    constructor(){
        this.image = loadImage("images/Milk.png");
    }
    getFoodStock(){
        var foodStockRef = database.ref("Food");
        foodStockRef.on("value" , (data)=>{
          //  console.log(data.val())
            foodCount = data.val();
        })
    }
    updateFoodStock(x){
        var foodStockRef = database.ref("/");
        foodStockRef.update({
            'Food' : x,
            'feedTime' : hour(),
        });
    }
    
    display(){
        fedTime = database.ref('lastFed');
        fedTime.on("value", (data)=>{
            lastFed = data.val();
        });
        
        text(15);
        if(fedTime >= 12) {
            text("Last Feed: " + fedTime % 12 + " PM", 150, 60);
        }
        else if(fedTime === 0){
            text("Last Feed: 12 AM", 150, 60);
        }
        else {
            text("Last Feed: " + fedTime + " AM", 150, 60);
        }  

        var x =80, y =100;
        imageMode(CENTER);
        
        if(this.foodStock !=0){
           // console.log("insideif")
            for(var i=0;i<this.foodStock;i++){
                if(i%10==0){ 
                    x = 80;
                    y = y+ 50;
                }
                image(this.image,x,y,50,50);
                x = x+30;
            }
        }
}
    bedroom(){
        background(bedroomImage,550,500);
    }
    garden(){
        background(gardenImage,550,500);
    }
    washroom(){
        background(washroomImage,550,500);
    }
}