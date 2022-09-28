export function checkInputLength(value , length){
    return new Promise((resolve,reject)=>{
        if(value.length>=length){
           resolve('Input length is valid')
        }else{
            reject('Input length isnt valid')
        }
    })
}

export function checkPasswordMatch(password , confirmPassword){
    return new Promise((resolve,reject)=>{
        if(password == confirmPassword){
            resolve('Input login validate successfully')
        }else{
            reject('Input login validate not successfully')
        }
    })
}

export function validateLogin(login){
    return new Promise((resolve,reject)=>{
        if(/^[a-z\d+.\-_@]+$/.test(login)){
            resolve('Input login validate successfully')
        }else{
            reject('Input login validate not successfully')
        }
    })
}
