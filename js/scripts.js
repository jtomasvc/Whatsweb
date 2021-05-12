
const socket = io.connect('https://intercom--api.herokuapp.com/', {
    'forceNew': true
})

// on --> recive 
// emit --> emitir 

socket.on('message', function(data) {
    
    mostrarMensajeSocket(data,false)
    console.log(data)
})


async function consultarApi () {

    const request = await fetch('https://intercom--api.herokuapp.com/api/users/')
    const datos = await request.json();

    console.log("informacion usuario",datos.data)

     sessionStorage.setItem("sebastian", datos.data[0]._id)
     sessionStorage.setItem("tomas", datos.data[1]._id)

    let nombre = document.querySelector('#nombreUsuario')
    nombre.innerHTML = `
        <p>${datos.data[0].name}</p>
    `
    
    let nombreChat = document.querySelector('#nombreUsuarioChat')
    nombreChat.innerHTML = `
    <p>${datos.data[0].name}</p>
    `
    
    let nombreChatPerfil = document.querySelector('#nombreChatPerfil')
    nombreChatPerfil.innerHTML = `
    <p>${datos.data[0].name}</p>
    `

    let frase = document.querySelector('#frase')
    frase.innerHTML = `
    <p>${datos.data[0].info}</p>
    `

    let numero = document.querySelector('#numero')
    numero.innerHTML = `
    <p>${datos.data[0].phone_number}</p>
    `

    
    let estado = document.querySelector('#estadoPerfil')
    estado.innerHTML = `
    <p>${datos.data[1].info}</p>
    `
}

consultarApi()


/*crearChat = async () => {

     let tomas = sessionStorage.getItem("tomas")

   const res = await fetch(`https://intercom--api.herokuapp.com/api/chats/609b0dff0565e9bd8ed94ee3`, {
        method: 'POST',
        headers: {
            'userId': tomas
        }
    }).then (response => response.json())
    .then(res => {
       let idChat = (res.data._id) 
       console.log("Chat creado correctamente", idChat)
       sessionStorage.setItem("idChat", idChat)
       return idChat 
    })
}
*/




function enviaData(){

    var formulario = document.getElementById('addMessage');

    formulario.addEventListener('submit', function(e){
        e.preventDefault();
        var datos = new FormData(formulario)

        const mensajeNuevo = {
            message : datos.get('mensajeNuevo')
        }
        let idusuario1 = sessionStorage.getItem("usuarioID")

        const options = {
            headers: {'userId': idusuario1}
          };

        axios.post(`https://intercom--api.herokuapp.com/api/messages/609b0dff0565e9bd8ed94ee3`,mensajeNuevo,options ) 
        .then(response => console.log("Mensaje back",response), socket.emit('messages', mensajeNuevo))   
           
    })

}

enviaData()

function traerChats() {
    axios.get('https://intercom--api.herokuapp.com/api/chats/')
    .then(function (response){
        console.log("chats", response)
    })

}

traerChats()


function mostrarMensajeSocket(mensajeUsuario, isListaMensajes) {
    console.log("mensaje Usuario", mensajeUsuario)
    let idUsuarioLogueado = sessionStorage.getItem("usuarioID")
    let mensaje =  mensajeUsuario.message   ; 
    let idUsuarioMensaje = isListaMensajes ? mensajeUsuario.user._id : mensajeUsuario.user   ; 
    if(idUsuarioLogueado === idUsuarioMensaje) {
        var burbuja = document.getElementById('container');
        let mensajeFinal = document.createElement('p')
        mensajeFinal.innerText = mensaje
        burbuja.appendChild(mensajeFinal)
    }else {
        var burbuja = document.getElementById('containerllega');
        let mensajeFinal = document.createElement('p')
        mensajeFinal.innerText = mensaje
        burbuja.appendChild(mensajeFinal)
    }                    
}


function mostrarMensajes () {
    axios.get('https://intercom--api.herokuapp.com/api/messages/')
    .then(function (response){
        console.log("Mensaje del response",response.data.data)       
        var mensajes = response.data.data; 
        for(i=0; i<response.data.data.length; i++){
            mostrarMensajeSocket(response.data.data[i],true)
            sessionStorage.setItem("ideliminar", mensajes[i]._id)
        }
         
    })
}

mostrarMensajes()


function EliminarMensajes () {

    let ideeliminar = sessionStorage.getItem("ideliminar")
    axios.delete(`https://intercom--api.herokuapp.com/api/messages/${ideeliminar}`)
    .then(function (response){
        console.log(response)
    })
}


function validarformulario(){                                                      
    var usuario = document.forms["login"] ["usuario"].value;
    var password = document.forms["login"] ["password"].value;
    if(( usuario == "tomas") && (password == "usuario2")) {
        sessionStorage.setItem("usuarioID", "60977601aa71c92fa9b453fd")
        window.location.href = 'main.html'
        return false;
    } else if (( usuario == "sebastian") && (password == "usuario2")) {
        sessionStorage.setItem("usuarioID", "60977601aa71c92fa9b453fc")
        window.location.href = 'main.html'
        return false;
    }

}

validarformulario()












