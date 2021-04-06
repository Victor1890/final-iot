var table = document.getElementById('tbody');
let host = "localhost";
let port = '1234';
let client = mqtt.connect("mqtt://" + host + ":" + port );

console.log(client);

client.on('connect', () => {  
    client.publish("Estadisticas", "Estadistica lista");
    client.subscribe('nuevaLista');
});

client.on('message', (topic, message)=>{
    let estadisticas = JSON.parse(message)
    let html = `<div>`;

    console.log("Estadisticas: ", estadisticas);
    estadisticas.forEach(estadistica => {
        html +=`
        <tr>
            <th scope="row">${estadistica.id}</th>
            <td>${estadistica.name}</td>
            <td>10</td>
            <td>1</td>
        </tr>
    `;
    });
    html +=`
    <tr>
        <th scope="row">Totales</th>
        <td></td>
        <td>${estadisticas.length * 10}</td>
        <td>${estadisticas.length}</td>
    </tr>
    </div>
`;


    table.innerHTML = html;

});
