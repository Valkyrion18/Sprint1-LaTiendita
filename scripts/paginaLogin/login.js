// Funcion que permite evaluar el ingreso a la plataforma mediante las compraciones del Usuario y una Contraseña

let formulario = document.querySelector('.formulario-users');

const endpoint = 'https://la-tiendita-usuarios.herokuapp.com/users/'
const resp = await fetch(endpoint)
const datos = await resp.json()

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    tomarDatos();
    e.target.reset()
})

const tomarDatos = async () => {

    let usuario = document.getElementById('usuario').value;
    let contraseña = document.getElementById('contrasenia').value;

    compararDatos(usuario, contraseña)
}

const compararDatos = (user, psswd) => {
    let mensaje = ''
    let cont = 0

    if (user === '' || psswd === '') {
        mensaje = "Este campo no puede estar vacio"
    }
    else {

        datos.forEach((registro) => {
            const { correo, contraseña } = registro;

            if (correo === user) {
                if (psswd === contraseña) {
                    mensaje = "Validado"
                }
                else {
                    mensaje = "Usuario y contraseña no coinciden";
                }
            }
            else {
                cont += 1
            }

            if (cont === datos.length) {
                mensaje = "Correo invalido"
            }

        });
    }

    validarAcceso(mensaje)
}

const validarAcceso = (mensaje) => {

    if (mensaje === "Validado") {
        window.location = "./perfilTendero.html"
    }
    else {
        Swal.fire({
            title: mensaje,
            icon: 'warning',
            confirmButtonText: 'Aceptar'
        })
    }
}