let host = "localhost";
let port = '1234';
let client = mqtt.connect("mqtt://" + host + ":" + port );

console.log(client);

client.on('connect', () => {  
    client.publish("Celular", "El celular está listo");

    client.subscribe('cellphone');
    client.subscribe('cambiaContador');
});

client.on('message', (topic, message)=>{
    if(message.toString() == "cruzar"){
        temblar();
        contariniciar = false;
    }
    else if (message.toString() == "no_cruzar"){
        notemblar();
        contariniciar = true;
    }

    if(message.toString() == 'resetCounter') {             
        contador = tiempoContador;
        document.getElementById("contador").innerHTML = contador;
    }
    
})

//-----------------------------------------------------------------------------------------------------------------------------

let tiempoContador = 3;
let contador = tiempoContador;
let myTimeOut;
let animationCounter = 10;
let myAnimationTimeOut;
let solounclick = true;
let contariniciar = true;

function iniciar(){
    if(solounclick){
        contador = tiempoContador;
        document.getElementById("contador").innerHTML = contador;
        myTimeOut = setTimeout(contar, 1000);
        solounclick = false;         
    }

}

function contar(){
    if(contariniciar){
        if(contador > 0){
            contador--;
            document.getElementById("contador").innerHTML = contador;
            myTimeOut = setTimeout(contar, 1000);       
        }
        else{
            //client.publish(topic, message);
            client.publish('semaphore', 'Change_cellphone');
              // Se añaden request a las estadísticas
            client.publish('estadistica', JSON.stringify({id:client.options.clientId, name: "Celular"}));
            clearTimeout(myTimeOut);        
        }
    }
}

function cancelar(){
    if(contariniciar){

        if(contador != tiempoContador && contador != 0){
            clearTimeout(myTimeOut);
            contador = tiempoContador;
            document.getElementById("contador").innerHTML = contador;            
            solounclick = true;
        }
    }
}

//metodos para ponerlo al llegar el mensaje de la pantalla (no va en el boton)
function temblar(){
    document.getElementById("contador").innerHTML = 'WALK';
    console.log(animationCounter);
    document.getElementById("celular").classList.add("animacion");
    solounclick = false;
    myAnimationTimeOut = setTimeout(temblar, 1000);
    animationCounter--;
    if(animationCounter == -1){
        notemblar();
        clearTimeout(myAnimationTimeOut);
        animationCounter = 10;
    }
}

function notemblar(){
    solounclick = true;
    document.getElementById("celular").classList.remove("animacion");
    contador = tiempoContador;
    document.getElementById("contador").innerHTML = contador;
}