var mosca = require('mosca');
// var webSocket = require('websocket');
// var ws = webSocket.server;
var options = {
  http: {
    port: 1234,
    bundle: true,
    static: './'
  }
}
var broker = new mosca.Server(options);

var listaEstadistica = [];

var activeSemaphoreLight = 0;

broker.on('ready',() => {
  console.log('Broker ready!!');
})

broker.on('published', (packet) => {
  console.log(packet.topic,":" ,packet.payload.toString());
  if(packet.topic.toString() == "estadistica"){
      listaEstadistica.push(JSON.parse(packet.payload.toString()));
      var message = {
        topic: 'nuevaLista',
        payload: JSON.stringify(listaEstadistica)
      };      
      broker.publish(message);      
      // broker.publish("nuevaLista", JSON.stringify(listaEstadistica));
  }
  /*switch(packet.topic){
    case "screen":
      activeSemaphoreLight = Number(packet.payload.toString())              
      break;
    case "semaphore":      
      if(activeSemaphoreLight === 0){
        var message = {
          topic: 'changeToGreen',
          payload: 'Change to green light'
        };      
        broker.publish(message, function() {
          console.log(message.payload);
        });        
      } else {
        console.log('Active light is not red!');
      }
      break;
    default: break;
  }*/
})

broker.on('clientConnected', (client) => {
  console.log('Client connected: ', client.id);
})