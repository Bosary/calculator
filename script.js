/* Calculator Project.
Note 26/03/22: Consider revisiting later, using array to stock input 
to see if it can make the code easier
Also change deleteInput. Updating display should be done in display.
Need to add an updateDisplay() ?
*/


// globals
let num1 = null;
let num2 = null;
let operator = null; // null => working on num1; otherwise num2
let newOperation = true;

const controls = document.querySelector('.controls');
controls.addEventListener('click', checkButton);


function checkButton(e) {
    button = e.target.textContent;

    // special actions. Exit current function on use.
    if (button == 'Clear') { return clear() };

    if (button == '⌫') { return deleteInput() };

    if (button == '.') { return addDecimal(e) };

    if (button == '=') { return showResult() };

    // digits and operators
    if (!isNaN(+button)) {
        getNumbers(button);
    } else {
        getOperator(button);
    }   

    display(e);
}


function clear() { // full reset
    const mainDisplay = document.getElementById('main-display');
    const lowerDisplay = document.getElementById('lower-display');

    mainDisplay.textContent = "";
    lowerDisplay.textContent = "";
    num1 = null;
    num2 = null;
    operator = null;
    newOperation = true;
}


function deleteInput() {
    // Update display
    const mainDisplay = document.getElementById('main-display');
    if (mainDisplay.textContent != "") {
        const editedMain = mainDisplay.textContent.slice(0, -1);
        mainDisplay.textContent = editedMain;
    }
    
    // Check in order num2 - operator - num1 and edit the value
    if (num2) {
        num2 = num2.slice(0, -1);
        if (num2 == "") {
            num2 = null;
        }
    } else if (operator) {
        operator = null;
    } else if (num1) {
        num1 = num1.slice(0, -1);
        if (num1 == "") {
            num1 = null;
        }
    } 

    // Update lower display
    const lowerDisplay = document.getElementById('lower-display');
    if (num2) {
        lowerDisplay.textContent = operate();
    } else {
        lowerDisplay.textContent = "";
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
        num1 = mainDisplay.textContent; 
        operator = null;
        num2 = null;
        newOperation = true;
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

    if (mainDisplay.textContent.length > 11) {
        mainDisplay.setAttribute('style', 'font-size: 24px');
    }
}


function getNumbers(button) {
    // start a new operation
    if (newOperation) {
        clear();
        num1 = button;
        newOperation = false;
        return;
    }

    // Ongoing operation. 
    if (!operator && !newOperation) {
        if (num1 === null) { // in case user delete 1st number
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
    newOperation = false;

    // operation with several operators
    if (operator && num2) {
        const partialResult = document.getElementById('lower-display').textContent; 
        num1 = partialResult;
        num2 = null;
        operator = button;
        return; // Need to exit the function to avoid issue between negative and substract
    }

    // negative numbers
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


function addDecimal(e) {
    if (!operator && num1 !== null) {
        num1 += '.';
        display(e);
    } 
    
    if (operator && num2 !== null) {
        num2 += '.';
        display(e);
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
