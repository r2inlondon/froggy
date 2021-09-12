import { countDown } from "./timer.js";

const orangeBox = document.querySelector('.orange-box');

export function instructionsUp(){
    
    orangeBox.style.animation = 'drop-box 0.5s ease forwards';        
}

export function clearInstructions(){
    
    while(orangeBox.firstChild){
        orangeBox.removeChild(orangeBox.firstChild);
    }
        
    orangeBox.innerHTML = `<p class="numbers">3</p>`;

    countDown();
    
}

export function dead(){
    const whiteBox = document.querySelector('.white-box');

    whiteBox.innerHTML = `<p class="dead-msg">Froggy is dead</p><img src="./img/web/dead-frog2.png" alt="dead frog">`

    whiteBox.style.animation = 'drop-white 1s ease forwards'; 

}