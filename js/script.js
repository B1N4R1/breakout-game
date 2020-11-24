
window.requestAnimFrame = (function (){
        
        return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame || 
                window.msRequestAnimationFrame ||
               function (callback){
                    window.setTimeout(callback, 1000 / 60);
                };

})();

function drawCircle(circle, canvas) {

    var context = canvas.getContext("2d");

    context.beginPath();
    context.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
    context.fillStyle = circle.color;
    context.fill();
  
}

function drawSquare(){
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.moveTo(5, 5);
    ctx.lineTo(635, 395);
    ctx.strokeStyle = 'blue';
    ctx.stroke();
}

function animate(circle, animProp, canvas){

    if (animProp.status) {

        var context = canvas.getContext("2d");

        // clear  
        context.clearRect(0, 0, canvas.width, canvas.height);

        // draw  
        drawCircle(circle, canvas);

        // movement
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

        // request new frame  
        requestAnimFrame(function (){

            animate(circle, animProp, canvas);

        });

    }  
}

drawSquare();

// function randColor(){
    
//     return "#" + Math.floor(Math.random()*16777215).toString(16);

// }

// window.onload = function (){

//     var canvas = document.getElementById("myCanvas");

//     var circle = {
//         x: 200,
//         y: 200,
//         size: 30,
//         dx: 5,
//         dy: 4,
//         color: "#3498db"
//     }

//     var animProp = {

//         status: false

//     };


//     // add click listener to canvas  
//     document.getElementById("button").addEventListener("click", function (){

//         var btn = this.getAttribute("data-btn");

//         if (animProp.status){

//             animProp.status = false;

//             document.getElementById("button").firstChild.data = btn.toUpperCase();

//             document.getElementById("button").setAttribute("data-btn", "stop");

//         }  
//         else{

//             document.getElementById("button").firstChild.data = btn.toUpperCase();

//             document.getElementById("button").setAttribute("data-btn", "start");

//             animProp.status = true;   
//             animate(circle, animProp, canvas);

//         }

//     });

//     drawCircle(circle, canvas);

// };  