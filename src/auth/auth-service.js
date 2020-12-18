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


    signup = (name, lastName, email, password, email2) => {
        return this.service.post('/signup', {name, lastName, email, password, email2})
        .then(response => {
            return response.data
        })
        
    }

    login = (email, password) => {
        return this.service.post('/login', { email, password })
        .then(response => {
            const { isVerified, ...rest } = response.data
            return rest
        } )
        .catch(err => err)
    }

    logout = () => {
        return this.service.post('/logout', {})
        .then(response => response.data)
    }

    loggedin = () => {
        return this.service.get('/loggedin')
        .then(response => {
            const { isVerified, ...rest } = response.data
            return rest
        } )
    }

    resendToken = (email) => {
        return this.service.post('/resend', {email})
        .then(response => response.data)
    }
    
    resetPwdToken = (email) => {
        return this.service.post('/resetPwd', {email})
        .then(response => response.data)
    }
    checkUserToken = (email, token) => {
        return this.service.post('/resetPwd/check', {email, token})
        .then(response => response.data)
    }
    resetPwdNewPwd = (email, newPassword) => {
        return this.service.post('/resetPwd/newPwd', {email, newPassword})
        .then(response => response.data)
    }

}

export default AuthService