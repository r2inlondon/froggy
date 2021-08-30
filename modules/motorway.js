
import { ctx } from "./frog.js";

export function motorway(yLane){
    
    let streetHeight = 120, 
        line = streetHeight / 6,
        streetBorder = line + yLane,
        centreLine = 5;
        
    // motorway
    ctx.beginPath();
    ctx.rect(-5, yLane, 310, streetHeight);
    ctx.fillStyle = "#CAC4BD";
    ctx.fill();
    ctx.stroke();

    // add centre lines
    for(let i = 0; i < 5; i++ ){

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