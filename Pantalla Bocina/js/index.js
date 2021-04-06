let host = "localhost";
let port = '1234';
let topic = 'screen';
let client = mqtt.connect("mqtt://" + host + ":" + port );
console.log(client)

client.on('connect', () => {
  client.publish("Pantalla", "La pantalla está lista");
  

  client.subscribe(topic);
})

client.on('message', (topic, message)=>{
    console.log(message.toString());
    iniciar();
    mymessage = "cruzar";
    client.publish('cellphone', mymessage);
})



//-------------------------------------------------------------------------------------------------------------
let contador = 10; // para ver los segundos 
let myTimeOut;
let solounclick = true; // para no hacer mas request hasta que se acabe el anterior
let audio = new Audio('audio/71158__parabolix__countdown.wav');

function iniciar(){
    if(solounclick){
        contador = 10;
        document.getElementById("contador").style.fontSize = "400px";
        document.getElementById("contador").innerHTML = contador;
        audio.play();
        myTimeOut = setTimeout(contar, 1000);
        solounclick = false;
    }
}

function contar(){

    if(contador > 1){
        myTimeOut = setTimeout(contar, 1000);
        contador--;
        document.getElementById("contador").innerHTML = contador;
    }
    else if(contador == 1) {
        //console.log("Bro, ya termine de contar, y tu?");
        mymessage = "no_cruzar";
        client.publish('cellphone', mymessage);
        client.publish('button', 'can push');
        document.getElementById("contador").style.fontSize = "300px";
        document.getElementById("contador").innerHTML = "stop!";
        solounclick = true;
        clearTimeout(myTimeOut);
        contador = 10;
    }
}
