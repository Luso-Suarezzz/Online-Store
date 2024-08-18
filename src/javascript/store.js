let logout = document.getElementById("logout");
let login = JSON.parse(localStorage.getItem("login"));
let store = JSON.parse(localStorage.getItem("store"));
let busqueda = document.getElementById("busqueda");
let filtrado = document.getElementById("filtrado");
let formStoreEdit = document.getElementById("formStoreEdit");
let new_store = ``

logout.addEventListener('click', e => {
    localStorage.removeItem("login");
    location.href ="../";
})

function loadStore() {
    new_store = ``
    store.forEach(item => {
        new_store = new_store + `<div class="flex flex-col lg:flex-row bg-blanco border-2 border-azul rounded-xl w-full md:w-[45%] lg:w-[45%] h-auto lg:h-[350px] ">
                <div class="border-b-2 lg:border-b-0 lg:border-r-2 border-azul rounded-tl-xl lg:rounded-tr-none rounded-tr-xl lg:rounded-tl-xl lg:rounded-bl-xl h-full w-full lg:w-5/12 ">
                    <img class="rounded-tl-xl rounded-tr-xl lg:rounded-tr-none lg:rounded-tl-xl lg:rounded-bl-xl h-full w-full" src="${item.imagen}" alt="Imagen producto"/>
                </div>
                <div class="px-5 pb-5 pt-5 flex flex-col gap-4">
                <h3 class="text-xl font-hanuman font-bold text-start">${item.nombre}</h3>
                <h5 class="font-hanuman text-negro text-md">${item.descripcion}</h5>
                <p class="font-hanuman text-negro text-sm font-semibold">${item.cantidad} Unidades</p>
                <div class="flex items-center justify-between">
                    <span class="text-3xl font-roboto font-bold text-negro">${item.precio}${item.moneda}</span>
                </div>
                <div class="flex gap-2 flex-wrap">
                    <button class="border-2 border-azul rounded-lg p-2 font-breeSerif text-negro hover:text-blanco hover:bg-azul transition-all duration-500" onclick="vender(${item.id})">Vender</button>
                    <button class="border-2 border-marron-calro rounded-lg p-2 font-breeSerif text-negro hover:text-blanco hover:bg-marron-calro transition-all duration-500" onclick="editar(${item.id})">Editar</button>
                    <button class="border-2 border-red-600 rounded-lg p-2 font-breeSerif text-negro hover:text-blanco hover:bg-red-600 transition-all duration-500" onclick="eliminar(${item.id})">Eliminar</button>
                </div>
                </div>
            </div>`
    });

    tienda.innerHTML = new_store
}

busqueda.addEventListener('submit', e => {
    e.preventDefault()
    let search = document.getElementById('search');
    if (search.value.trim() === '') {
        store = JSON.parse(localStorage.getItem("store"));
        new_store = ``
        loadStore()
        alertaCorrecto("Se han encontrado los siguientes resultados")
    } else {
        store = store.filter(item => item.nombre == search.value);
        new_store = ``
        loadStore()
        alertaCorrecto("Se han encontrado los siguientes resultados")
    }
})

filtrado.addEventListener('submit', e => {
    e.preventDefault()
    let search = document.getElementById('search');
    let categoria = document.getElementById('categoria');
    search.value = ''
    if (categoria.value === 'Todos') {
        store = JSON.parse(localStorage.getItem("store"));
    } else {
        let data = JSON.parse(localStorage.getItem("store"));
        store = []
        data.forEach(item => {
            if (item.categoria === categoria.value) {
                store.push(item)
            }
        });
    }
    new_store = ``
    loadStore()
    alertaCorrecto("Se han filtrado con exito en la categoria " + categoria.value)
})

function eliminar(id) {
    Swal.fire({
        title: "Vas a eliminar el producto",
        text: "Para confirma presion en eliminar o si vas cancelar presiona en cancel",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar"
    }).then((result) => {
        if (result.isConfirmed) {
            for (let i = 0; i < store.length; i++) {
                if (store[i].id == id) {
                    store.splice(i, 1);
                }
            }
            localStorage.setItem("store", JSON.stringify(store));
            new_store = ``
            loadStore()
            Swal.fire({
                title: "Eliminado con exito!",
                text: "Has eliminado el producto con el id: " + id,
                icon: "success"
            });
        }
    });
}

function vender(id) {
    for (let i = 0; i < store.length; i++) {
        if (store[i].id == id) {
            if (store[i].cantidad > 0) {
                store[i].cantidad = store[i].cantidad - 1
                localStorage.setItem("store", JSON.stringify(store));
                loadStore()
                alertaCorrecto("Has realizado una venta del producto: " + store[i].nombre)
            } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "No hay unidades de este producto disponibles",
                    showConfirmButton: false,
                    timer: 1500,
                    background: "#f2f2f2",
                });
            }
        }        
    }
}

function editar(id) {
    store.forEach(item => {
        if (item.id == id) {
            let modalEditar = document.getElementById('modalEditar');
            modalEditar.className = "fixed top-0 left-0 bg-opacity-40 bg-negro w-[100vw] h-[100vh] flex items-center justify-center"
            let nombre = document.getElementById("nombreEdit")
            let categoria = document.getElementById("categoriaEdit")
            let precio = document.getElementById("precioEdit")
            let moneda = document.getElementById("monedaEdit")
            let descripcion = document.getElementById("descripcionEdit")
            let imagen = document.getElementById("imagenEdit")
            let cantidad = document.getElementById("cantidadEdit")
            let idEdit = document.getElementById("idEdit")

            idEdit.value = item.id
            nombre.value = item.nombre
            categoria.value = item.categoria
            precio.value = item.precio
            moneda.value = item.moneda
            descripcion.value = item.descripcion
            imagen.value = item.imagen
            cantidad.value = item.cantidad
        }
    });
}

closeModalEditar.addEventListener('click', function () {
    let modalEditar = document.getElementById('modalEditar');
    modalEditar.className = "fixed invisible top-0 left-0 bg-opacity-40 bg-negro w-[100vw] h-[100vh] flex items-center justify-center"
});

formStoreEdit.addEventListener('submit', e => {
    e.preventDefault()
    let nombre = document.getElementById("nombreEdit")
    let categoria = document.getElementById("categoriaEdit")
    let precio = document.getElementById("precioEdit")
    let moneda = document.getElementById("monedaEdit")
    let descripcion = document.getElementById("descripcionEdit")
    let imagen = document.getElementById("imagenEdit")
    let cantidad = document.getElementById("cantidadEdit")
    let id = document.getElementById("idEdit")

    let data = {
        "nombre": nombre.value,
        "categoria": categoria.value,
        "precio": precio.value,
        "moneda": moneda.value,
        "descripcion": descripcion.value,
        "imagen": imagen.value,
        "cantidad": cantidad.value,
        "id": id.value
    }
    console.log(data)
    for (let i = 0; i < store.length; i++) {
        if (store[i].id == id.value) {
            store[i] = data
        }
    }
    localStorage.setItem("store", JSON.stringify(store));
    loadStore()
    alertaCorrecto("Se ha editado con exito el producto: " + nombre.value)
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

if (login === null) {
    location.href = "../index.html"
} else {
    if (store === null) {
        localStorage.setItem("store", JSON.stringify([]));
        tienda.innerHTML = '<h4 class="text-2xl text-negro font-semibold font-roboto">No hay productos en el store...</h4>'
    } else {
        if (store.length === 0) {
            tienda.innerHTML = '<h4 class="text-2xl text-negro font-semibold font-roboto">No hay productos en el store...</h4>'
        } else {
            loadStore()
        }
    }
}