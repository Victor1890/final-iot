let host = "localhost";
let port = '1234';
let client = mqtt.connect("mqtt://" + host + ":" + port );
let procesar = true;

console.log(client)

message = "pantalla, presenta";

client.on('connect', () => {
  client.publish("Semaforo", "El semaforo está listo");
  client.subscribe('semaphore');
})

client.on('message', (topic, message)=> {
  if(message.toString() === "Change_button"){
    client.publish('button', 'cant push');
  }
  if(procesar){
    procesar = false;
    console.log(message.toString())
    if(greenLight > 5) {
      greenLight = 5;
    }  
  }
})