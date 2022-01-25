function freeqWord (message){
    new_message = message.toLowerCase();

    var arr_message = []
    arr_message = new_message.split(' ');

    let temp;

    let map = new Map();
    

    let count=1;
    for (var i = 0; i < arr_message.length; i ++){
            if (!(map.has(arr_message[i]))){
                map.set(arr_message[i], count);
            }
            else {
                temp = map.get(arr_message[i]) + 1;
                map.set(arr_message[i], temp);
            }
    }
    console.log(map);
}
    

freeqWord ('red hat dog cat red blue black cat black black');