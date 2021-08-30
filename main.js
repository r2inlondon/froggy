// import Modules
import Car from "./modules/car.js";
import {drawFrogImage, moveFrog, releasedKey} from "./modules/frog.js"


// Selectors
export const myCanvas = document.getElementById('myCanvas'), ctx = myCanvas.getContext('2d'),
            start = document.querySelector('.start');

// Variables
let xFrog = 126, yFrog = 128, frogSize = 16, xFrogStart = (myCanvas.width /2) - 7, yFrogStart = myCanvas.height - frogSize, xJump = 28, yJump = frogSize + 4, 
    carWidth = 30, carHeight = 20, streetHeight = 120;
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

const carLeft1 = new Car(carsLeft[rndInt], 20, 20, carWidth, carHeight, 1);
const carRight1 = new Car(carsRight[rndInt], 20, 70, carWidth, carHeight, 1);


function anime(){

    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

    carLeft1.drawLeft();
    carRight1.drawRight();

    drawFrogImage();
  
    requestAnimationFrame(anime);

}


start.addEventListener('click', () => {

    // Triger Event listers
    window.addEventListener('keydown', moveFrog);
    window.addEventListener('keyup', releasedKey); 
    
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    
    // Reset Frog to start game
    xFrog = xFrogStart, yFrog = yFrogStart;      
    drawFrogImage();
    
    anime();
    // console.log('clicked!');

});

// function startGame(){
    // // Triger Event listers
    // window.addEventListener('keydown', moveFrog);
    // window.addEventListener('keyup', releasedKey); 
    
    // ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    
    // // Reset Frog to start game
    // xFrog = xFrogStart, yFrog = yFrogStart;      
    // drawFrogImage();
    
    // anime();

//     console.log('clicked!');
   
// }
