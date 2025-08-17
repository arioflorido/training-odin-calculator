function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function operate(num1, num2, operand) {
  switch (operand) {
    case "+":
      display.textContent = add(num1, num2);
      break;
    case "-":
      display.textContent = subtract(num1, num2);
      break;
    case "x":
      display.textContent = multiply(num1, num2);
      break;
    case "/":
      display.textContent = divide(num1, num2);
      break;
  }
}

function clear() {
  num1 = undefined;
  num2 = undefined;
  operand = undefined;
  display.textContent = undefined;
}

let num1;
let num2;
let toggleInputToNum2 = false;
let operand;
const display = document.querySelector("div.display");
const clearButton = document.querySelector("button.clearButton");
clearButton.addEventListener("click", clear);

const numericButtons = document.querySelectorAll("button.numeric");
numericButtons.forEach((numericButton) =>
  numericButton.addEventListener("click", () => {
    display.textContent += numericButton.textContent;

    // convert to func for clarity
    if (!!operand && !!num1 && toggleInputToNum2) {
      display.textContent = "";
      display.textContent += numericButton.textContent;
      toggleInputToNum2 = false;
    }
  })
);

const decimalButton = document.querySelector("button.decimal");
decimalButton.addEventListener("click", () => {
  if (display.textContent.indexOf(".") == -1) {
    display.textContent += decimalButton.textContent;
  }
});

const operandButtons = document.querySelectorAll("button.operand");
operandButtons.forEach((operandButton) =>
  operandButton.addEventListener("click", () => {
    if (Boolean(operand) && Boolean(num2)) {
      operate(num1, num2, operand);
    }

    operand = operandButton.textContent;
    num1 = Number(display.textContent);
    toggleInputToNum2 = true;

    console.log(operand);
  })
);

// loop?
// while ....
// === num1
// operator detected
// === num2
// while
//  if operand
//    num2.
//  else
//    num1

// todo
// figure out how to determine and assign values for num1 and num2
