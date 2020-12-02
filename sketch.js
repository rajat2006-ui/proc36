//Create variables here
var pet,petImg,happyPet,happyPetImg;
var foodStock;
var food;
var database
var button1,button2;
var milkImg
var milk=[]
var lastFed,updateLastFed;
var input,button3,petName;
var getPetName;

function preload()
{
  //load images here
  petImg=loadImage("Dog.png");
  happyPetImg=loadImage("happydog.png");
  milkImg=loadImage("Milk.png")
}

function setup() {
  
  createCanvas(1000, 500);

  pet=petImg
 
  button1=createButton("add food")
  button2=createButton("feed food")

  database=firebase.database()
  foodStock=database.ref('food')
  foodStock.on("value",readNum)  

  input=createInput("pet name")
  button3=createButton("continue")

}


function draw() { 
  background(46,139,87) 
  
  //add styles here

  if(food!==undefined){
    for(var i=200;i<=270;i+=70){
      for(var j=1;j<=food/2;j++){
        milk.push( image(milkImg,j*30,i,50,70))
      }
    }
    
  }
  
  button1.position(450,100)
  button2.position(50,100)
  input.position(650,100)
  button3.position(700,150)
  
  if(food!==undefined){
  fill("red")
  textSize(25)
  text("food left  "+food,150,100)

  fill("red")
  textSize(25)
  text("last fed  "+lastFed,150,200)

  fill("red")
  textSize(25)
  text(petName,800,300)

  if(food===0){
    fill("red")
    textSize(30)
    text("food is over",100,50);
  }
  }
  
  if(food!==undefined && food>0){
      button2.mousePressed(()=>{reducefood(food)})
  }
  
  button1.mousePressed(()=>{addFood(food)})
 

  updateLastFed=database.ref('lastfed')
  updateLastFed.on("value",(data)=>{
    lastFed=data.val()
  })

  button3.mousePressed(()=>{
  getPetName=input.value()
  
  database.ref('/').update({
    petname:getPetName
  })
  button3.hide()
  input.hide()
  }
  )
  var getName=database.ref('petname')
  getName.on("value",(data)=>{
    petName=data.val()
  })

  //to display pet
  imageMode(CENTER)
  translate(850,400)
  image(pet,0,0,160,200)

  
}

function readNum(data){
  food=data.val()
  //food=foodStock;
}

function reducefood(obj){

  if(food>0){
    getTime()
    food--;
    console.log("pressed")
    database.ref('/').update({
      food:obj
    })

    pet=happyPetImg
  }
    
}

function addFood(obj){
  food++;

  database.ref('/').update({
    food:obj
  })
  pet=petImg
}

async function getTime(){
  var response=await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata")
  var responseJSON=await response.json()
  var dateTime=responseJSON.datetime
  var hour=dateTime.slice(11,16)
  
  database.ref('/').update({
    lastfed:hour
  })

}