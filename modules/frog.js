import {stopAnimation, stopGame, restartGame} from '../main.js'
import { clearInstructions } from './instructions.js';

// Selectors
export const myCanvas = document.getElementById('myCanvas'), ctx = myCanvas.getContext('2d');
            

export let xFrog = 143, yFrog = 134, frogSize = 16, bottomLimit = myCanvas.height - frogSize, 
        xJump = 28, yJump = frogSize + 4, keys = [];


export function resetFrog(){
    xFrog = 143, yFrog = 134;
    console.log({xFrog, yFrog});
}


export function drawFrogImage(x,y){        
    let base_image = new Image();
    base_image.src = 'img/frog.svg';

    // check if you won
    didYouWin(yFrog);
    
    ctx.drawImage(base_image, x, y, frogSize, frogSize);
            
}

export function moveFrog(e){
    console.log('before',{xFrog, yFrog});
    // store any key pressed
    keys[e.keyCode] = true;
    // Left - canvas limit
    if(keys[37] && xFrog > 14){
        // left frog's jump length
        xFrog -= xJump;
        console.log({xFrog, yFrog});
    }
    // right - canvas limit
    if(keys[39] && xFrog < 266){
        // right frog's jump length
        xFrog += xJump;
        console.log({xFrog, yFrog});
    }
    // down - canvas limit
    if(keys[38]){
        // down frog's jump length
        yFrog -= yJump;
        console.log({xFrog, yFrog});
    }
    // up - canvas limit
    if(keys[40] && yFrog < bottomLimit ){
        // up frog's jump length
        yFrog += yJump;
        console.log({xFrog, yFrog});
    }    
    
    
    

    drawFrogImage(xFrog, yFrog)

    e.preventDefault();
}

export function releasedKey(e){
    // mark keys that were released
    keys[e.keyCode] = false;
}

export function notification(message){
    // stop keyboard events    
    window.removeEventListener('keydown', moveFrog);
    window.removeEventListener('keyup', releasedKey); 
    
    // stopAnimation();
    stopGame();
        
    const whiteBox = document.querySelector('.white-box');

    whiteBox.style.display = 'inline';

    whiteBox.innerHTML = `${message}`

    whiteBox.style.animation = 'drop-white 1s ease forwards';

    whiteBox.childNodes.forEach(node => {
        
        if(node.className === "button-52"){startAgain()};  
    });    
}

// check if you won
function didYouWin(yFrog){   
    if(yFrog < 5){
        const message = `<p class="dead-msg">you win!</p>
            <img src="./img/web/win-frog.png" alt="dead frog" class="win-img">
            <button class="button-52" role="button">play again?</button>`;
        setTimeout (() => {notification(message)}, 50);
        // setTimeout(notification, 100, 'YOU WIN');        
    }
}

function startAgain(){    
    const button = document.querySelector('.button-52');

    button.addEventListener('click', () =>{ 
                
        // reload game
        // location.reload();
        clearInstructions();
    });
}