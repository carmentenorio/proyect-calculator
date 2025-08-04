const pantalla = document.querySelector("#screen");
const botones = document.querySelectorAll(".buttons button");

let operating1 = "";
let operating2 = "";
let operator = "";
let result = "";
let writingFirst = true;

let history = [];
let expression = [];

/**Show history*/
btnHistory.addEventListener("click", () => {
  renderHistory();
  containerHistory.style.display = "block";
});

/** Hide history*/
closeHistory.addEventListener("click", () => {
  containerHistory.style.display = "none";
});

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    switch (value) {
      case "C":
        operating1 = operating2 = operator = "";
        screen.value = "";
        writingFirst = true;
        break;

      case "+":
      case "-":
      case "*":
      case "/":
        operator = value;
        writingFirst = false;
        screen.value += value;
        break;

      case "=":
        result = operate(operating1, operator, operating2);
        screen.value = result;
        operating1 = result;
        operating2 = "";
        writingFirst = true;
        break;

      default:
        if (writingFirst) {
          operating1 += value;
        } else {
          operating2 += value;
        }
        screen.value += value;
        break;
    }
  });
});
/**
 * Function to perform the operation between two numbers and an operator, , and updates the history.
 * @param  a 
 * @param  operator 
 * @param  b 
 * @return {number|string} 
 */
function operate(a, operator, b) {
  a = parseFloat(a);
  b = parseFloat(b);

  let result;
  switch (operator) {
    case "+":
      result = a + b;
      break;

    case "-":
      result = a - b;
      break;

    case "*":
      result = a * b;
      break;

    case "/":
      result = b !== 0 ? a / b : "Error";
      break;
  }

  if (result !== "Error") {
    history.push(`${a} ${operator} ${b} = ${result}`);
  } else {
    history.push(`${a} ${operator} ${b} = Error (division by 0)`);
  }
  console.log(history);
  console.log("Updated history:", history);
  screen.value = result;
  renderHistory();
  return result;
}

/** 
* Function to render the operation history
* An li element is created for each operation and added to the list ul
* @param {void}
* @return {void}
*/
function renderHistory() {
  const list = document.getElementById("history");
  list.innerHTML = "";

  if (history.length === 0) {
    list.innerHTML = "<li>There is no history</li>";
    return;
  }

  for (let i = 0; i < history.length; i++) {
    const li = document.createElement("li");
    li.textContent = history[i];
    list.appendChild(li);
  }
}


/**
 * Function that takes an expression as a string, tokenizes it (separates numbers and operators) and evaluates respecting the precedence of the operators.
 * @param expr 
 * @returns 
 */
function calculateExpression(expr) {
  let tokens = expr.match(/\d+(\.\d+)?|[+\-*/]/g);
  console.log(tokens);

  if (!tokens) return "Error";

  for (let i = 0; i < tokens.length; i++) {
    console.log(tokens[i]);
    if (tokens[i] === "*" || tokens[i] === "/") {
      console.log(tokens[i]);
      let a = parseFloat(tokens[i - 1]);
      console.log(a);
      let b = parseFloat(tokens[i + 1]);
      console.log(b);
      let res = tokens[i] === "*" ? a * b : a / b;
      tokens.splice(i - 1, 3, res); 
      i--; 
    }
  }

  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i] === "+" || tokens[i] === "-") {
      let a = parseFloat(tokens[i - 1]);
      let b = parseFloat(tokens[i + 1]);
      let res = tokens[i] === "+" ? a + b : a - b;
      tokens.splice(i - 1, 3, res);
      i--;
    }
  }

  return tokens[0]; 
}
