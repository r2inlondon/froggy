import { myCanvas, ctx } from "../main.js";

export function drawFrogImage(x = 127, y = 129, frogSize = 16){        
    let base_image = new Image();
    base_image.src = 'img/frog.svg';

    // check if you won
    // didYouWin(yFrog);
    
    ctx.drawImage(base_image, x, y, frogSize, frogSize);
            
}