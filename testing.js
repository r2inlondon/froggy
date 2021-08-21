
// *** Test to color the pavement ***

// Selectors
const myCanvas = document.getElementById('myCanvas'),
      ctx = myCanvas.getContext('2d');

let x = 20, y = 70, carWidthRight = 30, carHeightRight = 15, carWidthLeft = 30, carHeightLeft = 15, streetHeight = 60;

function drawCarImageLeft(){        
    carImageLeft = new Image();
    carImageLeft.src = 'img/yellow_car_left.png';
    
    ctx.drawImage(carImageLeft, x, y, carWidthLeft, carHeightLeft);
            
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
            console.log(streetBorder);
        }

        streetBorder += line;
        centreLine = 5;
    }

}

      
function animate(){
            
    street();

    drawCarImageLeft();
    
    requestAnimationFrame(animate);    
    
}

function startGame(){
    
    animate();
        
}

drawCarImageLeft();
street();
