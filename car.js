import { myCanvas, ctx } from "./main.js";

export default class Car {
    constructor(images, x, y, carWidth, carHeight, speed){        
        this.images = images        
        this.x = x;
        this.y = y;        
        this.carWidth = carWidth;
        this.carHeight = carHeight;
        this.speed = speed;
    }
   
    drawLeft(){        
        // load image
        let carImageLeft = new Image();
        carImageLeft.src = this.images;        
        ctx.drawImage(carImageLeft, this.x, this.y, this.carWidth, this.carHeight);
        
        // reset car
        if(this.x < -30 ){
            this.x = 330;
        }    
        // move car position
        this.x -= this.speed;     
        
    }

    drawRight(){
        // load image
        let carImageRight = new Image();
        carImageRight.src = this.images;        
        ctx.drawImage(carImageRight, this.x, this.y, this.carWidth, this.carHeight);
                  
        
        // reset car
        if(this.x > 300 ){
            this.x = 0;
        }    

        // move car position
        this.x += this.speed;     
                
    }
       
}