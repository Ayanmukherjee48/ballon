var ball;
var position;
var database;
var balloon;
var bg;

function preload(){
    bg=loadImage("bg.png");
    balloon=loadAnimation("1.png","2.png","3.png");
}

function setup(){
    database=firebase.database()
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    ball.addAnimation("ball",balloon);
    ball.scale=0.3;

    var ballPosition=database.ref('ball/position')
    ballPosition.on("value",readPosition,showError)
}

function draw(){
    background(bg)
    if(position !==undefined){
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
       writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
     
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
        
    }
    drawSprites();
}

}
function readPosition(m){
    position=m.val()

   ball.x=position.x;
   ball.y=position.y;

}

function showError(){

    console.log("there is error")

}

function writePosition(x,y){
    database.ref("ball/position").set({
        x: position.x+x,
        y: position.y+y
    })
}