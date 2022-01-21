// Funcion mediante la cual se va a procesar el pago y va a actualizar la Base de Datos de acuerdo a la compra que se haya realizado
import cargarDatosURL from './obtenerDatosGlobales.js'
import { conteoCompras } from './obtenerDatosGlobales.js'

export  async function procesarSolicitudPago(){
    const data = await cargarDatosURL()
    const valor = JSON.parse(localStorage.getItem('Total'))

    alert('El monto total a pagar es de $' + valor.suma + '\n\nGRACIAS POR SU COMPRA')

    conteoCompras.forEach((compra, indice) => {
        if (compra[1] == 1){
            let nuevoValor = data[indice].cantidad - compra[2]
            let resp = fetch(`http://localhost:4000/prendasFP/${compra[0]}`, {
                method: 'PUT',
                body: JSON.stringify({
                    nombre: data[indice].nombre,
                    imagen: data[indice].imagen,
                    precio: data[indice].precio,
                    cantidad: nuevoValor,
                    descripcion: data[indice].descripcion,
                }),
                headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                }
            })
            let datos = resp.json()

        }
    })
    localStorage.removeItem('Total')
    
}