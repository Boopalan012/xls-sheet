const reader = require('xlsx') ;
const file = reader.readFile('/home/boopalan/users.xls') 
console.log("file===>",file);

let data = [] 
  
const sheets = file.SheetNames;
console.log("sheet===>",sheets.length);
  
for(let i = 0; i < sheets.length; i++) 
{ 
   const temp = reader.utils.sheet_to_json( 
        file.Sheets[file.SheetNames[i]]);
        console.log("temp===>",temp); 
   temp.forEach((res) => { 
      data.push(res) 
   }) 
} 
  
console.log("data",data);