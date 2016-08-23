var net = require('net');
var chalk = require('chalk');

var tcpServer = net.createServer();
var clientList = [];

tcpServer.on('connection', function(client) {
    console.log(chalk.green("Client " + client.remoteAddress + " connected on port " + client.remotePort  +"."));
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
                clientList[i].destroy();
                clientsToRemove.push(clientList[i]);
            }
            else 
                clientList[i].write(chalk.gray(client.name + ": \t" + string));
        }
    }

    //remove all clients that are no longer active
    for(var x=0; x<clientsToRemove.length;x++) {
        var nameOfRemovingClient = clientsToRemove[x].name;
        clientList.splice(clientsToRemove[x], 1);
    }
}

tcpServer.listen(8080);
