import axios from 'axios'

class AuthService {
    constructor() {
        let service = axios.create({
            baseURL: 'https://devtroop.herokuapp.com/auth',
            // baseURL: 'http://localhost:3000/auth',
            withCredentials: true
        })
        this.service = service
    }


    signup = (name, lastName, email, password) => {
        return this.service.post('/signup', {name, lastName, email, password})
        .then(response =>  response.data)
        .catch(err => console.error(err))
    }

    login = (email, password) => {
        return this.service.post('/login', { email, password })
        .then(response => response.data)
    }

    logout = () => {
        return this.service.post('/logout', {})
        .then(response => response.data)
    }

    loggedin = () => {
        return this.service.get('/loggedin')
        .then(response => response.data)
    }


}

export default AuthService