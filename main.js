// import Modules
import Car from "./modules/car.js";
import {myCanvas, ctx, drawFrogImage, moveFrog, releasedKey, bottomLimit, xFrog, yFrog} from "./modules/frog.js"

// Selector
const start = document.querySelector('.start');

// Variables
let carWidth = 30, carHeight = 20, streetHeight = 120;


// Cars images
const   greenCarRight = 'img/goingRight/green_car_right.png', orangeCarRight = 'img/goingRight/oragen_car_right.png', 
        ambulanceRight = 'img/goingRight/ambulance_right.png', blueCarRight = 'img/goingRight/blue_car_right.png',
        greenCarLeft = 'img/goingLeft/green_car_left.png', redCarLeft = 'img/goingLeft/red_car_left.png',
        yellowCarLeft = 'img/goingLeft/yellow_car_left.png', redCarLeft2 = 'img/goingLeft/red_car_left2.png',
        yellowBeetleLeft = 'img/goingLeft/yellow_beetle_left.png', blackWhite = 'img/goingLeft/blackWhite.png';

const carsRight = [greenCarRight, orangeCarRight, ambulanceRight, blueCarRight, blackWhite];
const carsLeft = [yellowBeetleLeft, greenCarLeft, redCarLeft2, yellowCarLeft, redCarLeft ];

let rndInt = Math.floor(Math.random() * 5);

const carLeft1 = new Car(carsLeft[rndInt], 20, 20, carWidth, carHeight, 1);
const carRight1 = new Car(carsRight[rndInt], 20, 70, carWidth, carHeight, 1);
console.log(rndInt);


function anime(){

    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

    carLeft1.drawLeft();
    carRight1.drawRight();

    drawFrogImage(xFrog, yFrog);
  
    requestAnimationFrame(anime);

}


start.addEventListener('click', () => {

    // Triger Event listers
    window.addEventListener('keydown', moveFrog);
    window.addEventListener('keyup', releasedKey); 
    
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    
    
    
    anime();
    // console.log('clicked!');

});


