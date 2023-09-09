const pi = Math.PI;
var canvas = document.getElementById('canvas');
var draw = canvas.getContext('2d');
// draw.translate(0.5, 0.5);

var backgroundColor = "rgba(0,0,0,1)";

function canvasOnLoad(){
    canvasResize();
}

function canvasResize(){
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
}

function clear(){
    draw.fillStyle = backgroundColor;
    draw.fillRect(0,0,canvas.width, canvas.height);
}

var tick = 0;
var currentEffects = [4];
let increment = 1;
setInterval(function(){
    clear();
    for(i=0; i<currentEffects.length;i++){
        effectSwitch(currentEffects[i]);
    }
    tick+=increment;
}, 16);

function effectSwitch(effectID){
    switch (effectID) {
        case 1:
            scrollingHorizonalBars();
            break;
        case 2:
            scrollingVerticalBars();
            break;
        case 3:
            scrollingHorizonalBarsGreyscale();
            break;
        case 4:
            rotatingGradient();
            break;
        case 5:
            inverseRotatingGradient();
            break;
        default:
            break;
    }
}
function scrollingHorizonalBars(){
    draw.fillStyle = "rgb(255,0,0)";
    let y1 = tick - canvas.height/10;
    draw.fillRect(0,y1 - (1.1*canvas.height)*Math.floor((y1)/(1.1*canvas.height)) - canvas.height/10,canvas.width, canvas.height/10);
    draw.fillStyle = "rgb(0,255,0)";
    let y2 = tick + 1*canvas.height/3;
    draw.fillRect(0,y2 - (1.1*canvas.height)*Math.floor((y2)/(1.1*canvas.height)) - canvas.height/10,canvas.width, canvas.height/10);
    draw.fillStyle = "rgb(0,0,255)";
    let y3 = tick + 2*canvas.height/3;
    draw.fillRect(0,y3 - (1.1*canvas.height)*Math.floor((y3)/(1.1*canvas.height)) - canvas.height/10,canvas.width, canvas.height/10);
}

function scrollingHorizonalBarsGreyscale(){
    for(i=0; i<11; i++){
        let brightness = 230/10*i + 25;
        draw.fillStyle = "rgb("+brightness+","+brightness+","+brightness+")";
        let y = tick - canvas.height/30 + i*canvas.height/10;
        draw.fillRect(0,y - (1.1*canvas.height)*Math.floor((y)/(1.1*canvas.height)) - canvas.height/10,canvas.width, canvas.height/40);
    }
}

function scrollingVerticalBars(){
    draw.fillStyle = "rgb(255,0,0)";
    let x1 = tick - canvas.width/10;
    draw.fillRect(x1 - (1.1*canvas.width)*Math.floor((x1)/(1.1*canvas.width)) - canvas.width/10,0,canvas.width/10, canvas.height);
    draw.fillStyle = "rgb(0,255,0)";
    let x2 = tick + 1*canvas.width/3;
    draw.fillRect(x2 - (1.1*canvas.width)*Math.floor((x2)/(1.1*canvas.width)) - canvas.width/10,0,canvas.width/10, canvas.height);
    draw.fillStyle = "rgb(0,0,255)";
    let x3 = tick + 2*canvas.width/3;
    draw.fillRect(x3 - (1.1*canvas.width)*Math.floor((x3)/(1.1*canvas.width)) - canvas.width/10,0,canvas.width/10, canvas.height);
}

var gradientImage =  document.createElement('canvas');
var gradientDraw = gradientImage.getContext('2d');
gradientImage.width = 100;
gradientImage.height = 100;

function rotatingGradient(){
    let height = gradientImage.height;
    let width = gradientImage.width;

    let radius = height/3;
    let rX = radius*Math.sin(-tick/(2*pi*10)) + width/2;
    let rY = radius*Math.cos(-tick/(2*pi*10)) + height/2;
    let gX = radius*Math.sin(2*pi/3 - tick/(2*pi*10)) + width/2;
    let gY = radius*Math.cos(2*pi/3 -  tick/(2*pi*10)) + height/2;
    let bX = radius*Math.sin(4*pi/3 - tick/(2*pi*10)) + width/2;
    let bY = radius*Math.cos(4*pi/3 - tick/(2*pi*10)) + height/2;

    maxDistance = distance(radius*Math.sqrt(2)/2, radius*Math.sqrt(2)/2, -50, -50);

    for(x = 0; x < width; x++){
        for(y = 0; y < height; y++){

            let r = 255 - 255*distance(x,y,rX,rY)/maxDistance;

            let g = 255 - 255*distance(x,y,gX,gY)/maxDistance;

            let b = 255 - 255*distance(x,y,bX,bY)/maxDistance;


            gradientDraw.fillStyle = 'rgb('+r+','+g+','+b+')'; 
            // gradientDraw.fillStyle = 'rgb('+r+','+0+','+0+')';

            gradientDraw.fillRect(x,y,1,1);
        }
    }

    applyGradientImage();

}

function inverseRotatingGradient(){
    let height = gradientImage.height;
    let width = gradientImage.width;

    let radius = height/3;
    let rX = radius*Math.sin(-tick/(2*pi*10)) + width/2;
    let rY = radius*Math.cos(-tick/(2*pi*10)) + height/2;
    let gX = radius*Math.sin(2*pi/3 - tick/(2*pi*10)) + width/2;
    let gY = radius*Math.cos(2*pi/3 -  tick/(2*pi*10)) + height/2;
    let bX = radius*Math.sin(4*pi/3 - tick/(2*pi*10)) + width/2;
    let bY = radius*Math.cos(4*pi/3 - tick/(2*pi*10)) + height/2;

    maxDistance = distance(radius*Math.sqrt(2)/2, radius*Math.sqrt(2)/2, -50, -50);

    for(x = 0; x < width; x++){
        for(y = 0; y < height; y++){

            let r = 255*distance(x,y,rX,rY)/maxDistance;

            let g = 255*distance(x,y,gX,gY)/maxDistance;

            let b = 255*distance(x,y,bX,bY)/maxDistance;


            gradientDraw.fillStyle = 'rgb('+r+','+g+','+b+')'; 
            // gradientDraw.fillStyle = 'rgb('+r+','+0+','+0+')';

            gradientDraw.fillRect(x,y,1,1);
        }
    }

    applyGradientImage();

}


function distance(x1,y1,x2,y2){
    return Math.sqrt((x2-x1)**2 + (y2-y1)**2)
}

function applyGradientImage(){
    draw.imageSmoothingEnabled = true;
    draw.drawImage(gradientImage, 0, 0, canvas.width, canvas.height);
}

document.addEventListener('keypress', keypress); 
function keypress(e) {
    console.log(e.key);
    
    if(+e.key>=0 && +e.key<=9){
        if(!currentEffects.includes(+e.key)){
            currentEffects.push(+e.key);
        } else {

        }
    }

    if(e.key==" "){
        currentEffects = [];
        increment = 1;
        clear();
    }

    if(e.key=="="){
        increment++;
    }
    
    if(e.key=="-"){
        increment--;
    }
}