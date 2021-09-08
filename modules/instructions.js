
import { countDown } from "./timer.js";

export function instructionsUp(){
    const orangeBox = document.querySelector('.orange-box');

    orangeBox.style.animation = 'drop-box 0.5s ease forwards';
}

export function clearInstructions(){
    const orangeBox = document.querySelector('.orange-box');

    while(orangeBox.firstChild){
        orangeBox.removeChild(orangeBox.firstChild);
    }
        
    orangeBox.innerHTML = `<p class="numbers">3</p>`;

    countDown();
}
