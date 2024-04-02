import { User } from "./classes/User.js";

const login_link = document.querySelector('a#login-link');

const user = new User();

if(user.isLoggedIn) {
    login_link.innerHTML = "Logout";
    login_link.href = "logout.html";
} else {
    login_link.innerHTML = "Login";
    login_link.href = "login.html";
}