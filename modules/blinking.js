
const gameText = document.querySelector('.game-text');

let blinkText;

// get text to blink
export const blinking = () =>{
    blinkText = setInterval(() => {
        gameText.style.opacity = (gameText.style.opacity == 1 ? 0 : 1);
    }, 700);
}

// stop blinking
export function stopBlinking(){
    // hide start game
    gameText.style.display = 'none';

    clearInterval(blinkText);
}