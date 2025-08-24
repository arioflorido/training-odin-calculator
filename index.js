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
  try {
    if (num2 == 0) {
      throw "Err: Any number can't be divided by zero!";
    }
    return num1 / num2;
  } catch (err) {
    console.log(err);
    return err;
  }
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
  clearDisplayContents();
}

let num1;
let num2;
let toggleInputToNum2 = false;
let operand;
const display = document.querySelector("div.display");
const clearButton = document.querySelector("button.clearButton");
clearButton.addEventListener("click", clear);

function updateDisplayContents(arg) {
  display.textContent = String(arg);
  console.log(`New display: ${display.textContent}`);
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
    const displayContents = Number(getDisplayContents());
    console.log(`Pressed operand '${operandButton.textContent}'`);

    // if operand was pressed while an operand already exists...
    if (Boolean(operand)) {
      // if num1 and num2 exists, perform operation based on the existing operand
      // then assign new operand
      if (Boolean(displayContents)) {
        num2 = displayContents;
      }
      if (Boolean(num1) && Boolean(num2)) {
        const result = operate(num1, num2, operand);
        updateDisplayContents(result);
        num1 = result;
        num2 = undefined;
        operand = operandButton.textContent;
        clearDisplayContents();
        return;
      }
    } else {
      if (!Boolean(num1)) {
        num1 = displayContents;
        clearDisplayContents();

        // Only record operand when num1 is defined
        operand = operandButton.textContent;
        console.log(`Operand: ${operand}`);
      } else {
        console.log("WORK IN PROGRESS");
      }
    }
  })
);

const operateButton = document.querySelector("button.operate");
operateButton.addEventListener("click", () => {
  const displayContents = getDisplayContents();
  if (Boolean(displayContents)) {
    num2 = Number(displayContents);
    toggleInputToNum2 = false;

    const result = operate(num1, num2, operand);
    updateDisplayContents(result);
    num1 = undefined;
    num2 = undefined;
  }
});

const backspaceButton = document.querySelector("button.backspace");
backspaceButton.addEventListener("click", () => {
  const displayContents = getDisplayContents();

  if (!Boolean(displayContents)) return;

  updateDisplayContents(
    displayContents.substring(0, displayContents.length - 1)
  );
});
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
// 4) convert all of this into a Calculator Class
// 5) When a result is displayed, pressing a new digit should clear the result and start a new calculation instead of appending the digit to the existing result. Check whether this is the case on your calculator!
// 6) Add keyboard support!
