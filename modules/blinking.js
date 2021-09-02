
export function blinking(element){
    setInterval(() => {
        element.style.display = (element.style.display == 'none' ? '' : 'none');
    }, 700);
}