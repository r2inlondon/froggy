
// *** Test to color the pavement ***

// Selectors
const myCanvas = document.getElementById('myCanvas'),
      ctx = myCanvas.getContext('2d');

let x = 20, y = 70, carWidthRight = 30, carHeightRight = 15, carWidthLeft = 30, carHeightLeft = 15, streetHeight = 60;

const greenCar = 'img/goingRight/green_car_right.png', orangeCar = 'img/goingRight/oragen_car_right.png', ambulance = 'img/goingRight/ambulance_right.png';

const cars = [greenCar, orangeCarRight, ambulanceRight, greenCar, orangeCarRight, ambulanceRight];
let rndInt = Math.floor(Math.random() * 5)
console.log(rndInt);

function drawCarRight(x, y){    
    carImageRight = new Image();
    carImageRight.src = cars[rndInt];    
    ctx.drawImage(carImageRight, x, y, carWidthRight, carHeightRight);            
}


function street(){
    
    let line = streetHeight / 3;
        streetBorder = line + y,
        centreLine = 5;
    // motorway
    ctx.beginPath();
    ctx.rect(-5, y, 310, streetHeight);
    ctx.fillStyle = "#CAC4BD";
    ctx.fill();
    ctx.stroke();

    // add centre lines
    for(let i = 0; i < 2; i++ ){

        for(let i = 0; i < 5; i++){
            ctx.beginPath();
            ctx.strokeStyle = "gray";
            ctx.moveTo(centreLine, streetBorder);
            ctx.lineTo(centreLine += 30, streetBorder);
            ctx.closePath();
            ctx.stroke();
            centreLine += 30            
        }

        streetBorder += line;
        centreLine = 5;
    }

}

      
function animate(){
            
    street();

    drawCarRight(10,92);
    
    requestAnimationFrame(animate);    
    
}

function startGame(){
    
    animate();
        
}


street();
drawCarRight(10,92);
