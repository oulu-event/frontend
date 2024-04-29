import { User } from "./classes/User.js";

const user = new User();
const email_input = document.getElementById('user-email');
const password_input = document.getElementById('password');

document.getElementById('login-button').addEventListener("click",(event) => {
    event.preventDefault();
    console.log('login button clicked')
    const email = email_input.value;
    const password = password_input.value;

    user.login(email,password).then(user => {
        console.log('hello from login.js')
        if(user.isLoggedIn) {
            console.log('user is logged in')
        }else{
            console.log('user is not logged in')
        
        }
        window.location.href="index.html";
    }).catch(error => {
        console.log('error while login')
        console.log(error)
        alert(error);
    })
})