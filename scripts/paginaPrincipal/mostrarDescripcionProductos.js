// Funcion que muestra una ventana modal de la descripcion del Producto desde la Pagina de los productos
import cargarDatosURL from './obtenerDatosGlobales.js'
import { agregarProducto } from './agregarDesdePagina.js'
import { conteoCompras } from './obtenerDatosGlobales.js'

export async function mostrarDescripcionVentanaModal() {

    let ventanaModal = document.querySelector('.modal-body')
    let footerModal = document.querySelector('.modal-footer')
    const mostrarElementos = document.querySelector('.grid-elementos')

    const data = await cargarDatosURL()

    mostrarElementos.addEventListener('click', (e) => {

        let fragment = document.createDocumentFragment()

        ventanaModal.innerHTML = ''
        data.forEach((producto) => {

            const { id, nombre, imagen, descripcion } = producto;
            let idProducto = "img" + id;

            if (e.target.id === idProducto) {
                const bloque = document.createElement('div')
                bloque.classList.add("row")
                console.log(id)
                bloque.innerHTML = `
                    <div class="col">
                        <img src="${imagen}" class="img-fluid mt-3" id="img${id}" alt="imagen ${id}">
                    </div>
                    
                    <div class="col">
                        <h5 class="body2Bold text-center">${nombre}</h5>
                        <p class="m-3">${descripcion}</p>
                    </div>

                `
                footerModal.innerHTML = `     
                <button class="btn btn-primary" id="btnAgregarCarrito${id}")>Agregar al carrito</button>              
                <button class="btn btn-success" data-bs-dismiss="modal">Aceptar</button>
                `
                fragment.appendChild(bloque)
            }
        })
        ventanaModal.appendChild(fragment)
        
    })
    footerModal.addEventListener('click', (e) => {
        if (e.target.innerHTML === "Agregar al carrito") {
            let idConvertido = e.target.id.replace(/[^0-9]/ig,"")
            agregarProductoVentana(Number(idConvertido))
        }
    })

}

// Funcion que permite agregar un producto desde la ventana Modal y valida si ya esta comprado

async function agregarProductoVentana(idAVerificar) {
    // Condicional que valida si el producto ya habia sido agregado previamente
    if (conteoCompras[idAVerificar - 1][1] === 0) {
        agregarProducto(idAVerificar)
    } else {
        alert('Este producto ya ha sido agregado al carrito de compras')

    }
}





