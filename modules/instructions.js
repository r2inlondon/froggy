import { countDown } from "./timer.js";
import {notification} from "./frog.js";

const whiteBox = document.querySelector('.white-box');

export function instructionsUp(){

    const instructions = '<p class="instructions-msg">Use arrow keys to help frogy to cross the road</p><img class="arrows" src="./img/web/arrowKeys2.png" alt="Keyboard Keys">';

    notification(instructions);
}

export function clearInstructions(){
    
    while(whiteBox.firstChild){
        whiteBox.removeChild(whiteBox.firstChild);
    }
        
    whiteBox.innerHTML = `<p class="numbers">3</p>`;

    countDown();
    
}

