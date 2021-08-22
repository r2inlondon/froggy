// Selectors
const myCanvas = document.getElementById('myCanvas'),
      ctx = myCanvas.getContext('2d');

// Variables
let xFrog = 126, yFrog = 128, frogSize = 16, xFrogStart = (myCanvas.width /2) - 7, yFrogStart = myCanvas.height - frogSize, xJump = 28, yJump = frogSize + 4, 
    carWidthRight = 35, carHeightRight = 20, carWidthLeft2 = 40, carHeightLeft2 = 20, carWidthLeft = 30, carHeightLeft = 20, streetHeight = 60;
let keys = [];

// Functions

// **** Cars ****

function drawYellowCarLeft(x, y){        
    carImageLeft = new Image();    
    carImageLeft.src = 'img/yellow_car_left.png';
    ctx.drawImage(carImageLeft, x, y, carWidthLeft, carHeightLeft);            
}

function drawGreenCarRight(x, y){        
    carImageRight = new Image();
    carImageRight.src = 'img/green_car_right.png';    
    ctx.drawImage(carImageRight, x, y, carWidthRight, carHeightRight);            
}

function drawRedCarRight(x, y){        
    carImageRight = new Image();
    carImageRight.src = 'img/red_car_left2.png';    
    ctx.drawImage(carImageRight, x, y, carWidthLeft2, carHeightLeft2);            
}

class Car {
    constructor(x, y, speed){
        this.x = x;
        this.y = y;        
        this.speed = speed;
    }

    
    drawLeft(){
        // reset car
        if(this.x < - carWidthLeft ){
            this.x = 330;
        }    
        // draw car
        drawRedCarRight(this.x, this.y);

        // move car position
        this.x -= this.speed;     
        drawRedCarRight(this.x, this.y);        

        // check for collisions        
        this.collision();
    }

    drawRight(){
        // reset car
        if(this.x > 300 ){
            this.x = 0;
        }    
        // draw car
        drawGreenCarRight(this.x, this.y);

        // move car position
        this.x += this.speed;     
        drawGreenCarRight(this.x, this.y);        

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
    
    let activeCars = [];
    for(let i = 0; i < cars; i++ ){
        activeCars.push(new Car(slowLaneCarDistance += slowLaneCarDistance, y, speed));
    }
    return activeCars;
}

// create cars, in the lane, direction right
function laneDirectionRight(cars, y, speed){
    let slowLaneCarDistance = (myCanvas.width / cars ) - 40;

    let activeCars = [];
    for(let i = 0; i < cars; i++ ){
        activeCars.push(new Car(slowLaneCarDistance += slowLaneCarDistance, y, speed));
    }
    return activeCars;
}

function carsAndStreet(streetY, leftCars1Num, leftCars1Speed, rightCarsNum, rightCarsSpeed, redCarsNum2, redCarsSpeed2 ){
    

    const leftCar1 = laneDirectionLeft(leftCars1Num, streetY , leftCars1Speed);
    const rightCar = laneDirectionRight(rightCarsNum, streetY + 21, rightCarsSpeed);
    const leftCar2 = laneDirectionLeft(redCarsNum2, streetY + 40, redCarsSpeed2);
    
    const traffic = {
        leftCar1: leftCar1,
        rightCar: rightCar,
        leftCar2: leftCar2,
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
        
    motorwayOne.leftCar1.forEach( car => car.drawLeft());
    motorwayOne.rightCar.forEach( car => car.drawRight());
    motorwayOne.leftCar2.forEach( car => car.drawLeft2());
    
    
    drawFrogImage(xFrog, yFrog);
                      
}

function animate(motorwayOne, motorwayOneYpos){    
    // creates the animation loop    
    requestAnimationFrame(() => animate(motorwayOne, motorwayOneYpos));
            
    draw(motorwayOne, motorwayOneYpos);    
}

let gameOn = false;

function startGame(){
    // Trigers Event lister
    window.addEventListener('keydown', moveFrog);
    window.addEventListener('keyup', releasedKey); 
    
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    
    // Reset Frog to start game
    xFrog = xFrogStart, yFrog = yFrogStart;      
    drawFrogImage();


    const motorwayOneYpos = 71;    
    let motorwayOne = carsAndStreet(motorwayOneYpos, 1, 3, 3, 1, 2, 0.2);
        
    // Conditional prevents cars from increasing speed when clickling on startGame constantly.
    if(gameOn === false){
        animate(motorwayOne, motorwayOneYpos);
        gameOn = true;
    }            
}

// draw street 
// twoWayStreet(19)







