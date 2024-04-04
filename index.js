// Object Values
const calculator = {
  displayValue: "0",
  firstDigit: null,
  waitingForSecondDigit: false,
  operator: null,
};

// Update Display
const updateDisplay = () => {
  const display = document.querySelector(".screen");
  display.value = calculator.displayValue;
};

updateDisplay();

// Function to toggle the sign of the displayed number
const toggleSign = () => {
  calculator.displayValue = calculator.displayValue.startsWith("-")
    ? calculator.displayValue.slice(1)
    : "-" + calculator.displayValue;
};

// Handle Key Press
const keys = document.querySelector(".buttons");
keys.addEventListener("click", (event) => {
  const { target } = event;
  if (!target.matches(".buttons input[type='button']")) {
    return;
  }
  if (target.classList.contains("operator")) {
    handleOperator(target.value);
    updateDisplay();
    return;
  }

  if (target.classList.contains("decimal")) {
    inputDecimal(target.value);
    updateDisplay();
    return;
  }
  if (target.classList.contains("all-clear")) {
    resetCalculator();
    updateDisplay();
    return;
  }
  if (target.value === "+/-") {
    toggleSign();
    updateDisplay();
    return;
  }

  inputDigit(target.value);
  updateDisplay();
});

//Input Digit
const inputDigit = (digit) => {
  const { displayValue, waitingForSecondDigit } = calculator;

  if (waitingForSecondDigit === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondDigit = false;
  } else {
    calculator.displayValue =
      displayValue === "0" ? digit : displayValue + digit;
  }
};

//Input Decimal
const inputDecimal = (dot) => {
  if (calculator.waitingForSecondDigit === true) {
    calculator.displayValue = "0.";
    calculator.waitingForSecondDigit = false;
    return;
  }
  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
};

//Handle Operators
const handleOperator = (nextOperator) => {
  const { firstDigit, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForSecondDigit) {
    calculator.operator = nextOperator;
    return;
  }
  if (firstDigit == null && !isNaN(inputValue)) {
    calculator.firstDigit = inputValue;
  } else if (operator) {
    const result = calculate(firstDigit, inputValue, operator);
    calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
    calculator.firstDigit = result;
  }
  calculator.waitingForSecondDigit = true;
  calculator.operator = nextOperator;
};

// calculator logic
const calculate = (firstDigit, secondDigit, operator) => {
  if (operator === "+") {
    return firstDigit + secondDigit;
  } else if (operator === "-") {
    return firstDigit - secondDigit;
  } else if (operator === "*") {
    return firstDigit * secondDigit;
  } else if (operator === "/") {
    return firstDigit / secondDigit;
  }
  return secondDigit;
};

//Reset Calculator
const resetCalculator = () => {
  calculator.displayValue = "0";
  calculator.firstDigit = null;
  calculator.waitingForSecondDigit = false;
  calculator.operator = null;
};
