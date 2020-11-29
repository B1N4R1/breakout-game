
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
    dx: 4,
    dy: 3,
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
        
        if (i != 6 && j != 3) {
         


        }

        const x = i * (brickInfo.width + brickInfo.padding) + brickInfo.offsetX;
        const y = j * (brickInfo.height + brickInfo.padding) + brickInfo.offsetY;
        bricks[i][j] = {x, y, ...brickInfo}
        
    }
    
}

console.table(bricks);

var animProp = {

    status: false

};

function drawCircle() {

    context.beginPath();
    context.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
    context.fillStyle = circle.color;
    context.fill();
    context.closePath();
  
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
    drawScore();
    drawBricks();

}

function animate(){

    if (animProp.status) {

        // clear  
        context.clearRect(0, 0, canvas.width, canvas.height);

        // draw  
        draw();

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
        if (circle.y + circle.size > canvas.height || circle.x + circle.size > canvas.width || circle.x - circle.size < 0) {
    
            circle.dx *= -1;

            circle.color = randomColor({luminosity: 'bright'});

        }
    
        // Detect collision, top & bottom
        if (circle.y - circle.size < 0 || circle.y + circle.size > canvas.height) {
    
            circle.dy *= -1;

            circle.color = randomColor({luminosity: 'bright'});

        }


        // Detect bottom  collision, restart game
        if (circle.y + circle.size > canvas.height) {
            
            showAllBricks();

            score = 0;

        }

        // Detect paddle
        
        if (circle.x - circle.size > paddle.x - paddle.width && 
            circle.x + circle.size < paddle.x + paddle.width && 
            circle.y + circle.size > paddle.y &&
            circle.y - circle.size < paddle.y + paddle.height
        ) {
            
           circle.dy *= -1;

        }

        // Brick collision
        bricks.forEach(col => {
            col.forEach(brick => {

                if (brick.visible) {
                    
                    if (circle.x - circle.size > brick.x && 
                        circle.x + circle.size < brick.x + brick.width &&
                        circle.y + circle.size > brick.y &&
                        circle.y - circle.size < brick.y + brick.height
                    ) {
                        
                        circle.dy *= -1;
                        brick.visible = false;
                        
                        increaseScore();
            
                    }

                }

            })
        })

        requestAnimationFrame(animate);

    }  
}

function increaseScore(){

    score++;

    if (score % (brickRows * brickCols) === 0) {
        
        showAllBricks();

    }

}

function showAllBricks(){

    bricks.forEach(col => {
        col.forEach(brick => {

            brick.visible = true;

        })
    })

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