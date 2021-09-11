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
    orangeBox.innerHTML = `<p>Frog is Dead!</p>`;

    orangeBox.style.display = 'inline';
    orangeBox.style.animation = 'drop-box 0.5s ease forwards'; 

}