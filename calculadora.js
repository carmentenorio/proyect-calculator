const pantalla = document.querySelector("#pantalla");
const botones = document.querySelectorAll(".botones button");

let operando1 = "";
let operando2 = "";
let operador = "";
let resultado = "";
let escribiendoPrimero = true;

botones.forEach(boton => {
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
        case "+": return a + b;
        case "-": return a - b;
        case "*": return a * b;
        case "/": return b !== 0 ? a / b : "Error";
    }
}
