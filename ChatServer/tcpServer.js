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

    client.on('error', function(e) {
        console.error(e);
    });
    
});

function broadcast(string, client) {

    var clientsToRemove = [];

    for(var i=0; i < clientList.length;i++) {
        if(clientList[i] !== client) {
            // destroy and remember client if not writable anymore
            if(!clientList[i].writable) {
                client.destroy();
                clientsToRemove.push(client);
            }
            else 
            clientList[i].write(client.name + ": \t" + string);
        }
    }

    //remove all clients that are no longer active
    for(var x=0; x<clientsToRemove.length;x++) {
        clientList.splice(clientsToRemove[x]);
        console.log("Removed client " + client.name);
    }
}

tcpServer.listen(8080);
