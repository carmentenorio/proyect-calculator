const pantalla = document.querySelector("#pantalla");
const botones = document.querySelectorAll(".botones button");

let operando1 = "";
let operando2 = "";
let operador = "";
let resultado = "";
let escribiendoPrimero = true;

let historial = [];
let expresion = [];

// Mostrar historial
btnHistorial.addEventListener("click", () => {
  renderizarHistorial();
  contenedorHistorial.style.display = "block";
});

// Ocultar historial
cerrarHistorial.addEventListener("click", () => {
  contenedorHistorial.style.display = "none";
});

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

// Función para realizar la operación
function operar(a, operador, b) {
  a = parseFloat(a);
  b = parseFloat(b);

  let resultado;
  switch (operador) {
    case "+":
      resultado = a + b;
      break;

    case "-":
      resultado = a - b;
      break;

    case "*":
      resultado = a * b;
      break;

    case "/":
      resultado = b !== 0 ? a / b : "Error";
      break;
  }

  if (resultado !== "Error") {
    historial.push(`${a} ${operador} ${b} = ${resultado}`);
  } else {
    historial.push(`${a} ${operador} ${b} = Error (división por 0)`);
  }
  // Renderizar el historial después de cada operación
  console.log(historial);
  console.log("Historial actualizado:", historial);
  // Aquí se llama a la función para renderizar el historial
  // Se actualiza el historial en la pantalla
  // Se limpia la pantalla para mostrar el resultado
  pantalla.value = resultado;
  renderizarHistorial();

  return resultado;
}

function renderizarHistorial() {
  const lista = document.getElementById("historial");
  // se limpia el historial antes de renderizar
  lista.innerHTML = ""; 
  // se recorre el historial y se crea un elemento li por cada operación  
 // se añade el texto de la operación al elemento li y se añade a la lista
 
  if (historial.length === 0) {
    lista.innerHTML = "<li>No hay historial</li>";
    return;
  }

  for (let i = 0; i < historial.length; i++) {
    // Crear un elemento de lista (li)
    const li = document.createElement("li");
    li.textContent = historial[i];
    // Agregar los elementos 'li' a la lista 'ul'
    lista.appendChild(li);
  }
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
