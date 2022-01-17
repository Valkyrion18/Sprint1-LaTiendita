import { agregarProducto } from './agregarDesdePagina.js'
import { mostrarElementos } from './main.js'

// Evento que permite agregar un carrito al Producto al presionar el boton de Agregar de cada producto 

export function eventosPaginaPrincipal() {

    mostrarElementos.addEventListener('click', (e) => {
        if (e.target.innerHTML === "Agregar") {
            let idConvertido = e.target.id.replace(/[^0-9]/ig, "") // Elimina los caracteres alfabéticos de un String y solo deja los numeros 
            agregarProducto(Number(idConvertido))
        }
    })
}