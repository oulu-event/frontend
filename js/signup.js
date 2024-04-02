import { User } from "./classes/User.js";

const user = new User();
const firstname_input = document.getElementById('user-firstname');
const lastname_input = document.getElementById('user-lastname');
const dob_input = document.getElementById('user-dob');
const email_input = document.getElementById('user-email');
const password_input = document.getElementById('password');

document.getElementById('signup-button').addEventListener("click",(event) => {
    event.preventDefault();
    const firstname = firstname_input.value;
    const lastname = lastname_input.value;
    const dob = dob_input.value;
    const email = email_input.value;
    const password = password_input.value;

    user.register(firstname,lastname,dob,email,password).then(user => {
        window.location.href="login.html";
    }).catch(error => {
        alert(error);
    })
})