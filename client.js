var net = require('net');

var client = new net.Socket();

client.on('close', function() {
    console.log('Connection closed');
});

client.connect(1337, '127.0.0.1', function() {
    console.log('Connected');
    client.write('Hello, server! Love, Client');
});

client.on('data', function(data) {
    console.log('Recived: ' + data);
    client.destroy();
});

