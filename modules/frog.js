import { myCanvas, ctx } from "../main.js";

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
    if(keys[40] && yFrog < yFrogStart ){
        // up frog's jump length
        yFrog += yJump;
    }    
    
    
    console.log({xFrog, yFrog});

    e.preventDefault();
}

export function releasedKey(e){
    // mark keys that were released
    keys[e.keyCode] = false;
}