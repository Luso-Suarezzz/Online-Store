const main = document.getElementById("main")
const form = document.getElementById("form-login")
const register = document.getElementById("register")
let login = JSON.parse(localStorage.getItem("login"));
let users = JSON.parse(localStorage.getItem("users"));
let sesion = "no"

if (users === null ) {
    localStorage.setItem("users", JSON.stringify([]));
    users = []
}

console.log(users)
register.addEventListener("click", e => {
    let username = document.getElementById("username")
    let password = document.getElementById("password")
    let regresar = null
    let data = {
        "username": username.value,
        "password": password.value
    }
    users.forEach(item => {
        if (item.username === data.username) {
            alertaError("Ya existe el usuario que deseas registrar")
            regresar = "si"
        }
    });
    if (regresar === 'si') {
        return
    } 
    users.push(data)
    console.log(users)
    localStorage.setItem("users", JSON.stringify(users));
    alertaCorrecto("Se registro el usuario " + data.username)
})

form.addEventListener("submit", e => {
    e.preventDefault();
    let username = document.getElementById("username")
    let password = document.getElementById("password")
    let data = {
        "username": username.value,
        "password": password.value
    }

    users.forEach(item => {
        if (item.username === data.username && item.password === data.password) {
            localStorage.setItem("login", JSON.stringify(data));
            sesion = "si"
        }
    });

    if (sesion === "si") {
        console.log("sesion existosa")
        alertaCorrecto("Has iniciado sesion: " + data.username)
        return location.href ="html/store.html";
    }
    return alertaError("No se pudo iniciar sesión por datos equivocados")
})

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

function alertaError(title) {
    Swal.fire({
        position: "center",
        icon: "error",
        title: title,
        showConfirmButton: false,
        timer: 1500,
        background: "#f2f2f2",
    });
}

if (login === null) {
    
} else {
    location.href ="html/store.html";
}