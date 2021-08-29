import { myCanvas, ctx } from "./main.js";

export default class Car {
    constructor(images, x, y, carWidth, carHeight){        
        this.images = images        
        this.x = x;
        this.y = y;        
        this.carWidth = carWidth;
        this.carHeight = carHeight;
    }
   
    drawLeft(){        
        // load image
        let carImageLeft = new Image();
        carImageLeft.src = this.images;        
        ctx.drawImage(carImageLeft, this.x, this.y, this.carWidth, this.carHeight);                  
    }
       
}