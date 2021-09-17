
    import {playGame, restartGame} from "../main.js"
    import {moveFrog, releasedKey} from "./frog.js"
    
    let counting;

export function countDown(){
    
    const numbers = document.querySelector('.numbers');
    // Get today's date in miliseconds
    const now = Date.now();
    // Convert the seconds (parameter) into miliseconds
    const then = now + 3 * 1000;
    // Preload game in the background
    
    playGame();

    let secondsLeft = 3;

    counting = setInterval(() => {
        window.addEventListener('keyup', releasedKey); 
            
        // magic happens in this line
        secondsLeft = Math.round((then - Date.now()) / 1000);
        // render numbers
        numbers.innerText = secondsLeft;
        // stop interval when countdown gets to zero
        if(secondsLeft <= 0) {
            clearInterval(counting)
            numbers.innerText = 'Go!';
            // setTimeout(playGame, 1000);
            setTimeout(() =>{
                const gameArea = document.querySelector('.game');
                const whiteBox = document.querySelector('.white-box');

                // Triger Event listers
                window.addEventListener('keyup', releasedKey); 
                window.addEventListener('keydown', moveFrog);

                whiteBox.style.display = 'none';
                gameArea.style.display = 'inline';
            },1000)
        };
                                     
    }, 1000);        
}








