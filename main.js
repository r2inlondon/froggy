// import Modules
import Car, { laneDirectionLeft, laneDirectionRight } from "./modules/car.js";
import {myCanvas, ctx, drawFrogImage, moveFrog, releasedKey, xFrog, yFrog} from "./modules/frog.js"
import { motorway } from "./modules/motorway.js";

// Selector
const start = document.querySelector('.start');


// pick random car number
let rndInt = Math.floor(Math.random() * 5);

// animation function
function animate(leftCar1, carsRight1){
    // clear frog and cars previous position
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

    motorway(14);

    carsRight1.forEach( car => car.drawRight());
    leftCar1.forEach( car => car.drawLeft());
    drawFrogImage(xFrog, yFrog);

    requestAnimationFrame(() => animate(leftCar1, carsRight1));
          

}

// Start Button
start.addEventListener('click', () => {

    // Triger Event listers
    window.addEventListener('keydown', moveFrog);
    window.addEventListener('keyup', releasedKey); 

    const leftCar1 = laneDirectionLeft(2, 14, 0.5);  
    const carsRight1 =  laneDirectionRight(3,32,0.5);

    console.log(leftCar1);
    
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    
    animate(leftCar1, carsRight1);    

});


