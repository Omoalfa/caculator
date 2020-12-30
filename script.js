const input = [] //operand 1
const operator = [] //operator
const operand = []  //operand 2
const toSolve = [] 

// Clear memory function

const clear = ()=> {
    const resultScreen = document.querySelector('.result-screen');
    const inputScreen = document.querySelector('.input-screen');
    inputScreen.classList.remove('display-result');
    console.log(inputScreen.classList)
    resultScreen.textContent = '';
    input.length = 0;
    operator.length = 0;
    operand.length = 0;
    displayValue();
}

//And here goes the logic

const operate = (x, func, y) => {
    x = Number(x);
    y = Number(y);
    const add = (a, b) => {
        return a +b;
    }
    
    const subtract = (a, b) => {
        return a - b;
    }
    
    
    const multiply = (a, b) => {
        
        return a * b;
    };
    const divide = (a, b) => {
        if (b === 0) {
            return 'Maths Error'
        }
        return a / b;
    }    
    const power = (a, b) => {
        return a ** b;
    }
    
    const factorial = (n) => {
        let factorial = 1;
        for (i = n; i > 0; i--) {
            factorial = factorial * i
        };
        return factorial;
    }

    switch (func) {
        case "+":
            return add(x, y);
        case "-":
            return subtract(x, y);
        case "*":
            return multiply(x, y);
        case "/":
            return divide (x, y);
        case '!':
            return factorial(x);
        case '^':
            return power(x, y);
    }
    
}

// Display the result

const displayResult = (a, func, b) => {
    const result = operate(a, func, b);
    const resultScreen = document.querySelector('.result-screen');
    const inputScreen = document.querySelector('.input-screen');

    inputScreen.classList.add('display-result');
    resultScreen.textContent = result;
}

// Send value to display to screen and store in memory for calculation

const displayValue = () => {
    const screen = document.querySelector('.input-screen');
    const onScreen = [input.toString().replaceAll(',', ''), operator.toString(), operand.toString().replaceAll(',','')]
    for (let i = 0; i < onScreen.length; i++) {
        toSolve[i] = onScreen[i];
    }
    screen.textContent = onScreen.toString().replaceAll(',', '');
    console.log(screen.textContent);
    console.log(toSolve);
};

// Remove button transitions

const removeTransition = (e) => {
    if (e.propertyName !== 'transform') return;

    e.target.classList.remove('keypress');
};

// save input values for print

const saveInput = (e) => {
    const inputScreen = document.querySelector('.display-result');
    if (inputScreen) { 
        clear();

    }
    if (operator[0] === '!') return;
    const key = document.querySelector(`li[data-key="${e.keyCode}"]`);
    const value = e.keyCode ? key.textContent : e.target.textContent
    
    if (operator.length === 0) {
        input.push(value);
    } else {
        operand.push(value)
    }
}

// Handle keypad press input

const pressedKey = (e) => {
    const key = document.querySelector(`li[data-key="${e.keyCode}"]`);
    if (!key) return;
    key.classList.add('keypress')
    if (!key.classList.contains('operator')) {
        if (!key.classList.contains('equals')) {
            //handle number key press
            saveInput(e); 
            displayValue();
        } else {
            displayResult(...toSolve)
        } 
    } else {
        if (input.length === 0) return;
        if (operator.length === 1) return;
        console.log(e) //handle operator key press
        operator.push(e.key);
        displayValue()
    }
    
};

window.addEventListener('keypress', pressedKey);

//keypad click handler//
const keys = document.querySelectorAll('.keys');

keys.forEach(key => {
    key.addEventListener('transitionend', removeTransition);
    key.addEventListener('click', (e) => {
        e.target.classList.add('keypress')
        if(!e.target.classList.contains('operator')) {
            if (!e.target.classList.contains('equals')) {
                if(!e.target.classList.contains('edit')) {
                    saveInput(e); 
                    displayValue();
                } else {
                    clear();
                }
            } else {
                displayResult(...toSolve)
            }
        } else {
            //handle operator key click
            if (input.length === 0) return;
            if (operator.length === 1) return;
            if (e.target.textContent === 'X!') {
                operator.push('!')
                displayValue()
            } else if (e.target.textContent.length > 1) {
                operator.push('^')
                displayValue()
            } else {
                operator.push(e.target.textContent)
                displayValue()
            }  
        }
    })
});





