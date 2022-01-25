var arguments = process.argv.slice(2) ;
path = String(arguments[0]);
horizont = arguments[1];
console.log(path) ;
console.log(horizont) ;

// import * as fs from "fs";
// import * as path from "path";
// import { parse } from 'csv-parse';

// type employees = {
//     name: string;
//     day: number;
//     month: number;
//     year: number;
//   };
var current_year = 2022;
let array_month_keys = [
    `January ${current_year}`,
    `February ${current_year}`,
    `March ${current_year}`,
    `April ${current_year}`,
    `May ${current_year}`,
    `June ${current_year}`,
    `July ${current_year}`,
    `August ${current_year}`,
    `September ${current_year}`,
    `October ${current_year}`,
    `November ${current_year}`,
    `December ${current_year}`
];


const csv = require('csv-parser');
var fs = require("fs");
var results = [];

fs.createReadStream(path)
    .pipe(csv({}))
    .on('data', (data) => results.push(data))
    .on('end', () => 
    {
        let map = new Map();
        console.log(results);
        var temp = [];
        for (i = 0; i < results.length; i++)
        {
            var el_res = results[i];
            var bday_arr = el_res.birthday.split('/');
            
            if (map.has(bday_arr[0]))
            {
                temp = [];
                temp.push(map.get(bday_arr[0]));
                temp.push(el_res);
                temp.sort(function(a, b) {
                    return a.date - b.date;
                });
                map.set(bday_arr[0], temp);   
            }
            else 
            {
                map.set(bday_arr[0], el_res)
            }
        }
        console.log(map);
    }
);

