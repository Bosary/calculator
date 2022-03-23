function add(num1, num2) {
    return +num1 + +num2;
};

function subtract(num1, num2) {
    return +num1 - +num2;
};

function multiply(num1, num2) {
    return +num1 * +num2;
};

function divide(num1, num2) {
    return +num1 / +num2;
};

function operate(num1, operator, num2) {
    let result;
    switch (operator) {
        case '+':
            result = add(num1, num2);
            break;
        case '-':
            result = subtract(num1, num2);
            break;
        case '*':
            result = multiply(num1, num2);
            break;
        case '/':
            result = divide(num1, num2);
            break;
        default:
            console.log("Error");
    };

    let currentDisplay = document.querySelector('.display');
    let topDisplay = document.querySelector('.top-display');
    displayMain("", result);
    displayTop("", result);
}

function decomposeOperation() {
    const operation = document.querySelector('.top-display').textContent;
    const decomposedOperation = operation.match(/(\d+|[^\d]+)/g);
    operate(decomposedOperation[0], decomposedOperation[1], decomposedOperation[2]);
}

function clear() {
    document.querySelector('.display').textContent = "00";
    document.querySelector('.top-display').textContent = "00";
}

// Change display after every change number/operator
function displayMain(oldEntry, newEntry) {
    
    document.querySelector('.display').textContent = `${oldEntry}${newEntry}`;
}

// Display the whole operation
function displayTop(oldEntry, newEntry) {

    document.querySelector('.top-display').textContent = `${oldEntry}${newEntry}`;    
}

function checkUserInput(e) {
    let currentDisplay = document.querySelector('.display');
    let topDisplay = document.querySelector('.top-display');

    // Numbers input
    if (e.currentTarget.className == 'digits') {
        if (currentDisplay.textContent == "00") {
            displayMain("",e.target.textContent);
            displayTop("",e.target.textContent);
        }
        else if (!isNaN(parseFloat(currentDisplay.textContent))) {
            displayMain(currentDisplay.textContent, e.target.textContent);
            displayTop(topDisplay.textContent, e.target.textContent);
        }
        else if (isNaN(parseFloat(currentDisplay.textContent))) {
            displayMain("",e.target.textContent);
            displayTop(topDisplay.textContent, e.target.textContent);
        }
        else {
            console.log("Error");
        }
    }
    
    // Operators input
    if (e.currentTarget.className == 'operators') {
        if ((parseFloat(currentDisplay.textContent) != NaN) && (currentDisplay.textContent != "00")) {
            displayMain("", e.target.textContent);
            displayTop(topDisplay.textContent, e.target.textContent);
        }
        else {
            console.log("Error");
        }
    }

    // Others
    if (e.currentTarget.className == 'others')  {
        if (e.target.textContent == 'Clear') {
            clear();
        }
        if (e.target.textContent == '=') {
            decomposeOperation();
        }
    }
}

const digits = document.querySelector('.digits');
digits.addEventListener('click', checkUserInput);

const operators = document.querySelector('.operators');
operators.addEventListener('click', checkUserInput);

const others = document.querySelector('.others')
others.addEventListener('click', checkUserInput);

// EQUAL