import axios from 'axios'

class MessageService {
    constructor() {
        let service = axios.create({
            baseURL: 'https://devtroop.herokuapp.com/message',
            // baseURL: 'http://localhost:3000/message'
        })
        this.service = service
    }

    sendMessage = (message, toUserId, fromUserId) => {
        console.log(message + ' toUser: ' + toUserId)
        return this.service.post(`/create/${toUserId}`, {message, fromUserId})
        .then(response => response.data)
    }
    getAllMessages = (toUserId, fromUserId) => {
        return this.service.post(`/all/${toUserId}`, {fromUserId})
        .then(response => response.data)
    }
    getAll = (userId) => {
        return this.service.post('/all', {userId})
        .then(response => response.data)
    }
}

export default MessageService