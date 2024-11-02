// Get display element to show calculator output
const display = document.getElementById('display');

// Select all buttons within the calculator
const buttons = document.querySelectorAll('.btn');

// Variables to store user input, result, and current operator
let currentInput = '';
let result = 0;
let operator = null;

const updateDisplay = (value) => {
    display.textContent = value || '0';
};

const handleInput = (input) => {
    // Check if input is a number or a decimal point
    if (!isNaN(input) || input === '.') {
        // Append number/decimal to current input and update display
        currentInput += input;
        updateDisplay(currentInput);
    }
    // Handle operator input
    else if (['+', '-', '*', '/'].includes(input)) {
        // Convert current input to number and store as result
        result = parseFloat(currentInput) || result;
        // Set the current operator
        operator = input;
        // Reset current input for the next number entry
        currentInput = '';
    }
    // Calculate result when "=" is pressed
    else if (input === '=') {
        if (operator && currentInput) {
            // Perform calculation based on the selected operator
            switch (operator) {
                case '+':
                    result += parseFloat(currentInput);
                    break;
                case '-':
                    result -= parseFloat(currentInput);
                    break;
                case '*':
                    result *= parseFloat(currentInput);
                    break;
                case '/':
                    result /= parseFloat(currentInput);
                    break;
            }
            result = result % 1 !== 0 ? parseFloat(result.toFixed(4)) : result;
            updateDisplay(result);
            // Reset input and operator for next calculation
            currentInput = '';
            operator = null;
        }
    }
    // Clear all inputs when "C" is pressed
    else if (input.toUpperCase() === 'C') {
        currentInput = '';
        operator = null;
        result = 0;
        updateDisplay('0');
    }
};

/**
 * Event listener for calculator buttons to process input based on the data-value attribute
 */
buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        handleInput(e.target.getAttribute('data-value'));
    });
});

/**
 * Event listener for keyboard input to allow interaction using the keyboard
 */
window.addEventListener('keydown', (e) => {
    const key = e.key;
    // Handle numeric and function keys for calculator
    if (
        !isNaN(key) ||
        [
            '*',
            '-',
            '+',
            '/',
            '.',
            '=',
            'Enter',
            'Backspace',
            'c',
            'C',
            'Escape',
        ].includes(key)
    ) {
        // Convert Enter key to "=" input
        if (key === 'Enter') {
            handleInput('=');
        }
        // Convert Backspace and Escape keys to "C" input for clear
        else if (key === 'Backspace' || key === 'Escape') {
            handleInput('C');
        }
        // Handle other keys directly
        else {
            handleInput(key);
        }
    }
});
