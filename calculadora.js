const pantalla = document.querySelector("#pantalla");
const botones = document.querySelectorAll(".botones button");

/*let operando1 = "";
let operando2 = "";
let operador = "";
let resultado = "";
let escribiendoPrimero = true;

botones.forEach((boton) => {
  boton.addEventListener("click", () => {
    const valor = boton.textContent;

    if (valor === "C") {
      operando1 = operando2 = operador = "";
      pantalla.value = "";
      escribiendoPrimero = true;
    } else if (["+", "-", "*", "/"].includes(valor)) {
      operador = valor;
      escribiendoPrimero = false;
      pantalla.value += valor;
    } else if (valor === "=") {
      resultado = operar(operando1, operador, operando2);
      pantalla.value = resultado;
      operando1 = resultado;
      operando2 = "";
      escribiendoPrimero = true;
    } else {
      if (escribiendoPrimero) {
        operando1 += valor;
      } else {
        operando2 += valor;
      }
      pantalla.value += valor;
    }
  });
});


function operar(a, operador, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  switch (operador) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return b !== 0 ? a / b : "Error";
  }
}

*/

for (let i = 0; i < botones.length; i++) {
  botones[i].addEventListener("click", function () {
    const valor = botones[i].textContent;

    if (valor === "C") {
      pantalla.value = "";
    } else if (valor === "DEL") {
      pantalla.value = pantalla.value.slice(0, -1);
      
    } else if (valor === "=") {
      const expresion = pantalla.value;
      const resultado = calcularExpresion(expresion);
      pantalla.value = resultado;
    } else {
      pantalla.value += valor;
    }
  });
}

//Función para calcular expresiones largas respetando precedencia del signo
function calcularExpresion(expr) {
  // toquenizar la expresion, separar números y operadores
  let tokens = expr.match(/\d+(\.\d+)?|[+\-*/]/g);
  console.log(tokens);

  if (!tokens) return "Error";

  // Resolver * y /
  for (let i = 0; i < tokens.length; i++) {
    console.log(tokens[i]);
    if (tokens[i] === "*" || tokens[i] === "/") {
      console.log(tokens[i]);
      let a = parseFloat(tokens[i - 1]);
      console.log(a);
      let b = parseFloat(tokens[i + 1]);
      console.log(b);
      let res = tokens[i] === "*" ? a * b : a / b;
      tokens.splice(i - 1, 3, res); // Reemplaza a, operador, b por res
      i--; // Retrocede para seguir evaluando
    }
  }

  // Resolver + y -
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i] === "+" || tokens[i] === "-") {
      let a = parseFloat(tokens[i - 1]);
      let b = parseFloat(tokens[i + 1]);
      let res = tokens[i] === "+" ? a + b : a - b;
      tokens.splice(i - 1, 3, res);
      i--;
    }
  }

  return tokens[0]; // El único elemento restante es el resultado
}
