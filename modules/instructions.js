
export function instructionsUp(){
    const instructions = document.querySelector('.instructions');
    
    instructions.innerHTML = `
        <div class="orange-box">
            <p class="instructions-msg">Use arrow keys to move frogy</p>
            <img class="arrows" src="./img/web/arrowKeys2.png" alt="Keyboard Keys">
        </div>`
}