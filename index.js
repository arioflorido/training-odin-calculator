/**
 * ============================
 *  Calculator Class
 * ============================
 */
class Calculator {
  /**
   * Creates a new Calculator.
   * @param {HTMLElement} displayElement - The DOM element where results are shown.
   */
  constructor(displayElement) {
    this.displayElement = displayElement;
    this.num1 = undefined;
    this.num2 = undefined;
    this.operand = undefined;
    this.displayFromOperation = false;
  }

  /** --------------------
   *  Core Math Functions
   * -------------------- */

  add(a, b) {
    return a + b;
  }
  subtract(a, b) {
    return a - b;
  }
  multiply(a, b) {
    return a * b;
  }
  divide(a, b) {
    if (b === 0) {
      console.error("Err: Cannot divide by zero!");
      return "Error";
    }
    return a / b;
  }

  /**
   * Perform an operation based on the operand.
   * @param {number} a
   * @param {number} b
   * @param {string} operand - One of "+", "-", "x", "/"
   * @returns {number|string|undefined}
   */
  operate(a, b, operand) {
    switch (operand) {
      case "+":
        return this.add(a, b);
      case "-":
        return this.subtract(a, b);
      case "x":
        return this.multiply(a, b);
      case "/":
        return this.divide(a, b);
      default:
        console.error(`Unknown operation: '${operand}'`);
        return undefined;
    }
  }

  /** --------------------
   *  Display Helpers
   * -------------------- */

  updateDisplay(value) {
    this.displayElement.textContent = String(value);
    console.log(`New display: ${this.displayElement.textContent}`);
  }

  getDisplay() {
    return String(this.displayElement.textContent);
  }

  clearDisplay() {
    this.displayElement.textContent = "";
  }

  stringHasDecimal(str) {
    return str.includes(".");
  }

  /** --------------------
   *  State Management
   * -------------------- */

  clearAll() {
    this.num1 = undefined;
    this.num2 = undefined;
    this.operand = undefined;
    this.clearDisplay();
  }

  /** --------------------
   *  Event Handlers
   * -------------------- */

  handleNumberInput(value) {
    if (this.displayFromOperation) {
      this.clearDisplay();
      this.displayFromOperation = false;
    }
    const current = this.getDisplay();
    this.updateDisplay(current + value);
  }

  handleDecimalInput(value) {
    if (this.displayFromOperation) {
      this.clearDisplay();
      this.displayFromOperation = false;
    }
    const current = this.getDisplay() || "0";
    if (!this.stringHasDecimal(current)) {
      this.updateDisplay(current + value);
    }
  }

  handleOperandInput(newOperand) {
    const currentValue = Number(this.getDisplay());

    if (this.operand && this.num1 !== undefined) {
      // Perform previous operation before assigning new operand
      this.num2 = currentValue;
      const result = this.operate(this.num1, this.num2, this.operand);

      this.updateDisplay(result);
      this.num1 = result;
      this.num2 = undefined;
    } else {
      this.num1 = currentValue;
    }

    this.operand = newOperand;
    this.displayFromOperation = true;
  }

  handleEquals() {
    const currentValue = Number(this.getDisplay());

    if (!this.displayFromOperation && this.operand && this.num1 !== undefined) {
      this.num2 = currentValue;
      const result = this.operate(this.num1, this.num2, this.operand);

      this.updateDisplay(result);
      this.displayFromOperation = true;

      // Reset state
      this.num1 = undefined;
      this.num2 = undefined;
      this.operand = undefined;
    }
  }

  handleBackspace() {
    const current = this.getDisplay();
    if (current) {
      this.updateDisplay(current.slice(0, -1));
    }
  }
}

/**
 * ============================
 *  App Setup
 * ============================
 */
const display = document.querySelector("div.display");
const calculator = new Calculator(display);

// Clear button
document
  .querySelector("button.clearButton")
  .addEventListener("click", () => calculator.clearAll());

// Numeric buttons
document
  .querySelectorAll("button.numeric")
  .forEach((btn) =>
    btn.addEventListener("click", () =>
      calculator.handleNumberInput(btn.textContent)
    )
  );

// Decimal button
document
  .querySelector("button.decimal")
  .addEventListener("click", () => calculator.handleDecimalInput("."));

// Operand buttons (+, -, x, /)
document
  .querySelectorAll("button.operand")
  .forEach((btn) =>
    btn.addEventListener("click", () =>
      calculator.handleOperandInput(btn.textContent)
    )
  );

// Equals (=) button
document
  .querySelector("button.operate")
  .addEventListener("click", () => calculator.handleEquals());

// Backspace button
document
  .querySelector("button.backspace")
  .addEventListener("click", () => calculator.handleBackspace());

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
// 5) Add keyboard support!
// 6) unit tests?
