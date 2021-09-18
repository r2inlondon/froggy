
const startGame = document.querySelector('.game-text');

let blinkText;

// get text to blink
export const blinking = () =>{
    blinkText = setInterval(() => {
        startGame.style.opacity = (startGame.style.opacity == 1 ? 0 : 1);
    }, 700);
}

// stop blinking
export function stopBlinking(){
    // hide start game
    startGame.style.display = 'none';

    clearInterval(blinkText);
}