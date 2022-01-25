function next_birthday(num_month){
    //array whith objects (employees)
    arr_emp = [{name:'Lina', lastname:'Marchenko', date:12, month:1, year:2000},
                {name:'Ivan', lastname:'Pavlenko', date:4, month:2, year:1997},
                {name:'Marina', lastname:'Kornienko', date:19, month:1, year:2003},
                {name:'Ruslan', lastname:'Kuzmenko', date:27, month:3, year:2002},
                {name:'Volodymyr', lastname:'Osaulenko', date:16, month:2, year:1900}];
    
    let current_year = 2022;
    //sort employees to arrays with month of birth

    //ceate an arrays
    const january = [];
    const february = [];
    const march = [];
    //fill arrays with employees            
    for (var i = 0; i < arr_emp.length; i ++){
        if (arr_emp[i].month == '1'){
            january.push(arr_emp[i]);  
            }
        else if (arr_emp[i].month == 2){
            february.push(arr_emp[i]);
            }
        else if (arr_emp[i].month == 3){
            march.push(arr_emp[i]);
            }
    }
    //rewiew
    // console.log(january);
    // console.log(february);
    // console.log(march);

    //sort employees in the each array with day of birth
    january.sort(function(a, b) {
        return a.date - b.date;
      });
    february.sort(function(a, b) {
        return a.date - b.date;
      });  
    march.sort(function(a, b) {
        return a.date - b.date;
      });
    //rewiew
    console.log(january);
    console.log(february);
    console.log(march);

    let employees = new Map();
      employees.set(`January ${current_year}`, january);
      employees.set(`February ${current_year}`, february);
      employees.set(`March ${current_year}`, march);

    console.log(employees);


}

next_birthday(3);
    