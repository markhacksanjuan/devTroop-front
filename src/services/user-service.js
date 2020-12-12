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
        return this.service.post('/getOne', {userID})
        .then(response => {
            return response.data
        })
    }
    getAllUsers = () => {
        return this.service.get('/allUsers')
        .then(response => {
            const users = response.data.map(user => {
                return {_id: user._id, name: user.name, lastName: user.lastName}
            })
            return  users
        })
    }
    addFriend = (userId, friendID ) => {
        return this.service.post('/add-new-friend', {userId, friendID})
        .then(response => {
            return response.data
        })
    }
}

export default UserService