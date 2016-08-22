var net = require('net');

var tcpServer = net.createServer();
var clientList = [];

tcpServer.on('connection', function(client) {
    console.log("Client " + client.remoteAddress + " connected on port " + client.remotePort  +".");
    client.name = client.remoteAddress + ":" + client.remotePort;

    client.write("Welcome fellow! \n");
    clientList.push(client);

    client.on('data', function(chunk) {
        broadcast(chunk, client);
    });
    
});

function broadcast(string, client) {
    for(var i=0; i < clientList.length;i++) {
        if(clientList[i] !== client) {
            clientList[i].write(client.name + ": \t" + string);
        }
    }
}

tcpServer.listen(8080);
