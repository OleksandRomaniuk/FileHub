
export function checkInputLength(value , length){
    if(value.length>=length){
        return true;
    }
    console.log('input length fail')
    return false;
}

export function checkPasswordMatch(password , confirmPassword){
    return password == confirmPassword;
}

export function validateLogin(login){
    return /^[a-z\d+.\-_@]+$/.test(login);
}

export function checkLogin(login){
    if(!checkInputLength(login,5)){
        console.log('fail length')
        return false;
    }
    if(!validateLogin(login)){
        console.log('fail reg')
        return false;
    }
    return true;
}
