const enviarFormulario = document.getElementById("enviarFormato");
const enviarProducto = document.getElementById("inputProducto");
const enviarCantidad = document.getElementById("inputCantidad");
const enviarEstablecimiento = document.getElementById("inputEstablecimiento");
const crearTabla = document.getElementById("tabla-body");
let compras = [];


enviarFormulario.addEventListener("submit", function (event) {
    event.preventDefault();
    if (enviarProducto.value.trim() !== '' && enviarCantidad.value.trim() !== '' && enviarProducto.value.trim() !== '') {
        crearTabla.innerHTML = '';
        agregarProducto(enviarProducto.value, enviarCantidad.value, enviarEstablecimiento.value);
        mostrarProducto();
        event.target.reset();
    } else {
        alert("Los 3 campos son necesarios.")
    }
});

function agregarProducto(producto, cantidad, establecimiento) {
    compras.push({
        producto,
        cantidad: cantidad,
        establecimiento: establecimiento,
    })
}

function mostrarProducto() {
    crearTabla.innerHTML = '';
    compras.forEach(function (objeto, indice) {
        crearTabla.innerHTML += `<tr>
        <th class="align-middle">${indice + 1}</th>       
        <td class="align-middle">${objeto.producto}</td>
        <td class="align-middle">${objeto.cantidad}</td>
        <td class="align-middle">${objeto.establecimiento}</td>
        <td><button onclick="editarProducto(${indice})" class="btn btn-warning">Editar</button></td>
        <td><button onclick="eliminarProducto(${indice})" class="btn btn-danger">Eliminar</button></td>
        </tr>`
    })

    guardarProductosStorage();
}

function editarProducto(indice) {
    compras[indice].producto = prompt("Ingresa un nuevo producto:");
    compras[indice].cantidad = prompt("Ingresa una nueva cantidad:");
    compras[indice].establecimiento = prompt("Ingresa un nuevo establecimiento:");

    mostrarProducto();
}

function eliminarProducto(indice) {
    compras.splice(indice, 1);

    mostrarProducto();
}

function guardarProductosStorage() {
    const productosGuardar = JSON.stringify(compras);
    console.log(compras)
    localStorage.setItem("compras", productosGuardar);
}

function cargarProductosStorage() {
    const productosStorage = localStorage.getItem("compras");
    if (productosStorage == null) {
        compras = [];
    } else {
        compras = JSON.parse(productosStorage);
    }
}

cargarProductosStorage();
mostrarProducto();