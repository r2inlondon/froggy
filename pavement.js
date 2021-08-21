
// *** Test to color the pavement ***

// Selectors
const myCanvas = document.getElementById('myCanvas'),
      ctx = myCanvas.getContext('2d');


function street(){
    ctx.beginPath();
    ctx.rect(-5, 20, 310, 35);
    ctx.fillStyle = "#CAC4BD";
    ctx.fill();
    ctx.stroke();
}


      
function animate(){
            
    street();
    
    requestAnimationFrame(animate);    
    
}

function startGame(){
    
    animate();
        
}
