// Selectors
const myCanvas = document.getElementById('myCanvas'),
      ctx = myCanvas.getContext('2d');

// Variables
let xFrog = 126, yFrog = 128, frogSize = 16, xFrogStart = (myCanvas.width /2) - 7, yFrogStart = myCanvas.height - frogSize, xJump = 28, yJump = frogSize + 4, 
    carWidthRight = 35, carHeightRight = 25, carWidthLeft2 = 40, carHeightLeft2 = 20, carWidthLeft = 30, carHeightLeft = 20, streetHeight = 60;
let keys = [];

// Functions

// Cars going right
const   greenCarRight = 'img/goingRight/green_car_right.png', orangeCarRight = 'img/goingRight/oragen_car_right.png', 
        ambulanceRight = 'img/goingRight/ambulance_right.png', blueCarRight = 'img/goingRight/blue_car_right.png',
        greenCarLeft = 'img/goingLeft/green_car_left.png', redCarLeft = 'img/goingLeft/red_car_left.png',
        yellowCarLeft = 'img/goingLeft/yellow_car_left.png', redCarLeft2 = 'img/goingLeft/red_car_left2.png';

const carsRight = [greenCarRight, orangeCarRight, ambulanceRight, blueCarRight];
const carsLeft = [greenCarLeft, redCarLeft, yellowCarLeft, redCarLeft];

class Car {
    constructor(x, y, speed, rndInt){
        this.x = x;
        this.y = y;        
        this.speed = speed;
        this.rndInt = rndInt;
    }

    
    drawLeft(){

        let carImageLeft = new Image();
        carImageLeft.src = carsLeft[this.rndInt]; 
        ctx.drawImage(carImageLeft, this.x, this.y, carWidthLeft, carHeightLeft);    

        // reset car
        if(this.x < - carWidthLeft ){
            this.x = 330;
        }    
        // draw car
        // drawRedCarLeft(this.x, this.y);

        // move car position
        this.x -= this.speed;     
        ctx.drawImage(carImageLeft, this.x, this.y, carWidthLeft, carHeightLeft);   

        // check for collisions        
        this.collision();
    }

    drawRight(){

        let carImageRight = new Image();
        carImageRight.src = carsRight[this.rndInt];    
        ctx.drawImage(carImageRight, this.x, this.y, carWidthRight, carHeightRight);            
        
        // reset car
        if(this.x > 300 ){
            this.x = 0;
        }    
        // // draw car
        // drawCarRight(this.x, this.y);

        // move car position
        this.x += this.speed;     
        ctx.drawImage(carImageRight, this.x, this.y, carWidthRight, carHeightRight); 

        // check for collisions
        this.collision();
    }

      
    drawLeft2(){
        // reset car
        if(this.x < - carWidthLeft2 ){
            this.x = 330;
        }    
        // draw car
        drawYellowCarLeft(this.x, this.y);

        // move car position
        this.x -= this.speed;     
        drawYellowCarLeft(this.x, this.y);        

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
        console.log(rndInt);
        activeCars.push(new Car(slowLaneCarDistance += slowLaneCarDistance, y, speed, rndInt));
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
        activeCars.push(new Car(slowLaneCarDistance += slowLaneCarDistance, y, speed, rndInt));
    }
    return activeCars;
}

// function carsAndStreet(streetY, leftCars1Num, leftCars1Speed, rightCarsNum, rightCarsSpeed, redCarsNum2, redCarsSpeed2 ){
    function carsAndStreet(streetY, leftCars1Num, leftCars1Speed, rightCarsNum, rightCarsSpeed ){
    

    const leftCar = laneDirectionLeft(leftCars1Num, streetY , leftCars1Speed);
    const rightCar = laneDirectionRight(rightCarsNum, streetY + 19, rightCarsSpeed);
    // const leftCar2 = laneDirectionLeft(redCarsNum2, streetY + 40, redCarsSpeed2);
    
    const traffic = {
        leftCar: leftCar,
        rightCar: rightCar,
        // leftCar2: leftCar2,
        street: function (yLane){
    
            let line = streetHeight / 3;
            streetBorder = line + yLane,
            centreLine = 5;

            // motorway
            ctx.beginPath();
            ctx.rect(-5, yLane, 310, streetHeight);
            ctx.fillStyle = "#CAC4BD";
            ctx.fill();
            ctx.stroke();

            // add centre lines
            for(let i = 0; i < 2; i++ ){

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
    
    // check if you won
    didYouWin(yFrog);

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
    // motorwayOne.leftCar2.forEach( car => car.drawLeft2());
    
    
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


    const motorwayOneYpos = 71;    
    // let motorwayOne = carsAndStreet(motorwayOneYpos, 1, 3, 3, 1, 2, 0.2);
    let motorwayOne = carsAndStreet(motorwayOneYpos, 2, 3, 3, 1);
        
    // Conditional prevents cars from increasing speed when clickling on startGame constantly.
    if(gameOn === false){
        animate(motorwayOne, motorwayOneYpos);
        gameOn = true;
    }            
}








