const { createServer } = require('http');
const net = require('net');

const clients = [];
var previousCity;


const server = net.createServer(function (socket) {
    socket.write(`Welcome to the CITIES GAME!\n`);
    socket.write(`If you want to end the game please write 'pass'.\n`);
    socket.write(`Please write city:`);
    const port = socket.remotePort;
    console.log('Client IP. Port: ', socket.remoteAddress);
    console.log('Client connected. Port: ', port);
    let enteredCities = new Map();


    socket.on('close', () => {
        let index = clients.indexOf(socket);
        clients.splice(index, 1);
        console.log(`Closed`, port)
    });

    clients.push(socket);

    var count = 1;

    socket.on('data', (message) => {
        // clients.forEach(client => {
        //     if (client !== socket){
        //         client.write(message);
        //     }
        // });
        if (!(runGame(message.toString().trim(), socket, count, enteredCities, previousCity))) {
            clients.forEach(client => client.write('The end.'));
        }
        else {
            previousCity = message.toString().trim().toUpperCase();
            socket.write(previousCity);
        }
        count ++;
    });
    socket.pipe(process.stdout);
    // socket.pipe(socket);
});

server.listen(1337, `10.177.1.12`, () => { console.log('Listening on ', server.address()); });


function runGame(message, socket, count, enteredCities, previousCity) {
    city = message.toUpperCase();
    // socket.write('Please enter your city: ');
    
    
    if (city == 'PASS') {
        return 0;
    }
    else {
        if (count == 1) {
            enteredCities.set(city, 1);
            
            // socket.write(previousCity);
            socket.write('Please enter your city: ');
            return true;
        }
        else { 
            if (checkRepeat(enteredCities, city, socket)){
                socket.write(previousCity);
                if (checkNextCity(previousCity, city, socket)){
                    enteredCities.set(city, 1);
                    previousCity = city;
                    socket.write('Please enter your city: ');
                    return true;
                }
                else {
                    return true;
                }
            }
            else {
                return true;
            }
        }
    }
}

function checkRepeat(enteredCities, city, socket) {
    if (enteredCities.has(city)) {
        socket.write('This city was entered before. Please write another one.\n');
        return false;
    }
    else {
        enteredCities.set(city, 1);
        return true;
    }
}

function checkNextCity(previousCity, currentCity, socket) {
    splitpreviousCity = previousCity.split('');
    splitcurrentCity = currentCity.split('');
    if (splitpreviousCity[splitpreviousCity.length - 1] == splitcurrentCity[0]) {
        socket.write('Your city must start with the last letter of the previous one!\n');
        return false;
    }
    else {
        return true;
    }
}




