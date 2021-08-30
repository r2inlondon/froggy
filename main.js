// import Modules
import Car, {laneDirectionLeft} from "./modules/car.js";
import {myCanvas, ctx, drawFrogImage, moveFrog, releasedKey, xFrog, yFrog} from "./modules/frog.js"
import { motorway } from "./modules/motorway.js";

// Selector
const start = document.querySelector('.start');


// pick random car number
let rndInt = Math.floor(Math.random() * 5);

// const carLeft1 = new Car(carsLeft[rndInt], 20, 20, carWidth, carHeight, 1);
// const carRight1 = new Car(carsRight[rndInt], 20, 70, carWidth, carHeight, 1);

// animation function
function animate(cars){
    // clear frog and cars previous position
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

    motorway(14);

    cars.forEach( car => car.drawLeft());
    drawFrogImage(xFrog, yFrog);

    requestAnimationFrame(() => animate(cars));

      
    // requestAnimationFrame(animate);

}

// Start Button
start.addEventListener('click', () => {

    // Triger Event listers
    window.addEventListener('keydown', moveFrog);
    window.addEventListener('keyup', releasedKey); 

    const leftCar1 = laneDirectionLeft(2, 14, 1);    

    console.log(leftCar1);
    
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    
    
    
    animate(leftCar1);    

});


