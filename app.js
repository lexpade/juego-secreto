let numeroSecreto = 0;
let maximoDeIntentos = 6;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 50;

//implementamos el número máximo permitido en la caja de input
document.getElementById('valorUsuario').setAttribute('max', numeroMaximo);

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento() {
    //
    if (document.getElementById('valorUsuario').value == "") {
        return;
    }

    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p', `Acertaste el número en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`);
        removerAtributoBoton();
    } else {
        //El usuario no acertó.
        //comprueba el maximo de intentos
        if (maximoDeIntentos === intentos) {
            asignarTextoElemento('p', `Completaste los ${intentos} intentos `);
            removerAtributoBoton();
            cambiarBotonEstado('#intentar');
            return;
        } else {
            if (numeroDeUsuario > numeroSecreto) {
                asignarTextoElemento('p', 'El número secreto es menor');
            } else {
                asignarTextoElemento('p', 'El número secreto es mayor');
            }
            intentos++;
            limpiarCaja();
        }
    }
    return;
}
//modifica el estado de los botones
function cambiarBotonEstado(nombre) {
    document.querySelector(nombre).setAttribute('disabled', 'true');
}

function removerAtributoBoton() {
    document.getElementById('reiniciar').removeAttribute('disabled');
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto() {
    //Si ya sorteamos todos los números
    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles');
        cambiarBotonEstado('#intentar');
        cambiarBotonEstado('#reiniciar');
    } else {
        let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
        //Si el numero generado está incluido en la lista 
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            console.log(numeroGenerado);
            console.log(listaNumerosSorteados);
            return numeroGenerado;
        }
    }
}

function iniciarJuego() {
    asignarTextoElemento('h1', 'Juego del número secreto!');
    //Indicar mensaje de intervalo de números 
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}`);
    //limpiar caja
    limpiarCaja();
    //Deshabilitar el botón de nuevo juego antes de numeroSecreto
    //document.querySelector('#reiniciar').setAttribute('disabled','true');
    cambiarBotonEstado('#reiniciar', 'true');
    //Generar el número aleatorio
    numeroSecreto = generarNumeroSecreto();
    //Inicializar el número intentos
    intentos = 1;
}
iniciarJuego();