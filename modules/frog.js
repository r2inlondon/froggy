// import { myCanvas, ctx } from "../main.js";

// Selectors
export const myCanvas = document.getElementById('myCanvas'), ctx = myCanvas.getContext('2d');
            

export let xFrog = 143, yFrog = 134, frogSize = 16, bottomLimit = myCanvas.height - frogSize, 
        xJump = 28, yJump = frogSize + 4, keys = [];



export function drawFrogImage(x = 127, y = 129, frogSize = 16){        
    let base_image = new Image();
    base_image.src = 'img/frog.svg';

    // check if you won
    // didYouWin(yFrog);
    
    ctx.drawImage(base_image, x, y, frogSize, frogSize);
            
}

export function moveFrog(e){

    // store any key pressed
    keys[e.keyCode] = true;    
    // Left - canvas limit
    if(keys[37] && xFrog > 14){
        // left frog's jump length
        xFrog -= xJump;
    }
    // right - canvas limit
    if(keys[39] && xFrog < 266){
        // right frog's jump length
        xFrog += xJump;
    }
    // down - canvas limit
    if(keys[38]){
        // down frog's jump length
        yFrog -= yJump;
    }
    // up - canvas limit
    if(keys[40] && yFrog < bottomLimit ){
        // up frog's jump length
        yFrog += yJump;
    }    
    
    
    // console.log({xFrog, yFrog});

    drawFrogImage(xFrog, yFrog)

    e.preventDefault();
}

export function releasedKey(e){
    // mark keys that were released
    keys[e.keyCode] = false;
}