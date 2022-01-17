' use strict'
async function test(){
    const mark = new Promise((res,rej) =>{
       for (let i = 0; i < 5; i++) {
           console.log(i)
           if(i == 4) res('hello')   
       }
       rej('yawti')
    })
   return await mark
}

function hey(halk){
     halk.age = 5
}
function test2(){
    
    let halk = {age: 0}

    const sample = (halk) =>{
        halk.age = 3
    }
    sample(halk)
    return halk
}

console.log(test2())
//test2
// console.log('yow')
// test().then(data => console.log(data))
// console.log('yes')

