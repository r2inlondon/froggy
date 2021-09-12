
    import {playGame} from "../main.js"
    
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
                const canvas = document.querySelector('.game');
                const orangeBox = document.querySelector('.white-box');

                orangeBox.style.display = 'none';
                canvas.style.display = 'inline';
            },1000)
        };
                                     
    }, 1000);        
}








