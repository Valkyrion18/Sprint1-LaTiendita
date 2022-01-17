// Funcion mediante la cual se carga y se retorna la base de datos obtenida del Servidor 

async function cargarDatosURL() {

    const URL_PRENDAS = 'http://localhost:4000/productos/'

    const resp = await fetch(URL_PRENDAS)
    const datos = await resp.json()

    return datos
}

export default cargarDatosURL

export let conteoCompras = []  // Arreglo para validar si un producto ya ha sido agregado y la cantidad a comprar
export let totalAPagar = { suma: 0,
                           divisa: 'COP '} // Objeto mediante el cual se actualizara la informacion del total a pagar a tráves del Local Storage