function add(num1, num2) {
    return num1 + num2;
};

function subtract(num1, num2) {
    return num1 - num2;
};

function multiply(num1, num2) {
    return num1 * num2;
};

function divide(num1, num2) {
    return num1 / num2;
};

function operate(operator, num1, num2) {
    switch (operator) {
        case '+':
            add(num1, num2);
            break;
        case '-':
            subtract(num1, num2);
            break;
        case '*':
            multiply(num1, num2);
            break;
        case '/':
            divide(num1, num2);
            break;
        default:
            alert("Wrong input!");
            operate(operator, num1, num2);
    };
};

function clear() {
    document.querySelector('.display').textContent = "00";
    document.querySelector('.over-display').textContent = "00";
}

// Change display after every change number/operator
function displayMain(e) {
    document.querySelector('.display').textContent = `${e.target.textContent}`;    
}

// Display the whole operation
function displayTop(e) {
    let currentContent = document.querySelector('.over-display').textContent;
    if (currentContent == '00') currentContent = "";
    document.querySelector('.over-display').textContent = `${currentContent}${e.target.textContent}`;
}

document.getElementById('clear').addEventListener('click', clear);

const digits = document.querySelector('.digits');
digits.addEventListener('click', displayMain);
digits.addEventListener('click', displayTop);

const operators = document.querySelector('.operators');
operators.addEventListener('click', displayMain);
operators.addEventListener('click', displayTop);

// EQUAL