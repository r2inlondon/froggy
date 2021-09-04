// import Modules
import Car, { laneDirectionLeft, laneDirectionRight } from "./modules/car.js";
import {myCanvas, ctx, drawFrogImage, moveFrog, releasedKey, xFrog, yFrog} from "./modules/frog.js"
import { drawMotorway } from "./modules/motorway.js";
import {blinking} from "./modules/blinking.js";


const startGame = document.querySelector('.game-text');
// window.addEventListener('load', blinking(startGame));

// animation function
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

    requestAnimationFrame(() => animate(leftCar1, carsRight1, leftCar2, carsRight2, leftCar3, carsRight3));          
}


// Start Button

const start = document.querySelector('.start');

let gameOn = false;

start.addEventListener('click', () => {

    // Triger Event listers
    window.addEventListener('keydown', moveFrog);
    window.addEventListener('keyup', releasedKey); 

    const   leftCar1 = laneDirectionLeft(3, 14, 0.5),  
            carsRight1 =  laneDirectionRight(2,34,1),
            leftCar2 = laneDirectionLeft(1, 54, 4),
            carsRight2 =  laneDirectionRight(2,74,0.5),
            leftCar3 = laneDirectionLeft(3, 94, 1),
            carsRight3 =  laneDirectionRight(3,114,1);
    
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    
    if(gameOn === false){
        animate(leftCar1, carsRight1, leftCar2, carsRight2, leftCar3, carsRight3);
        gameOn = true;
    }            

});


