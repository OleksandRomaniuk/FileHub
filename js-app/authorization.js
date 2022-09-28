import {checkInputLength, validateLogin} from "./validation.js"
import {AUTHORIZATION, EMAIL, PASSWORD} from "./consts.js";

document.getElementById(AUTHORIZATION).addEventListener('submit' , ()=>{

    const email = document.getElementById(EMAIL);
    const password = document.getElementById(PASSWORD);


    Promise.allSettled([
        checkInputLength(email.value , 5),
        checkInputLength(password.value , 6),
        validateLogin(email.value),
    ]).then((results) =>{
        let hasError= false;
        results.forEach(results =>{
            if(results.status==='fulfilled'){
                console.log(results.value);
            }else{
                console.log(results.reason);
                hasError = true;
            }
        })
        if(hasError){
            console.log('Authorization failed');
        }
        else{
            console.log('Authorization successfully');
        }
    })
})

