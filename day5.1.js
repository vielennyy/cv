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

const csv = require('csv-parser');
var fs = require("fs");
const results = [];

fs.createReadStream(path)
    .pipe(csv({}))
    .on('data', (data) => results.push(data))
    .on('end', () => {
        console.log(results);
    });





