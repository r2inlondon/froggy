import { countDown } from "./timer.js";
import { notification } from "./frog.js";

const whiteBox = document.querySelector(".white-box");

export function instructionsUp() {
  const instructions = `
        <p class="instructions-msg">Use <a class="arrow">arrow</a> keys to move <a class="froggy">froggy</a> to <a class="cross">cross</a> the road</p>
        <img class="arrow-keys" src="./img/web/arrowKeys2.png" alt="Keyboard Keys">`;

  notification(instructions);
}

export function clearInstructions() {
  while (whiteBox.firstChild) {
    whiteBox.removeChild(whiteBox.firstChild);
  }

  whiteBox.innerHTML = `<p class="numbers">3</p>`;

  countDown();
}
