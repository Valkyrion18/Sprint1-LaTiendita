import cargarDatosURL from './obtenerDatosGlobales.js'
import { conteoCompras } from './obtenerDatosGlobales.js'

// Funcion que agrega un producto al carrito de compras y valida su disponibilidad

export async function agregarProducto(idImagenAdd) {

    const data = await cargarDatosURL()
    const elementoBuscado = data.find(list => list.id === idImagenAdd)

    if (elementoBuscado.cantidad === 0) {
        alert('Este producto no se encuentra disponible')
    }
    else {

        if (elementoBuscado.cantidad >= 1 && elementoBuscado.cantidad <= 10) {
            alert('¡Producto próximo a agotarse!\n\nQuedan ' + elementoBuscado.cantidad + ' unidades')
        }
        data.forEach((prenda, index) => {
            const { id, precio } = prenda;
            if (idImagenAdd === id) {
                document.getElementById(`btnAgregar${id}`).disabled = true
                conteoCompras[index][1] = 1;
                const valor = JSON.parse(localStorage.getItem('Total'))
                valor.suma += precio
                localStorage.setItem('Total', JSON.stringify(valor))

            }
        })
    }
}