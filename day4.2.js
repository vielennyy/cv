function next_birthday(horizont){
    //array whith objects (employees)
    let employees = [{person:'Lina Marchenko', date:12, month:1, year:2000},
                {person:'Ivan Pavlenko', date:4, month:2, year:1997},
                {person:'Marina Kornienko', date:19, month:1, year:2003},
                {person:'Ruslan Kuzmenko', date:27, month:3, year:2002},
                {person:'Volodymyr Osaulenko', date:16, month:2, year:1900}];
    
    let current_year = 2022;
    let current_month = 0;
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
   
    let employees_map = new Map();
    let temp = [];
    //fill arrays with employees 
    // for (var j = current_month; j <= horizont; j++){
        for (var i = 0; i < employees.length; i ++){
            temp = [];
            if (!(employees_map.has(employees[i].month))){
                temp.push(employees[i]);
                employees_map.set(employees[i].month, employees[i]);
            }
            else {
                temp.push(employees_map.get(employees[i].month));
                temp.push(employees[i]);
                temp.sort(function(a, b) {
                    return a.date - b.date;
                });
                employees_map.set(employees[i].month, temp);
            }
        } 
        for (var i = current_month; i <= horizont; i++){
            console.log(`${array_month_keys[i]}`);
            console.log(employees_map.get(employees[i].month));
            // let str = Object.values(employees_map.get(employees[i].month));
            // console.log(str);

            // console.log(JSON.stringify(employees_map.get(employees[i].month)));
        }        
    // console.log(employees_map);


    
}

next_birthday(1);
