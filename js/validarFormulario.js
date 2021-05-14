function validarformulario(){                                                      
    var usuario = document.forms["login"] ["usuario"].value;
    var password = document.forms["login"] ["password"].value;
    if(( usuario == "tomas") && (password == "usuario1")) {
        sessionStorage.setItem("usuarioID", "60977601aa71c92fa9b453fd")
        window.location.href = '/main.html'
        return false;
    } else if (( usuario == "sebastian") && (password == "usuario2")) {
        sessionStorage.setItem("usuarioID", "60977601aa71c92fa9b453fc")
        window.location.href = '/main.html'
        return false;
    }    

}

validarformulario()
