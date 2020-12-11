import axios from 'axios'

class UserService {
    constructor() {
        let service = axios.create({
            baseURL: 'https://devtroop.herokuapp.com/user',
            // baseURL: 'http://localhost:3000/user'
        })
        this.service = service
    }

    getFriends = (userID) => {
        return this.service.post('/all', {userID})
        .then(response => {
          return response.data  
        } )
    }
    getUser = (userID) => {
        return this.service.post('', {userID})
        .then(response => {
            return response.data
        })
    }
    getAllUsers = () => {
        return this.service.get('/allUsers')
        .then(response => {
            const users = response.data.map(user => {
                return {name: user.name, lastName: user.lastName}
            })
            return  users
        })
    }
}

export default UserService