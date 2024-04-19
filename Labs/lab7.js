let currentInput = '';
let previousInput = '';
let currentOperation = null;
let activeMode = 'calculator'; // Track the active mode
const display = document.getElementById('display');


document.getElementById('unit-input').addEventListener('click', function() {
    activeMode = 'unit';
});

document.getElementById('currency-input').addEventListener('click', function() {
    activeMode = 'currency';
});
document.getElementById('pkr-input').addEventListener('click', function() {
    activeMode = 'pkr';
});


function appendNumber(number) {
    if (activeMode === 'calculator' || activeMode === 'scientific' ){
        if (display.innerText === '0' || currentInput === '') resetScreen();
        if (currentOperation && previousInput === '') {
            previousInput = currentInput;
            currentInput = '';
        }
        currentInput += number;
        display.innerText = currentInput;
    }
    else {
        
        appendNumberToConversionField(number);
    }
}

function setOperation(operator) {
    if (activeMode === 'calculator') {
        if (currentOperation !== null) calculateResult();
        previousInput = display.innerText;
        currentOperation = operator;
        currentInput = '';
    }
}

function clearDisplay() {
    display.innerText = '0';
    currentInput = '';
    previousInput = '';
    currentOperation = null;
    if (activeMode !== 'calculator') {
        document.getElementById(activeMode === 'unit' ? 'unit-input' : 'currency-input').value = '';
    }
    else {
        
        clearConversionField();
    }
}

function calculateResult() {
    if (activeMode === 'calculator' && currentOperation !== null) {
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        if (isNaN(prev) || isNaN(current)) return;
        switch (currentOperation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                if (current === 0) {
                    alert("You can't divide by 0!");
                    return;
                }
                result = prev / current;
                break;
            default:
                return;
        }
        display.innerText = result.toString();
        currentOperation = null;
        currentInput = result.toString();
        previousInput = '';
    }
}

function resetScreen() {
    if (activeMode === 'calculator') {
        currentInput = '';
        display.innerText = '0';
    }
}

function toggleMenu() {
    const submenu = document.getElementById('submenu');
    submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
}



function enableCurrencyConversion() {
    clearDisplay();
    activeMode = 'currency';
    document.getElementById('currency-conversion').style.display = 'block';
    document.getElementById('unit-conversion').style.display = 'none';
}



function performUnitConversion() {
    const input = document.getElementById('unit-input');
    const unitType = document.getElementById('unit-type').value;
    const resultDiv = document.getElementById('unit-conversion-result');
    const amount = parseFloat(input.value);
    
    if (!isNaN(amount)) {
        let result;
        switch (unitType) {
            case 'feet':
                result = amount * 3.28084; // Meters to feet
                break;
            case 'centimeters':
                result = amount * 100; // Meters to centimeters
                break;
            
            default:
                resultDiv.innerText = 'Please select a unit for conversion.';
                return;
        }
        resultDiv.innerText = `${amount} meters is approximately ${result.toFixed(2)} ${unitType}.`;
    } else {
        resultDiv.innerText = 'Please enter a valid number for conversion.';
    }
}

function performCurrencyConversion(toCurrency) {
    const input = document.getElementById('currency-input');
    const resultDiv = document.getElementById('currency-conversion-result');
    const amount = parseFloat(input.value);

    if (!isNaN(amount)) {
        let result;
        if (toCurrency === 'EUR') {
            const conversionRate = 0.93; // conversion rate for USD to EUR
            result = amount * conversionRate;
            resultDiv.innerText = `${amount} USD is approximately ${result.toFixed(2)} EUR.`;
        } else if (toCurrency === 'PKR') {
            const conversionRateToPKR = 160; // conversion rate for USD to PKR
            result = amount * conversionRateToPKR;
            resultDiv.innerText = `${amount} USD is approximately ${result.toFixed(2)} PKR.`;
        }
    } else {
        resultDiv.innerText = 'Please enter a valid amount for conversion.';
    }
}

function enablePKRConversion() {
    clearDisplay();
    activeMode = 'pkr';
    document.getElementById('pkr-conversion').style.display = 'block';
    document.getElementById('currency-conversion').style.display = 'none';
    document.getElementById('unit-conversion').style.display = 'none';
}


function clearConversionField() {
    const conversionFields = {
        'unit': document.getElementById('unit-input'),
        'currency': document.getElementById('currency-input'),
        'pkr': document.getElementById('pkr-input')
    };
    const inputField = conversionFields[activeMode];
    if (inputField) {
        inputField.value = '';
    }
}


function appendNumberToConversionField(number) {
    const conversionFields = {
        'unit': document.getElementById('unit-input'),
        'currency': document.getElementById('currency-input'),
        'pkr': document.getElementById('pkr-input')
    };
    const inputField = conversionFields[activeMode];
    if (inputField) {
        inputField.value = inputField.value + number;
    }
}


function performUnitConversion() {
    const input = document.getElementById('unit-input');
    const unitType = document.getElementById('unit-type').value;
    const resultDiv = document.getElementById('unit-conversion-result');
    const amount = parseFloat(input.value);

    if (!isNaN(amount)) {
        let result;
        switch (unitType) {
            case 'feet':
                result = amount * 3.28084; // Meters to feet
                break;
            case 'inches':
                result = amount * 39.3701; // Meters to inches
                break;
       
            default:
                resultDiv.innerText = 'Please select a unit for conversion.';
                return;
        }
        resultDiv.innerText = `${amount} meters is approximately ${result.toFixed(2)} ${unitType}.`;
    } else {
        resultDiv.innerText = 'Please enter a valid number for conversion.';
    }
}




function enableUnitConversion() {
    clearDisplay();
    activeMode = 'unit';
    document.getElementById('unit-conversion').style.display = 'block';
    document.getElementById('currency-conversion').style.display = 'none';
  
}

// Function to clear the input fields
function clearConversionField() {
    // Clear unit conversion input
    document.getElementById('unit-input').value = '';
    // Clear currency conversion input
    document.getElementById('currency-input').value = '';
    // Update result displays if necessary
    document.getElementById('unit-conversion-result').innerText = '';
    document.getElementById('currency-conversion-result').innerText = '';
}


function clearDisplay() {
    if (activeMode === 'calculator') {
        // Clear the calculator display
        display.innerText = '0';
        currentInput = '';
        previousInput = '';
        currentOperation = null;
    } else {
        // Clear conversion fields
        clearConversionField();
    }
}


function enableScientificMode() {
    clearDisplay();
    activeMode = 'scientific';
    document.getElementById('scientific-mode').style.display = 'block';
    document.getElementById('currency-conversion').style.display = 'none';
    document.getElementById('unit-conversion').style.display = 'none';
    
   
}

function performScientificOperation(operation) {
    const current = parseFloat(currentInput);
    if (isNaN(current)) {
        alert("Please enter a valid number.");
        return;
    }

    let result;
    switch (operation) {
        case 'sqrt':
            result = Math.sqrt(current);
            break;
        case 'pow':
            
            let exponent = parseFloat(prompt("Enter the exponent value:", "2"));
            result = Math.pow(current, exponent);
            break;
        case 'log':
            result = Math.log(current);
            break;
        case 'sin':
            result = Math.sin(current * Math.PI / 180); // Convert to radians if needed
            break;
        case 'cos':
            result = Math.cos(current * Math.PI / 180); // Convert to radians if needed
            break;
        case 'tan':
            result = Math.tan(current * Math.PI / 180); // Convert to radians if needed
            break;
   
        default:
            alert("Operation not recognized!");
            return;
    }

    display.innerText = result.toString();

    currentInput = result.toString();
}
