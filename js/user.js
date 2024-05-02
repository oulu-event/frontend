import { User } from "./classes/User.js";

const login_link = document.querySelector('#login-link');
console.log(login_link)

const user = new User();

if(user.isLoggedIn) {
    console.log('user is logged in')
    login_link.innerHTML = "Logout";
    login_link.href = "/logout.html";
} else {
    console.log('user is not logged in')
    login_link.innerHTML = "Login";
    login_link.href = "/login.html";
}