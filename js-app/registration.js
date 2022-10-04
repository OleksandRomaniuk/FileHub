import {checkInputLength , checkPasswordMatch , validateLogin} from "./validation.js"
import {REGISTRATION, EMAIL, PASSWORD ,CONFIRM_PASSWORD } from "./constants.js";

document.getElementById(REGISTRATION).addEventListener('submit' , ()=>{


    const email = document.getElementById(EMAIL);
    const password = document.getElementById(PASSWORD);
    const confirmPassword = document.getElementById(CONFIRM_PASSWORD);

    Promise.allSettled([
        checkInputLength(email.value , 5),
        checkInputLength(password.value , 6),
        validateLogin(email.value),
        checkPasswordMatch(email.value,confirmPassword.value)
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
            console.log('Registration failed');
        }
        else{
            console.log('Registration successfully');
        }
    })
})

