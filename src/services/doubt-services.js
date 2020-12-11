import axios from 'axios'

class DoubtService {
    constructor() {
        let service = axios.create({
            // baseURL: 'https://devtroop.herokuapp.com/doubt',
            baseURL: 'http://localhost:3000/doubt'
        })
        this.service = service
    }

    newDoubt = (title, doubt, userId) => {
        return this.service.post('/create', {title, doubt, userId})
        .then(response => response.data)
        .catch(err => console.error(err))
    }
    getAllDoubts = () => {
        return this.service.get('/all')
        .then(response => response.data)
        .catch(err => console.error(err))
    }
    getDoubtsOfUser = (userId) => {
        return this.service.get(`/all/${userId}`)
        .then(response => response.data)
        .catch(err => console.error(err))
    }
    getOneDoubt = (id) => {
        return this.service.get(`/one/${id}`)
        .then(response => response.data)
        .catch(err => console.error(err))
    }
    editOneDoubt = (id, title, doubt) => {
        return this.service.post(`/one/${id}`, {title, doubt})
        .then(response => response.data)
        .catch(err => console.error(err))
    }
    deleteOneDoubt = (id) => {
        return this.service.post(`/one/${id}/delete`)
        .then(response => response.data)
        .catch(err => console.error(err))
    }
// --- services for answers
    getAllAnswersOfDoubt = (doubtId) => {
        return this.service.get(`/answer/all/${doubtId}`)
        .then(response => response.data)
        .catch(err => console.error(err))
    }
    createAnswer = (answer, doubtId) => {
        return this.service.post(`/answer/create/${doubtId}`, {answer})
        .then(response => response.data)
        .catch(err => console.error(err))
    }
    editAnswer = (answer, answerId) => {
        return this.service.post(`/answer/edit/${answerId}`, {answer})
        .then(response => response.data)
        .catch(err => console.error(err))
    }
    deleteAnswer = (answerId) => {
        return this.service.post(`/answer/delete/${answerId}`)
        .then(response => response.data)
        .catch(err => console.error(err))
    }

}

export default DoubtService