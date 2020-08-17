function validate() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    
    if ((username == null || username.trim() === "") && (password == null || password.trim() === "")){
        location.href="index.html"
        alert("Por favor ingresa el usuario y la contraseña");
        return false;
    }
    
    if (username == null || username.trim() === "") {
        location.href="index.html"
        alert("Por favor ingresa el usuario");
        return false;
    }
    if (password == null || password.trim() === "") {
        location.href="index.html"
        alert("Por favor ingresa la contraseña");
        return false;
    }
    location.href="inicio.html"
    alert('Te has logueado correctamente');
}

