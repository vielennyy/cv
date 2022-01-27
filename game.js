const { createServer } = require('http');
const net = require('net');

const clients = [];


const server = net.createServer(function(socket) {
    socket.write(`Welcome to the CITIES GAME!\n`);
    socket.write(`If you want to end the game please write 'pass'.\n`);
    socket.write(`Please write city.'.\n`);
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
        });
        // if (!(runGame(message, socket))) {
        //     clients.forEach(client => client.write('The end.'));
        // }
    });
    socket.pipe(process.stdout);
    // socket.pipe(socket);
});

server.listen(1337, `10.177.1.12`, () => {console.log('Listening on ', server.address());});


function runGame (message, socket) {
    city = message.toUpperCase();
    var count = 1;
    var previousCity;
    let enteredCities = new Map();
    while(true){
        socket.write('Please enter your city: ');
        if (city == 'PASS') {
            // continueGame == false;
            return 0;
        }
        else {
            if (count == 1){
                enteredCities.set(city, 1);
                previousCity = city;
                count++;
                continue;
            }
            // else if (count > 1 && count <= numOfPlayers){
            else {
                if (checkRepeat(enteredCities, city, socket)) {
                    continue;
                }
                else {
                    if (checkNextCity(previousCity, city, socket)){
                        continue;
                    }
                    else {
                        previousCity = city;
                        count ++;
                        continue;
                    }
                }
            }
        }

    }
}
function checkRepeat(enteredCities, city, socket){
    if (enteredCities.has(city)){
        socket.write('This city was entered before. Please write another one.\n');
        return 1;
    }
    else {
        enteredCities.set(city, 1);
        return 0;
    }
}

function checkNextCity (previousCity, currentCity, socket) {
    splitpreviousCity = previousCity.split('');
    splitcurrentCity = currentCity.split('');
    if (splitpreviousCity[splitcurrentCity.length-1] == splitcurrentCity[0]){
        socket.write('Your city must start with the last letter of the previous one!');
        return 1;
    }
    else {
        return 0;
    }
}




