
export function blinking(element){
    setInterval(() => {
        element.style.opacity = (element.style.opacity == 1 ? 0 : 1);
    }, 700);
}