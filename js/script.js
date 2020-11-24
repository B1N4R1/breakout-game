
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

let score = 0;

const brickRows = 7;
const brickCols = 4;

var paddle = {
    x: (canvas.width - 65)/2,
    y: canvas.height - 30,
    width: 65,
    height: 10,
    color: "#3498db"
}

var circle = {
    x: 200,
    y: 200,
    size: 10,
    dx: 5,
    dy: 4,
    color: "#3498db"
}

var brickInfo = {
    width: 70,
    height: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 50,
    visible: true
}

const bricks = [];
for (let i = 0; i < brickRows; i++) {
    
    bricks[i] = [];
    for (let j = 0; j < brickCols; j++) {
        
        const x = i * (brickInfo.width + brickInfo.padding) + brickInfo.offsetX;
        const y = j * (brickInfo.height + brickInfo.padding) + brickInfo.offsetY;
        bricks[i][j] = {x, y, ...brickInfo}
        
    }
    
}

var animProp = {

    status: false

};

function drawCircle() {

    context.beginPath();
    context.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
    context.fillStyle = circle.color;
    context.fill();
  
}

function drawPaddle(){

    context.beginPath();
    context.fillStyle = paddle.color;
    context.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    context.closePath();
}

function drawBricks(){
    bricks.forEach(col => {
        col.forEach(brick => {
            context.beginPath();
            context.rect(brick.x, brick.y, brick.width, brick.height);
            context.fillStyle = brick.visible ? '#3498db' : 'transparent';
            context.fill();
            context.closePath();
        })
    })
}

function drawScore(){
    
    context.font = "20px Arial";
    context.fillText(`Score: ${score}`, canvas.width - 100, 30);

}

function draw(){

    drawCircle();
    drawPaddle();
    drawBricks();
    drawScore();

}

function animate(){

    if (animProp.status) {

        // clear  
        context.clearRect(0, 0, canvas.width, canvas.height);

        // draw  
        draw(paddle, circle, canvas);

        //paddle movement
        canvas.addEventListener('mousedown', e => {
            paddle.x = e.offsetX;
        });

        canvas.addEventListener('mousemove', e => {
            paddle.x = e.offsetX;
        });

        canvas.addEventListener('mouseup', e => {
            paddle.x = e.offsetX;
        });
        

        // circle movement
        circle.x += circle.dx;
        circle.y += circle.dy;
    
        // Detect collision, right & left
        if (circle.x + circle.size > canvas.width || circle.x - circle.size < 0) {
    
            circle.dx *= -1;

            circle.color = randomColor({luminosity: 'bright'});

        }
    
        // Detect collision, top & bottom
        if (circle.y + circle.size > canvas.height || circle.y - circle.size < 0) {
    
            circle.dy *= -1;

            circle.color = randomColor({luminosity: 'bright'});

        }


        // Detect paddle
        
        if (circle.x - circle.size > paddle.x - paddle.width && 
            circle.x + circle.size < paddle.x + paddle.width && 
            circle.y + circle.size > paddle.y
        ) {
            
           circle.dy *= -1;

        }

        requestAnimationFrame(animate);

    }  
}

function randColor(){
 
    return "#" + Math.floor(Math.random()*16777215).toString(16);

}

window.onload = function (){

    // add click listener to canvas  
    document.getElementById("button").addEventListener("click", function (){

        var btn = this.getAttribute("data-btn");

        if (animProp.status){

            animProp.status = false;

            document.getElementById("button").firstChild.data = btn.toUpperCase();

            document.getElementById("button").setAttribute("data-btn", "stop");

        }  
        else{

            document.getElementById("button").firstChild.data = btn.toUpperCase();

            document.getElementById("button").setAttribute("data-btn", "start");

            animProp.status = true;   
            animate();

        }

    });

    draw();

};  