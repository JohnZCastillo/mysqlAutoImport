const db = require('./db')
const reader = require('xlsx')
  


async function render(detials){
    const file = reader.readFile(detials[5])

    
let data = []
const finalOuput = []

const sheets = file.SheetNames

//read excel data
for(let i = 0; i < sheets.length; i++)
{
   const temp = reader.utils.sheet_to_json(
        file.Sheets[file.SheetNames[i]])
   temp.forEach((res) => {
      data.push(res)
   })
}

//convert object to array
for (const value of data) {
  finalOuput.push(Object.values(value))
}

    return await new Promise( (resolve,reject) =>{
      db.insert(finalOuput,detials)
      .then(data => {
         resolve(data)
      }).catch(err => {
         reject(err)
      })
    })
}
// Reading our test file


  
module.exports = {render}