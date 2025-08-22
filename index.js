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
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "x":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
    default:
      console.error(`Unknown '${operand}' operation`);
      return undefined;
  }
}

function stringHasDecimal(str) {
  return str.indexOf(".") != -1;
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

function updateDisplayContents(arg) {
  const num = Number(arg);
  display.textContent = String(arg);
  console.log(`New display contents: ${arg}`);
}

function getDisplayContents() {
  return String(display.textContent);
}

function clearDisplayContents() {
  display.textContent = "";
}

const numericButtons = document.querySelectorAll("button.numeric");
numericButtons.forEach((numericButton) =>
  numericButton.addEventListener("click", () => {
    const displayContent = getDisplayContents();
    if (!stringHasDecimal(displayContent)) {
      updateDisplayContents(Number(displayContent + numericButton.textContent));
    } else {
      updateDisplayContents(displayContent + numericButton.textContent);
    }
  })
);

const decimalButton = document.querySelector("button.decimal");
decimalButton.addEventListener("click", () => {
  const displayContent = getDisplayContents() || "0";
  if (!stringHasDecimal(displayContent)) {
    updateDisplayContents(displayContent + decimalButton.textContent);
  }
});

const operandButtons = document.querySelectorAll("button.operand");
operandButtons.forEach((operandButton) =>
  operandButton.addEventListener("click", () => {
    operand = operandButton.textContent;
    console.log(`Pressed operand '${operand}'`);
    const displayContents = Number(getDisplayContents());
    if (!Boolean(displayContents)) return;

    console.log(`toggleInputToNum2: ${toggleInputToNum2}`);

    // input for num1
    if (!toggleInputToNum2) {
      num1 = displayContents;
      toggleInputToNum2 = true;

      console.log(`num1 captured : ${num1}`);
      clearDisplayContents(); //move somewhere
      return;
    }

    // input for num2
    if (toggleInputToNum2) {
      num2 = displayContents;
      console.log(`num2 captured : ${num2}`);
      if (Boolean(operand)) {
        const result = operate(num1, num2, operand);
        updateDisplayContents(result);
        // num1 = result;
        // console.log(`num1 captured : ${num1}`);
        // num2 = undefined;
        num1 = undefined;
        num2 = undefined;
        toggleInputToNum2 = false;
      }
      //  else {
      //   toggleInputToNum2 = false;
      // }
      operand = operandButton.textContent;
    }
  })
);

const operateButton = document.querySelector("button.operate");
operateButton.addEventListener("click", () => {
  num2 = Number(getDisplayContents());
  toggleInputToNum2 = false;
  if (Boolean(num1) && Boolean(num2) && Boolean(operand)) {
    const result = operate(num1, num2, operand);
    updateDisplayContents(result);
    // num1 = result;
    // console.log(`num1 captured : ${num1}`);
    num1 = undefined;
    num2 = undefined;
  }
});

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

// create separate classes for display, numeric buttons, operands

// logic??
// while true
// accepting input for num1.... if any operand is pressed end loop

// start another loop
// while true
// accepting input for num2... if any operand is pressed, perform operation

//
// while acceptingInputForNum1 and not acceptingInputForNum2
//
//
// while not acceptingInputForNum1 and acceptingInputForNum1
//
//

// TODO
// 1) if display.textContent is from operation
// when user presses any numeric buttons, the display is cleared
// and will consider input as num1.
// 2) after an operation is performed, when '=' is pressed, should
// repeat the same operation using result <operand> num2,
// rather than result <operand> result
// 3) display screen should clear when an input for num2 is provided.
// for example, a user should still be able to see num1 after pressing
// any operand. the display will only be cleared once the user starts
// pressing any numeric button
