// Selectors
const myCanvas = document.getElementById('myCanvas'),
      ctx = myCanvas.getContext('2d');

// Variables
let xFrog = 126, yFrog = 128, frogSize = 16, xFrogStart = (myCanvas.width /2) - 7, yFrogStart = myCanvas.height - frogSize, xJump = 28, yJump = frogSize + 4, 
    carWidthRight = 35, carHeightRight = 20, carWidthLeft = 35, carHeightLeft = 20, streetHeight = 40;
let keys = [];

// Functions

// **** Cars ****

function drawCarImageLeft(x, y){        
    carImageLeft = new Image();
    // carImageLeft.src = 'img/car-mint.jpg';
    carImageLeft.src = 'img/yellow_car_left.png';
    
    ctx.drawImage(carImageLeft, x, y, carWidthLeft, carHeightLeft);
            
}

function drawCarImageRight(x, y){        
    carImageRight = new Image();
    carImageRight.src = 'img/green_car_right.png';
    
    ctx.drawImage(carImageRight, x, y, carWidthRight, carHeightRight);
            
}

class Car {
    constructor(x, y, color, speed){
        this.x = x;
        this.y = y;
        this.color = color;
        this.speed = speed;
    }

    
    drawLeft(){
        //clear car previus position
        // ctx.clearRect(this.x + 30, this.y, carWidthLeft, carHeightLeft);        
        
        // reset car
        if(this.x < - carWidthLeft ){
            this.x = 330;
        }    
        // draw car
        drawCarImageLeft(this.x, this.y);

        // move car position
        this.x -= this.speed;     
        drawCarImageLeft(this.x, this.y);        

        // check for collisions        
        this.collision();
    }

    drawRight(){
        //clear car previus position
        // ctx.clearRect(this.x - 28, this.y, carWidthRight, carHeightRight);

        // reset car
        if(this.x > 300 ){
            this.x = 0;
        }    
        // draw car
        drawCarImageRight(this.x, this.y);

        // move car position
        this.x += this.speed;     
        drawCarImageRight(this.x, this.y);        

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
function slowLaneLeft(cars, y, speed){
    let slowLaneCarDistance = (myCanvas.width / cars ) - 40;
    
    let activeCars = [];
    for(let i = 0; i < cars; i++ ){
        activeCars.push(new Car(slowLaneCarDistance += slowLaneCarDistance, y, "blue", speed));
    }
    return activeCars;
}

// create cars, in the lane, direction right
function slowLaneRight(cars, y, speed){
    let slowLaneCarDistance = (myCanvas.width / cars ) - 40;

    let activeCars = [];
    for(let i = 0; i < cars; i++ ){
        activeCars.push(new Car(slowLaneCarDistance += slowLaneCarDistance, y, "red", speed));
    }
    return activeCars;
}

function carsAndStreet(streetY, blueCarsNum, blueCarsSpeed, redCarsNum, redCarsSpeed ){
    

    const blueCar = slowLaneLeft(blueCarsNum, streetY , blueCarsSpeed);
    const redCar = slowLaneRight(redCarsNum, streetY + 21, redCarsSpeed);
    
    const traffic = {
        blueCar: blueCar,
        redCar: redCar,
        street: function (yLane){
            // let streetBorder = yLane;
            // let centreLine = 5;

            let streetBorder = (streetHeight / 2) + yLane;
            let centreLine = 5;
            
            ctx.beginPath();
            ctx.rect(-5, yLane, 310, streetHeight);
            ctx.fillStyle = "#CAC4BD";
            ctx.fill();
            ctx.stroke();

    for(let i = 0; i < 9; i++){
        ctx.beginPath();
        ctx.strokeStyle = "gray";
        ctx.moveTo(centreLine, streetBorder);
        ctx.lineTo(centreLine += 30, streetBorder);
        ctx.closePath();
        ctx.stroke();
        centreLine += 30
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

function draw(traffic1, yTraffic1){

    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    
    traffic1.street(yTraffic1);
        
    traffic1.blueCar.forEach( car => car.drawLeft());
    traffic1.redCar.forEach( car => car.drawRight());
    
    
    drawFrogImage(xFrog, yFrog);
                      
}

function animate(traffic1, yTraffic1){    
    // creates the animation loop    
    requestAnimationFrame(() => animate(traffic1, yTraffic1));
            
    draw(traffic1, yTraffic1);    
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


    const yTraffic1 = 92;    
    let traffic1 = carsAndStreet(yTraffic1, 2, 1, 3, 0.5);
        
    // Conditional prevents cars from increasing speed when clickling on startGame constantly.
    if(gameOn === false){
        animate(traffic1, yTraffic1);
        gameOn = true;
    }            
}

// draw street 
// twoWayStreet(19)







