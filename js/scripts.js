
const socket = io.connect('https://intercom--api.herokuapp.com/', {
    'forceNew': true
})

// on --> recive 
// emit --> emitir 

socket.on('message', function(data) {
    
    mostrarMensajes(data,false)
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
        .then(function(response){

        })   
           
    })

}

enviaData()

function traerChats() {
    axios.get('https://intercom--api.herokuapp.com/api/chats/')
    .then(function (response){
    })

}

traerChats()


/*function mostrarMensajeSocket(mensajeUsuario, isListaMensajes) {
    console.log("mensaje Usuario:", mensajeUsuario)
    let idUsuarioLogueado = sessionStorage.getItem("usuarioID")
    let mensaje =  mensajeUsuario.message; 
    console.log("mensaje mensaje:", mensaje)
    let idUsuarioMensaje = isListaMensajes ? mensajeUsuario.user._id : mensajeUsuario.user ; 
    if(idUsuarioLogueado === idUsuarioMensaje) {
       var burbuja = document.getElementById('container');
        let mensajeFinal = document.createElement('p')
        mensajeFinal.innerText = mensaje
        burbuja.appendChild(mensajeFinal)
        console.log("mensaje desde mensaje socket", mensajeFinal)    
    }else {
        var burbuja = document.getElementById('containerllega');
        let mensajeFinal = document.createElement('p')
        mensajeFinal.innerText = mensaje
        burbuja.appendChild(mensajeFinal)
    }                    
}*/

function mostrarMensajes () {
    axios.get('https://intercom--api.herokuapp.com/api/messages/')
    .then(function (response){
        var mensajes = response.data.data; 

        console.log("mensajs", mensajes)

       /* response.data.data.map(objetoMensaje => {
            
            console.log("Fecha split",objetoMensaje.time.split(".")[0]) })*/

        let listaOrdenada = mensajes.sort(function(a,b){
            return a.time.localeCompare(b.time);
          })
        console.log("lista ordenada",listaOrdenada)


       /* listaOrdenada.map(objetomensaje => {
            sessionStorage.setItem("ideliminar", objetomensaje._id)
            let idUsuarioLogueado = sessionStorage.getItem("usuarioID")
            let idUsuarioMensaje = objetomensaje.message ? objetomensaje.user._id : objetomensaje.user ;
            if(idUsuarioLogueado === idUsuarioMensaje){
               let html = `
                <div class="contenedorMensaje" >
                    ${objetomensaje.message}          
                <button onclick="EliminarMensajes()">eliminar</button>
                <div class="visto">
                    <span>${objetomensaje.time}</span>
                    <i class="fas fa-check"></i>
                    <i class="fas fa-check"></i>
                </div>
                </div>
                `;document.getElementById('containerllega').innerHTML = html;
            }else{
                                let  mensajellega = `
                    <div class="contenedorMensaje" >
                        ${objetomensaje.message}          
                      <button onclick="EliminarMensajes()">eliminar</button>
                      <div class="visto">
                        <span>${objetomensaje.time}</span>
                        <i class="fas fa-check"></i>
                        <i class="fas fa-check"></i>
                      </div>
                     </div>
                    `; document.getElementById('container').innerHTML = mensajellega;

                }

        })*/

       /* for(i=0; i<response.data.data.length; i++){ 
            console.log("mensaje del ciclo",response.data.data[i].user._id)
            let idUsuarioLogueado = sessionStorage.getItem("usuarioID")
            let idUsuarioMensaje = response.data.data[i].message ? response.data.data[i].user._id : response.data.data[i].user ;
            console.log("que trae",response.data.data[i].user._id)
            if(idUsuarioLogueado === idUsuarioMensaje) {
                let html = listaOrdenada.map(message => {
    
                    sessionStorage.setItem("ideliminar", message._id)
                    return `
                    <div class="contenedorMensaje" >
                        ${message.message}          
                      <button onclick="EliminarMensajes()">eliminar</button>
                      <div class="visto">
                        <span>${message.time}</span>
                        <i class="fas fa-check"></i>
                        <i class="fas fa-check"></i>
                      </div>
                     </div>
                    `;
                }); document.getElementById('containerllega').innerHTML = html;
            }else {
                let mensajellega = mensajes.map(message => {
    
                    sessionStorage.setItem("ideliminar", message._id)
                    return `
                    <div class="contenedorMensaje" >
                        ${message.message}          
                      <button onclick="EliminarMensajes()">eliminar</button>
                      <div class="visto">
                        <span>${message.time}</span>
                        <i class="fas fa-check"></i>
                        <i class="fas fa-check"></i>
                      </div>
                     </div>
                    `;
                }); document.getElementById('container').innerHTML = mensajellega;
            }                    

        }*/

        
        let html = listaOrdenada.map(message => {
            sessionStorage.setItem("ideliminar", message._id)
   
            return `
            <div class="contenedorMensaje" >
                ${message.message}          

                <div ="eliminar">
                <button class="eliminacion" onclick="EliminarMensajes()"><i class="far fa-times-circle"></i></button>
                </div>
              
              <div class="visto">
                <span>${message.time}</span>
                <i class="fas fa-check"></i>
                <i class="fas fa-check"></i>
              </div>
             </div>
            `;
        }); document.getElementById('containerllega').innerHTML = html;
         
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



























