// FUncion mediante la cual se realiza la vaidacion de los datos de la tarjeta de Credito

export function informacionTarjeta() {

    const formulario = document.querySelector('#formulario-tarjeta'),
        logoMarca = document.querySelector('#logo-marca')

    // * Creacion listado del mes generado dinamicamente.

    if (formulario.selectMes.length == 1) {
        for (let i = 1; i <= 12; i++) {
            let opcion = document.createElement('option');
            opcion.value = i;
            opcion.innerText = i;
            formulario.selectMes.appendChild(opcion);
        }
    }
    // * Creacion listado del año generado dinamicamente.

    const yearActual = new Date().getFullYear();
    if (formulario.selectYear.length == 1) {
        for (let i = yearActual; i <= yearActual + 8; i++) {
            let opcion = document.createElement('option');
            opcion.value = i;
            opcion.innerText = i;
            formulario.selectYear.appendChild(opcion);
        }
    }

    // * Validacion numero de tarjeta

    formulario.inputNumero.addEventListener('keyup', (e) => {
        let valorInput = e.target.value;

        formulario.inputNumero.value = valorInput
            // Eliminamos espacios en blanco
            .replace(/\s/g, '')
            // Eliminar las letras
            .replace(/\D/g, '')
            // Ponemos espacio cada cuatro numeros
            .replace(/([0-9]{4})/g, '$1 ')
            // Elimina el ultimo espaciado
            .trim();

        if (valorInput[0] == 4) {
            logoMarca.innerHTML = '';
            const imagen = document.createElement('img');
            imagen.src = './images/logos/visa.png';
            logoMarca.appendChild(imagen);

        } else if (valorInput[0] == 5) {
            logoMarca.innerHTML = '';
            const imagen = document.createElement('img');
            imagen.src = './images/logos/mastercard.png';
            logoMarca.appendChild(imagen);
        }
        else {
            logoMarca.innerHTML = ''
        }
    });

    // * Validacion de CCV

    formulario.inputCCV.addEventListener('keyup', (e) => {
        let valorInput = e.target.value;

        formulario.inputCCV.value = valorInput
            // Eliminar los espacios
            .replace(/\s/g, '')
            // Eliminar las letras
            .replace(/\D/g, '');

     });

}
