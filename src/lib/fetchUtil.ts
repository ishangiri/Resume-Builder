import axios from 'axios'

const fetchApi = axios.create({
    baseURL : "http://0.0.0.0:8000",
})

export default fetchApi;