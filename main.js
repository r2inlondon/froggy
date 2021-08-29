import Car from "./car.js";

// Selectors
export const myCanvas = document.getElementById('myCanvas'), ctx = myCanvas.getContext('2d');



// Variables
let xFrog = 126, yFrog = 128, frogSize = 16, xFrogStart = (myCanvas.width /2) - 7, yFrogStart = myCanvas.height - frogSize, xJump = 28, yJump = frogSize + 4, 
    carWidthRight = 35, carHeightRight = 25, carWidthLeft2 = 40, carHeightLeft2 = 20, carWidthLeft = 30, carHeightLeft = 20, streetHeight = 120;
let keys = [];

// Functions

// Cars going right
const   greenCarRight = 'img/goingRight/green_car_right.png', orangeCarRight = 'img/goingRight/oragen_car_right.png', 
        ambulanceRight = 'img/goingRight/ambulance_right.png', blueCarRight = 'img/goingRight/blue_car_right.png',
        greenCarLeft = 'img/goingLeft/green_car_left.png', redCarLeft = 'img/goingLeft/red_car_left.png',
        yellowCarLeft = 'img/goingLeft/yellow_car_left.png', redCarLeft2 = 'img/goingLeft/red_car_left2.png',
        yellowBeetleLeft = 'img/goingLeft/yellow_beetle_left.png', blackWhite = 'img/goingLeft/blackWhite.png';

const carsRight = [greenCarRight, orangeCarRight, ambulanceRight, blueCarRight];
const carsLeft = [yellowBeetleLeft, greenCarLeft, redCarLeft2, yellowCarLeft, redCarLeft, blackWhite ];

let rndInt = Math.floor(Math.random() * 5);

const carLeft1 = new Car(carsLeft[rndInt], 20, 20, 35, 20);


function anime(){

    carLeft1.drawLeft();
  
    requestAnimationFrame(anime);

}



anime();