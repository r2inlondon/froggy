
const startGame = document.querySelector('.game-text');

let blink;

export const blinking = () =>{
    blink = setInterval(() => {
        startGame.style.opacity = (startGame.style.opacity == 1 ? 0 : 1);
    }, 700);
}

export function stopBlinking(){
    // hide start game
    startGame.style.display = 'none';

    clearInterval(blink);
}