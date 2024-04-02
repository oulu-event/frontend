class User {
    #id = undefined;
    #firstname = undefined;
    #lastname = undefined;
    #dob = undefined;
    #email = undefined;

    constructor() {
        const userFromStorage = sessionStorage.getItem('user');
        if(userFromStorage) {
            const userObject = JSON.parse(userFromStorage);
            this.#id = userObject.id;
            this.#firstname = userObject.firstname;
            this.#lastname = userObject.lastname;
            this.#dob = userObject.dob;
            this.#email = userObject.email;
        }
    }

    get id() {
        return this.#id;
    }

    get firstname() {
        return this.#firstname;
    }

    get lastname() {
        return this.#lastname
    }

    get dob() {
        return this.#dob;
    }

    get email() {
        return this.#email;
    }

    get isLoggedIn() {
        return this.#id !== undefined ? true : false;
    }

    async login(email,password) {
        const data = JSON.stringify({email: email,password: password});
        const response = await fetch('http://localhost:3001/user/login',{
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: data
        });
        if(response.ok === true) {
            const json = await response.json();
            this.#id = json.id;
            this.#email = json.email;
            sessionStorage.setItem('user',JSON.stringify(json));
            return this;
        } else {
            throw response.statusText;
        }
    }

    async register(firstname,lastname,dob,email,password) {
        const data = JSON.stringify({firstname: firstname,lastname: lastname,dob: dob,email: email,password: password});
        const response = await fetch('http://localhost:3001/user/register',{
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: data
        })
        if(response.ok === true) {
            const json = await response.json();
            return json.id
        } else {
            throw response.statusText
        }
    }

    logout() {
        this.#id = undefined;
        this.#email = undefined;
        sessionStorage.removeItem('user');
    }
}

export { User }