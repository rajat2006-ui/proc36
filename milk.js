class Milk{
    constructor(x,y){
        this.sprite=createSprite(x,y)
        this.x=x;
        this.y=y
        this.image=loadImage("Milk.png")
    }

    display(){
       push()
       imageMode(CENTER)
       translate(this.x,this.y)
       image(this.image,0,0,50,70)
       pop()
    }
}