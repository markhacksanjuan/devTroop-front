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
}

export default UserService