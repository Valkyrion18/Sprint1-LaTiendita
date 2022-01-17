import cargarDatosURL from './obtenerDatosGlobales.js'
import { conteoCompras } from './obtenerDatosGlobales.js'
import { totalAPagar } from './obtenerDatosGlobales.js'
import { mostrarDescripcionVentanaModal } from './mostrarDescripcionProductos.js'
import { restarCantidad } from './sumarYRestarProductos.js'
import { agregarCantidad } from './sumarYRestarProductos.js'
import { eventosPaginaPrincipal } from './eventosMain.js'
import { informacionTarjeta } from './validarTarjeta.js'
import { procesarSolicitudPago } from './procesarPago.js'

// DEFINICION DE VARIABLES
export let mostrarElementos = document.querySelector('.grid-elementos')

const navBar = document.querySelector('.navbar')
let ventanaModal2 = document.querySelector('.modal-body-2')
let ventanaModal3 = document.querySelector('.modal-body-3')
let footerModal2 = document.querySelector('.modal-footer-2')
let procesoPago = document.querySelector('#btnConfirmar')
let buscarPorNombre = document.querySelector('.btnBusqueda')

// DEFINICION DE PROCESOS Y EVENTOS

// Evento mediante el cual se cargan la informacion de los productos

document.addEventListener('DOMContentLoaded', async () => {

    const data = await cargarDatosURL()
    let fragment = document.createDocumentFragment()

    localStorage.setItem('Total', JSON.stringify(totalAPagar)) // Se almacena en el Local Storage la informacion del valor total a pagar

    mostrarElementos.innerHTML = ''

    data.forEach(prenda => {
        const bloque = document.createElement('div')
        bloque.classList.add("card", "m-2")
        bloque.style.width = "18rem"

        const { id, nombre, imagen, precio } = prenda;

        bloque.innerHTML = `
            <img src="${imagen}" class="card-img-top" alt="imagen${id}" id="img${id}" style="cursor:pointer" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <div class="card-body">
                <h5 class="card-title">${nombre}</h5>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Precio/unidad: $ ${new Intl.NumberFormat().format(precio)}</li>
            </ul>
            <div class="card-body">
                <button type="button" class="btn btn-primary w-100" id="btnAgregar${id}")">Agregar</button>
            </div>

        `
        fragment.appendChild(bloque)
        conteoCompras.push([id, 0, 1])
    })
    mostrarElementos.appendChild(fragment)

    mostrarDescripcionVentanaModal()
    eventosPaginaPrincipal()
})


// Funcion que muestra el contenido de la ventana Modal del Carrito de Compras

export async function mostrarVentanaModalCarrito() {
    const data = await cargarDatosURL()
    let fragment = document.createDocumentFragment()
    const valor = JSON.parse(localStorage.getItem('Total'))
    document.getElementById('totalPagar').textContent = 'Monto a pagar: $ ' + new Intl.NumberFormat().format(valor.suma)

    // Validacion para activar o desactivar el boton de Pagar de la ventana modal del Carrito
    if ((conteoCompras.find(list => list[1] == 1) === undefined)) {
        document.getElementById('btnPagar').disabled = true
    }
    else {
        document.getElementById('btnPagar').disabled = false
    }

    ventanaModal2.innerHTML = ''
    data.forEach((producto, indice) => {

        const { id, nombre, imagen, } = producto;

        if (conteoCompras[indice][1] === 1) {
            const bloque = document.createElement('div')
            bloque.classList.add("list-group-item", "d-flex", "justify-content-around")

            bloque.innerHTML = `

            <img src=${imagen} width="50px" id="${id}" alt="imagen ${id}"></img>
            <span class="lead">${nombre}</span>
            <div>
                <button type="button" class="btn btn-ligth w-8" id="btnCantR${id}">-</button>
                <button type="button" class="btn btn-ligth w-8" id="btnCantA${id}">+</button>
                <input type="number" min="1" max="10" step="1" value="${conteoCompras[indice][2]}" 
                id="cantidadProductos${id}" disabled>
            </div>
            <span class="material-icons" style="cursor:pointer">delete</span>

            `
            fragment.appendChild(bloque)
        }
    })
    ventanaModal2.appendChild(fragment)
}

// Evento que permite el despliegue de la ventana Modal del carrito de compras

navBar.addEventListener('click', (e) => {
    if (e.target.id === 'btnCarrito') {
        mostrarVentanaModalCarrito()
    }
})

// Evento que permite buscar un producto por su nombAre

buscarPorNombre.addEventListener('click', async (e) => {
    const data = await cargarDatosURL()
    const searchName = document.getElementById('txtSearch').value

    if (searchName === "") {
        alert("Por favor, introduzca un palabra para realizar la búsqueda")
    }
    else {
        const elementoBuscado = data.find(list => list.nombre.toLowerCase() === searchName.toLowerCase())

        mostrarElementos.innerHTML = ''
        const { id, nombre, imagen, precio } = elementoBuscado

        mostrarElementos.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img src="${imagen}" class="card-img-top" alt="imagen${id}" id="img${id}" style="cursor:pointer" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <div class="card-body">
                    <h5 class="card-title">${nombre}</h5>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Precio/unidad: $ ${new Intl.NumberFormat().format(precio)}</li>
                </ul>
                <div class="card-body">
                    <button type="button" class="btn btn-primary w-100" id="btnAgregar${id}")">Agregar</button>
                </div>
            </div>

        `
    }
})

// Eventos que se generan desde la venta del Carrito de Compras
// * Eliminar un producto 
// * Reducir e incrementar la cantidad de cada producto

ventanaModal2.addEventListener('click', async (e) => {

    const data = await cargarDatosURL()
    const valor = JSON.parse(localStorage.getItem('Total'))

    if (e.target.innerHTML === 'delete') {

        let idElemento = Number(e.path[1].childNodes[1].id)
        let indice;

        const elementoBuscado = data.find(list => list.id === idElemento)
        indice = data.indexOf(elementoBuscado)

        document.getElementById(`btnAgregar${idElemento}`).disabled = false
        conteoCompras[indice][1] = 0;
        document.getElementById(`cantidadProductos${idElemento}`).value = conteoCompras[indice][2]
        valor.suma -= data[indice].precio * conteoCompras[indice][2]
        conteoCompras[indice][2] = 1;
        localStorage.setItem('Total', JSON.stringify(valor))
    }

    if (e.target.innerHTML === "-") {

        let idConvertidoR = e.target.id.replace(/[^0-9]/ig, "")
        restarCantidad(Number(idConvertidoR))
    }

    if (e.target.innerHTML === "+") {

        let idConvertidoS = e.target.id.replace(/[^0-9]/ig, "")
        agregarCantidad(Number(idConvertidoS))
    }
    mostrarVentanaModalCarrito()
})

// Evento que se genera desde la venta del Carrito de Compras
// * Vaciar el carrito de compras

footerModal2.addEventListener('click', async (e) => {

    const data = await cargarDatosURL()
    const valor = JSON.parse(localStorage.getItem('Total'))

    if (e.target.id === 'btnVaciar') {

        conteoCompras.forEach((element, indice) => {
            if (element[1] === 1) {
                document.getElementById(`btnAgregar${element[0]}`).disabled = false
                conteoCompras[indice][1] = 0;
                valor.suma -= data[indice].precio * conteoCompras[indice][2]
                conteoCompras[indice][2] = 1;
                localStorage.setItem('Total', JSON.stringify(valor))
            }
        })
        mostrarVentanaModalCarrito()
    }

})

// Evento que permite capturar la informacion de la tarjeta de Credito y hacer el Pago

ventanaModal3.addEventListener('click', () => {
    informacionTarjeta()
})

procesoPago.addEventListener('click', () => {
    procesarSolicitudPago()
})







