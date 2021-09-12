import { myCanvas, ctx, xFrog, frogSize, yFrog, notification } from "./frog.js";

// Car's dimensions
let carWidth = 30, carHeight = 20;

// Cars images
const   greenCarRight = 'img/goingRight/green_car_right.png', orangeCarRight = 'img/goingRight/oragen_car_right.png', 
        ambulanceRight = 'img/goingRight/ambulance_right.png', blueCarRight = 'img/goingRight/blue_car_right.png',
        greenCarLeft = 'img/goingLeft/green_car_left.png', redCarLeft = 'img/goingLeft/red_car_left.png',
        yellowCarLeft = 'img/goingLeft/yellow_car_left.png', redCarLeft2 = 'img/goingLeft/red_car_left2.png',
        yellowBeetleLeft = 'img/goingLeft/yellow_beetle_left.png', scooterRight = 'img/goingRight/scooter_right.png',
        scooterRightBlue = 'img/goingRight/scooter_right_blue.png';

// car images arrays for directions
const carsRight = [greenCarRight, orangeCarRight, ambulanceRight, blueCarRight, scooterRight, scooterRightBlue];
const carsLeft = [yellowBeetleLeft, greenCarLeft, redCarLeft2, yellowCarLeft, redCarLeft ];

export default class Car {
    constructor(x, y, speed, rndInt){        
        this.x = x;
        this.y = y;                
        this.speed = speed;
        this.rndInt = rndInt 
    }
   
    drawLeft(){        
        // load image
        let carImageLeft = new Image();
        carImageLeft.src = carsLeft[this.rndInt];        
        ctx.drawImage(carImageLeft, this.x, this.y, carWidth, carHeight);
        
        // reset car
        if(this.x < -30 ){
            this.x = 330;
        }    
        // move car position
        this.x -= this.speed;     
        
        // check for collisions        
        this.collision();        
    }

    drawRight(){
        // load image
        let carImageRight = new Image();
        carImageRight.src = carsRight[this.rndInt];     
        ctx.drawImage(carImageRight, this.x, this.y, carWidth, carHeight);
                  
        
        // reset car
        if(this.x > 300 ){
            this.x = 0;
        }    

        // move car position
        this.x += this.speed;     

        // check for collisions        
        this.collision();                
    }

    collision(){
        if( this.x < xFrog + frogSize &&
            this.x + carWidth > xFrog &&
            this.y < yFrog + frogSize &&
            this.y + carHeight > yFrog
            ){
                const deadMessage = '<p class="dead-msg">Froggy is dead</p><img src="./img/web/dead-frog2.png" alt="dead frog"><button class="button-52" role="button">play again?</button>';
            setTimeout (() => {notification(deadMessage)}, 5);
            // notification('Frog is dead');
        }
    }
       
}

// create cars, in the lane, direction left
export function laneDirectionLeft(cars, y, speed){
    
    let slowLaneCarDistance = (myCanvas.width / cars ) - 40;
    
    let rndInt = 0;
        
    let activeCars = [];

    for(let i = 0; i < cars; i++ ){
        rndInt = Math.floor(Math.random() * 5);
        // create car instance and save it in activeCars array
        activeCars.push(new Car(slowLaneCarDistance, y, speed, rndInt));
        // set distance between cars
        slowLaneCarDistance += slowLaneCarDistance

    }
    return activeCars;
}

// create cars, in the lane, direction right
export function laneDirectionRight(cars, y, speed){
    let slowLaneCarDistance = (myCanvas.width / cars ) - 40;

    let rndInt = 0;
    
    let activeCars = [];

    for(let i = 0; i < cars; i++ ){
        rndInt = Math.floor(Math.random() * 6)        
        // create car instance and save it in activeCars array
        activeCars.push(new Car(slowLaneCarDistance, y, speed, rndInt));
        // set distance between cars
        slowLaneCarDistance += slowLaneCarDistance
    }
    return activeCars;
}