// Selectors
const myCanvas = document.getElementById('myCanvas'),
      ctx = myCanvas.getContext('2d');

// Variables
let xFrog = 126, yFrog = 128, frogSize = 16, xFrogStart = (myCanvas.width /2) - 7, yFrogStart = myCanvas.height - frogSize, xJump = 28, yJump = frogSize + 4, 
    carWidthRight = 35, carHeightRight = 25, carWidthLeft2 = 40, carHeightLeft2 = 20, carWidthLeft = 30, carHeightLeft = 20, streetHeight = 120;
let keys = [];

// Functions

// Cars going right
const   greenCarRight = 'img/goingRight/green_car_right.png', orangeCarRight = 'img/goingRight/oragen_car_right.png', 
        ambulanceRight = 'img/goingRight/ambulance_right.png', blueCarRight = 'img/goingRight/blue_car_right.png',
        greenCarLeft = 'img/goingLeft/green_car_left.png', redCarLeft = 'img/goingLeft/red_car_left.png',
        yellowCarLeft = 'img/goingLeft/yellow_car_left.png', redCarLeft2 = 'img/goingLeft/red_car_left2.png';

const carsRight = [greenCarRight, orangeCarRight, ambulanceRight, blueCarRight];
const carsLeft = [greenCarLeft, redCarLeft2, yellowCarLeft, redCarLeft];

class Car {
    constructor(x, y, speed, rndInt){
        this.x = x;
        this.y = y;        
        this.speed = speed;
        this.rndInt = rndInt;
    }
   
    drawLeft(){
        // load image
        let carImageLeft = new Image();
        carImageLeft.src = carsLeft[this.rndInt]; 
        ctx.drawImage(carImageLeft, this.x, this.y, carWidthLeft, carHeightLeft);    

        // reset car
        if(this.x < -30 ){
            this.x = 330;
        }    
        // move car position
        this.x -= this.speed;     
        ctx.drawImage(carImageLeft, this.x, this.y, carWidthLeft, carHeightLeft);   

        // check for collisions        
        this.collision();
    }

    drawRight(){
        // load image
        let carImageRight = new Image();
        carImageRight.src = carsRight[this.rndInt];    
        ctx.drawImage(carImageRight, this.x, this.y, carWidthRight, carHeightRight);            
        
        // reset car
        if(this.x > 300 ){
            this.x = 0;
        }    

        // move car position
        this.x += this.speed;     
        ctx.drawImage(carImageRight, this.x, this.y, carWidthRight, carHeightRight); 

        // check for collisions
        this.collision();
    }
      
    collision(){
        if( this.x < xFrog + frogSize &&
            this.x + carWidthLeft > xFrog &&
            this.y < yFrog + frogSize &&
            this.y + carHeightLeft > yFrog
            ){
              notification('Frog is dead');
        }
    }
}

// create cars, in the lane, direction left
function laneDirectionLeft(cars, y, speed){
    let slowLaneCarDistance = (myCanvas.width / cars ) - 40;
    
    let rndInt = 0;
        
    let activeCars = [];

    for(let i = 0; i < cars; i++ ){
        rndInt = Math.floor(Math.random() * 4)
        
        activeCars.push(new Car(slowLaneCarDistance, y, speed, rndInt));

        slowLaneCarDistance += slowLaneCarDistance

    }
    return activeCars;
}

// create cars, in the lane, direction right
function laneDirectionRight(cars, y, speed){
    let slowLaneCarDistance = (myCanvas.width / cars ) - 40;

    let rndInt = 0;
    
    let activeCars = [];

    for(let i = 0; i < cars; i++ ){
        rndInt = Math.floor(Math.random() * 4)
        activeCars.push(new Car(slowLaneCarDistance, y, speed, rndInt));

        slowLaneCarDistance += slowLaneCarDistance
    }
    return activeCars;
}

function carsAndStreet(streetY, leftCars1Num, leftCars1Speed, rightCarsNum, rightCarsSpeed, leftCars2Num, 
                        leftCars2Speed, rightCars2Num, rightCars2Speed, leftCars3Num, leftCars3Speed, rightCars3Num, rightCars3Speed ){
    
    

    const leftCar = laneDirectionLeft(leftCars1Num, streetY , leftCars1Speed);
    const rightCar = laneDirectionRight(rightCarsNum, streetY + 18, rightCarsSpeed);
    const leftCar2 = laneDirectionLeft(leftCars2Num, streetY + 40, leftCars2Speed);
    const rightCar2 = laneDirectionRight(rightCars2Num, streetY + 58, rightCars2Speed);
    const leftCar3 = laneDirectionLeft(leftCars3Num, streetY + 80, leftCars3Speed);
    const rightCar3 = laneDirectionRight(rightCars3Num, streetY + 98, rightCars3Speed);
    
    const traffic = {
        leftCar: leftCar,
        rightCar: rightCar,
        leftCar2: leftCar2,
        rightCar2: rightCar2,
        leftCar3: leftCar3,
        rightCar3: rightCar3,
        
        // draw lanes and street
        street: function (yLane){
    
            let line = streetHeight / 6;
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
    }
    return traffic;
}

// ****  FROG ****
function drawFrogImage(x = 127, y = 129){        
    base_image = new Image();
    base_image.src = 'img/frog.svg';

    // check if you won
    didYouWin(yFrog);
    
    ctx.drawImage(base_image, x, y, frogSize, frogSize);
            
}

function moveFrog(e){
    // store any key pressed
    keys[e.keyCode] = true;    
    // Left - canvas limit
    if(keys[37] && xFrog > 14){
        // left frog's jump length
        xFrog -= xJump;
    }
    // right - canvas limit
    if(keys[39] && xFrog < 266){
        // right frog's jump length
        xFrog += xJump;
    }
    // down - canvas limit
    if(keys[38]){
        // down frog's jump length
        yFrog -= yJump;
    }
    // up - canvas limit
    if(keys[40] && yFrog < yFrogStart ){
        // up frog's jump length
        yFrog += yJump;
    }    
    
    
    console.log({xFrog, yFrog});

    e.preventDefault();
}

function releasedKey(e){
    // mark keys that were released
    keys[e.keyCode] = false;
}

// check if you won
function didYouWin(yFrog){   
    if(yFrog < 5){
        notification('YOU WIN');
    }
}

function notification(message){
    const playAgain = alert(`${message}`)
    // reload game
    location.reload();    
}

// *** Game On ***

function draw(motorwayOne, motorwayOneYpos){

    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    
    motorwayOne.street(motorwayOneYpos);
        
    motorwayOne.leftCar.forEach( car => car.drawLeft());
    motorwayOne.rightCar.forEach( car => car.drawRight());
    motorwayOne.leftCar2.forEach( car => car.drawLeft());
    motorwayOne.rightCar2.forEach( car => car.drawRight());
    motorwayOne.leftCar3.forEach( car => car.drawLeft());
    motorwayOne.rightCar3.forEach( car => car.drawRight());
    
    
    drawFrogImage(xFrog, yFrog);
                      
}

function animate(motorwayOne, motorwayOneYpos){    
    // creates the animation loop    
    requestAnimationFrame(() => animate(motorwayOne, motorwayOneYpos));
            
    draw(motorwayOne, motorwayOneYpos);    
}

let gameOn = false;

function startGame(){
    // Triger Event listers
    window.addEventListener('keydown', moveFrog);
    window.addEventListener('keyup', releasedKey); 
    
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    
    // Reset Frog to start game
    xFrog = xFrogStart, yFrog = yFrogStart;      
    drawFrogImage();


    const motorwayOneYpos = 14;    
    let motorwayOne = carsAndStreet(motorwayOneYpos,1, 3, 
                                                    3, 1, 
                                                    2, 0.8, 
                                                    1, 2, 
                                                    3, 0.6,
                                                    2, 0.4);
            
    // Conditional prevents cars from increasing speed when clickling on startGame constantly.
    if(gameOn === false){
        animate(motorwayOne, motorwayOneYpos);
        gameOn = true;
    }            
}








