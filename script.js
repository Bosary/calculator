// globals
let num1 = null;
let num2 = null;
let operator = null;
let result = null;

function operate(operator, num1, num2) {

    switch (operator) {

        case '+':
            result = num1 + num2;
            break;
        
        case '-':
            result = num1 - num2;
            break;

        case '*':
            result = num1 - num2;
            break;

        case '/': // Need to add num1/0 condition
            result = num1 / num2;
            break;
        
        default:
            console.log('error');
    }
}

function display(e) {
    const mainDisplay = document.getElementById('main-display');
    const button = e.target.textContent;

    if (isNaN(+button)) {
        num1 = mainDisplay.textContent;
        operator = button;
    }
    mainDisplay.textContent += e.target.textContent;
}

const controls = document.querySelector('.controls');
controls.addEventListener('click', display);

