var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var character = new Image();
var Background = new Image();
var foreground = new Image();
var pipeN = new Image();
var pipeS = new Image();

character.src = "images/Bird.png";
Background.src = "images/back.gif";
foreground.src = "images/fg.png";
pipeN.src = "images/pipeNorth.png";
pipeS.src = "images/pipeSouth.png";


// some variables

var gap = 100;
var constant;

var bX = 10;
var bY = 150;

var gravity = 1.5;

var score = 0;

// audio files

var fly = new Audio();
var scor = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";

// on key down

document.addEventListener("keydown",moveUp);

function moveUp(){
    bY -= 30;
    fly.play();
}


// pipe coordinates

var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : -50
};

// draw images

function draw(){
    
   
    ctx.drawImage(Background,0,0);
    
    
    for(var i = 0; i < pipe.length; i++){
        
        constant = pipeN.height+gap;
        ctx.drawImage(pipeN,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeS,pipe[i].x,pipe[i].y+constant);
             
        pipe[i].x--;
        
        if( pipe[i].x == 125 ){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeN.height)-pipeN.height
            }); 
        }

        
        if( bX + character.width >= pipe[i].x && bX <= pipe[i].x + pipeN.width && (bY <= pipe[i].y + pipeN.height || bY+character.height >= pipe[i].y+constant) || bY + character.height >=  cvs.height - foreground.height)
        {
            
            location.reload(); 
        }
        
        if(pipe[i].x == 5){
            score++;
            scor.play();
        }
        
        
    }

    ctx.drawImage(foreground,0,cvs.height - foreground.height);
    
    ctx.drawImage(character,bX,bY);
    
    bY += gravity;
    
    ctx.fillStyle = "#000";
    ctx.font = "23px Verdana";
    ctx.fillText("Score : "+score,90,375);
    
    requestAnimationFrame(draw);

}

draw();

