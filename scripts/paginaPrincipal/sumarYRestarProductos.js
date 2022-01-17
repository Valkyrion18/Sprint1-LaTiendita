import cargarDatosURL from './obtenerDatosGlobales.js'
import { conteoCompras } from './obtenerDatosGlobales.js'

// Funcion que permite reducir la cantidad de productos a comprar

export async function restarCantidad(idCant) {

    const data = await cargarDatosURL()
    const valor = JSON.parse(localStorage.getItem('Total'))

    const elementoBuscado = conteoCompras.find(list => list[0] === idCant)
    const indice = conteoCompras.indexOf(elementoBuscado)

    if (conteoCompras[indice][2] === 0) {
        document.getElementById(`btnCantR${idCant}`).disabled = true

    } else {
        document.getElementById(`btnCantA${idCant}`).disabled = false
        conteoCompras[indice][2] -= 1
        valor.suma -= data[indice].precio
        localStorage.setItem('Total', JSON.stringify(valor))
        document.getElementById(`cantidadProductos${idCant}`).value = conteoCompras[indice][2]
    }

}

// Funcion que permite aumentar la cantidad de productos a comprar

export async function agregarCantidad(idCant) {

    const data = await cargarDatosURL()
    const valor = JSON.parse(localStorage.getItem('Total'))

    const elementoBuscado = data.find(list => list.id === idCant)
    const indice = data.indexOf(elementoBuscado)

    if (conteoCompras[indice][2] === 10 || conteoCompras[indice][2] === elementoBuscado.cantidad) {
        document.getElementById(`btnCantA${idCant}`).style.display = true

    } else {
        document.getElementById(`btnCantR${idCant}`).disabled = false
        conteoCompras[indice][2] += 1
        valor.suma += data[indice].precio
        localStorage.setItem('Total', JSON.stringify(valor))
        document.getElementById(`cantidadProductos${idCant}`).value = conteoCompras[indice][2]
    }

}