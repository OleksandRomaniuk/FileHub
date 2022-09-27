import {checkLogin,checkInputLength , checkPasswordMatch} from "./validation.js"
import {REGISTRATION, EMAIL, PASSWORD ,CONFIRM_PASSWORD } from "./consts.js";

document.getElementById(REGISTRATION).addEventListener('submit' , ()=>{

    const email = document.getElementById(EMAIL);

    if(!checkLogin(email.value)){
        console.log('Email isnt valid')
    }
    const password = document.getElementById(PASSWORD);

    if(!checkInputLength(password.value,6)){
        console.log('Password is too short.')
    }

    const confirmPassword = document.getElementById(CONFIRM_PASSWORD);

    if(!checkPasswordMatch(password.value,confirmPassword.value)){
        console.log('Passwords dont match.')
    }

    console.log('Registration successful')

})

