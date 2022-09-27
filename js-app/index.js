document.getElementById('form').addEventListener('submit' , ()=>{

    const email = document.getElementById('email');

    const password = document.getElementById('password');

    console.log('Email: ' + email.value + " \nPassword " + password.value)

})