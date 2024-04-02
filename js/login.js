import { User } from "./classes/User.js";

const user = new User();
const email_input = document.getElementById('user-email');
const password_input = document.getElementById('password');

document.getElementById('login-button').addEventListener("click",(event) => {
    event.preventDefault();
    const email = email_input.value;
    const password = password_input.value;

    user.login(email,password).then(user => {
        window.location.href="index.html";
    }).catch(error => {
        alert(error);
    })
})