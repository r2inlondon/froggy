// import Modules
import Car, { laneDirectionLeft, laneDirectionRight } from "./modules/car.js";
import {myCanvas, ctx, drawFrogImage, moveFrog, releasedKey, xFrog, yFrog, resetFrog} from "./modules/frog.js"
import { drawMotorway } from "./modules/motorway.js";
import {blinking, stopBlinking} from "./modules/blinking.js";
import { instructionsUp, clearInstructions } from "./modules/instructions.js";

let playing, running = false;

// animate canvas 
function animate(leftCar1, carsRight1, leftCar2, carsRight2, leftCar3, carsRight3){    
    // clear frog and cars previous position
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    // Draw motherWay
    drawMotorway(14);

    leftCar1.forEach( car => car.drawLeft());
    carsRight1.forEach( car => car.drawRight());

    leftCar2.forEach( car => car.drawLeft());
    carsRight2.forEach( car => car.drawRight());

    leftCar3.forEach( car => car.drawLeft());
    carsRight3.forEach( car => car.drawRight());

    drawFrogImage(xFrog, yFrog);

    if(running === true){
        
        playing = window.requestAnimationFrame(() => animate(leftCar1, carsRight1, leftCar2, carsRight2, leftCar3, carsRight3));       
    }
}

export function stopAnimation(){
    window.cancelAnimationFrame(playing);
}

export function stopGame(){
    // stop animation
    running = false;
    // release keys from memory
    window.addEventListener('keyup', releasedKey);
}

export function restartGame(){
    
    running = true;

}

export function playGame(){
    console.log('Pre-load game');
    // reset frog position
    resetFrog();
    
    restartGame();

    const   leftCar1 = laneDirectionLeft(3, 14, 0.5),  
            carsRight1 =  laneDirectionRight(2,34,1),
            leftCar2 = laneDirectionLeft(1, 54, 4),
            carsRight2 =  laneDirectionRight(2,74,0.5),
            leftCar3 = laneDirectionLeft(3, 94, 1),
            carsRight3 =  laneDirectionRight(3,114,1);
    
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    
    animate(leftCar1, carsRight1, leftCar2, carsRight2, leftCar3, carsRight3);
    
};


// start game click
const gameText = document.querySelector('.game-text');
// get text blinking
blinking();


gameText.addEventListener('click', startGame);
// window.addEventListener('keyup', startGame);

function startGame(){
    window.removeEventListener('keyup', startGame);
    // stop message instructions
    stopBlinking();
    // get instructions
    instructionsUp();    
    // clear instructions after 4 seconds
    setTimeout(clearInstructions, 4000);
}


