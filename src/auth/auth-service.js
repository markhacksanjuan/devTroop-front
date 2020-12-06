import axios from 'axios'

class AuthService {
    constructor() {
        let service = axios.create({
            baseURL: 'devtroop.herokuapp.com',
            withCredentials: true
        })
        this.service = service
    }


    signup = (name, lastName, email, password) => {
        return this.service.post('/signup', {name, lastName, email, password})
        .then(response => response.data)
    }


}

export default AuthService