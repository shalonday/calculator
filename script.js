function operate(operand1, operand2, operator) {
  switch (operator) {
    case "+": return add(operand1, operand2);
    case "-": return subtract(operand1, operand2);
    case "*": return multiply(operand1, operand2);
    case "/": return divide(operand1, operand2);
  }
}

function add(a, b) {
  return +a + +b;
}

function subtract(a, b) {
  return +a - +b;
}

function divide(a, b) {

  return +a / +b;
}

function multiply(a, b) {

  return +a * +b;
}

function roundEightDigits(n) {
  let digits = n.replace('.', '').length;
  if (digits >= 8) {
    let num = +n;
    return num.toPrecision(8);
  }
  return n;
}

function onNumClick(e) {
  if ((operand1 && operator && (lastButton == "+" || lastButton == "*" || lastButton == "/" || lastButton == "-")) || lastButton == "=" || display.textContent.includes('ILLEGAL!'))
    display.textContent = "";
  display.textContent += this.textContent;
  lastButton = this.textContent;
}

function onOpClick(e) {
  if (display.textContent.length) {
    //if = sign, display a result such that all operand variables become empty
    if (this.textContent == "=" && operator.length && operand1.length) {
      operand2 = display.textContent;
      if (+operand2 == 0 && operator == "/") { // dividing by 0
        display.textContent = "ILLEGAL!";

      } else {
        result = operate(operand1, operand2, operator) + "";
        display.textContent = roundEightDigits(result);
      }
      operand1 = "";
      operand2 = "";
      operator = "";
      console.log("A");
    }

    //catch repetitive operator press
    else if (lastButton == "+" || lastButton == "*" || lastButton == "/" || lastButton == "-") {
      operator = this.textContent;
      console.log("B");
    }

    //if there's already an operand-operator set, 
    else if (operator.length && operand1.length) {
      operand2 = display.textContent; //save the displayed number into operand2 then operate:
      if (+operand2 == 0 && operator == "/") { // dividing by 0
        display.textContent = "ILLEGAL!";
        operand1 = "";
        operand2 = "";
        operator = "";

      } else {
        operand1 = operate(operand1, operand2, operator) + ""; //set the result to operand1 to allow chaining
        display.textContent = roundEightDigits(operand1);
        operand2 = "";
      }
      console.log("C");
    }

    //typing operator after a number for the first time saves number into operand1
    else if (!operand1.length) {
      operand1 = display.textContent;
      console.log("D");
    }

    //don't save = into operator.
    if (this.textContent != "=" && display.textContent != "ILLEGAL!") {
      operator = this.textContent;
    }
    console.log("operand1: " + operand1 + "operator: " + operator + "Operand2: " + operand2);

  }
  lastButton = this.textContent;

}


function onDecimalClick(e) {
  if (!display.textContent.includes("."))
    display.textContent += ".";

  lastButton = this.textContent;
}

function onClrClick(e) {
  operand1 = "";
  operand2 = "";
  operator = "";
  result = "";
  display.textContent = "";
}

function onBackspaceClick(e) {

  if (display.textContent.length && lastButton != "=") {
    if ((!operand1.length && !operator.length) || (operand1.length && operator.length)) { //if (future operand1) || (future operand2)
      display.textContent = display.textContent.slice(0, display.textContent.length - 1);
    }
  }
}

window.addEventListener('keypress', function (e) {
  const key = document.querySelector(`button[data-key='${e.keyCode}']`);
  key.click();
});

window.addEventListener('keydown', function (e) { //for backspace button, since no keyCode appears as keypress for it.
  const key = document.querySelector(`button[data-key='${e.keyCode}']`);
  if (e.keyCode == 8) {
    key.click();
  }
});

const nums = document.querySelectorAll('.num');
nums.forEach(num => num.addEventListener('click', onNumClick));

const ops = document.querySelectorAll('.operator');
ops.forEach(op => op.addEventListener('click', onOpClick));

const clr = document.querySelector('#clear');
clr.addEventListener('click', onClrClick);

const decimal = document.querySelector('#decimal');
decimal.addEventListener('click', onDecimalClick);

const backspace = document.querySelector('#backspace');
backspace.addEventListener('click', onBackspaceClick);

const display = document.querySelector('#display');
let operand1 = "";
let operand2 = "";
let operator = "";
let result = "";
let lastButton = "";