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
function displayMain(oldEntry, newEntry) {
    
    document.querySelector('.display').textContent = `${oldEntry}${newEntry}`;
}

// Display the whole operation
function displayTop(oldEntry, newEntry) {

    document.querySelector('.over-display').textContent = `${oldEntry}${newEntry}`;    
}

function checkUserInput(e) {
    const currentDisplay = document.querySelector('.display');
    const overDisplay = document.querySelector('.over-display')
    
    // Numbers input
    switch (e.currentTarget.className == 'digits') {
        case (currentDisplay.textContent == "00"):
            displayMain("",e.target.textContent);
            displayTop("",e.target.textContent);
            break;
        
        case (parseFloat(currentDisplay.textContent) != NaN):
            displayMain(currentDisplay.textContent, e.target.textContent);
            displayTop(overDisplay.textContent, e.target.textContent);
            break;
        
        case (parseFloat(currentDisplay.textContent) == NaN):
            displayMain("",e.target.textContent);
            displayTop(overDisplay, e.target.textContent);
            break;

        default:
            console.log("Error");
    }

}

document.getElementById('clear').addEventListener('click', clear);

const digits = document.querySelector('.digits');
digits.addEventListener('click', checkUserInput);

const operators = document.querySelector('.operators');
operators.addEventListener('click', displayMain);
operators.addEventListener('click', displayTop);

// EQUAL