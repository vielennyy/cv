var arguments = process.argv.slice(2) ;
path = String(arguments[0]);
horizon = arguments[1];

const csv = require('csv-parser');
var fs = require("fs");
const results = [];



let currentYear = new Date().getFullYear();
    // console.log(currentYear);

    
let currentMonth = new Date().getMonth();
    // console.log(currentMonth);

let monthNames = [
        `Январь`,
        `Февраль`,
        `Март`,
        `Апрель`,
        `Май`,
        `Июнь`,
        `Июль`,
        `Август`,
        `Сентябрь`,
        `Октябрь`,
        `Ноябрь`,
        `Декабрь`
    ];
fs.createReadStream(path)
    .pipe(csv({}))
    .on('data', (data) => results.push(data))
    .on('end', () => {
        next_birthday(horizon);
});

function pluarization(age){
    if (age % 10 == 1)
        return 'год';
    else if (age % 10 == 2 || age % 10 == 3 || age % 10 == 4)
        return 'года';
    else
        return 'лет';
}
// console.log(pluarization(17));
function groupByMonth(results){
    let employeesMap = new Map();

    results.forEach(function(item, i, results) {
        var birthday = new Date(item.birthday);
        if (!(employeesMap.has(birthday.getMonth()))){
            employeesMap.set(birthday.getMonth(), [item]);
        }
        else {
            employeesMap.get(birthday.getMonth()).push(item);
        }
    })
    return employeesMap;
}
// console.log(createMap(employees));
function output(employeesMap, horizont) {
    for (var month = currentMonth; month <= currentMonth + horizont; month++){
        if (employeesMap.has(month)){
            console.log(`${monthNames[month]}`+` ${currentYear}`);
            var mapElement = employeesMap.get(month);
            mapElement.sort(function(a, b) {

                var birthdayA = new Date(a.birthday);
                var birthdayB = new Date(b.birthday);
                return birthdayA.getDate() - birthdayB.getDate();
            });
            mapElement.forEach(item => 
            {
                var birthday = new Date(item.birthday);
                var age = currentYear - birthday.getFullYear(); 
                    console.log(`(${birthday.getDate()}) - ${item.person} (${age} ${pluarization(age)})`);
            })
        }
        
    }        
}
function next_birthday(horizon){   
    output(groupByMonth(results), horizon);
}
// next_birthday(2);