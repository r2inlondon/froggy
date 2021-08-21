// Selectors
const myCanvas = document.getElementById('myCanvas'),
      ctx = myCanvas.getContext('2d');

// Variables
let xFrog = 126, yFrog = 128, frogSize = 16, xFrogStart = (myCanvas.width /2) - 7, yFrogStart = myCanvas.height - frogSize, xJump = 28, yJump = frogSize + 4, carWidthRight = 30, carHeightRight = 15, carWidthLeft = 30, carHeightLeft = 15;
let keys = [];

// Functions

// **** Cars ****

function drawCarImageLeft(x, y){        
    carImageLeft = new Image();
    // carImageLeft.src = 'img/car-mint.jpg';
    carImageLeft.src = 'img/favpng_car.png';
    
    ctx.drawImage(carImageLeft, x, y, carWidthLeft, carHeightLeft);
            
}

function drawCarImageRight(x, y){        
    carImageRight = new Image();
    carImageRight.src = 'img/red-car-right.jpg';
    
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
    

    const blueCar = slowLaneLeft(blueCarsNum, streetY + 2, blueCarsSpeed);
    const redCar = slowLaneRight(redCarsNum, streetY + 23, redCarsSpeed);
    
    const traffic = {
        blueCar: blueCar,
        redCar: redCar,
        street: function (yLane){
            let streetBorder = yLane;
            let centreLine = 5;    
        
            // draw central line
            for(let i = 0; i < 9; i++){
                ctx.beginPath();
                ctx.strokeStyle = "gray";
                ctx.moveTo(centreLine, (streetBorder + 40 ) - 20);
                ctx.lineTo(centreLine += 30, (streetBorder + 40 ) - 20);
                ctx.closePath();
                ctx.stroke();
                centreLine += 30
            }
            // draw street
            for(let i = 0; i < 2; i++){
                ctx.beginPath();
                ctx.strokeStyle = "black";
                ctx.moveTo(0, streetBorder);    
                ctx.lineTo(myCanvas.width, streetBorder);
                streetBorder += 40;
                ctx.closePath();    
                ctx.stroke();
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

function draw(traffic, yLane){

    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
        
    traffic.blueCar.forEach( car => car.drawLeft());
    traffic.redCar.forEach( car => car.drawRight());
    
    traffic.street(yLane);
    
    drawFrogImage(xFrog, yFrog);
                      
}

function animate(traffic, yLane){    
    // creates the animation loop    
    requestAnimationFrame(() => animate(traffic, yLane));
            
    draw(traffic, yLane);    
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


    const yLane = 92;
    let traffic = carsAndStreet(yLane, 3, 1, 3, 0.5);
        
    // Conditional prevents cars from increasing speed when clickling on startGame constantly.
    if(gameOn === false){
        animate(traffic, yLane);
        gameOn = true;
    }            
}

// draw street 
// twoWayStreet(19)







