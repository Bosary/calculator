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
}

function display(e) {
    let currentContent = document.querySelector('.display').textContent;
    if (currentContent == '00') currentContent = "";
    document.querySelector('.display').textContent = `${currentContent}${e.target.textContent}`;
}

document.getElementById('clear').addEventListener('click', clear);

const digits = document.querySelector('.digits');
digits.addEventListener('click', display);

const operators = document.querySelector('.operators');
operators.addEventListener('click', display);

// EQUAL