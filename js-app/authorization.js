import {checkLogin,checkInputLength} from "./validation.js"
import {AUTHORIZATION, EMAIL, PASSWORD} from "./consts.js";

document.getElementById(AUTHORIZATION).addEventListener('submit' , ()=>{

    const email = document.getElementById(EMAIL);

    if(!checkLogin(email.value)){
        console.log('Login validation is failed')
    }
    const password = document.getElementById(PASSWORD);

    if(!checkInputLength(password.value,6)){
        console.log('Password is too short.')
    }
    console.log('Login successful')


})

