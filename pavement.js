
// *** Test to color the pavement ***

// Selectors
const myCanvas = document.getElementById('myCanvas'),
      ctx = myCanvas.getContext('2d');

let x = 20, y = 20, carWidthRight = 30, carHeightRight = 15, carWidthLeft = 30, carHeightLeft = 15, streetHeight = 40;

function drawCarImageLeft(){        
    carImageLeft = new Image();
    carImageLeft.src = 'img/purple-car.svg';
    
    ctx.drawImage(carImageLeft, x, y, carWidthLeft, carHeightLeft);
            
}

function street(){
    let streetBorder = streetHeight;
    let centreLine = 5;
    
    ctx.beginPath();
    ctx.rect(-5, 20, 310, streetHeight);
    ctx.fillStyle = "#CAC4BD";
    ctx.fill();
    ctx.stroke();

    for(let i = 0; i < 9; i++){
        ctx.beginPath();
        ctx.strokeStyle = "gray";
        ctx.moveTo(centreLine, streetBorder);
        ctx.lineTo(centreLine += 30, streetBorder);
        ctx.closePath();
        ctx.stroke();
        centreLine += 30
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
