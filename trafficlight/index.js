//Se le asigna a la variable circles todos los elementos que tengan el class circle
const circles = document.querySelectorAll('.circle');
let activeLight = 2;
//let changeInterval = 10000;

let redLight = 10; // 0
let yellowLight = 3; // 1
let greenLight = 20; // 2

let tiempo = document.getElementById('tiempo');

setInterval(() => {    
    switch(activeLight) {
        case 0: 
            if(redLight > 1){
                redLight--;
                tiempo.innerHTML = redLight;
            }
            else{
                redLight = 10;
                tiempo.innerHTML = 0;
                changeLight();
            }                
            break;
        case 1:
            if(yellowLight > 1){
                yellowLight--;
                tiempo.innerHTML = yellowLight;
            }
            else{
                yellowLight = 3;
                tiempo.innerHTML = 0;
                changeLight();
            }
            break;
        case 2:
            if(greenLight > 1){
                greenLight--;
                tiempo.innerHTML = greenLight;
            }
            else{
                greenLight = 20;
                tiempo.innerHTML = 0;
                changeLight();
            }
            break;
        default: break;
    }        
}, 1000);

function changeLight(){
    //El elemento en la posicion 0 obtiene el class de circle, eliminando previamente el que tenia
    //Nuevo: circle
    //Anterior: circle red

    circles[activeLight].className = 'circle';
    activeLight--; 

    //Si activeLight es mayor que 2, es decir, ya no es verde. Vuelve a 0, es decir, el rojo.
    if(activeLight < 0){
        activeLight = 2;
        procesar = true; 
        //changeIntervalTime(10000);
    }

    if(activeLight == 0){
        procesar = false;
        client.publish('cambiaContador', 'resetCounter');
        client.publish("screen", 'start countdown');
        client.publish('button', 'cant push');
        console.log(activeLight.toString());
    }
    
    //client.publish("screen", activeLight.toString());

    //Se obtiene el elemento en la nueva posicion.
    const currentLight = circles[activeLight];
    //Se le añade el class color
    currentLight.classList.add(currentLight.getAttribute('color'));
}

