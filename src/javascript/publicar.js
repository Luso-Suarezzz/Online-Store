let formStore = document.getElementById("formStore")
let store = JSON.parse(localStorage.getItem("store"));
let logout = document.getElementById("logout");

logout.addEventListener('click', e => {
    localStorage.removeItem("login");
    location.href ="../";
})

formStore.addEventListener('submit', e => {
    e.preventDefault()
    let nombre = document.getElementById("nombre")
    let categoria = document.getElementById("categoria")
    let precio = document.getElementById("precio")
    let moneda = document.getElementById("moneda")
    let descripcion = document.getElementById("descripcion")
    let imagen = document.getElementById("imagen")
    let cantidad = document.getElementById("cantidad")

    let data = {
        "nombre": nombre.value,
        "categoria": categoria.value,
        "precio": precio.value,
        "moneda": moneda.value,
        "descripcion": descripcion.value,
        "imagen": imagen.value,
        "cantidad": cantidad.value,
        "id": uuidv4()
    }

    nombre.value = ''
    categoria.value = ''
    precio.value = ''
    moneda.value = ''
    descripcion.value = ''
    imagen.value = ''
    cantidad.value = ''
    store.push(data);
    localStorage.setItem("store", JSON.stringify(store));
    alertaCorrecto("Se ha agregado con exito el producto")
});

function alertaCorrecto(title) {
    Swal.fire({
        position: "center",
        icon: "success",
        title: title,
        showConfirmButton: false,
        timer: 1500,
        background: "#f2f2f2",
    });
}

function uuidv4() {
    return "10000000".replace(/[018]/g, c =>
        (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 16 >> +c / 4).toString(16)
    );
}

if (login === null) {
    location.href = "../index.html"
} else {
    
}