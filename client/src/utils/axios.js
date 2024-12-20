import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true, // To send cookies along with the request
})

export default instance