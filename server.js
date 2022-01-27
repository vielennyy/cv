const { createServer } = require('http');
const net = require('net');

const clients = [];

const server = net.createServer(function(socket) {
    socket.write(`Echo server\r\n`);
    const port = socket.remotePort;
    console.log('Client IP. Port: ', socket.remoteAddress);
    console.log('Client connected. Port: ', port);
       

    socket.on('close', () => {
        let index = clients.indexOf(socket);
        clients.splice(index, 1);
        console.log(`Closed`, port)
    });
    clients.push(socket);

    socket.on('data', (message) => {
        clients.forEach(client => {
            if (client !== socket){
                client.write(message);
            }
        })
    });

    socket.pipe(process.stdout);
    // socket.pipe(socket);
});

server.listen(1337, `10.177.1.12`, () => {console.log('Listening on ', server.address());});


