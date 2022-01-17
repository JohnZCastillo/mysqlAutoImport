var mysql = require('mysql2');


async function insert(data,details){

  var con = mysql.createConnection({
    host: details[0],
    user: details[1],
    password:  details[2],
    database: details[3]
  });


    let statement = `INSERT INTO ${details[4]} VALUES ?`

   return await new Promise((resolve,reject) =>{
      con.query(statement, [data], function (err, result) {      
        if (err){
          let what =  err.toString()
          let signal = 'error';

          console.log(what)
          if(what.includes('getaddrinfo')){
            signal = 'host not found'
          }else if(what.includes('Access denied')){
            signal = 'user/pass incorrect'
          }else if(what.includes('Unknown database')){
            signal = 'database not found'
          }else if(what.includes('Table')){
            signal = 'Table not found'
          }else if(what.includes('Column count doesn\'t match value')){
            if(details[5].includes('xlsx')){
              signal = 'Excel column not match in database'
            }else{
              signal = 'Not an Excel File'
            }
            
          }else if(what.includes('connect ECONNREFUSED')){
            signal = 'cant connect to database'
          }else{
            signal = 'unknown error | Not Excel File'
          }

          reject(signal)
        } 
        resolve('inserted')
      })
   })

}
module.exports = {insert}