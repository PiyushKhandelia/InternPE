document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    let displayValue = '123';

    function updateDisplay() {
        display.innerText = displayValue;
    }

    function clear() {
        displayValue = '0';
    }

    function deleteLast() {
        displayValue = displayValue.slice(0, -1) || '0';
    }

    function appendNumber(number) {
        if (displayValue === '0' && number !== '.') {
            displayValue = number;
        } else {
            displayValue += number;
        }
    }

    function appendOperator(operator) {
        if (/[+\-*/]$/.test(displayValue)) {
            displayValue = displayValue.slice(0, -1) + operator;
        } else {
            displayValue += operator;
        }
    }

    function calculate() {
        try {
            displayValue = eval(displayValue).toString();
        } catch {
            displayValue = 'Error';
        }
    }

    document.querySelector('.buttons').addEventListener('click', function (event) {
        const target = event.target;
        if (!target.classList.contains('btn') && !target.classList.contains('btns')) return;

        switch (target.id) {
            case 'clear':
                clear();
                break;
            case 'delete':
                deleteLast();
                break;
            case 'equals':
                calculate();
                break;
            case 'decimal':
                appendNumber('.');
                break;
            case 'add':
            case 'subtract':
            case 'multiply':
            case 'divide':
                appendOperator(target.innerText);
                break;
            default:
                appendNumber(target.innerText);
        }
        updateDisplay();
    });

    document.addEventListener('keydown', function (event) {
        if (event.key >= '0' && event.key <= '9') {
            appendNumber(event.key);
        } else if (event.key === '.') {
            appendNumber('.');
        } else if (event.key === '+') {
            appendOperator('+');
        } else if (event.key === '-') {
            appendOperator('-');
        } else if (event.key === '*') {
            appendOperator('*');
        } else if (event.key === '/') {
            appendOperator('/');
        } else if (event.key === 'Enter' || event.key === '=') {
            calculate();
        } else if (event.key === 'Backspace') {
            deleteLast();
        } else if (event.key === 'Escape') {
            clear();
        }
        updateDisplay();
    });
});