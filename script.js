let num1 = null;
let num2 = null;
let operator = null;

function checkButton(e) {
    
    button = e.target.textContent;

    // special action
    if (button == 'C') { return clear() };

    //if (button == '⌫') { return }

    if (button == '=') {return showResult() };
    
    if (!isNaN(+button)) {
        getNumbers(button);
    } else {
        getOperator(button);
    }   

    display(e);
}

function clear() {
    const mainDisplay = document.getElementById('main-display');
    const lowerDisplay = document.getElementById('lower-display');

    mainDisplay.textContent = "";
    lowerDisplay.textContent = "";
    num1 = null;
    num2 = null;
    operator = null;
}

function getNumbers(button) {
    
    if (!operator) {
        if (num1 === null) {
            num1 = button;
        } else {
            num1 += button;
        }
    } else {
        if (num2 === null) {
            num2 = button;
        } else {
            num2 += button;
        }
    }
}

function getOperator(button) {
    // operation with several operators
    if (operator && num2) {
        const partialResult = document.getElementById('lower-display').textContent; 
        num1 = partialResult;
        num2 = null;
        operator = button;
    }

    //negative
    if (button == '-') {
        if (!num1) {
            num1 = '-';
        }
        if (operator && !num2) {
            num2 = '-';
        }
    }

    // first operator
    if (num1 && !operator) {
        operator = button;
    } 
}

function display(e) {
    const mainDisplay = document.getElementById('main-display');
    const lowerDisplay = document.getElementById('lower-display');
    const button = e.target.textContent;

    // update main display
    mainDisplay.textContent += button;

    // update lower diplay.
    if (num2 !== null && num2 !== '-') {
        lowerDisplay.textContent = operate()
    }
}

function showResult() {

    const mainDisplay = document.getElementById('main-display');
    const lowerDisplay = document.getElementById('lower-display');
    
    if(!num2) {
        lowerDisplay.textContent = 'Missing operand';
    } else {
        mainDisplay.textContent = lowerDisplay.textContent;
        lowerDisplay.textContent = ""; 
    }
}
function operate() {
    let result = null;

    switch (operator) {

        case '+':
            result = +num1 + +num2;
            break;
        
        case '-':
            result = +num1 - +num2;
            break;

        case '*':
            result = +num1 * +num2;
            break;

        case '/':
            result = +num1 / +num2;
            break;
        
        default:
            result = 'error';
    }

    result = Math.round (result *100) / 100;
    return result;
}

const controls = document.querySelector('.controls');
controls.addEventListener('click', checkButton);

