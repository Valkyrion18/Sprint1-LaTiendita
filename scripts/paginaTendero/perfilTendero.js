 import cargarDatosURL from '../paginaPrincipal/obtenerDatosGlobales.js'

// Definición de constantes
let formulario = document.querySelector('.formulario')
let btnNombre = document.getElementById('btnNombre')
let btnEditar = document.getElementById('btnEditar')
let btnMostrar = document.getElementById('btnMostrarProductos')
let btnQuitarLista = document.getElementById('btnEsconderProductos')
const ul = document.querySelector('.lista-productos');

// const URL_PRODUCTOS = 'http://localhost:4000/productos'

document.getElementById('inputId').style.display = 'none';
document.getElementById('inputId').readOnly = true

document.getElementById('contenedor-productos').style.display = 'none';
btnQuitarLista.style.display ='none';

let email = document.getElementById('inputNombre')

email.addEventListener('input', () => {
    document.getElementById('inputId').style.display = 'none'
})

// Petición GET - Mostrar lista productos en Pantalla
const listarProductos = async () => {

    // const respuesta = await fetch(URL_PRODUCTOS);
    // const data = await respuesta.json();
    const data = await cargarDatosURL()
    data.forEach(element => {
        const { id, nombre, imagen_url, precio, cantidad} = element;
        ul.innerHTML += `
        <li class="list-group-item">
            <img src=${imagen_url} width="50px"></img>
            <span class="lead">${nombre}</span>
            <span class="lead"><b>Precio:</b>$ ${precio}</span>
            <button id=${id} class="btn btn-dark btm-sm float-end ">
                Borrar
            </button>
        </li>
        `
        // ul.innerHTML += `
        // <tr class="list-group-item">
        //     <td><img src=${imagen_url} width="50px"></img></td>
        //     <td><span class="lead">${nombre}</span></td>
        //     <td><span class="lead"><b>Precio:</b>$ ${precio}</span></td>
        //     <td><span class="lead">${cantidad}</span></td>
        //     <td><button id=${id} class="btn btn-dark btm-sm float-end ">Borrar</button></td>
        // </tr>
        // `
    });
}

// Invocacion de evento para mostrar elementos
btnMostrar.addEventListener('click', (e) => {
    document.getElementById('contenedor-productos').style.display = 'block';
    btnQuitarLista.style.display ='block';
    listarProductos()
})

// Invocacion de evento para quitar lista de elementos
btnQuitarLista.addEventListener('click', (e) => {
    document.getElementById('contenedor-productos').style.display = 'none';
    btnQuitarLista.style.display ='none';
})

// Petición POST - Crear un nuevo Producto
formulario.addEventListener('submit', async e => {
    e.preventDefault()
    let name = document.getElementById('inputNombre').value
    let url_image = document.getElementById('inputUrl').value
    let price = document.getElementById('inputPrecio').value
    let cant = document.getElementById('inputCantidad').value = cantidad ;
    let descrip = document.getElementById('inputDescripcion').value = descripcion ;
    let resp = await fetch(URL_PRODUCTOS, {
        method: 'POST',
        body: JSON.stringify({
            nombre: name,
            imagen_url: url_image,
            precio: price,
            cantidad: cant,
            descripcion: descrip
        }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    })
})

// Buscar por el Nombre del Producto

btnNombre.addEventListener('click', async () => {

    document.getElementById('inputId').style.display = 'block';

    const idContenedorTarjetasProd= document.getElementById('idContenedorTarjetasProd');
    let name = document.getElementById('inputNombre').value;

    const resp = await fetch(URL_PRODUCTOS);
    const lista = await resp.json()
    const elementoBuscado = lista.find(u => u.nombre.toLocaleLowerCase() === name.toLocaleLowerCase())

    idContenedorTarjetasProd.innerHTML =''
    if (elementoBuscado !== undefined) {
        const { id, nombre, imagen_url, precio, cantidad, descripcion } = elementoBuscado;
        document.getElementById('inputNombre').value = nombre;
        document.getElementById('inputUrl').value = imagen_url;
        document.getElementById('inputPrecio').value = precio;
        document.getElementById('inputCantidad').value = cantidad ;
        document.getElementById('inputDescripcion').value = descripcion;
        document.getElementById('inputId').value = id;

        idContenedorTarjetasProd.innerHTML += `
            <div class="m-2 row justify-content-center" style="width: 20rem;">
               <img src="${imagen_url}" class="card-img-top">
               <div class="card-bod">
                  <h5 class="card-title text-center">${nombre}</h5>
                  <p class="card-text text-center">$${precio}</p>
               </div>
            </div>
         `

    } else {
        alert('Nombre no encontrado')
    }
})

// Petición PUT - Modificar la búsqueda realizada

btnEditar.addEventListener('click', async () => {

    let idModificado = document.getElementById('inputId').value
    let nombreModificado = document.getElementById('inputNombre').value
    let url_Modificada = document.getElementById('inputUrl').value
    let precioModificado = document.getElementById('inputPrecio').value
    let cantModificada = document.getElementById('inputCantidad').value 
    let descrModificada = document.getElementById('inputDescripcion').value

    let urlNueva = URL_PRODUCTOS + `${idModificado}`

    let resp = await fetch(urlNueva, {
        method: 'PUT',
        body: JSON.stringify({
            id: idModificado,
            nombre: nombreModificado,
            imagen_url: url_Modificada,
            precio: precioModificado,
            cantidad: cantModificada,
            descripcion: descrModificada
        }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    })
})

// Petición DELETE - Eliminar un producto desde el listado desplegado
ul.addEventListener('click', async (e) => {
    const btnEliminar = e.target.classList.contains('btn-dark');

    if (btnEliminar === true) {
        const id = e.target.id;
        let urlNueva = URL_PRODUCTOS + `${id}`

        let resp = await fetch(urlNueva, {
            method: 'DELETE'
        })
    }

})